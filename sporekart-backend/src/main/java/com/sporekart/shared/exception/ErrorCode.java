package com.sporekart.shared.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    INVALID_CREDENTIALS("AUTH_001", "Invalid OTP or credentials", HttpStatus.UNAUTHORIZED),
    TOKEN_EXPIRED("AUTH_002", "Authentication token has expired", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED_ACCESS("AUTH_003", "Access denied for requested resource", HttpStatus.FORBIDDEN),
    IMMUTABLE_IDENTITY_VIOLATION("IAM_001", "Core identity fields (name, phone, email) cannot be mutated", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND("IAM_002", "User account not found", HttpStatus.NOT_FOUND),
    
    PRODUCT_NOT_FOUND("CATALOG_001", "Requested product not found", HttpStatus.NOT_FOUND),
    INSUFFICIENT_STOCK("CATALOG_002", "Insufficient stock quantity available", HttpStatus.CONFLICT),
    
    ORDER_NOT_FOUND("ORDER_001", "Requested order not found", HttpStatus.NOT_FOUND),
    INVALID_ORDER_STATE("ORDER_002", "Order is not in a valid state for this action", HttpStatus.BAD_REQUEST),
    
    BATCH_FULL("TRAINING_001", "Selected training batch has reached maximum capacity", HttpStatus.CONFLICT),
    CERTIFICATE_NOT_AVAILABLE("TRAINING_002", "Certificate PDF is not yet available for this enrollment", HttpStatus.NOT_FOUND),
    
    PAYMENT_FAILED("PAYMENT_001", "Payment transaction failed or signature invalid", HttpStatus.PAYMENT_REQUIRED),
    PAYMENT_SIGNATURE_MISMATCH("PAYMENT_002", "Razorpay payment signature verification failed", HttpStatus.BAD_REQUEST),
    
    INTERNAL_SERVER_ERROR("SYS_001", "An unexpected system error occurred", HttpStatus.INTERNAL_SERVER_ERROR);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(String code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
