import { apiClient } from "./client";

export type ApiPost = {
  id: number;
  category: string;
  url: string | null;
  domain: string | null;
  title: string;
  lead: string | null;
  body: string;
  author: string;
  authorColor: string;
  score: number | null;
  views: number;
  helpful: number;
  createdAt: string;
  updatedAt: string;
};

export type ApiPostSummary = ApiPost & { commentCount: number };

export type ApiComment = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
};

export type ApiPostDetail = ApiPost & {
  mine: boolean;
  commentList: ApiComment[];
};

export async function fetchPostsRequest(category?: string) {
  const res = await apiClient.get<ApiPostSummary[]>("/api/board", {
    params: category && category !== "전체" ? { category } : undefined,
  });
  return res.data;
}

export async function fetchPostRequest(id: number) {
  const res = await apiClient.get<ApiPostDetail>(`/api/board/${id}`);
  return res.data;
}

export async function createPostRequest(data: {
  category: string;
  title: string;
  lead?: string;
  body: string;
  url?: string;
  score?: number;
  authorColor?: string;
}) {
  const res = await apiClient.post<ApiPost>("/api/board", data);
  return res.data;
}

export async function updatePostRequest(
  id: number,
  data: Partial<{
    category: string;
    title: string;
    lead: string;
    body: string;
    url: string;
  }>,
) {
  const res = await apiClient.patch<ApiPostDetail>(`/api/board/${id}`, data);
  return res.data;
}

export async function deletePostRequest(id: number) {
  await apiClient.delete(`/api/board/${id}`);
}

export async function reactHelpfulRequest(id: number) {
  const res = await apiClient.post<{ helpful: number }>(`/api/board/${id}/helpful`);
  return res.data;
}

export async function addCommentRequest(id: number, text: string) {
  const res = await apiClient.post<ApiComment>(`/api/board/${id}/comments`, { text });
  return res.data;
}
