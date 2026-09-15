import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('sporekart_user')) || null,
  accessToken: localStorage.getItem('sporekart_token') || null,
  roles: JSON.parse(localStorage.getItem('sporekart_roles')) || [],

  setAuth: (userData) => {
    const user = {
      id: userData.userId,
      firstName: userData.firstName || 'User',
      lastName: userData.lastName || '',
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    };
    const roles = Array.from(userData.roles || ['ROLE_BUYER']);
    const token = userData.accessToken;

    localStorage.setItem('sporekart_user', JSON.stringify(user));
    localStorage.setItem('sporekart_roles', JSON.stringify(roles));
    if (token) localStorage.setItem('sporekart_token', token);

    set({ user, roles, accessToken: token });
  },

  logout: () => {
    localStorage.removeItem('sporekart_user');
    localStorage.removeItem('sporekart_roles');
    localStorage.removeItem('sporekart_token');
    set({ user: null, roles: [], accessToken: null });
  },
}));
