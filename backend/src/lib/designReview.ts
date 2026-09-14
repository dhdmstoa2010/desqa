import { Type, type Schema } from "@google/genai";
import { genai } from "./gemini.js";
import type { Screenshot } from "./screenshot.js";

const MODEL = process.env.GEMINI_REVIEW_MODEL ?? "gemini-3.5-flash-lite";

export const CATEGORY_KEYS = [
  "hierarchy",
  "typography",
  "color_contrast",
  "spacing_layout",
  "consistency",
  "credibility",
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export const UX_CATEGORY_KEYS = [
  "findability",
  "affordance",
  "clarity_of_labels",
  "task_guidance",
] as const;

export type UxCategoryKey = (typeof UX_CATEGORY_KEYS)[number];

type Issue = {
  title: string;
  severity: "high" | "medium" | "low";
  where: string;
  problem: string;
  fix: string;
};

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
  issues: Issue[];
  uxCategories: {
    key: UxCategoryKey;
    label: string;
    score: number;
    comment: string;
  }[];
  uxIssues: Issue[];
};

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  required: [
    "overallScore",
    "verdict",
    "summary",
    "categories",
    "strengths",
    "issues",
    "uxCategories",
    "uxIssues",
  ],
  propertyOrdering: [
    "overallScore",
    "verdict",
    "summary",
    "categories",
    "strengths",
    "issues",
    "uxCategories",
    "uxIssues",
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
    uxCategories: {
      type: Type.ARRAY,
      minItems: "4",
      maxItems: "4",
      items: {
        type: Type.OBJECT,
        required: ["key", "label", "score", "comment"],
        propertyOrdering: ["key", "label", "score", "comment"],
        properties: {
          key: { type: Type.STRING, format: "enum", enum: [...UX_CATEGORY_KEYS] },
          label: { type: Type.STRING, description: "카테고리 한국어 이름" },
          score: { type: Type.INTEGER, minimum: 0, maximum: 100 },
          comment: {
            type: Type.STRING,
            description:
              "이 점수를 준 이유 딱 한 문장(50자 이내). 사용자가 화면에서 뭘 하려다 겪을 어려움을 근거로. 전문용어 금지.",
          },
        },
      },
    },
    uxIssues: {
      type: Type.ARRAY,
      description:
        "사용자가 목표를 달성하는 데 방해가 되는 문제(못 찾음, 헷갈림, 뭘 눌러야 할지 모름 등). 임팩트 큰 순서로 2~5개.",
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
              "화면의 어느 부분인지 콕 집어서. 예: '헤더 오른쪽', '히어로 영역 입력창'",
          },
          problem: {
            type: Type.STRING,
            description:
              "사용자가 뭘 하려다 어떻게 막히는지 쉬운 말 한 문장(45자 이내). 예: '로그인 버튼이 안 보여서 어디서 로그인하는지 알 수 없다'",
          },
          fix: {
            type: Type.STRING,
            description: "바로 실행할 수 있는 구체적 조치 한 문장.",
          },
        },
      },
    },
  },
};

