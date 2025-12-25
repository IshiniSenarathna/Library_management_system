// src/pages/BookList.tsx
import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import type { Book } from "../types";
import { useNavigate } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    try {
      const data = await getBooks();   // call backend /books
      setBooks(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch books.");
    } finally {
      setLoading(false);               // IMPORTANT: stop loading
    }
  }

  useEffect(() => {
    load();                            // run once on page load
  }, []);

  async function handleDelete(id?: string) {
    if (!id) return;
    if (!window.confirm("Delete this book?")) return;
    await deleteBook(id);
    await load();                      // reload list
  }

  if (loading) return <div>Loading book data...</div>;

  return (
    <div className="card">
      <h2>Library — Book List</h2>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Shelf</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publicationYear}</td>
                <td>{b.genre}</td>
                <td>{b.shelfLocation || "-"}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${b.id}`)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(b.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

