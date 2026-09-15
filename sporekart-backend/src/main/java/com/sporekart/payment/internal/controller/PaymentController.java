package com.sporekart.payment.internal.controller;

import com.sporekart.payment.OrderPaidEvent;
import com.sporekart.payment.internal.provider.PaymentProvider;
import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Tag(name = "Payment Engine", description = "Universal Payment Adapter & Razorpay Gateway Controls")
public class PaymentController {

    private final PaymentProvider paymentProvider;
    private final ApplicationEventPublisher eventPublisher;
    private static final Set<String> processedPayments = ConcurrentHashMap.newKeySet();

    @PostMapping("/initiate")
    @Operation(summary = "Initiate Payment Order via Universal Adapter (Razorpay)")
    public ResponseEntity<ApiResponse<PaymentProvider.PaymentOrderResponse>> initiatePayment(@RequestBody PaymentProvider.PaymentOrderRequest request, HttpServletRequest servletRequest) {
        PaymentProvider.PaymentOrderResponse response = paymentProvider.createGatewayOrder(request);
        return ResponseEntity.ok(ApiResponse.success(response, servletRequest.getRequestURI()));
    }

    @PostMapping("/verify")
    @Operation(summary = "Verify Razorpay Payment Signature (HMAC-SHA256) Idempotently")
    public ResponseEntity<ApiResponse<Boolean>> verifyPayment(@RequestBody PaymentProvider.SignatureVerificationRequest request, HttpServletRequest servletRequest) {
        String paymentId = request.razorpayPaymentId();

        // Idempotency check: If already processed, return true without double-effect
        if (paymentId != null && processedPayments.contains(paymentId)) {
            return ResponseEntity.ok(ApiResponse.success(true, servletRequest.getRequestURI()));
        }

        boolean isValid = paymentProvider.verifyPaymentSignature(request);
        if (isValid) {
            if (paymentId != null) {
                processedPayments.add(paymentId);
            }
            // Publish OrderPaidEvent for async consumption by Shipping module
            eventPublisher.publishEvent(new OrderPaidEvent(1001L, 1001L, 899.00, paymentId, "Address Details"));
        }

        return ResponseEntity.ok(ApiResponse.success(isValid, servletRequest.getRequestURI()));
    }
}
