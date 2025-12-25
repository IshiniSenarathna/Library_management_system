// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </main>
    </div>
  );
}









