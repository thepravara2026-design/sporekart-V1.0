import React from 'react';
import { Sprout, ShieldCheck, Microscope, Award, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#F6F1E7]/50 border-t border-b border-[#DDE2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider text-[#7A8F5A] uppercase block">ABOUT SPOREKART</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231D] mt-2">
            Pioneering Sterile Mushroom Cultivation & Biotech Education
          </h2>
          <p className="text-sm sm:text-base text-[#536057] mt-3 leading-relaxed">
            SporeKart (operating under Shriyap Enterprise) is India's dedicated biotech platform for mushroom cultivation supplies, sterile culture syringes, autoclaved grain spawn, and certified training workshops.
          </p>
        </div>

        {/* 4 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card-base p-6 bg-white border-[#DDE2DC] hover:border-[#234D3C]/40 transition text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F4EC] text-[#234D3C] mx-auto flex items-center justify-center mb-4">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#17231D] mb-2">H14 HEPA Sterile Lab</h3>
            <p className="text-xs text-[#536057] leading-relaxed">
              All liquid cultures and spawn bags are processed in ISO-certified 99.99% sterile laminar flow hood environments.
            </p>
          </div>

          <div className="card-base p-6 bg-white border-[#DDE2DC] hover:border-[#234D3C]/40 transition text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F4EC] text-[#234D3C] mx-auto flex items-center justify-center mb-4">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#17231D] mb-2">High Colonization Yields</h3>
            <p className="text-xs text-[#536057] leading-relaxed">
              Genetically isolated high-performing strains for Oyster, Shiitake, Button, and Reishi mushroom farming.
            </p>
          </div>

          <div className="card-base p-6 bg-white border-[#DDE2DC] hover:border-[#234D3C]/40 transition text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F4EC] text-[#234D3C] mx-auto flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#17231D] mb-2">Certified Training</h3>
            <p className="text-xs text-[#536057] leading-relaxed">
              Practical workshops led by expert mycologists with downloadable PDF completion certificates.
            </p>
          </div>

          <div className="card-base p-6 bg-white border-[#DDE2DC] hover:border-[#234D3C]/40 transition text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F4EC] text-[#234D3C] mx-auto flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#17231D] mb-2">Grower Support</h3>
            <p className="text-xs text-[#536057] leading-relaxed">
              Dedicated grower advisory support desk assisting from inoculation to harvest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
