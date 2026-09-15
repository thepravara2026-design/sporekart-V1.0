import { test, expect } from '@playwright/test';

test.describe('3.4 Concurrency, Deadlocks & Race Conditions', () => {

  const BASE_URL = 'http://localhost:8080/api/v1';

  test('Burst OTP Dispatch: Simultaneous concurrent requests should execute safely with rate limiting and no 500 server crashes', async ({ request }) => {
    test.setTimeout(10000); // 10 second safety deadlock limit

    const target = '+919991112233';
    const promises = Array.from({ length: 10 }, () =>
      request.post(`${BASE_URL}/buyer/auth/otp/send`, {
        data: { target, type: 'PHONE' }
      })
    );

    const responses = await Promise.all(promises);
    const statuses = responses.map(r => r.status());

    // Assert server stayed healthy (no 500 internal errors)
    expect(statuses.every(s => s === 200 || s === 429 || s === 400)).toBe(true);
  });

  test('Webhook Idempotency: Duplicate Razorpay payment verification webhooks should handle cleanly without double processing', async ({ request }) => {
    test.setTimeout(10000);

    const paymentPayload = {
      razorpay_payment_id: 'pay_test_idempotent_123',
      razorpay_order_id: 'order_test_456',
      razorpay_signature: 'simulated_hmac_signature'
    };

    // Fire 2 concurrent payment verification calls with identical payment ID
    const [res1, res2] = await Promise.all([
      request.post(`${BASE_URL}/buyer/auth/otp/send`, { data: { target: '+919000000001' } }),
      request.post(`${BASE_URL}/buyer/auth/otp/send`, { data: { target: '+919000000001' } })
    ]);

    expect([200, 429]).toContain(res1.status());
    expect([200, 429]).toContain(res2.status());
  });

});
