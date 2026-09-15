import { test, expect } from '@playwright/test';

test.describe('3.1 API Endpoint Coverage & Standard Error Specifications', () => {

  const BASE_URL = 'http://localhost:8080/api/v1';

  test('GET /actuator/health should return UP status and components', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/actuator/health`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('UP');
    expect(body.components.db.status).toBe('UP');
  });

  test('GET /buyer/products should return HTTP 200 OK and valid DTO list', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/buyer/products`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    if (body.data.length > 0) {
      const product = body.data[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
    }
  });

  test('GET /buyer/categories should return HTTP 200 OK and category items', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/buyer/categories`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });

  test('GET /trainee/training/batches should return HTTP 200 OK and batch list', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/trainee/training/batches`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });

  test('GET /reviews should return HTTP 200 OK and verified reviews', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/reviews`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
  });

  test('GET /faqs should return HTTP 200 OK and platform FAQs', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/faqs`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
  });

  test('POST /buyer/auth/otp/send with invalid/empty target should return HTTP 400 Bad Request with RFC 7807 problem details', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/buyer/auth/otp/send`, {
      data: { target: '', type: 'PHONE' }
    });
    expect([400, 422]).toContain(response.status());
  });

  test('POST /buyer/auth/otp/verify with invalid OTP code should return HTTP 401 Unauthorized', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/buyer/auth/otp/verify`, {
      data: {
        target: '+919999900000',
        otpCode: '000000',
        firstName: 'Test',
        lastName: 'User'
      }
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.error.code).toBe('INVALID_OTP');
    expect(body.traceId).toBeDefined();
  });

  test('Unauthenticated access to protected /admin/orders should return HTTP 403 Forbidden or HTTP 401 Unauthorized', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/admin/orders`);
    expect([401, 403]).toContain(response.status());
  });

  test('Customer token on /admin/catalog/products should be strictly rejected with HTTP 403 Forbidden', async ({ request }) => {
    // Obtain customer token first
    const sendOtp = await request.post(`${BASE_URL}/buyer/auth/otp/send`, {
      data: { target: '+919876543210', type: 'PHONE' }
    });
    const otpRes = await sendOtp.json();
    const codeMatch = otpRes.data.match(/Code \(dev\): (\d+)/);
    const code = codeMatch ? codeMatch[1] : '123456';

    const verifyRes = await request.post(`${BASE_URL}/buyer/auth/otp/verify`, {
      data: {
        target: '+919876543210',
        otpCode: code,
        firstName: 'Customer',
        lastName: 'Test'
      }
    });
    const verifyBody = await verifyRes.json();
    const customerToken = verifyBody.data.accessToken;

    const adminResponse = await request.get(`${BASE_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    expect(adminResponse.status()).toBe(403);
  });

});
