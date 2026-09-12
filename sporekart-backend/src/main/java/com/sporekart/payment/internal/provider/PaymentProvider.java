package com.sporekart.payment.internal.provider;

public interface PaymentProvider {

    record PaymentOrderRequest(Long orderId, Double amount, String currency, String receipt) {}
    record PaymentOrderResponse(String razorpayOrderId, Double amount, String currency, String status) {}
    record SignatureVerificationRequest(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {}

    PaymentOrderResponse createGatewayOrder(PaymentOrderRequest request);
    boolean verifyPaymentSignature(SignatureVerificationRequest request);
}
