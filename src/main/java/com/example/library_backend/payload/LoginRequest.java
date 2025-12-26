package com.example.library_backend.payload;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
