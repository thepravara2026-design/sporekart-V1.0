package com.sporekart.catalog.internal.controller;

import com.sporekart.catalog.internal.domain.GuestCartEntity;
import com.sporekart.catalog.internal.service.GuestCartService;
import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/api/v1/buyer/cart/guest", "/api/v1/cart/guest"})
@RequiredArgsConstructor
@Tag(name = "Guest Cart Module", description = "Anonymous guest cart persistence & auth merge endpoints")
public class GuestCartController {

    private final GuestCartService guestCartService;

    public record SaveGuestCartRequest(String guestToken, String itemsJson) {}
    public record MergeGuestCartRequest(@NotBlank String guestToken, @NotBlank String userIdentifier, String firstName, String lastName) {}

    @PostMapping("/save")
    @Operation(summary = "Save or Sync Anonymous Guest Cart")
    public ResponseEntity<ApiResponse<GuestCartEntity>> saveGuestCart(@Valid @RequestBody SaveGuestCartRequest request, HttpServletRequest servletRequest) {
        GuestCartEntity cart = guestCartService.getOrCreateGuestCart(request.guestToken(), request.itemsJson());
        return ResponseEntity.ok(ApiResponse.success(cart, servletRequest.getRequestURI()));
    }

    @PostMapping("/merge")
    @Operation(summary = "Merge Guest Cart into User Cart & Grant BUYER Role on Auth")
    public ResponseEntity<ApiResponse<String>> mergeGuestCart(@Valid @RequestBody MergeGuestCartRequest request, HttpServletRequest servletRequest) {
        String mergedItemsJson = guestCartService.mergeGuestCartOnAuth(
                request.guestToken(),
                request.userIdentifier(),
                request.firstName() != null ? request.firstName() : "Buyer",
                request.lastName() != null ? request.lastName() : "User"
        );
        return ResponseEntity.ok(ApiResponse.success(mergedItemsJson, servletRequest.getRequestURI()));
    }
}
