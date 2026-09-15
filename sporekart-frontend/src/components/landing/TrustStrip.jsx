import React from 'react';
import { ShieldCheck, Users, Truck, GraduationCap } from 'lucide-react';

export default function TrustStrip() {
  const trustPoints = [
    {
      icon: ShieldCheck,
      title: 'Quality Mushroom Products',
      subtitle: 'ISO H14 sterile lab certified',
    },
    {
      icon: Users,
      title: 'Farmer-Friendly Support',
      subtitle: 'Dedicated mycology consultation',
    },
    {
      icon: Truck,
      title: 'Pan-India Delivery',
      subtitle: 'Temperature-controlled shipping',
    },
    {
      icon: GraduationCap,
      title: 'Training & Guidance',
      subtitle: 'Practical workshops & PDF certificates',
    },
  ];

  return (
    <section className="bg-white border-b border-[#E1E5DA] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {trustPoints.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-[14px] bg-[#FCFCF8] border border-[#E1E5DA]/60">
              <div className="w-10 h-10 rounded-[10px] bg-[#F6F2E8] text-[#173B2A] flex items-center justify-center shrink-0 border border-[#173B2A]/10">
                <Icon className="w-5 h-5 text-[#1F4D35]" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#172019] leading-tight">
                  ✓ {item.title}
                </h4>
                <span className="text-[12px] text-[#59645B] block mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
