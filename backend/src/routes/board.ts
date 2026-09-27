import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { optionalAuth, requireAuth, type AuthedRequest } from "../middleware/auth.js";

export const boardRouter = Router();

const CATEGORIES = ["타이포", "레이아웃·여백", "컬러", "인터랙션"] as const;

function domainOf(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    return new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`)
      .hostname.replace(/^www\./, "");
  } catch {
    return trimmed.replace(/^https?:\/\//i, "").split("/")[0] || null;
  }
}

interface PostRow {
  id: number;
  category: string;
  url: string | null;
  title: string;
  lead: string | null;
  body: string;
  authorName: string;
  authorColor: string;
  score: number | null;
  views: number;
  helpful: number;
  userId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

function serializePost(post: PostRow) {
  return {
    id: post.id,
    category: post.category,
    url: post.url,
    domain: post.url ? domainOf(post.url) : null,
    title: post.title,
    lead: post.lead,
    body: post.body,
    author: post.authorName,
    authorColor: post.authorColor,
    score: post.score,
    views: post.views,
    helpful: post.helpful,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

function serializeComment(comment: {
  id: number;
  text: string;
  authorName: string;
  createdAt: Date;
}) {
  return {
    id: comment.id,
    author: comment.authorName,
    text: comment.text,
    createdAt: comment.createdAt,
  };
}

// GET /api/board — list posts, optionally filtered by category
boardRouter.get("/", async (req, res) => {
  const { category } = req.query as { category?: string };

  if (category && category !== "전체" && !CATEGORIES.includes(category as never)) {
    res.status(400).json({ message: "잘못된 category입니다" });
    return;
  }

  const where = category && category !== "전체" ? { category } : {};
  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { comments: true } } },
  });

  res.json(
    posts.map((p) => ({
      ...serializePost(p),
      commentCount: p._count.comments,
    })),
  );
});

// POST /api/board — create a new post (works signed-out as a guest post)
boardRouter.post("/", optionalAuth, async (req: AuthedRequest, res) => {
  const { category, title, lead, body, url, score, authorColor } = req.body as {
    category?: unknown;
    title?: unknown;
    lead?: unknown;
    body?: unknown;
    url?: unknown;
    score?: unknown;
    authorColor?: unknown;
  };

  if (typeof category !== "string" || !CATEGORIES.includes(category as never)) {
    res.status(400).json({ message: "잘못된 category입니다" });
    return;
  }
  if (typeof title !== "string" || title.trim() === "") {
    res.status(400).json({ message: "title이 필요합니다" });
    return;
  }
  if (typeof body !== "string" || body.trim() === "") {
    res.status(400).json({ message: "body가 필요합니다" });
    return;
  }
  if (score !== undefined && score !== null && typeof score !== "number") {
    res.status(400).json({ message: "score는 숫자여야 합니다" });
    return;
  }

  let authorName = "게스트";
  if (req.userId) {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    authorName = user?.name ?? authorName;
  }

  const post = await prisma.post.create({
    data: {
      category,
      title: title.trim(),
      lead: typeof lead === "string" && lead.trim() !== "" ? lead.trim() : null,
      body,
      url: typeof url === "string" && url.trim() !== "" ? url.trim() : null,
      score: score ?? null,
      authorName,
      authorColor: typeof authorColor === "string" && authorColor.trim() !== "" ? authorColor : "#bfff6b",
      userId: req.userId ?? null,
    },
  });

  res.status(201).json({ ...serializePost(post), commentCount: 0 });
});

// GET /api/board/:id — a single post with its comments (increments view count)
boardRouter.get("/:id", optionalAuth, async (req: AuthedRequest, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: "잘못된 id입니다" });
    return;
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    res.status(404).json({ message: "게시물을 찾을 수 없습니다" });
    return;
  }

  const post = await prisma.post.update({
    where: { id },
    data: { views: { increment: 1 } },
    include: { comments: { orderBy: { createdAt: "asc" } } },
  });

  res.json({
    ...serializePost(post),
    mine: req.userId != null && req.userId === post.userId,
    commentList: post.comments.map(serializeComment),
  });
});

// PATCH /api/board/:id — update own post
boardRouter.patch("/:id", requireAuth, async (req: AuthedRequest, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: "잘못된 id입니다" });
    return;
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    res.status(404).json({ message: "게시물을 찾을 수 없습니다" });
    return;
  }
  if (existing.userId !== req.userId) {
    res.status(403).json({ message: "본인 게시물만 수정할 수 있습니다" });
    return;
  }

  const { category, title, lead, body, url } = req.body as {
    category?: unknown;
    title?: unknown;
    lead?: unknown;
    body?: unknown;
    url?: unknown;
  };

  if (category !== undefined && (typeof category !== "string" || !CATEGORIES.includes(category as never))) {
    res.status(400).json({ message: "잘못된 category입니다" });
    return;
  }
  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    res.status(400).json({ message: "title이 비어있을 수 없습니다" });
    return;
  }
  if (body !== undefined && (typeof body !== "string" || body.trim() === "")) {
    res.status(400).json({ message: "body가 비어있을 수 없습니다" });
    return;
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...(typeof category === "string" ? { category } : {}),
      ...(typeof title === "string" ? { title: title.trim() } : {}),
      ...(lead !== undefined
        ? { lead: typeof lead === "string" && lead.trim() !== "" ? lead.trim() : null }
        : {}),
      ...(typeof body === "string" ? { body } : {}),
      ...(url !== undefined
        ? { url: typeof url === "string" && url.trim() !== "" ? url.trim() : null }
        : {}),
    },
  });

  res.json({ ...serializePost(post), mine: true });
});

// DELETE /api/board/:id — delete own post
boardRouter.delete("/:id", requireAuth, async (req: AuthedRequest, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: "잘못된 id입니다" });
    return;
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    res.status(404).json({ message: "게시물을 찾을 수 없습니다" });
    return;
  }
  if (existing.userId !== req.userId) {
    res.status(403).json({ message: "본인 게시물만 삭제할 수 있습니다" });
    return;
  }

  await prisma.post.delete({ where: { id } });
  res.status(204).end();
});

// POST /api/board/:id/helpful — "도움됐어요" reaction counter
boardRouter.post("/:id/helpful", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: "잘못된 id입니다" });
    return;
  }

  try {
    const post = await prisma.post.update({
      where: { id },
      data: { helpful: { increment: 1 } },
    });
    res.json({ helpful: post.helpful });
  } catch {
    res.status(404).json({ message: "게시물을 찾을 수 없습니다" });
  }
});

// POST /api/board/:id/comments — add a comment (login required)
boardRouter.post("/:id/comments", requireAuth, async (req: AuthedRequest, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: "잘못된 id입니다" });
    return;
  }

  const { text } = req.body as { text?: unknown };
  if (typeof text !== "string" || text.trim() === "") {
    res.status(400).json({ message: "text가 필요합니다" });
    return;
  }

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    res.status(404).json({ message: "게시물을 찾을 수 없습니다" });
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: req.userId! } });

  const comment = await prisma.comment.create({
    data: {
      text: text.trim(),
      authorName: user!.name,
      postId: id,
      userId: req.userId!,
    },
  });

  res.status(201).json(serializeComment(comment));
});
