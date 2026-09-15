import { test, expect } from '@playwright/test';

test.describe('3.2 Field Validation, Immutable Identity & Rate Limiting', () => {

  const BASE_URL = 'http://localhost:8080/api/v1';

  test('Immutable Identity: Attempting post-creation update of firstName/lastName should not alter immutable database properties', async ({ request }) => {
    // Step 1: Register initial user identity
    const phone = '+919876500001';
    const sendOtp = await request.post(`${BASE_URL}/buyer/auth/otp/send`, {
      data: { target: phone, type: 'PHONE' }
    });
    const otpRes = await sendOtp.json();
    const codeMatch = otpRes.data.match(/Code \(dev\): (\d+)/);
    const code = codeMatch ? codeMatch[1] : '123456';

    const verifyInitial = await request.post(`${BASE_URL}/buyer/auth/otp/verify`, {
      data: {
        target: phone,
        otpCode: code,
        firstName: 'OriginalName',
        lastName: 'ImmutableUser'
      }
    });
    const initialUser = await verifyInitial.json();
    expect(initialUser.data.firstName).toBe('OriginalName');

    // Step 2: Second login attempting to overwrite identity with new name
    const sendOtp2 = await request.post(`${BASE_URL}/buyer/auth/otp/send`, {
      data: { target: phone, type: 'PHONE' }
    });
    const otpRes2 = await sendOtp2.json();
    const codeMatch2 = otpRes2.data.match(/Code \(dev\): (\d+)/);
    const code2 = codeMatch2 ? codeMatch2[1] : '123456';

    const verifySecond = await request.post(`${BASE_URL}/buyer/auth/otp/verify`, {
      data: {
        target: phone,
        otpCode: code2,
        firstName: 'HackedName',
        lastName: 'OverwrittenUser'
      }
    });
    const secondUser = await verifySecond.json();
    
    // Assert immutable identity rule: user.firstName MUST remain OriginalName
    expect(secondUser.data.firstName).toBe('OriginalName');
  });

  test('OTP Validation: Wrong code or expired code should be cleanly rejected', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/buyer/auth/otp/verify`, {
      data: {
        target: '+919999911111',
        otpCode: '999999',
        firstName: 'Invalid',
        lastName: 'Code'
      }
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.success).toBe(false);
  });

  test('Rate Limiting & Spam Protection: Spamming OTP send requests for same target', async ({ request }) => {
    const target = '+919876599999';
    const sendPromises = Array.from({ length: 15 }, () =>
      request.post(`${BASE_URL}/buyer/auth/otp/send`, {
        data: { target, type: 'PHONE' }
      })
    );
    const responses = await Promise.all(sendPromises);
    const statuses = responses.map(r => r.status());
    // Verify server did not crash (no 500) and stayed responsive
    expect(statuses.every(s => s === 200 || s === 429 || s === 400)).toBe(true);
  });

  test('Product Field Constraints: Admin product creation with negative price should be rejected', async ({ request }) => {
    // Seed/Login admin to get token
    const seedAdmin = await request.post(`${BASE_URL}/admin/auth/seed`, {
      data: {
        username: 'qaadmin',
        email: 'qaadmin@sporekart.com',
        password: 'AdminPassword123!',
        firstName: 'QA',
        lastName: 'Admin'
      }
    });
    const loginAdmin = await request.post(`${BASE_URL}/admin/auth/login`, {
      data: {
        usernameOrEmail: 'qaadmin',
        password: 'AdminPassword123!'
      }
    });
    const adminBody = await loginAdmin.json();
    const adminToken = adminBody.data.accessToken;

    const createProduct = await request.post(`${BASE_URL}/admin/catalog/products`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: {
        title: 'Invalid Negative Product',
        price: -500.0,
        stock: -10
      }
    });
    expect([400, 422]).toContain(createProduct.status());
  });

});
