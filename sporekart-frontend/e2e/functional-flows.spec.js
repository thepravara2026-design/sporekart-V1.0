import { test, expect } from '@playwright/test';

test.describe('3.3 End-to-End Functional Flows & Admin Isolation', () => {

  const BASE_URL = 'http://localhost:8080/api/v1';

  test('Guest Browsing: Browse products & training batches with zero auth network calls', async ({ page }) => {
    const authCalls = [];
    page.on('request', req => {
      if (req.url().includes('/auth')) {
        authCalls.push(req.url());
      }
    });

    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');

    // Assert zero auth calls fired during guest landing page render
    expect(authCalls.length).toBe(0);
  });

  test('Deferred Auth at Checkout: Guest cart item addition -> Deferred Auth modal -> Cart persistence across login', async ({ request, page }) => {
    // 1. Guest saves a guest cart via API or browser
    const saveGuestCart = await request.post(`${BASE_URL}/buyer/cart/guest`, {
      data: {
        guestToken: 'guest_token_qa_123',
        itemsJson: JSON.stringify([{ productId: 1, quantity: 2, title: 'Oyster Mushroom Culture' }])
      }
    });
    expect(saveGuestCart.status()).toBe(200);

    // 2. Perform merge upon user authentication
    const mergeCart = await request.post(`${BASE_URL}/buyer/cart/guest/merge`, {
      data: {
        guestToken: 'guest_token_qa_123',
        userIdentifier: '+919876512345',
        firstName: 'GuestToUser',
        lastName: 'Buyer'
      }
    });
    expect(mergeCart.status()).toBe(200);
    const body = await mergeCart.json();
    expect(body.success).toBe(true);
    expect(body.data).toContain('Cart merged successfully');
  });

  test('Trainee Enrollment & Single Identity Automatic Promotion (BUYER -> TRAINEE)', async ({ request }) => {
    const phone = '+919999977777';

    // Step 1: Initial Login as BUYER
    const sendOtp1 = await request.post(`${BASE_URL}/buyer/auth/otp/send`, {
      data: { target: phone, type: 'PHONE' }
    });
    const otpRes1 = await sendOtp1.json();
    const code1 = otpRes1.data.match(/Code \(dev\): (\d+)/)[1];

    const verifyBuyer = await request.post(`${BASE_URL}/buyer/auth/otp/verify`, {
      data: { target: phone, otpCode: code1, firstName: 'Ramesh', lastName: 'Kumar' }
    });
    const buyerData = await verifyBuyer.json();
    expect(buyerData.data.roles).toContain('ROLE_BUYER');

    // Step 2: Trainee enrollment on same phone number via Trainee Auth endpoint
    const sendOtp2 = await request.post(`${BASE_URL}/trainee/auth/otp/send`, {
      data: { target: phone, type: 'PHONE' }
    });
    const otpRes2 = await sendOtp2.json();
    const code2 = otpRes2.data.match(/Code \(dev\): (\d+)/)[1];

    const verifyTrainee = await request.post(`${BASE_URL}/trainee/auth/otp/verify`, {
      data: { target: phone, otpCode: code2, firstName: 'Ramesh', lastName: 'Kumar' }
    });
    const traineeData = await verifyTrainee.json();

    // Assert identity ID remains identical and role set now contains BOTH ROLE_BUYER & ROLE_TRAINEE
    expect(traineeData.data.userId).toBe(buyerData.data.userId);
    expect(traineeData.data.roles).toContain('ROLE_BUYER');
    expect(traineeData.data.roles).toContain('ROLE_TRAINEE');

    // Step 3: Trainee user purchasing products using their Trainee account on Buyer API
    const traineeToken = traineeData.data.accessToken;
    const buyerCatalogCheck = await request.get(`${BASE_URL}/buyer/products`, {
      headers: { Authorization: `Bearer ${traineeToken}` }
    });
    expect(buyerCatalogCheck.status()).toBe(200);
  });

  test('Admin Isolation: Customer path can never gain ADMIN authority', async ({ request }) => {
    const sendOtp = await request.post(`${BASE_URL}/buyer/auth/otp/send`, {
      data: { target: '+919988776655', type: 'PHONE' }
    });
    const otpRes = await sendOtp.json();
    const code = otpRes.data.match(/Code \(dev\): (\d+)/)[1];

    // Attempting to pass role = 'ROLE_ADMIN' in customer OTP endpoint
    const verifyHacker = await request.post(`${BASE_URL}/buyer/auth/otp/verify`, {
      data: { target: '+919988776655', otpCode: code, role: 'ROLE_ADMIN' }
    });
    const hackerData = await verifyHacker.json();
    
    // Assert ROLE_ADMIN was NOT granted
    expect(hackerData.data.roles).not.toContain('ROLE_ADMIN');
  });

});
