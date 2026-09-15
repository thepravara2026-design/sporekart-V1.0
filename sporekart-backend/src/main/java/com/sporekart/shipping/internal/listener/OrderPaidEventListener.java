package com.sporekart.shipping.internal.listener;

import com.sporekart.payment.OrderPaidEvent;
import com.sporekart.shipping.internal.provider.ShipmentProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Component;

@Component
public class OrderPaidEventListener {

    private static final Logger log = LoggerFactory.getLogger(OrderPaidEventListener.class);
    private final ShipmentProvider shipmentProvider;

    public OrderPaidEventListener(ShipmentProvider shipmentProvider) {
        this.shipmentProvider = shipmentProvider;
    }

    @ApplicationModuleListener
    public void onOrderPaid(OrderPaidEvent event) {
        log.info("Shipping Async Listener: Received OrderPaidEvent for orderId={}, amount={}", event.orderId(), event.totalAmount());
        ShipmentProvider.ShipmentOrderRequest request = new ShipmentProvider.ShipmentOrderRequest(
                event.orderId(),
                "Customer #" + event.userId(),
                "MG Road, Indiranagar",
                "Bengaluru",
                "560001",
                1.5
        );
        shipmentProvider.createShipmentOrder(request);
    }
}
