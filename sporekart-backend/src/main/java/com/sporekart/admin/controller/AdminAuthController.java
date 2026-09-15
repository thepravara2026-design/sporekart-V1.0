package com.sporekart.admin.controller;

import com.sporekart.iam.AdminAuthService;
import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/auth")
@RequiredArgsConstructor
@Tag(name = "Admin Authentication", description = "Isolated Administrative Login & Identity Provisioning")
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    public record AdminLoginRequest(@NotBlank String usernameOrEmail, @NotBlank String password) {}
    public record SeedAdminRequest(@NotBlank String username, @NotBlank String email, @NotBlank String password, String firstName, String lastName) {}
    public record AdminAuthResponseDto(String accessToken, String tokenType, String username, String email, List<String> roles) {}

    @PostMapping("/login")
    @Operation(summary = "Authenticate Administrative User")
    public ResponseEntity<ApiResponse<AdminAuthResponseDto>> loginAdmin(@Valid @RequestBody AdminLoginRequest request, HttpServletRequest servletRequest) {
        String token = adminAuthService.loginAdmin(request.usernameOrEmail(), request.password());
        AdminAuthResponseDto response = new AdminAuthResponseDto(token, "Bearer", request.usernameOrEmail(), request.usernameOrEmail(), List.of("ROLE_ADMIN"));
        return ResponseEntity.ok(ApiResponse.success(response, servletRequest.getRequestURI()));
    }

    @PostMapping("/seed")
    @Operation(summary = "Seed Initial Admin User (Dev & Setup Utility)")
    public ResponseEntity<ApiResponse<String>> seedAdmin(@Valid @RequestBody SeedAdminRequest request, HttpServletRequest servletRequest) {
        String username = adminAuthService.seedDefaultAdmin(
                request.username(),
                request.email(),
                request.password(),
                request.firstName() != null ? request.firstName() : "Admin",
                request.lastName() != null ? request.lastName() : "User"
        );
        return ResponseEntity.ok(ApiResponse.success("Admin user provisioned: " + username, servletRequest.getRequestURI()));
    }
}
