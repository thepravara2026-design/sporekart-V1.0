import React from 'react';
import { Sprout, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111713] text-[#C2CCC4] border-t border-[#344137] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand Bio */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#234D3C] flex items-center justify-center text-white">
              <Sprout className="w-6 h-6 text-[#C89B3C]" />
            </div>
            <span className="font-serif text-2xl font-bold text-[#F5F7F2]">
              Spore<span className="text-[#7A8F5A]">Kart</span>
            </span>
          </div>
          <p className="text-sm text-[#C2CCC4] leading-relaxed max-w-sm">
            India's premier certified mushroom cultivation, spawn supply, and biotech training platform. Operates under Shriyap Enterprise.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#7A8F5A]">
            <ShieldCheck className="w-4 h-4" /> ISO & FSSAI Compliant Sterile Lab Standards
          </div>
        </div>

        {/* Shop Category Links */}
        <div>
          <h4 className="font-semibold text-[#F5F7F2] text-sm uppercase tracking-wider mb-4">Shop Products</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-white transition">Liquid Spore Cultures</a></li>
            <li><a href="#" className="hover:text-white transition">Sterile Grain Spawn Bags</a></li>
            <li><a href="#" className="hover:text-white transition">Ready Mushroom Kits</a></li>
            <li><a href="#" className="hover:text-white transition">Substrates & Casing Soil</a></li>
            <li><a href="#" className="hover:text-white transition">Laminar Flow Lab Equipment</a></li>
          </ul>
        </div>

        {/* Training Links */}
        <div>
          <h4 className="font-semibold text-[#F5F7F2] text-sm uppercase tracking-wider mb-4">Cultivation Training</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-white transition">Beginner Workshops</a></li>
            <li><a href="#" className="hover:text-white transition">Advanced Tissue Culture</a></li>
            <li><a href="#" className="hover:text-white transition">Commercial Farm Setup</a></li>
            <li><a href="#" className="hover:text-white transition">Upcoming Batches</a></li>
            <li><a href="#" className="hover:text-white transition">Certificate Verification</a></li>
          </ul>
        </div>

        {/* Business Contact & Support */}
        <div>
          <h4 className="font-semibold text-[#F5F7F2] text-sm uppercase tracking-wider mb-4">Company & Support</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#7A8F5A] shrink-0 mt-0.5" />
              <span>Shriyap Enterprise, Industrial Estate, Bengaluru, KA</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#7A8F5A] shrink-0" />
              <span>+91 80 4567 8900</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#7A8F5A] shrink-0" />
              <span>support@sporekart.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-[#344137] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A847D] gap-4">
        <p>© {new Date().getFullYear()} SporeKart (Shriyap Enterprise). All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Shiprocket Logistics Policy</a>
          <a href="#" className="hover:text-white transition">Refund & Cancellation</a>
        </div>
      </div>
    </footer>
  );
}
