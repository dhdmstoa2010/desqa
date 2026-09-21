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
  id: number;
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
  /** 점수 (평가 전에는 없음) */
  score?: number;
  badge?: string;
  /** 목록 호버 요약 */
  detail?: string;
  deltas: Delta[];
  tags?: string[];
  /** 본문 첫 이미지 */
  image?: string;
  lead: string;
  /** 에디터 HTML */
  body: string;
  helpful: number;
  metrics: Metric[];
  commentCount: number;
}

export interface PostDetail extends Post {
  /** 내 글 여부 */
  mine: boolean;
  commentList: Comment[];
}
