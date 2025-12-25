package com.example.library_backend.controller;

import com.example.library_backend.model.Book;
import com.example.library_backend.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        return ResponseEntity.ok(bookService.addBook(book));
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id,
                                           @RequestBody Book book) {
        return ResponseEntity.ok(bookService.updateBook(id, book));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookById(@PathVariable String id) {
        bookService.deleteBookById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/year/{year}")
    public ResponseEntity<List<Book>> getBooksByYear(@PathVariable int year) {
        return ResponseEntity.ok(bookService.findBooksByPublicationYear(year));
    }

    @GetMapping("/{id}/genre")
    public ResponseEntity<String> getGenreByBookId(@PathVariable String id) {
        return ResponseEntity.ok(bookService.getGenreByBookId(id));
    }

    @DeleteMapping("/year/{year}")
    public ResponseEntity<Void> deleteBooksByYear(@PathVariable int year) {
        bookService.deleteBooksByPublicationYear(year);
        return ResponseEntity.noContent().build();
    }
}
