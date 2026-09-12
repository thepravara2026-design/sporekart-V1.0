package com.sporekart.shared;

import com.sporekart.shared.dto.ProblemDetailsResponse;
import com.sporekart.shared.exception.BusinessException;
import com.sporekart.shared.exception.ErrorCode;
import com.sporekart.shared.exception.GlobalExceptionHandler;
import com.sporekart.shared.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;

import static org.assertj.core.api.Assertions.assertThat;

class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler exceptionHandler;
    private MockHttpServletRequest request;

    @BeforeEach
    void setUp() {
        exceptionHandler = new GlobalExceptionHandler();
        request = new MockHttpServletRequest();
        request.setRequestURI("/api/v1/catalog/products/999");
    }

    @Test
    @DisplayName("ResourceNotFoundException should be handled with RFC 7807 problem details and 404 status")
    void handleResourceNotFoundException_Returns404ProblemDetails() {
        ResourceNotFoundException ex = new ResourceNotFoundException("User", 999L);

        ResponseEntity<ProblemDetailsResponse> response = exceptionHandler.handleBaseException(ex, request);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getStatus()).isEqualTo(404);
        assertThat(response.getBody().getInstance()).isEqualTo("/api/v1/catalog/products/999");
        assertThat(response.getBody().getCode()).isEqualTo(ErrorCode.USER_NOT_FOUND.getCode());
    }

    @Test
    @DisplayName("BusinessException should be handled with RFC 7807 problem details and 401 status")
    void handleBusinessException_Returns401ProblemDetails() {
        BusinessException ex = new BusinessException(ErrorCode.INVALID_CREDENTIALS, "The provided OTP is invalid");

        ResponseEntity<ProblemDetailsResponse> response = exceptionHandler.handleBaseException(ex, request);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getStatus()).isEqualTo(401);
        assertThat(response.getBody().getCode()).isEqualTo(ErrorCode.INVALID_CREDENTIALS.getCode());
    }
}
