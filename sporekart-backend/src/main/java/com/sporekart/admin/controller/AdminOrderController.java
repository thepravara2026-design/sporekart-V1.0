package com.sporekart.admin.controller;

import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/orders")
@RequiredArgsConstructor
@Tag(name = "Admin Order Management", description = "Admin Oversight for Customer Orders & Logistics")
public class AdminOrderController {

    @GetMapping
    @Operation(summary = "Admin: List All Platform Orders")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<String>> getAllOrders(HttpServletRequest servletRequest) {
        return ResponseEntity.ok(ApiResponse.success("Admin list of all customer orders", servletRequest.getRequestURI()));
    }
}
