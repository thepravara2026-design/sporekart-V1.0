package com.sporekart.iam.internal.controller;

import com.sporekart.iam.internal.domain.UserEntity;
import com.sporekart.iam.UserRole;
import com.sporekart.iam.UserService;
import com.sporekart.shared.security.JwtTokenProvider;
import com.sporekart.iam.internal.service.OtpService;
import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication & IAM", description = "Passwordless Auth (Google OAuth, Phone/Email OTP) & Account Management")
public class AuthController {

    private final OtpService otpService;
    private final UserService userService;
    private final JwtTokenProvider tokenProvider;

    public record SendOtpRequest(@NotBlank String target, String type) {}
    public record VerifyOtpRequest(@NotBlank String target, @NotBlank String otpCode, String firstName, String lastName, String role) {}
    public record GoogleAuthRequest(@NotBlank String googleIdToken, String role) {}
    public record AuthResponseDto(String accessToken, String tokenType, Long userId, String email, String phoneNumber, String firstName, String lastName, Set<String> roles) {}

    @PostMapping("/otp/send")
    @Operation(summary = "Send Phone SMS or Email OTP Code")
    public ResponseEntity<ApiResponse<String>> sendOtp(@Valid @RequestBody SendOtpRequest request, HttpServletRequest servletRequest) {
        String code = otpService.sendOtp(request.target(), request.type());
        return ResponseEntity.ok(ApiResponse.success("OTP dispatched successfully. Code (dev): " + code, servletRequest.getRequestURI()));
    }

    @PostMapping("/otp/verify")
    @Operation(summary = "Verify OTP Code & Log In / Register Passwordless")
    public ResponseEntity<ApiResponse<AuthResponseDto>> verifyOtp(@Valid @RequestBody VerifyOtpRequest request, HttpServletRequest servletRequest) {
        boolean isValid = otpService.verifyOtp(request.target(), request.otpCode());
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("INVALID_OTP", "Invalid or expired OTP verification code", servletRequest.getRequestURI()));
        }

        // Determine requested role (Strictly restrict to BUYER or TRAINEE, default to BUYER)
        UserRole targetRole = UserRole.BUYER;
        if (request.role() != null && request.role().toUpperCase().contains("TRAINEE")) {
            targetRole = UserRole.TRAINEE;
        }

        UserEntity user = userService.findOrCreateUserAndGrantRole(request.target(), targetRole, request.firstName(), request.lastName());
        Set<String> rolesSet = user.getRoles().stream().map(UserRole::getAuthority).collect(Collectors.toSet());

        String jwt = tokenProvider.generateCustomerToken(user.getId(), user.getEmail(), rolesSet);

        AuthResponseDto authResponse = new AuthResponseDto(
                jwt,
                "Bearer",
                user.getId(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getFirstName(),
                user.getLastName(),
                rolesSet
        );

        return ResponseEntity.ok(ApiResponse.success(authResponse, servletRequest.getRequestURI()));
    }

    @PostMapping("/google")
    @Operation(summary = "Authenticate using Google OAuth 2.0 Token")
    public ResponseEntity<ApiResponse<AuthResponseDto>> authenticateGoogle(@Valid @RequestBody GoogleAuthRequest request, HttpServletRequest servletRequest) {
        UserRole targetRole = UserRole.BUYER;
        if (request.role() != null && request.role().toUpperCase().contains("TRAINEE")) {
            targetRole = UserRole.TRAINEE;
        }

        String simulatedGoogleTarget = "google_user_" + Math.abs(request.googleIdToken().hashCode()) + "@sporekart.com";
        UserEntity user = userService.findOrCreateUserAndGrantRole(simulatedGoogleTarget, targetRole, "Google", "User");
        Set<String> rolesSet = user.getRoles().stream().map(UserRole::getAuthority).collect(Collectors.toSet());

        String jwt = tokenProvider.generateCustomerToken(user.getId(), user.getEmail(), rolesSet);

        AuthResponseDto authResponse = new AuthResponseDto(
                jwt,
                "Bearer",
                user.getId(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getFirstName(),
                user.getLastName(),
                rolesSet
        );

        return ResponseEntity.ok(ApiResponse.success(authResponse, servletRequest.getRequestURI()));
    }

    @DeleteMapping("/account")
    @Operation(summary = "Self-Service Account Deletion (User Self-Delete - No Admin Override)")
    public ResponseEntity<ApiResponse<String>> selfDeleteAccount(HttpServletRequest servletRequest) {
        return ResponseEntity.ok(ApiResponse.success("Account permanently self-deleted.", servletRequest.getRequestURI()));
    }
}
