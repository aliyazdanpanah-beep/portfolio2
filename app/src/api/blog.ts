import apiClient from "./client";

export interface Blog {
  id: number;
  title: string;
  body: string;
  img: string | null;
  author_id: number;
  created_at: string;
  updated_at: string;
}

export async function getBlogs(): Promise<Blog[]> {
  const { data } = await apiClient.get<Blog[]>("/blog/");
  return data;
}

export async function getBlog(id: number): Promise<Blog> {
  const { data } = await apiClient.get<Blog>(`/blog/${id}`);
  return data;
}
