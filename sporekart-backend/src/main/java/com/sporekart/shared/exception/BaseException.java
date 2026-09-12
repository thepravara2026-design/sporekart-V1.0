package com.sporekart.shared.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * Root exception hierarchy for all SporeKart custom exceptions.
 */
@Getter
public abstract class BaseException extends RuntimeException {

    private final ErrorCode errorCode;
    private final HttpStatus httpStatus;

    protected BaseException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.httpStatus = errorCode.getHttpStatus();
    }

    protected BaseException(ErrorCode errorCode, String customMessage) {
        super(customMessage);
        this.errorCode = errorCode;
        this.httpStatus = errorCode.getHttpStatus();
    }
}
