// src/services/api.ts
import axios from "axios";
import type { Book } from "../types";

//const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const baseURL = "http://localhost:8080/api";
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// endpoints expected: GET /books, GET /books/:id, POST /books, PUT /books/:id, DELETE /books/:id
export const getBooks = async () => {
  const res = await api.get<Book[]>("/books");
  return res.data;
};

export const getBook = async (id: string) => {
  const res = await api.get<Book>(`/books/${id}`);
  return res.data;
};

export const createBook = async (book: Book) => {
  const res = await api.post<Book>("/books", book);
  return res.data;
};

export const updateBook = async (id: string, book: Book) => {
  const res = await api.put<Book>(`/books/${id}`, book);
  return res.data;
};

export const deleteBook = async (id: string) => {
  const res = await api.delete(`/books/${id}`);
  return res.data;
};