const SYSTEM_PROMPT = `너는 20년 경력의 시니어 프로덕트 디자이너이자 UX 리서처다. 웹사이트 스크린샷 한 장을 보고
"보기에 얼마나 잘 만들었는가(UI)"와 "써보려는 사람이 얼마나 헤매지 않는가(UX)"를 함께 평가한다.
독자는 디자인 비전공자다. "읽고 바로 이해되고, 바로 고칠 수 있는" 리포트를 쓴다.

[UI 카테고리] — categories, 시각적 완성도 관점 (각 0~100점, key는 스키마 값 그대로):
- hierarchy(시각적 위계): 눈이 중요한 것부터 보게 되는가, 핵심 버튼이 눈에 띄는가
- typography(타이포그래피): 글자가 잘 읽히는가, 제목·본문 크기 차이가 적절한가
- color_contrast(색상 & 대비): 색 조합이 자연스러운가, 글자와 배경 대비가 충분한가(접근성).
  단순히 회색·저채도 색이라는 이유만으로 감점하지 않는다 — 스크린샷에서 글자 윤곽이 흐릿해
  실제로 읽기 어려워 보일 때만 문제로 판단한다.
- spacing_layout(여백 & 레이아웃): 줄이 잘 맞는가, 답답하거나 휑하지 않은가
- consistency(일관성): 버튼·간격·모서리 스타일이 페이지 안에서 통일돼 있는가
- credibility(완성도 & 신뢰감): 첫인상이 믿음직한가, 조잡해 보이지 않는가

[UX 카테고리] — uxCategories, "처음 온 사람이 이 화면만 보고 목표를 달성할 수 있는가" 관점
(각 0~100점, key는 스키마 값 그대로):
- findability(핵심 기능 찾기 쉬움): 로그인, 검색, 회원가입, 문의하기, 장바구니 같은 자주 찾는
  기능을 화면에서 몇 초 안에 찾을 수 있는가. 헤더/우측 상단처럼 기대되는 자리에 있는가.
- affordance(요소 인지성): 버튼은 버튼처럼, 입력창은 입력창처럼 보이는가. 클릭·입력 가능한
  요소와 그냥 텍스트/이미지가 구분되는가.
- clarity_of_labels(문구·레이블 명확성): 버튼·메뉴 이름만 보고 눌렀을 때 무슨 일이 일어날지
  예측할 수 있는가. 애매하거나 낯선 표현, 뜻이 겹치는 메뉴명은 없는가.
- task_guidance(다음 행동 안내): 이 화면에서 사용자가 지금 뭘 해야 하는지 한눈에 파악되는가.
  경쟁하는 버튼이 여러 개라 뭘 눌러야 할지 헷갈리지 않는가.

글쓰기 규칙 (매우 중요):
- 전문용어 금지. "그리드", "위계", "어포던스", "커닝" 같은 말 대신 쉬운 말로 풀어 쓴다.
- 한 항목은 한 문장. 길게 늘이지 않는다. 미사여구·감탄("압도적", "극상의") 금지.
- 화면에서 실제로 보이는 것만 근거로 쓴다. 안 보이면 언급하지 않는다. 스크린샷 아래로
  스크롤해야 보이는 내용, 클릭해야 나오는 다음 화면은 추측하지 않는다.
- 대비·가독성 문제는 스크린샷에서 확실히 눈에 보이는 경우에만 지적한다. "회색이라서",
  "연해 보여서" 같은 추측성 근거로 issue를 만들지 않는다.
- issue/uxIssue의 where는 위치를 콕 집는다("첫 화면 오른쪽 위 메뉴"). problem은 왜 별론지,
  fix는 뭘 하면 되는지.
- issues(UI)는 시각적 완성도 문제(정렬 깨짐, 대비 부족, 자간 등)만 담는다. uxIssues는
  사용자가 목표를 달성하려다 막히는 문제(못 찾음, 헷갈림, 뭘 눌러야 할지 모름)만 담는다.
  같은 현상이라도 "안 예뻐서"면 issues, "못 찾아서/헷갈려서"면 uxIssues로 나눈다.
  예시(uxIssues): "로그인 버튼이 헤더에 안 보여서 어디서 로그인하는지 알 수 없다",
  "입력창이 일반 텍스트처럼 보여서 여기에 뭘 입력해야 하는지 모른다".
- issues는 임팩트가 큰 순서로 3~6개, uxIssues는 2~5개. 사소한 건 빼고 정말 고쳐야 할 것만.
  화면이 실제로 찾기 쉽고 헷갈리지 않으면 uxIssues를 억지로 채우지 말고 적게 적어도 된다.
- overallScore는 UI·UX를 모두 고려한 종합 판단(단순 평균 아님).
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
          maxOutputTokens: 12000,
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
