package com.sporekart.shared.exception;

public class ResourceNotFoundException extends BaseException {

    public ResourceNotFoundException(String resourceName, Object id) {
        super(ErrorCode.USER_NOT_FOUND, String.format("%s with identifier '%s' was not found.", resourceName, id));
    }
}
