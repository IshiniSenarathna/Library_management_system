package com.example.library_backend.controller;

import com.example.library_backend.model.Book;
import com.example.library_backend.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        return ResponseEntity.ok(bookService.addBook(book));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> updateBook(@PathVariable String id,
                                           @RequestBody Book book) {
        return ResponseEntity.ok(bookService.updateBook(id, book));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBookById(@PathVariable String id) {
        bookService.deleteBookById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/year/{year}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<Book>> getBooksByYear(@PathVariable int year) {
        return ResponseEntity.ok(bookService.findBooksByPublicationYear(year));
    }

    @GetMapping("/{id}/genre")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<String> getGenreByBookId(@PathVariable String id) {
        return ResponseEntity.ok(bookService.getGenreByBookId(id));
    }

    @DeleteMapping("/year/{year}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBooksByYear(@PathVariable int year) {
        bookService.deleteBooksByPublicationYear(year);
        return ResponseEntity.noContent().build();
    }
}
