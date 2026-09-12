package com.sporekart.shared.exception;

import com.sporekart.shared.dto.ProblemDetailsResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * FAANG Enterprise Global Exception Controller Advice (RFC 7807 Compliant).
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private String getOrCreateTraceId() {
        String traceId = MDC.get("traceId");
        return traceId != null ? traceId : UUID.randomUUID().toString();
    }

    // 1. Handle Typed Base Exceptions (Domain, Immutability, Integration, Rate Limit)
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ProblemDetailsResponse> handleBaseException(BaseException ex, HttpServletRequest request) {
        String traceId = getOrCreateTraceId();
        log.warn("Domain Exception [{}] TraceId [{}]: {}", ex.getErrorCode().getCode(), traceId, ex.getMessage());

        ProblemDetailsResponse problem = ProblemDetailsResponse.builder()
                .type("https://sporekart.com/errors/" + ex.getErrorCode().getCode().toLowerCase())
                .title(ex.getErrorCode().name())
                .status(ex.getHttpStatus().value())
                .detail(ex.getMessage())
                .instance(request.getRequestURI())
                .code(ex.getErrorCode().getCode())
                .traceId(traceId)
                .build();

        return ResponseEntity.status(ex.getHttpStatus())
                .contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(problem);
    }

    // 2. Handle Multi-Field Input Validation Failures (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetailsResponse> handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        String traceId = getOrCreateTraceId();

        List<ProblemDetailsResponse.FieldErrorDetail> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> new ProblemDetailsResponse.FieldErrorDetail(err.getField(), err.getRejectedValue(), err.getDefaultMessage()))
                .collect(Collectors.toList());

        ProblemDetailsResponse problem = ProblemDetailsResponse.builder()
                .type("https://sporekart.com/errors/validation-error")
                .title("Constraint Validation Failure")
                .status(HttpStatus.BAD_REQUEST.value())
                .detail("One or more fields failed validation checks.")
                .instance(request.getRequestURI())
                .code("VALIDATION_001")
                .traceId(traceId)
                .fieldErrors(fieldErrors)
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(problem);
    }

    // 3. Fallback Catch-All for Unhandled System Failures (Zero Stack-Trace Leakage)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetailsResponse> handleGenericException(Exception ex, HttpServletRequest request) {
        String traceId = getOrCreateTraceId();
        log.error("Unhandled System Exception TraceId [{}]: ", traceId, ex);

        ProblemDetailsResponse problem = ProblemDetailsResponse.builder()
                .type("https://sporekart.com/errors/internal-error")
                .title("Internal Server Error")
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .detail("An unexpected error occurred. Please reference traceId when contacting support.")
                .instance(request.getRequestURI())
                .code(ErrorCode.INTERNAL_SERVER_ERROR.getCode())
                .traceId(traceId)
                .build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(problem);
    }
}
