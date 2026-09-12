package com.sporekart.training.internal.controller;

import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/training")
@RequiredArgsConstructor
@Tag(name = "Training Module", description = "Cultivation Courses, Batches (FEATURED/ACTIVE/COMPLETED) & Certificates")
public class TrainingController {

    public record BatchResponseDto(Long id, String batchCode, String batchName, String batchStatus, String startDate, String endDate, Double courseFee, Integer maxCapacity) {}
    public record EnrollmentResponseDto(Long enrollmentId, Long batchId, String batchName, String enrollmentStatus, String enrolledAt) {}

    @GetMapping("/batches")
    @Operation(summary = "List Active & Featured Training Batches (Guest Accessible)")
    public ResponseEntity<ApiResponse<List<BatchResponseDto>>> getBatches(@RequestParam(required = false) String status, HttpServletRequest servletRequest) {
        List<BatchResponseDto> batches = List.of(
                new BatchResponseDto(101L, "BATCH-OCT-01", "Advanced Mycology & Tissue Culture", "FEATURED", "2026-10-01", "2026-10-15", 4999.0, 30),
                new BatchResponseDto(102L, "BATCH-SEP-02", "Commercial Shiitake Farming Workshop", "ACTIVE", "2026-09-15", "2026-09-28", 3499.0, 30),
                new BatchResponseDto(103L, "BATCH-AUG-01", "Basic Mushroom Cultivation 101", "COMPLETED", "2026-08-01", "2026-08-15", 1999.0, 25)
        );
        return ResponseEntity.ok(ApiResponse.success(batches, servletRequest.getRequestURI()));
    }

    @PostMapping("/batches/{batchId}/enroll")
    @Operation(summary = "Enroll in Training Batch (Requires Authenticated Trainee)")
    public ResponseEntity<ApiResponse<EnrollmentResponseDto>> enrollInBatch(@PathVariable Long batchId, HttpServletRequest servletRequest) {
        EnrollmentResponseDto enrollment = new EnrollmentResponseDto(501L, batchId, "Advanced Mycology & Tissue Culture", "ENROLLED", "2026-09-12T05:30:00Z");
        return ResponseEntity.ok(ApiResponse.success(enrollment, servletRequest.getRequestURI()));
    }

    @GetMapping("/certificates/{enrollmentId}/download")
    @Operation(summary = "Download Issued Certificate PDF for Trainee")
    public ResponseEntity<byte[]> downloadCertificate(@PathVariable Long enrollmentId) {
        // Return dummy PDF binary stream or generated OpenPDF certificate
        byte[] pdfContent = "%PDF-1.4 Mock Certificate Content".getBytes();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Certificate_" + enrollmentId + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfContent);
    }
}
