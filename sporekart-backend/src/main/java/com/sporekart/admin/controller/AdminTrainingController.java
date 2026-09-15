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
@RequestMapping("/api/v1/admin/training")
@RequiredArgsConstructor
@Tag(name = "Admin Training Management", description = "Admin Management for Workshop Batches & Certificates")
public class AdminTrainingController {

    public record CreateBatchRequest(@NotBlank String title, @NotBlank String startDate, @NotBlank String duration, @NotNull Double fee, String level) {}

    @PostMapping("/batches")
    @Operation(summary = "Admin: Schedule New Workshop Batch")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<String>> createBatch(@Valid @RequestBody CreateBatchRequest request, HttpServletRequest servletRequest) {
        return ResponseEntity.ok(ApiResponse.success("Admin created workshop batch: " + request.title(), servletRequest.getRequestURI()));
    }
}
