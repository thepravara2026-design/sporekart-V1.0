import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function WhySporeKartSection({ onAboutClick }) {
  const benefits = [
    { title: 'Quality products', desc: 'ISO H14 certified liquid culture syringes & grain spawn bags.' },
    { title: 'Practical guidance', desc: 'Step-by-step cultivation protocols & troubleshooting support.' },
    { title: 'Training', desc: 'Practical lab & field workshops for beginners and commercial growers.' },
    { title: 'Ongoing support', desc: 'Dedicated mycology advisory desk assisting from inoculation to harvest.' },
  ];

  return (
    <section id="why-sporekart" className="bg-[#F3F4ED] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E1E5DA]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Image (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-[24px] overflow-hidden border border-[#E1E5DA] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80"
              alt="Sterile Mycology Lab Cultivation at SporeKart"
              className="w-full h-[360px] sm:h-[440px] object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-[14px] border border-[#E1E5DA]">
              <span className="text-[12px] font-bold text-[#1F4D35] uppercase tracking-wider block">
                Authentic Mycology Lab & Farm
              </span>
              <p className="text-[14px] font-semibold text-[#172019] mt-0.5">
                Connecting sterile products with practical cultivation expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column Content (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[13px] font-bold tracking-widest text-[#607D52] uppercase block">
            WHY SPOREKART
          </span>

          <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#172019] leading-tight">
            More than a mushroom store.
          </h2>

          <p className="text-[16px] sm:text-[18px] text-[#59645B] leading-[1.6]">
            We connect quality products with practical cultivation knowledge and support.
          </p>

          {/* 4 Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-[14px] bg-white border border-[#E1E5DA]">
                <CheckCircle2 className="w-5 h-5 text-[#1F4D35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[15px] font-bold text-[#172019]">{b.title}</h4>
                  <p className="text-[13px] text-[#59645B] mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Link */}
          <div className="pt-3">
            <Button
              variant="secondary"
              size="md"
              icon={ArrowRight}
              onClick={onAboutClick}
            >
              Learn About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
