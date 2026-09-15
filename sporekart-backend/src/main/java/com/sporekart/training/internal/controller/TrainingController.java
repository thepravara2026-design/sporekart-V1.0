package com.sporekart.training.internal.controller;

import com.sporekart.iam.UserRole;
import com.sporekart.iam.UserService;
import com.sporekart.shared.dto.ApiResponse;
import com.sporekart.training.internal.event.EnrollmentCompletedEvent;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/training")
@RequiredArgsConstructor
@Tag(name = "Training Module", description = "Cultivation Courses, Batches (FEATURED/ACTIVE/COMPLETED) & Certificates")
public class TrainingController {

    private final UserService userService;
    private final ApplicationEventPublisher eventPublisher;

    public record BatchResponseDto(Long id, String batchCode, String batchName, String batchStatus, String startDate, String endDate, Double courseFee, Integer maxCapacity) {}
    public record EnrollmentResponseDto(Long enrollmentId, Long batchId, String batchName, String enrollmentStatus, String enrolledAt) {}

    @GetMapping("/batches")
    @Operation(summary = "List Active & Featured Training Batches (Guest Accessible)")
    public ResponseEntity<ApiResponse<List<BatchResponseDto>>> getBatches(@RequestParam(required = false) String status, HttpServletRequest servletRequest) {
        List<BatchResponseDto> batches = List.of(
                new BatchResponseDto(101L, "BATCH-OCT-01", "Advanced Mycology & Tissue Culture Mastery", "FEATURED", "2026-10-01", "2026-10-15", 4999.0, 30),
                new BatchResponseDto(102L, "BATCH-SEP-02", "Commercial Shiitake & Button Farming Workshop", "ACTIVE", "2026-09-20", "2026-09-28", 3499.0, 30),
                new BatchResponseDto(103L, "BATCH-AUG-01", "Basic Mushroom Cultivation Starter Program 101", "COMPLETED", "2026-08-15", "2026-08-30", 1999.0, 25)
        );
        return ResponseEntity.ok(ApiResponse.success(batches, servletRequest.getRequestURI()));
    }

    @PostMapping("/batches/{batchId}/enroll")
    @Operation(summary = "Enroll in Training Batch (Deferred-Auth Checkpoint: Requires TRAINEE Role)")
    public ResponseEntity<ApiResponse<EnrollmentResponseDto>> enrollInBatch(@PathVariable Long batchId, HttpServletRequest servletRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // 401 Unauthenticated checkpoint trigger for frontend auth modal
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("UNAUTHORIZED", "Authentication required to enroll in training batch", servletRequest.getRequestURI()));
        }

        String userIdStr = auth.getPrincipal().toString();
        // Ensure user is granted TRAINEE role
        userService.findOrCreateUserAndGrantRole(userIdStr.contains("@") ? userIdStr : "user_" + userIdStr + "@sporekart.com", UserRole.TRAINEE, "Trainee", "User");

        EnrollmentResponseDto enrollment = new EnrollmentResponseDto(501L, batchId, "Advanced Mycology & Tissue Culture Mastery", "ENROLLED", "2026-09-15T17:00:00Z");

        // Publish async event for certificate generation listener
        eventPublisher.publishEvent(new EnrollmentCompletedEvent(501L, 1001L, batchId, "Vikram Sharma", "Advanced Mycology & Tissue Culture Mastery"));

        return ResponseEntity.ok(ApiResponse.success(enrollment, servletRequest.getRequestURI()));
    }

    @GetMapping("/certificates/{enrollmentId}/download")
    @Operation(summary = "Download Issued Certificate PDF for Trainee")
    public ResponseEntity<byte[]> downloadCertificate(@PathVariable Long enrollmentId) {
        byte[] pdfContent = "%PDF-1.4 Mock SporeKart Training Certificate Content".getBytes();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Certificate_" + enrollmentId + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfContent);
    }
}
