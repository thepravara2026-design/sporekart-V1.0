import apiClient from './apiClient';

export const orderService = {
  // Initiate Payment Gateway Order (Razorpay)
  async initiatePayment(orderId, amount, currency = 'INR') {
    const res = await apiClient.post('/payments/initiate', {
      orderId,
      amount,
      currency,
      receipt: `receipt_${orderId}`,
    });
    return res.data;
  },

  // Verify Payment Signature (HMAC-SHA256)
  async verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
    const res = await apiClient.post('/payments/verify', {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });
    return res.data;
  },

  // Create Shipment Manifest (Shiprocket Adapter)
  async createShipment(orderId, recipientName, addressLine, city, postalCode, weightKg = 1.0) {
    const res = await apiClient.post('/shipping/create-shipment', {
      orderId,
      recipientName,
      addressLine,
      city,
      postalCode,
      weightKg,
    });
    return res.data;
  },

  // Fetch Real-time Tracking Info from Shiprocket
  async trackShipment(awbCode) {
    const res = await apiClient.get(`/shipping/track/${awbCode}`);
    return res.data;
  }
};
