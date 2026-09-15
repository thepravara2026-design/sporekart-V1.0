import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem('sporekart_cart')) || [],
  guestToken: localStorage.getItem('sporekart_guest_token') || null,
  isCartOpen: false,

  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  addToCart: (product) => {
    const prev = get().cartItems;
    const existing = prev.find((item) => item.id === product.id);
    let updated;
    if (existing) {
      updated = prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      updated = [...prev, { ...product, quantity: 1 }];
    }
    localStorage.setItem('sporekart_cart', JSON.stringify(updated));
    set({ cartItems: updated, isCartOpen: true });
  },

  updateQuantity: (id, quantity) => {
    const updated = get().cartItems.map((item) => item.id === id ? { ...item, quantity } : item);
    localStorage.setItem('sporekart_cart', JSON.stringify(updated));
    set({ cartItems: updated });
  },

  removeItem: (id) => {
    const updated = get().cartItems.filter((item) => item.id !== id);
    localStorage.setItem('sporekart_cart', JSON.stringify(updated));
    set({ cartItems: updated });
  },

  clearCart: () => {
    localStorage.removeItem('sporekart_cart');
    set({ cartItems: [] });
  },

  setGuestToken: (token) => {
    localStorage.setItem('sporekart_guest_token', token);
    set({ guestToken: token });
  },
}));
