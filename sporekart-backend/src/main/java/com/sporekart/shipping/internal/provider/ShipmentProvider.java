package com.sporekart.shipping.internal.provider;

public interface ShipmentProvider {

    record ShipmentOrderRequest(Long orderId, String recipientName, String addressLine, String city, String postalCode, Double weightKg) {}
    record ShipmentOrderResponse(String shiprocketOrderId, String shipmentId, String status) {}
    record AWBResponse(String awbCode, String courierName, String status) {}
    record TrackingDetails(String awbCode, String currentStatus, String location, String estimatedDelivery) {}

    ShipmentOrderResponse createShipmentOrder(ShipmentOrderRequest request);
    AWBResponse generateAWB(String shipmentId, String preferredCourier);
    TrackingDetails trackShipment(String awbCode);
}
