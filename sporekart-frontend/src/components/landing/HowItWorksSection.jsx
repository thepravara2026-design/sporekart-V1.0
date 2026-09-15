import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import { Search, CheckSquare, ShoppingCart, Sprout } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Explore',
      desc: 'Find mushrooms, spawn, kits and training.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Choose',
      desc: 'Select what fits your requirement.',
      icon: CheckSquare,
    },
    {
      num: '03',
      title: 'Order / Learn',
      desc: 'Buy products or register for training.',
      icon: ShoppingCart,
    },
    {
      num: '04',
      title: 'Grow',
      desc: 'Get support and put the knowledge into practice.',
      icon: Sprout,
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E1E5DA]">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          eyebrow="SIMPLE SYSTEM"
          title="How It Works"
          subtitle="Four straightforward steps from exploring products to harvesting your first yield."
        />

        {/* Desktop Horizontal / Mobile Vertical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="card-base p-6 bg-[#FCFCF8] border-[#E1E5DA] hover:border-[#1F4D35] flex flex-col justify-between text-left relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] font-extrabold text-[#1F4D35] bg-[#F6F2E8] px-3 py-1 rounded-full border border-[#1F4D35]/20">
                      STEP {s.num}
                    </span>
                    <div className="w-10 h-10 rounded-[10px] bg-[#F6F2E8] text-[#173B2A] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#1F4D35]" />
                    </div>
                  </div>

                  <h3 className="font-bold text-[18px] text-[#172019] mb-2">
                    {s.title}
                  </h3>

                  <p className="text-[14px] text-[#59645B] leading-[1.5]">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
