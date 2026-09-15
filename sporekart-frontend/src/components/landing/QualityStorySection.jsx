import React from 'react';

export default function QualityStorySection() {
  return (
    <section className="bg-[#173B2A] text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#2F6B45]">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#173B2A] via-[#173B2A]/90 to-transparent z-10" />

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1600&q=80"
        alt="SporeKart Authentic Mushroom Cultivation"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
      />

      <div className="max-w-[1280px] mx-auto relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-6">
          <span className="text-[12px] sm:text-[13px] font-bold tracking-widest text-[#E6C98D] uppercase block">
            FROM CULTIVATION TO YOUR DOOR
          </span>

          <h2 className="font-serif text-[34px] sm:text-[48px] lg:text-[56px] font-bold leading-[1.08] text-white max-w-[780px]">
            Carefully selected products, practical knowledge and a commitment to better mushroom cultivation.
          </h2>

          <p className="text-[16px] sm:text-[18px] text-[#F6F2E8]/85 max-w-[640px] leading-[1.6]">
            Every batch of liquid culture, grain spawn, and cultivation substrate is produced under strict ISO H14 HEPA sterile conditions in Bengaluru to ensure maximum viability across India.
          </p>

          <div className="flex flex-wrap items-center gap-8 pt-4 text-[#E6C98D]">
            <div>
              <span className="font-serif text-[36px] font-bold block leading-none text-white">99.99%</span>
              <span className="text-[13px] text-[#F6F2E8]/80 font-medium">Sterile Filtration Standard</span>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block" />
            <div>
              <span className="font-serif text-[36px] font-bold block leading-none text-white">15 PSI</span>
              <span className="text-[13px] text-[#F6F2E8]/80 font-medium">120-Min Autoclaved Sterilization</span>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block" />
            <div>
              <span className="font-serif text-[36px] font-bold block leading-none text-white">Pan-India</span>
              <span className="text-[13px] text-[#F6F2E8]/80 font-medium">Shiprocket Express Express Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
