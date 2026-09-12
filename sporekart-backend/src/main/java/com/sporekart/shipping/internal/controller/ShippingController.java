package com.sporekart.shipping.internal.controller;

import com.sporekart.shipping.internal.provider.ShipmentProvider;
import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shipping")
@RequiredArgsConstructor
@Tag(name = "Logistics & Shipping Engine", description = "Universal Logistics Adapter & Shiprocket Control Engine")
public class ShippingController {

    private final ShipmentProvider shipmentProvider;

    @PostMapping("/create-shipment")
    @Operation(summary = "Create Shipment Manifest via Shiprocket Adapter")
    public ResponseEntity<ApiResponse<ShipmentProvider.ShipmentOrderResponse>> createShipment(@RequestBody ShipmentProvider.ShipmentOrderRequest request, HttpServletRequest servletRequest) {
        ShipmentProvider.ShipmentOrderResponse response = shipmentProvider.createShipmentOrder(request);
        return ResponseEntity.ok(ApiResponse.success(response, servletRequest.getRequestURI()));
    }

    @GetMapping("/track/{awbCode}")
    @Operation(summary = "Fetch Real-Time Logistics Tracking Information")
    public ResponseEntity<ApiResponse<ShipmentProvider.TrackingDetails>> trackShipment(@PathVariable String awbCode, HttpServletRequest servletRequest) {
        ShipmentProvider.TrackingDetails tracking = shipmentProvider.trackShipment(awbCode);
        return ResponseEntity.ok(ApiResponse.success(tracking, servletRequest.getRequestURI()));
    }
}
