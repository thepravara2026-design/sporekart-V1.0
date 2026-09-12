import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import QuantitySelector from '../../../components/ui/QuantitySelector';
import Button from '../../../components/ui/Button';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 1999 || subtotal === 0 ? 0 : 99;
  const discount = subtotal > 3000 ? 300 : 0;
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal - discount + shippingFee + taxes;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-lg flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#DDE2DC] flex items-center justify-between bg-[#FAFAF7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#234D3C]" />
            <h2 className="font-bold text-lg text-[#17231D]">Shopping Cart ({cartItems.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-md flex items-center justify-center text-[#536057] hover:bg-[#ECEDE7] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F6F1E7] text-[#234D3C] mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#17231D]">Your cart is waiting for something good.</h3>
              <p className="text-sm text-[#536057] max-w-xs mx-auto">
                Explore liquid cultures, spawn bags, and cultivation kits to start your next harvest.
              </p>
              <Button variant="primary" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-3.5 border border-[#DDE2DC] rounded-lg bg-[#FAFAF7]">
                <img
                  src={item.imageUrl || 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=200&q=80'}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md border border-[#DDE2DC]"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-[#17231D] line-clamp-1">{item.title}</h4>
                      <span className="text-xs text-[#536057]">₹{item.price} / unit</span>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#7A847D] hover:text-[#C44747] transition p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(newQty) => onUpdateQuantity(item.id, newQty)}
                    />
                    <span className="font-bold text-sm text-[#17231D]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary & Sticky Checkout Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#DDE2DC] bg-[#FAFAF7] space-y-3">
            <div className="space-y-1.5 text-xs text-[#536057]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2E7D50] font-semibold">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery (Shiprocket)</span>
                <span>{shippingFee === 0 ? <strong className="text-[#2E7D50]">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5% GST)</span>
                <span>₹{taxes}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#17231D] pt-2 border-t border-[#DDE2DC]">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A8F5A] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Razorpay Verified Secure Checkout
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              icon={ArrowRight}
              onClick={onProceedToCheckout}
            >
              Proceed to Checkout • ₹{total.toLocaleString('en-IN')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
