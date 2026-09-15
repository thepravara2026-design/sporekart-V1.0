import { test, expect } from '@playwright/test';

test.describe('3.5 Database Integrity & Transactional Correctness', () => {

  const BASE_URL = 'http://localhost:8080/api/v1';

  test('Flyway Schema & Database Health Verification', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/actuator/health`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.components.db.status).toBe('UP');
    expect(body.components.db.details.database).toBeDefined();
  });

  test('Unique Phone Number Constraint: Creating duplicate users with same phone number should auto-link/promote, not duplicate rows', async ({ request }) => {
    const phone = '+919777766666';

    // First Registration
    const sendOtp1 = await request.post(`${BASE_URL}/buyer/auth/otp/send`, {
      data: { target: phone, type: 'PHONE' }
    });
    const code1 = (await sendOtp1.json()).data.match(/Code \(dev\): (\d+)/)[1];
    const user1 = await (await request.post(`${BASE_URL}/buyer/auth/otp/verify`, {
      data: { target: phone, otpCode: code1, firstName: 'UniqueTest', lastName: 'User' }
    })).json();

    // Second Registration with exact same phone
    const sendOtp2 = await request.post(`${BASE_URL}/buyer/auth/otp/send`, {
      data: { target: phone, type: 'PHONE' }
    });
    const code2 = (await sendOtp2.json()).data.match(/Code \(dev\): (\d+)/)[1];
    const user2 = await (await request.post(`${BASE_URL}/buyer/auth/otp/verify`, {
      data: { target: phone, otpCode: code2, firstName: 'UniqueTest', lastName: 'User' }
    })).json();

    // Assert both return exact same user ID (no duplicate database rows created)
    expect(user1.data.userId).toBe(user2.data.userId);
  });

});
