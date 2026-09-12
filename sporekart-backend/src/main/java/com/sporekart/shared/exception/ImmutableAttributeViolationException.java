package com.sporekart.shared.exception;

public class ImmutableAttributeViolationException extends BaseException {

    public ImmutableAttributeViolationException(String attributeName) {
        super(ErrorCode.IMMUTABLE_IDENTITY_VIOLATION, String.format("Mutation rejected: Identity attribute '%s' is immutable and locked.", attributeName));
    }
}
