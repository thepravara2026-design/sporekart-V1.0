package com.sporekart.admin.controller;

import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/catalog")
@RequiredArgsConstructor
@Tag(name = "Admin Catalog Management", description = "Admin CRUD endpoints for Products and Categories")
public class AdminCatalogController {

    public record CreateProductRequest(@NotBlank String title, @NotBlank String category, @NotNull Double price, Double mrp, String benefit) {}

    @PostMapping("/products")
    @Operation(summary = "Admin: Create New Catalog Product")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<String>> createProduct(@Valid @RequestBody CreateProductRequest request, HttpServletRequest servletRequest) {
        return ResponseEntity.ok(ApiResponse.success("Admin created product: " + request.title(), servletRequest.getRequestURI()));
    }

    @DeleteMapping("/products/{id}")
    @Operation(summary = "Admin: Delete Catalog Product")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable Long id, HttpServletRequest servletRequest) {
        return ResponseEntity.ok(ApiResponse.success("Admin deleted product ID: " + id, servletRequest.getRequestURI()));
    }
}
