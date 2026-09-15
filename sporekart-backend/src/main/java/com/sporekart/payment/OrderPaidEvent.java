package com.sporekart.payment;

public record OrderPaidEvent(
        Long orderId,
        Long userId,
        Double totalAmount,
        String razorpayPaymentId,
        String shippingAddressJson
) {}
