import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { optionalAuth, requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { reviewDesign, type DesignReviewResult } from "../lib/designReview.js";
import {
  assertPublicUrl,
  captureScreenshot,
  ScreenshotError,
} from "../lib/screenshot.js";

export const reviewRouter = Router();

// 같은 URL 재평가 시 이 시간 안이면 새로 캡처하지 않고 기존 점수를 재사용한다
const CACHE_WINDOW_MS = 60 * 60 * 1000;

type StoredReview = {
  id: number;
  url: string;
  score: number;
  createdAt: Date;
  result: DesignReviewResult;
};

function serialize(row: {
  id: number;
  url: string;
  score: number;
  createdAt: Date;
  result: string;
}): StoredReview {
  return {
    id: row.id,
    url: row.url,
    score: row.score,
    createdAt: row.createdAt,
    result: JSON.parse(row.result) as DesignReviewResult,
  };
}

// 평가 실행
reviewRouter.post("/", optionalAuth, async (req: AuthedRequest, res) => {
  const { url } = req.body as { url?: unknown };

  if (typeof url !== "string" || url.trim() === "") {
    res.status(400).json({ message: "url이 필요합니다" });
    return;
  }

  let target;
  try {
    target = await assertPublicUrl(url.trim());
  } catch (err) {
    const message = err instanceof ScreenshotError ? err.message : "잘못된 URL입니다";
    res.status(400).json({ message });
    return;
  }

  const cached = await prisma.designReview.findFirst({
    where: {
      url: target.href,
      createdAt: { gte: new Date(Date.now() - CACHE_WINDOW_MS) },
    },
    orderBy: { createdAt: "desc" },
  });
  if (cached) {
    res.status(200).json(serialize({ ...cached, result: cached.result }));
    return;
  }

  try {
    const shot = await captureScreenshot(target);
    const result = await reviewDesign(shot);

    const saved = await prisma.designReview.create({
      data: {
        url: shot.finalUrl,
        score: result.overallScore,
        result: JSON.stringify(result),
        userId: req.userId ?? null,
      },
    });

    res.status(201).json(serialize({ ...saved, result: saved.result }));
  } catch (err) {
    if (err instanceof ScreenshotError) {
      res.status(422).json({ message: err.message });
      return;
    }
    console.error("[review] evaluation failed:", err);
    res.status(502).json({ message: "디자인 평가에 실패했습니다. 잠시 후 다시 시도해 주세요." });
  }
});

// 내 평가 기록
reviewRouter.get("/", requireAuth, async (req: AuthedRequest, res) => {
  const rows = await prisma.designReview.findMany({
    where: { userId: req.userId! },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  res.json(rows.map(serialize));
});

// 전체 평가 기록 (공개, 홈페이지 노출용)
reviewRouter.get("/public", async (_req, res) => {
  const rows = await prisma.designReview.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  res.json(
    rows.map((row) => {
      const result = JSON.parse(row.result) as DesignReviewResult;
      return {
        id: row.id,
        url: row.url,
        score: row.score,
        verdict: result.verdict,
        summary: result.summary,
        createdAt: row.createdAt,
      };
    }),
  );
});

// 평가 상세 (공개)
reviewRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: "잘못된 id입니다" });
    return;
  }

  const row = await prisma.designReview.findUnique({ where: { id } });
  if (!row) {
    res.status(404).json({ message: "평가를 찾을 수 없습니다" });
    return;
  }

  res.json(serialize(row));
});
