// src/pages/AddBook.tsx 
import React, { useState } from "react"; 
import { createBook } from "../services/api"; 
import type { Book } from "../types"; 
import { useNavigate } from "react-router-dom"; 
 
export default function AddBook() { 
  const [form, setForm] = useState<Book>({ 
    title: "", 
    author: "", 
    publicationYear: "", 
    genre: "", 
    copies: 1, 
    shelfLocation: "" 
  }); 
  const navigate = useNavigate();
  function onChange(e: React.ChangeEvent<HTMLInputElement>) { 
    const { name, value } = e.target; 
    setForm((f) => ({ ...f, [name]: value } as Book)); 
  } 
 
  async function onSubmit(e: React.FormEvent) { 
    e.preventDefault(); 
    try { 
      await createBook({ 
        ...form, 
        publicationYear: Number(form.publicationYear), 
        copies: Number(form.copies), 
      }); 
      navigate("/"); 
    } catch (err) { 
      console.error(err); 
      alert("Failed to add book."); 
    } 
  } 
 
  return ( 
    <div className="card"> 
      <h2>Add Book</h2> 
      <form onSubmit={onSubmit} className="book-form"> 
        <label>Title<input name="title" value={form.title} onChange={onChange} 
required/></label> 
        <label>Author<input name="author" value={form.author} onChange={onChange} 
required/></label>
        <label>Publication Year<input name="publicationYear" 
value={String(form.publicationYear)} onChange={onChange} required/></label> 
        <label>Genre<input name="genre" value={form.genre} onChange={onChange} 
/></label> 
        <label>Copies<input name="copies" value={String(form.copies)} 
onChange={onChange} type="number" min={0} /></label> 
        <label>Shelf Location<input name="shelfLocation" value={form.shelfLocation} 
onChange={onChange} /></label> 
        <div className="form-actions"> 
          <button type="submit">Save Book</button> 
          <button type="button" onClick={() => navigate("/")}>Cancel</button> 
        </div> 
      </form> 
    </div> 
  ); 
} 
