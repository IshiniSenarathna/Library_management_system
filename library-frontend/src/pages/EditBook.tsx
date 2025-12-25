// src/pages/EditBook.tsx
import React, { useEffect, useState } from "react";
import { getBook, updateBook } from "../services/api";
import type { Book } from "../types";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Book | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBook(id).then((b) => {
        setForm(b);
      }).catch((err) => {
        console.error(err);
        alert("Failed to load book.");
      });
    }
  }, [id]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!form) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value } as Book);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !form) return;
    try {
      await updateBook(id, {
        ...form,
        publicationYear: Number(form.publicationYear),
        copies: Number(form.copies),
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update book.");
    }
  }

  if (!form) return <div>Loading book data…</div>;

  return (
    <div className="card">
      <h2>Edit Book</h2>
      <form onSubmit={onSubmit} className="book-form">
        <label>Title<input name="title" value={form.title} onChange={onChange} required/></label>
        <label>Author<input name="author" value={form.author} onChange={onChange} required/></label>
        <label>Publication Year<input name="publicationYear" value={String(form.publicationYear)} onChange={onChange} required/></label>
        <label>Genre<input name="genre" value={form.genre} onChange={onChange} /></label>
        <label>Copies<input name="copies" value={String(form.copies)} onChange={onChange} type="number" min={0} /></label>
        <label>Shelf Location<input name="shelfLocation" value={form.shelfLocation || ""} onChange={onChange} /></label>
        <div className="form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
