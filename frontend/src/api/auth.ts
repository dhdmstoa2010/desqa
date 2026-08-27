import { apiClient } from "./client";
import type { AuthUser } from "../store/authStore";

type AuthResponse = {
  token: string;
  user: AuthUser;
};

export async function signupRequest(data: {
  loginId: string;
  name: string;
  password: string;
}) {
  const res = await apiClient.post<AuthResponse>("/api/auth/signup", data);
  return res.data;
}

export async function loginRequest(data: { loginId: string; password: string }) {
  const res = await apiClient.post<AuthResponse>("/api/auth/login", data);
  return res.data;
}
