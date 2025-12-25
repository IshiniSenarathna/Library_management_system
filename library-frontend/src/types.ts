// src/types.ts
export interface Book {
  id?: string; // or number depending on your backend
  title: string;
  author: string;
  publicationYear: number | string;
  genre: string;
  copies: number | string;
  shelfLocation?: string;
}
