import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewPostInput, Post } from "../types/board";
import { firstImageSrc, stripHtml } from "../utils/html";

type BoardState = {
  posts: Post[];
  addPost: (input: NewPostInput) => number;
};

function domainOf(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "—";
  try {
    return new URL(
      /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`,
    ).hostname.replace(/^www\./, "");
  } catch {
    return trimmed.replace(/^https?:\/\//i, "").split("/")[0] || "—";
  }
}

function today(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      posts: [],
      addPost: (input) => {
        const id = Date.now();
        const bodyText = stripHtml(input.body);
        const post: Post = {
          id,
          category: input.category,
          domain: domainOf(input.url),
          title: input.title.trim(),
          author: input.author,
          authorColor: input.authorColor,
          date: today(),
          views: 0,
          score: input.score,
          detail: input.lead.trim() || bodyText.slice(0, 120),
          deltas: [],
          image: firstImageSrc(input.body),
          lead: input.lead.trim(),
          body: input.body,
          helpful: 0,
          metrics: [],
          commentList: [],
        };
        set({ posts: [post, ...get().posts] });
        return id;
      },
    }),
    { name: "board-storage" },
  ),
);
