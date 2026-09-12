package com.sporekart.shared.exception;

public class ExternalIntegrationException extends BaseException {

    public ExternalIntegrationException(String gatewayName, String message) {
        super(ErrorCode.PAYMENT_FAILED, String.format("Third-party gateway [%s] error: %s", gatewayName, message));
    }
}
