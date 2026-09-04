import { apiClient } from "./client";

export type CategoryKey =
  | "hierarchy"
  | "typography"
  | "color_contrast"
  | "spacing_layout"
  | "consistency"
  | "credibility";

export type ReviewCategory = {
  key: CategoryKey;
  label: string;
  score: number;
  comment: string;
};

export type ReviewIssue = {
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
  categories: ReviewCategory[];
  strengths: string[];
  issues: ReviewIssue[];
};

export type StoredReview = {
  id: number;
  url: string;
  score: number;
  createdAt: string;
  result: DesignReviewResult;
};

export async function createReviewRequest(url: string, signal?: AbortSignal) {
  const res = await apiClient.post<StoredReview>(
    "/api/review",
    { url },
    { timeout: 90_000, signal },
  );
  return res.data;
}

export async function getReviewRequest(id: number | string) {
  const res = await apiClient.get<StoredReview>(`/api/review/${id}`);
  return res.data;
}

export async function listReviewsRequest() {
  const res = await apiClient.get<StoredReview[]>("/api/review");
  return res.data;
}
