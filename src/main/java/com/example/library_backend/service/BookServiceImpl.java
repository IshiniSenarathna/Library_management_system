package com.example.library_backend.service;

import com.example.library_backend.model.Book;
import com.example.library_backend.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> getBookById(String id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book updateBook(String id, Book updatedBook) {
        return bookRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(updatedBook.getTitle());
                    existing.setAuthor(updatedBook.getAuthor());
                    existing.setPublicationYear(updatedBook.getPublicationYear());
                    existing.setGenre(updatedBook.getGenre());
                    existing.setCopies(updatedBook.getCopies());
                    existing.setShelfLocation(updatedBook.getShelfLocation());
                    return bookRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }

    @Override
    public void deleteBookById(String id) {
        bookRepository.deleteById(id);
    }

    @Override
    public List<Book> findBooksByPublicationYear(int year) {
        return bookRepository.findByPublicationYear(year);
    }

    @Override
    public String getGenreByBookId(String id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
        return book.getGenre();
    }

    @Override
    public void deleteBooksByPublicationYear(int year) {
        List<Book> books = bookRepository.findByPublicationYear(year);
        bookRepository.deleteAll(books);
    }
}
