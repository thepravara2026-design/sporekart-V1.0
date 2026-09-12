package com.sporekart.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

/**
 * RFC 7807 Compliant Problem Details for HTTP APIs (FAANG Enterprise Standard).
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProblemDetailsResponse {

    private String type;            // URI reference identifying problem type
    private String title;           // Short, human-readable summary
    private int status;             // HTTP status code
    private String detail;          // Human-readable explanation specific to occurrence
    private String instance;        // URI identifying specific occurrence (request path)
    private String code;            // Domain specific error code (e.g. IAM_001)
    private String traceId;         // Distributed Tracing Correlation ID (OpenTelemetry)
    @Builder.Default
    private Instant timestamp = Instant.now();
    private List<FieldErrorDetail> fieldErrors;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FieldErrorDetail {
        private String field;
        private Object rejectedValue;
        private String message;
    }
}
