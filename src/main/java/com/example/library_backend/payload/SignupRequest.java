package com.example.library_backend.payload;

import com.example.library_backend.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    private String username;
    private String password;
    private Set<Role> roles;   // e.g. ["ROLE_ADMIN"] or ["ROLE_USER"]
}
