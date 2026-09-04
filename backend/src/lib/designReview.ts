import { Type, type Schema } from "@google/genai";
import { genai } from "./gemini.js";
import type { Screenshot } from "./screenshot.js";

const MODEL = process.env.GEMINI_REVIEW_MODEL ?? "gemini-3.5-flash";

export const CATEGORY_KEYS = [
  "hierarchy",
  "typography",
  "color_contrast",
  "spacing_layout",
  "consistency",
  "credibility",
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export type DesignReviewResult = {
  overallScore: number;
  verdict: string;
  summary: string;
  categories: {
    key: CategoryKey;
    label: string;
    score: number;
    comment: string;
  }[];
  strengths: string[];
  issues: {
    title: string;
    severity: "high" | "medium" | "low";
    where: string;
    problem: string;
    fix: string;
  }[];
};

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  required: ["overallScore", "verdict", "summary", "categories", "strengths", "issues"],
  propertyOrdering: [
    "overallScore",
    "verdict",
    "summary",
    "categories",
    "strengths",
    "issues",
  ],
  properties: {
    overallScore: { type: Type.INTEGER, minimum: 0, maximum: 100 },
    verdict: {
      type: Type.STRING,
      description: "결론 한 줄. 25자 이내, 쉬운 말. 예: '정보는 잘 보이지만 낡아 보인다'",
    },
    summary: {
      type: Type.STRING,
      description: "2문장. 전문용어 없이, 비전공자도 바로 이해할 수 있게.",
    },
    categories: {
      type: Type.ARRAY,
      minItems: "6",
      maxItems: "6",
      items: {
        type: Type.OBJECT,
        required: ["key", "label", "score", "comment"],
        propertyOrdering: ["key", "label", "score", "comment"],
        properties: {
          key: { type: Type.STRING, format: "enum", enum: [...CATEGORY_KEYS] },
          label: { type: Type.STRING, description: "카테고리 한국어 이름" },
          score: { type: Type.INTEGER, minimum: 0, maximum: 100 },
          comment: {
            type: Type.STRING,
            description:
              "이 점수를 준 이유 딱 한 문장(50자 이내). 화면에서 보이는 것을 근거로. 전문용어 금지.",
          },
        },
      },
    },
    strengths: {
      type: Type.ARRAY,
      description: "잘한 점. 각 항목은 짧은 구절(30자 이내).",
      items: { type: Type.STRING },
    },
    issues: {
      type: Type.ARRAY,
      description: "고쳐야 할 것. 임팩트 큰 순서로 3~6개.",
      items: {
        type: Type.OBJECT,
        required: ["title", "severity", "where", "problem", "fix"],
        propertyOrdering: ["title", "severity", "where", "problem", "fix"],
        properties: {
          title: {
            type: Type.STRING,
            description: "문제 한 줄 요약. 20자 이내.",
          },
          severity: {
            type: Type.STRING,
            format: "enum",
            enum: ["high", "medium", "low"],
          },
          where: {
            type: Type.STRING,
            description:
              "화면의 어느 부분인지 콕 집어서. 예: '상단 헤더의 로그인 버튼', '첫 화면 큰 제목'",
          },
          problem: {
            type: Type.STRING,
            description: "뭐가 왜 안 좋은지 쉬운 말 한 문장(45자 이내).",
          },
          fix: {
            type: Type.STRING,
            description:
              "바로 실행할 수 있는 구체적 조치 한 문장. 예: '버튼 배경을 진한 색으로 바꾸고 글자를 흰색으로'",
          },
        },
      },
    },
  },
};

const SYSTEM_PROMPT = `너는 20년 경력의 시니어 프로덕트 디자이너다. 웹사이트 스크린샷 한 장을 보고 디자인 품질을 평가한다.
독자는 디자인 비전공자다. "읽고 바로 이해되고, 바로 고칠 수 있는" 리포트를 쓴다.

평가 카테고리 (각 0~100점, key는 스키마 값 그대로):
- hierarchy(시각적 위계): 눈이 중요한 것부터 보게 되는가, 핵심 버튼이 눈에 띄는가
- typography(타이포그래피): 글자가 잘 읽히는가, 제목·본문 크기 차이가 적절한가
- color_contrast(색상 & 대비): 색 조합이 자연스러운가, 글자와 배경 대비가 충분한가(접근성)
- spacing_layout(여백 & 레이아웃): 줄이 잘 맞는가, 답답하거나 휑하지 않은가
- consistency(일관성): 버튼·간격·모서리 스타일이 페이지 안에서 통일돼 있는가
- credibility(완성도 & 신뢰감): 첫인상이 믿음직한가, 조잡해 보이지 않는가

글쓰기 규칙 (매우 중요):
- 전문용어 금지. "그리드", "위계", "커닝" 같은 말 대신 쉬운 말로 풀어 쓴다.
- 한 항목은 한 문장. 길게 늘이지 않는다. 미사여구·감탄("압도적", "극상의") 금지.
- 화면에서 실제로 보이는 것만 근거로 쓴다. 안 보이면 언급하지 않는다.
- issue의 where는 위치를 콕 집는다("첫 화면 오른쪽 위 메뉴"). problem은 왜 별론지, fix는 뭘 하면 되는지.
- issues는 임팩트가 큰 순서로 3~6개. 사소한 건 빼고 정말 고쳐야 할 것만.
- overallScore는 단순 평균이 아니라 종합 판단.
- 모든 문자열은 한국어.`;

const RETRYABLE = new Set([429, 500, 503]);

export async function reviewDesign(shot: Screenshot): Promise<DesignReviewResult> {
  const maxAttempts = 3;
  let lastErr: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await genai.models.generateContent({
        model: MODEL,
        contents: [
          {
            text:
              `평가 대상 URL: ${shot.finalUrl}\n` +
              (shot.title ? `페이지 제목: ${shot.title}\n` : "") +
              `아래 스크린샷을 평가해 스키마에 맞는 JSON으로만 답하라.`,
          },
          { inlineData: { mimeType: "image/png", data: shot.base64 } },
        ],
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.2,
          maxOutputTokens: 4000,
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
        },
      });

      const raw = response.text;
      if (!raw) {
        throw new Error("Gemini 응답이 비어 있습니다");
      }

      return JSON.parse(raw) as DesignReviewResult;
    } catch (err) {
      lastErr = err;
      const status = (err as { status?: number }).status;
      if (attempt < maxAttempts && status !== undefined && RETRYABLE.has(status)) {
        await new Promise((r) => setTimeout(r, attempt * 2000));
        continue;
      }
      throw err;
    }
  }

  throw lastErr;
}
