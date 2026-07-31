import apiClient from "./client";

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserInfo {
  id: number;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  role: string;
  is_active: boolean;
}

export async function login(
  username: string,
  password: string
): Promise<TokenResponse> {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  const { data } = await apiClient.post<TokenResponse>("/auth/token", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return data;
}

export async function getMe(): Promise<UserInfo> {
  const { data } = await apiClient.get<UserInfo>("/auth/me");
  return data;
}
