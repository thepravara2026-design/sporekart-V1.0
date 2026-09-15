package com.sporekart.catalog.internal.controller;

import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/buyer/products", "/api/v1/products", "/products"})
@Tag(name = "Product Catalog API", description = "Featured & Categorized Product Search API")
public class ProductController {

    public record ProductDto(
            Long id,
            String title,
            String slug,
            String category,
            Double price,
            Double mrp,
            Double rating,
            Integer reviewsCount,
            String imageUrl,
            Boolean inStock,
            String badge,
            String benefit
    ) {}

    @GetMapping
    @Operation(summary = "Get Catalog & Featured Products for Landing Page")
    public ResponseEntity<ApiResponse<List<ProductDto>>> getProducts(
            @RequestParam(required = false) String category,
            HttpServletRequest request
    ) {
        List<ProductDto> products = List.of(
                new ProductDto(1L, "Oyster Mushroom Liquid Culture Syringe (10ml)", "oyster-liquid-culture", "Spawn Seeds", 399.00, 599.00, 4.9, 128, "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80", true, "BESTSELLER", "High viability isolated mycelium strain"),
                new ProductDto(2L, "Autoclaved Grain Spawn Bag with Injection Port (1.5 kg)", "autoclaved-grain-spawn", "Spawn Seeds", 299.00, 399.00, 4.8, 94, "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80", true, "POPULAR", "Sterile hydrated grain with 0.2 micron filter"),
                new ProductDto(3L, "Complete Shiitake Mushroom Growing Kit", "shiitake-growing-kit", "Mushroom Growing Kits", 899.00, 1199.00, 4.7, 210, "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80", true, "SALE", "Harvest fresh Shiitake mushrooms in 7 days"),
                new ProductDto(4L, "Farm Fresh White Button Mushrooms (250g)", "white-button-mushrooms", "Fresh Mushrooms", 149.00, 199.00, 4.9, 65, "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80", true, "IN STOCK", "Hand-harvested organic farm fresh daily"),
                new ProductDto(5L, "Premium Dried Reishi Slice Pouch (100g)", "dried-reishi-pouch", "Dry Mushrooms", 699.00, 899.00, 5.0, 42, "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80", true, "NEW", "Sun-dried organic slices for wellness infusions"),
                new ProductDto(6L, "Sterile Laminar Flow Hood Filter Unit H14", "laminar-flow-hood-h14", "Training & Support", 12499.00, 14999.00, 5.0, 31, "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=600&q=80", true, "PREMIUM", "ISO-certified HEPA unit for clean transfers")
        );

        if (category != null && !category.equalsIgnoreCase("ALL")) {
            List<ProductDto> filtered = products.stream()
                    .filter(p -> p.category().equalsIgnoreCase(category) || p.slug().contains(category.toLowerCase()))
                    .toList();
            return ResponseEntity.ok(ApiResponse.success(filtered, request.getRequestURI()));
        }

        return ResponseEntity.ok(ApiResponse.success(products, request.getRequestURI()));
    }
}
