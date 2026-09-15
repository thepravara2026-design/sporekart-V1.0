package com.sporekart.catalog.internal.controller;

import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/education")
@Tag(name = "Educational Guides API", description = "Mushroom Cultivation Guides & SEO Articles API")
public class EducationController {

    public record ArticleDto(
            Long id,
            String title,
            String slug,
            String summary,
            String category,
            String readTime,
            String imageUrl
    ) {}

    @GetMapping("/guides")
    @Operation(summary = "Get Educational Content & Guides for Landing Page")
    public ResponseEntity<ApiResponse<List<ArticleDto>>> getGuides(HttpServletRequest request) {
        List<ArticleDto> guides = List.of(
                new ArticleDto(1L, "How to Start Mushroom Cultivation at Home", "how-to-start-mushroom-cultivation", "A beginner-friendly step-by-step roadmap to setting up your first sterile growing space.", "BEGINNER GUIDE", "5 min read", "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80"),
                new ArticleDto(2L, "How to Choose Between Liquid Culture & Grain Spawn", "choose-liquid-culture-vs-grain-spawn", "Learn the difference between mycelium culture syringes and grain spawn bags for optimal yield.", "CULTIVATION", "7 min read", "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80"),
                new ArticleDto(3L, "Common Mushroom Growing Mistakes & Contamination Fixes", "growing-mistakes-fixes", "Diagnose green mold, cobweb, over-hydration, and air flow issues before they destroy your flush.", "TROUBLESHOOTING", "6 min read", "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"),
                new ArticleDto(4L, "Setting Up a Budget Still Air Box (SAB) & Clean Space", "budget-still-air-box-setup", "Build a sterile working environment for liquid culture inoculation without high lab equipment cost.", "LAB SETUP", "8 min read", "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=600&q=80")
        );
        return ResponseEntity.ok(ApiResponse.success(guides, request.getRequestURI()));
    }
}
