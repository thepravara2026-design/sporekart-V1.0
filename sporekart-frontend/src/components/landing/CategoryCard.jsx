import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category, onSelect }) {
  return (
    <div
      onClick={() => onSelect(category.name)}
      className="card-base group cursor-pointer bg-white border-[#E1E5DA] hover:border-[#1F4D35] flex flex-col h-full"
    >
      {/* Image Container (55-65% card height) */}
      <div className="relative h-[200px] sm:h-[220px] overflow-hidden bg-[#F3F4ED]">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#172019] group-hover:text-[#1F4D35] transition-colors">
            {category.name}
          </h3>
          <p className="text-[14px] text-[#59645B] mt-1.5 leading-[1.5]">
            {category.description}
          </p>
        </div>

        {/* Action Link */}
        <div className="mt-4 pt-3 border-t border-[#E1E5DA]/60 flex items-center gap-1.5 text-[14px] font-bold text-[#1F4D35] group-hover:text-[#173B2A] transition-colors">
          <span>Explore</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
