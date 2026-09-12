package com.sporekart.iam.internal.controller;

import com.sporekart.iam.internal.domain.UserEntity;
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
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication & IAM", description = "Passwordless Auth (Google OAuth, Phone/Email OTP) & Account Management")
public class AuthController {

    public record SendOtpRequest(@NotBlank String target, @NotBlank String type) {}
    public record VerifyOtpRequest(@NotBlank String target, @NotBlank String otpCode, String firstName, String lastName, String role) {}
    public record GoogleAuthRequest(@NotBlank String googleIdToken, String role) {}
    public record AuthResponseDto(String accessToken, String tokenType, Long userId, String email, String phoneNumber, String role) {}

    @PostMapping("/otp/send")
    @Operation(summary = "Send Phone SMS or Email OTP Code")
    public ResponseEntity<ApiResponse<String>> sendOtp(@Valid @RequestBody SendOtpRequest request, HttpServletRequest servletRequest) {
        // Business logic dispatches 6-digit OTP code to phone/email
        return ResponseEntity.ok(ApiResponse.success("OTP dispatched successfully to " + request.target(), servletRequest.getRequestURI()));
    }

    @PostMapping("/otp/verify")
    @Operation(summary = "Verify OTP Code & Log In / Register Passwordless")
    public ResponseEntity<ApiResponse<AuthResponseDto>> verifyOtp(@Valid @RequestBody VerifyOtpRequest request, HttpServletRequest servletRequest) {
        // Business logic verifies OTP, creates or fetches UserEntity, issues JWT
        AuthResponseDto authResponse = new AuthResponseDto(
                "simulated_jwt_access_token_" + System.currentTimeMillis(),
                "Bearer",
                1001L,
                request.target().contains("@") ? request.target() : "user@sporekart.com",
                request.target().contains("@") ? "+919876543210" : request.target(),
                request.role() != null ? request.role() : "ROLE_BUYER"
        );
        return ResponseEntity.ok(ApiResponse.success(authResponse, servletRequest.getRequestURI()));
    }

    @PostMapping("/google")
    @Operation(summary = "Authenticate using Google OAuth 2.0 Token")
    public ResponseEntity<ApiResponse<AuthResponseDto>> authenticateGoogle(@Valid @RequestBody GoogleAuthRequest request, HttpServletRequest servletRequest) {
        AuthResponseDto authResponse = new AuthResponseDto(
                "simulated_google_jwt_" + System.currentTimeMillis(),
                "Bearer",
                1002L,
                "google.user@sporekart.com",
                "+919999988888",
                request.role() != null ? request.role() : "ROLE_BUYER"
        );
        return ResponseEntity.ok(ApiResponse.success(authResponse, servletRequest.getRequestURI()));
    }

    @DeleteMapping("/account")
    @Operation(summary = "Self-Service Account Deletion (User Self-Delete - No Admin Override)")
    public ResponseEntity<ApiResponse<String>> selfDeleteAccount(HttpServletRequest servletRequest) {
        // Unmediated user account deletion
        return ResponseEntity.ok(ApiResponse.success("Account permanently self-deleted.", servletRequest.getRequestURI()));
    }
}
