package com.sporekart.catalog.internal.controller;

import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faqs")
@Tag(name = "FAQ Engine", description = "Frequently Asked Questions REST API")
public class FaqController {

    public record FaqDto(Long id, String category, String question, String answer, Integer displayOrder) {}

    @GetMapping
    @Operation(summary = "Get Platform FAQs for Landing Page Accordion")
    public ResponseEntity<ApiResponse<List<FaqDto>>> getFaqs(@RequestParam(required = false) String category, HttpServletRequest request) {
        List<FaqDto> faqs = List.of(
                new FaqDto(1L, "PRODUCTS", "Are SporeKart liquid cultures and spawn bags sterile certified?", "Yes. All liquid culture syringes and grain spawn bags are processed in ISO-certified H14 Laminar Flow Hood environments and autoclaved at 15 PSI for 120 minutes.", 1),
                new FaqDto(2L, "SHIPPING", "How does SporeKart ship sterile biotech products across India?", "We partner with Shiprocket Express to deliver temperature-controlled, shock-resistant packaged cultures directly to your address within 2-4 business days.", 2),
                new FaqDto(3L, "PAYMENTS", "What payment methods are supported for products and training?", "We accept all major UPI apps (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and Razorpay PayLater.", 3),
                new FaqDto(4L, "TRAINING", "How do I verify and download my Training Completion Certificate?", "Upon batch completion, your digital PDF certificate is issued under your Trainee Profile and can be downloaded anytime directly from your dashboard.", 4)
        );
        return ResponseEntity.ok(ApiResponse.success(faqs, request.getRequestURI()));
    }
}
