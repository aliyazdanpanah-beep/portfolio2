import apiClient from "./client";
import { UserInfo } from "./auth";
import { Blog } from "./blog";
import { FormResponse } from "./form";

// ---------- types ----------

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  is_active?: boolean;
}

export interface CreateBlogPayload {
  title: string;
  body: string;
  img?: string;
}

export interface UpdateBlogPayload {
  title?: string;
  body?: string;
  img?: string;
}

// ---------- users ----------

export const getUsers = () =>
  apiClient.get<UserInfo[]>("/admin/users/").then((r) => r.data);

export const createUser = (payload: CreateUserPayload) =>
  apiClient
    .post<UserInfo>("/admin/users/", payload)
    .then((r) => r.data);

export const updateUser = (id: number, payload: UpdateUserPayload) =>
  apiClient
    .put<UserInfo>(`/admin/users/${id}`, payload)
    .then((r) => r.data);

export const deleteUser = (id: number) =>
  apiClient.delete(`/admin/users/${id}`).then((r) => r.data);

// ---------- blogs ----------

export const getAdminBlogs = () =>
  apiClient.get<Blog[]>("/blog/").then((r) => r.data);

export const createBlog = (payload: CreateBlogPayload) =>
  apiClient.post<Blog>("/admin/blog/", payload).then((r) => r.data);

export const updateBlog = (id: number, payload: UpdateBlogPayload) =>
  apiClient
    .put<Blog>(`/admin/blog/${id}`, payload)
    .then((r) => r.data);

export const deleteBlog = (id: number) =>
  apiClient.delete(`/admin/blog/${id}`).then((r) => r.data);

// ---------- forms ----------

export const getForms = () =>
  apiClient.get<FormResponse[]>("/admin/forms/").then((r) => r.data);

export const getForm = (id: number) =>
  apiClient.get<FormResponse>(`/admin/forms/${id}`).then((r) => r.data);

export const deleteForm = (id: number) =>
  apiClient.delete(`/admin/forms/${id}`).then((r) => r.data);
