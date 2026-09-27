import type { ApiComment, ApiPost, ApiPostDetail, ApiPostSummary } from "../api/board";
import type { Comment, Post, PostCategory, PostDetail, Tone } from "../types/board";
import { firstImageSrc, stripHtml } from "./html";

export function toneOf(score?: number): Tone {
  if (score == null) return "mid";
  if (score >= 80) return "high";
  if (score >= 65) return "mid";
  return "low";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${formatDate(iso)} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function detailOf(post: ApiPost): string {
  return post.lead && post.lead.trim() !== "" ? post.lead : stripHtml(post.body).slice(0, 120);
}

export function toPost(post: ApiPostSummary): Post {
  return {
    id: post.id,
    category: post.category as PostCategory,
    domain: post.domain ?? "—",
    title: post.title,
    author: post.author,
    authorColor: post.authorColor,
    date: formatDate(post.createdAt),
    views: post.views,
    score: post.score ?? undefined,
    detail: detailOf(post),
    deltas: [],
    image: firstImageSrc(post.body),
    lead: post.lead ?? "",
    body: post.body,
    helpful: post.helpful,
    metrics: [],
    commentCount: post.commentCount,
  };
}

function toComment(comment: ApiComment): Comment {
  return {
    id: comment.id,
    author: comment.author,
    at: formatDateTime(comment.createdAt),
    text: comment.text,
  };
}

export function toPostDetail(post: ApiPostDetail): PostDetail {
  return {
    ...toPost({ ...post, commentCount: post.commentList.length }),
    mine: post.mine,
    commentList: post.commentList.map(toComment),
  };
}
