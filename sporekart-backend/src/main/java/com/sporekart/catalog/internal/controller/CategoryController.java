package com.sporekart.catalog.internal.controller;

import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@Tag(name = "Category Catalog", description = "Product Categories API for SporeKart Landing Page")
public class CategoryController {

    public record CategoryDto(Long id, String name, String slug, String description, String icon, String imageUrl) {}

    @GetMapping
    @Operation(summary = "Get All Product Categories for Landing Page Grid")
    public ResponseEntity<ApiResponse<List<CategoryDto>>> getCategories(HttpServletRequest request) {
        List<CategoryDto> categories = List.of(
                new CategoryDto(1L, "Fresh Mushrooms", "fresh-mushrooms", "Farm-fresh organic mushroom varieties for your kitchen.", "Sprout", "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"),
                new CategoryDto(2L, "Dry Mushrooms", "dry-mushrooms", "Dehydrated gourmet mushrooms with intense flavor.", "Sun", "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80"),
                new CategoryDto(3L, "Spawn Seeds", "spawn-seeds", "Sterile grain spawn bags & liquid culture syringes.", "Microscope", "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80"),
                new CategoryDto(4L, "Mushroom Growing Kits", "growing-kits", "All-in-one ready-to-fruit kits for fast harvest.", "Box", "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"),
                new CategoryDto(5L, "Training & Support", "training-support", "Practical workshops and hands-on cultivation guidance.", "GraduationCap", "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=600&q=80")
        );
        return ResponseEntity.ok(ApiResponse.success(categories, request.getRequestURI()));
    }
}
