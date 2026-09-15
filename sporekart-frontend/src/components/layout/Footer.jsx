import React from 'react';
import { Sprout, Phone, Mail, MapPin, MessageCircle, ShieldCheck, CreditCard } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#173B2A] text-white pt-16 pb-12 border-t border-[#2F6B45]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info Column (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center text-white border border-white/20">
                <Sprout className="w-5 h-5 text-[#E6C98D]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Spore<span className="text-[#E6C98D]">Kart</span>
              </span>
            </div>

            <p className="text-[14px] text-[#F6F2E8]/80 max-w-[360px] leading-relaxed">
              Mushroom products, certified liquid cultures, autoclaved grain spawn, and practical cultivation training for growers across India.
            </p>

            <div className="pt-2 text-[13px] text-[#F6F2E8]/70 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E6C98D] shrink-0" />
                <span>Shriyap Enterprise, Industrial Estate, Bengaluru, KA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E6C98D] shrink-0" />
                <span>+91 80 4567 8900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E6C98D] shrink-0" />
                <span>support@sporekart.com</span>
              </div>
            </div>

            {/* WhatsApp Support CTA */}
            <div className="pt-2">
              <a
                href="https://wa.me/918045678900?text=Hello%20SporeKart,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-bold text-[#173B2A] bg-[#E6C98D] hover:bg-[#C79A4A] px-4 py-2 rounded-[10px] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Grower Advisory</span>
              </a>
            </div>
          </div>

          {/* SHOP Column */}
          <div>
            <h4 className="text-[13px] font-bold tracking-widest text-[#E6C98D] uppercase mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-[14px] text-[#F6F2E8]/80">
              <li>
                <button onClick={() => handleScroll('product-categories')} className="hover:text-white transition">
                  Fresh Mushrooms
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('product-categories')} className="hover:text-white transition">
                  Dry Mushrooms
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('product-categories')} className="hover:text-white transition">
                  Spawn Seeds
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('product-categories')} className="hover:text-white transition">
                  Growing Kits
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('featured-products')} className="hover:text-white transition">
                  Lab Equipment
                </button>
              </li>
            </ul>
          </div>

          {/* LEARN Column */}
          <div>
            <h4 className="text-[13px] font-bold tracking-widest text-[#E6C98D] uppercase mb-4">
              LEARN
            </h4>
            <ul className="space-y-2.5 text-[14px] text-[#F6F2E8]/80">
              <li>
                <button onClick={() => handleScroll('training-section')} className="hover:text-white transition">
                  Training Workshops
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('educational-content')} className="hover:text-white transition">
                  Cultivation Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('faq')} className="hover:text-white transition">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('mushroom-journey')} className="hover:text-white transition">
                  Mushroom Journey
                </button>
              </li>
            </ul>
          </div>

          {/* COMPANY & LEGAL Column */}
          <div>
            <h4 className="text-[13px] font-bold tracking-widest text-[#E6C98D] uppercase mb-4">
              COMPANY & LEGAL
            </h4>
            <ul className="space-y-2.5 text-[14px] text-[#F6F2E8]/80">
              <li>
                <button onClick={() => handleScroll('why-sporekart')} className="hover:text-white transition">
                  About SporeKart
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('contact')} className="hover:text-white transition">
                  Contact Us
                </button>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: SporeKart respects user data privacy under DPDP Act 2023."); }} className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: Certified sterile biotech product distribution."); }} className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#shipping" onClick={(e) => { e.preventDefault(); alert("Shipping Policy: Temperature-controlled express delivery via Shiprocket."); }} className="hover:text-white transition">
                  Shipping & Refunds
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip: Trust Badges & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#F6F2E8]/60">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/80">
              <ShieldCheck className="w-4 h-4 text-[#E6C98D]" /> Razorpay Secured UPI & Cards
            </span>
            <span className="flex items-center gap-1.5 text-white/80">
              <CreditCard className="w-4 h-4 text-[#E6C98D]" /> Shiprocket Express Logistics
            </span>
          </div>

          <p>© {new Date().getFullYear()} SporeKart (Shriyap Enterprise). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
