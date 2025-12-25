package com.example.library_backend.service;

import com.example.library_backend.model.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {

    Book addBook(Book book);

    List<Book> getAllBooks();

    Optional<Book> getBookById(String id);

    Book updateBook(String id, Book updatedBook);

    void deleteBookById(String id);

    List<Book> findBooksByPublicationYear(int year);

    String getGenreByBookId(String id);

    void deleteBooksByPublicationYear(int year);
}
