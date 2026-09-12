package com.sporekart.payment.internal.controller;

import com.sporekart.payment.internal.provider.PaymentProvider;
import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@Tag(name = "Payment Engine", description = "Universal Payment Adapter & Razorpay Gateway Controls")
public class PaymentController {

    private final PaymentProvider paymentProvider;

    @PostMapping("/initiate")
    @Operation(summary = "Initiate Payment Order via Universal Adapter (Razorpay)")
    public ResponseEntity<ApiResponse<PaymentProvider.PaymentOrderResponse>> initiatePayment(@RequestBody PaymentProvider.PaymentOrderRequest request, HttpServletRequest servletRequest) {
        PaymentProvider.PaymentOrderResponse response = paymentProvider.createGatewayOrder(request);
        return ResponseEntity.ok(ApiResponse.success(response, servletRequest.getRequestURI()));
    }

    @PostMapping("/verify")
    @Operation(summary = "Verify Razorpay Payment Signature (HMAC-SHA256)")
    public ResponseEntity<ApiResponse<Boolean>> verifyPayment(@RequestBody PaymentProvider.SignatureVerificationRequest request, HttpServletRequest servletRequest) {
        boolean isValid = paymentProvider.verifyPaymentSignature(request);
        return ResponseEntity.ok(ApiResponse.success(isValid, servletRequest.getRequestURI()));
    }
}
