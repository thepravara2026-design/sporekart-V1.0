import apiClient from './apiClient';

export const authService = {
  // Dispatches 6-digit OTP code to Phone SMS or Email
  async sendOtp(target, type = 'PHONE', role = 'ROLE_BUYER') {
    const endpoint = role === 'ROLE_TRAINEE' ? '/api/v1/trainee/auth/otp/send' : '/api/v1/buyer/auth/otp/send';
    const res = await apiClient.post(endpoint, { target, type });
    return res.data;
  },

  // Verifies OTP and receives JWT Access Token
  async verifyOtp(target, otpCode, firstName, lastName, role = 'ROLE_BUYER') {
    const endpoint = role === 'ROLE_TRAINEE' ? '/api/v1/trainee/auth/otp/verify' : '/api/v1/buyer/auth/otp/verify';
    const res = await apiClient.post(endpoint, {
      target,
      otpCode,
      firstName,
      lastName,
      role,
    });
    if (res.data && res.data.data && res.data.data.accessToken) {
      localStorage.setItem('sporekart_access_token', res.data.data.accessToken);
    }
    return res.data;
  },

  // Google OAuth 2.0 Token Exchange
  async googleAuth(googleIdToken, role = 'ROLE_BUYER') {
    const endpoint = role === 'ROLE_TRAINEE' ? '/api/v1/trainee/auth/google' : '/api/v1/buyer/auth/google';
    const res = await apiClient.post(endpoint, { googleIdToken, role });
    if (res.data && res.data.data && res.data.data.accessToken) {
      localStorage.setItem('sporekart_access_token', res.data.data.accessToken);
    }
    return res.data;
  },

  // Self-Service Account Deletion (Unmediated - No Admin Override)
  async selfDeleteAccount() {
    const res = await apiClient.delete('/auth/account');
    localStorage.removeItem('sporekart_access_token');
    return res.data;
  },

  logout() {
    localStorage.removeItem('sporekart_access_token');
  }
};
