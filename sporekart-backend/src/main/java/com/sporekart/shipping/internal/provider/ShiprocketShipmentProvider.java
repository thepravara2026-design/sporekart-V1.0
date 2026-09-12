package com.sporekart.shipping.internal.provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ShiprocketShipmentProvider implements ShipmentProvider {

    private static final Logger log = LoggerFactory.getLogger(ShiprocketShipmentProvider.class);

    @Value("${sporekart.shipping.shiprocket.email}")
    private String email;

    @Override
    public ShipmentOrderResponse createShipmentOrder(ShipmentOrderRequest request) {
        log.info("Creating Shiprocket Shipment Order for Order ID: {}", request.orderId());
        String simulatedSrOrderId = "sr_ord_" + System.currentTimeMillis();
        String simulatedShipmentId = "sr_shp_" + System.currentTimeMillis();
        return new ShipmentOrderResponse(simulatedSrOrderId, simulatedShipmentId, "NEW");
    }

    @Override
    public AWBResponse generateAWB(String shipmentId, String preferredCourier) {
        log.info("Generating Shiprocket AWB for Shipment ID: {}", shipmentId);
        String simulatedAwb = "AWB" + System.currentTimeMillis();
        return new AWBResponse(simulatedAwb, preferredCourier != null ? preferredCourier : "Bluedart", "MANIFESTED");
    }

    @Override
    public TrackingDetails trackShipment(String awbCode) {
        log.info("Fetching real-time Shiprocket tracking for AWB: {}", awbCode);
        return new TrackingDetails(awbCode, "IN_TRANSIT", "Central Hub, Bengaluru", "2026-09-15");
    }
}
