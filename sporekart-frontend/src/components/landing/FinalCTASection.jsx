import React from 'react';
import { ArrowRight, Sprout } from 'lucide-react';
import Button from '../ui/Button';

export default function FinalCTASection({ onShopClick, onTrainingClick }) {
  return (
    <section className="bg-[#173B2A] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b border-[#2F6B45]">
      {/* Background Motifs */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-[760px] mx-auto relative z-10 space-y-6">
        <span className="text-[12px] sm:text-[13px] font-bold tracking-widest text-[#E6C98D] uppercase block">
          START TODAY
        </span>

        <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.08] text-white">
          Ready to start your mushroom journey?
        </h2>

        <p className="text-[16px] sm:text-[18px] text-[#F6F2E8]/85 leading-[1.6]">
          Whether you're buying mushrooms, starting cultivation or learning the basics, SporeKart is here to help.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
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
      </div>
    </section>
  );
}
