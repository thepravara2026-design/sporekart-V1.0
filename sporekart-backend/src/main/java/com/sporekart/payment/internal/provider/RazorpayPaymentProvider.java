package com.sporekart.payment.internal.provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Component
public class RazorpayPaymentProvider implements PaymentProvider {

    private static final Logger log = LoggerFactory.getLogger(RazorpayPaymentProvider.class);

    @Value("${sporekart.payment.razorpay.key-id}")
    private String keyId;

    @Value("${sporekart.payment.razorpay.key-secret}")
    private String keySecret;

    @Override
    public PaymentOrderResponse createGatewayOrder(PaymentOrderRequest request) {
        log.info("Creating Razorpay Order for Order ID: {} with Amount: {}", request.orderId(), request.amount());
        String simulatedRazorpayOrderId = "order_rzp_" + System.currentTimeMillis();
        return new PaymentOrderResponse(simulatedRazorpayOrderId, request.amount(), "INR", "CREATED");
    }

    @Override
    public boolean verifyPaymentSignature(SignatureVerificationRequest request) {
        try {
            String payload = request.razorpayOrderId() + "|" + request.razorpayPaymentId();
            Mac sha256HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(keySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256HMAC.init(secretKey);
            byte[] hash = sha256HMAC.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString().equalsIgnoreCase(request.razorpaySignature());
        } catch (Exception e) {
            log.error("Failed to verify Razorpay signature", e);
            return false;
        }
    }
}
