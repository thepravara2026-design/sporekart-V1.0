package com.sporekart.catalog.internal.controller;

import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@Tag(name = "Customer Reviews", description = "Verified Grower Reviews & Ratings API")
public class ReviewController {

    public record ReviewDto(Long id, String reviewerName, String reviewerLocation, Integer rating, String title, String comment, Boolean isVerifiedGrower) {}

    @GetMapping
    @Operation(summary = "Get Customer & Grower Testimonial Reviews")
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getReviews(HttpServletRequest request) {
        List<ReviewDto> reviews = List.of(
                new ReviewDto(1L, "Ramesh Kumar", "Bengaluru, Karnataka", 5, "Exceptional Liquid Culture Viability", "The Oyster mushroom liquid culture syringe had 100% colonization speed in my grain spawn bags within 6 days. Best sterile lab quality in India.", true),
                new ReviewDto(2L, "Dr. Anita Deshmukh", "Pune, Maharashtra", 5, "Top Tier Commercial Training", "Attended the 3-Day Advanced Mycology & Tissue Culture workshop. The practical lab training and PDF certificate were invaluable for setting up my commercial farm.", true),
                new ReviewDto(3L, "Siddharth Patel", "Ahmedabad, Gujarat", 5, "Reliable Shiprocket Logistics", "Ordered laminar flow filters and spawn bags. Delivered via Shiprocket in perfect condition in 3 days. Extremely satisfied.", true)
        );
        return ResponseEntity.ok(ApiResponse.success(reviews, request.getRequestURI()));
    }
}
