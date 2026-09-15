import React from 'react';
import { ArrowRight, Sprout, MessageCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function HeroSection({ onShopClick, onTrainingClick }) {
  return (
    <section className="relative bg-gradient-to-br from-[#173B2A] via-[#2F6B45] to-[#607D52] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Mycelium Line Motifs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Copy & Actions (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#E6C98D] animate-pulse" />
            <span className="text-[12px] sm:text-[13px] font-bold tracking-wider uppercase text-[#E6C98D]">
              MUSHROOMS • SPAWN • TRAINING • SUPPORT
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[40px] sm:text-[52px] lg:text-[64px] font-bold leading-[1.02] tracking-tight text-white">
            Grow Better. <br />
            <span className="text-[#E6C98D]">Eat Better.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-[16px] sm:text-[18px] text-[#F6F2E8]/90 max-w-[620px] leading-[1.6] font-normal">
            Mushroom products, spawn and practical cultivation support from one trusted place.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="light"
              size="lg"
              onClick={onShopClick}
              icon={ArrowRight}
              className="text-[#173B2A] font-bold"
            >
              Shop Products
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={onTrainingClick}
              icon={Sprout}
              className="border-white text-white hover:bg-white/10"
            >
              Explore Training
            </Button>
          </div>

          {/* Expert Support Link */}
          <div className="pt-2">
            <a
              href="https://wa.me/918045678900?text=Hello%20SporeKart,%20I%20need%20mushroom%20cultivation%20support."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] text-[#E6C98D] hover:text-white font-semibold transition-colors duration-150"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Talk to a Mushroom Expert →</span>
            </a>
          </div>
        </div>

        {/* Right Hero Image Card (5 Cols) */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-lg border border-white/20 group">
            <img
              src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=80"
              alt="Real Oyster Mushroom Spawn Cultivation"
              className="w-full h-[320px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Photography Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#173B2A]/90 via-[#173B2A]/30 to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-[12px] font-bold text-[#E6C98D] uppercase tracking-wider block">
                  ISO HEPA Sterile Lab Guaranteed
                </span>
                <p className="text-[18px] font-bold">Lab-Tested Mycelium Cultures & Kits</p>
                <p className="text-[13px] text-[#F6F2E8]/80">Fresh harvest & sterile spawn shipped across India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
