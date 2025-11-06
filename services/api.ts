import { PostData } from "@/types/types";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Funções CRUD (Create, Update, Delete)
export const createPost = (data: PostData): Promise<AxiosResponse> =>
  api.post("/posts", data);

export const updatePost = (id: string | number, data: PostData): Promise<AxiosResponse> =>
  api.put(`/posts/${id}`, data);

export const deletePost = (id: string | number): Promise<AxiosResponse> =>
  api.delete(`/posts/${id}`);

export default api;
