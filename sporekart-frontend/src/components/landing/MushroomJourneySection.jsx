import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import { ShoppingCart, Sprout, BookOpen, Scissors, Utensils } from 'lucide-react';

export default function MushroomJourneySection() {
  const steps = [
    {
      num: '01',
      title: 'Choose',
      desc: 'Select fresh mushrooms, spawn, or ready-to-grow kits.',
      icon: ShoppingCart,
    },
    {
      num: '02',
      title: 'Grow',
      desc: 'Follow simple, temperature-controlled cultivation guidelines.',
      icon: Sprout,
    },
    {
      num: '03',
      title: 'Learn',
      desc: 'Access masterclasses, troubleshooting protocols, and training.',
      icon: BookOpen,
    },
    {
      num: '04',
      title: 'Harvest',
      desc: 'Pick fresh, chemical-free organic mushrooms at peak flush.',
      icon: Scissors,
    },
    {
      num: '05',
      title: 'Sell / Enjoy',
      desc: 'Enjoy gourmet dishes or scale into a commercial farming business.',
      icon: Utensils,
    },
  ];

  return (
    <section id="mushroom-journey" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E1E5DA]">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          eyebrow="CULTIVATION PATHWAY"
          title="Your Mushroom Journey"
          subtitle="From selecting your first culture to harvesting fresh gourmet mushrooms."
        />

        {/* 5-Step Connected Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="card-base p-6 bg-[#FCFCF8] border-[#E1E5DA] hover:border-[#1F4D35] flex flex-col justify-between text-center relative group"
              >
                <div>
                  {/* Step Number Badge */}
                  <span className="text-[12px] font-bold text-[#607D52] tracking-widest block mb-3 uppercase">
                    STEP {step.num}
                  </span>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-[14px] bg-[#F6F2E8] text-[#1F4D35] mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-[18px] text-[#172019] mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[14px] text-[#59645B] leading-[1.5]">
                    {step.desc}
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
