import apiClient from "./client";

export interface FormData {
  name: string;
  email: string;
  body: string;
}

export interface FormResponse {
  id: number;
  name: string;
  email: string;
  body: string;
  created_at: string;
}

export async function submitForm(payload: FormData): Promise<FormResponse> {
  const { data } = await apiClient.post<FormResponse>("/form/", payload);
  return data;
}
