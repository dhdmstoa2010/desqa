export const CATEGORIES = [
  "전체",
  "타이포",
  "레이아웃·여백",
  "컬러",
  "인터랙션",
] as const;

export type Category = (typeof CATEGORIES)[number];
export type PostCategory = Exclude<Category, "전체">;

export type Tone = "high" | "mid" | "low";

export interface Metric {
  label: string;
  value: string;
  fill: number;
}

export interface Delta {
  label: string;
  delta: number;
}

export interface Comment {
  author: string;
  at: string;
  text: string;
}

export interface Post {
  id: number;
  category: PostCategory;
  domain: string;
  title: string;
  author: string;
  authorColor: string;
  date: string;
  views: number;
  /** 아직 평가받지 않은 게시물은 점수가 없음 */
  score?: number;
  badge?: string;
  /** 목록 호버 시 보여줄 짧은 요약 */
  detail?: string;
  deltas: Delta[];
  tags?: string[];
  /** 본문 첫 이미지 (data URL) */
  image?: string;
  lead: string;
  /** 리치 에디터가 만든 HTML */
  body: string;
  helpful: number;
  metrics: Metric[];
  commentList: Comment[];
}

/** 새 글 작성 폼 → 스토어 입력 */
export interface NewPostInput {
  url: string;
  category: PostCategory;
  title: string;
  lead: string;
  body: string;
  author: string;
  authorColor: string;
  score?: number;
}
