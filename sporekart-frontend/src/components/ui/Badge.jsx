import React from 'react';

export default function Badge({
  children,
  variant = 'brand', // brand | success | warning | danger | info | neutral
  className = '',
}) {
  const variants = {
    brand: "bg-[#F6F1E7] text-[#234D3C] border-[#234D3C]/20",
    success: "bg-[#E8F4EC] text-[#2E7D50] border-[#2E7D50]/20",
    warning: "bg-[#FFF4DD] text-[#B7791F] border-[#B7791F]/20",
    danger: "bg-[#FCEBEC] text-[#C44747] border-[#C44747]/20",
    info: "bg-[#EAF3F8] text-[#3C6E91] border-[#3C6E91]/20",
    neutral: "bg-[#F4F4EF] text-[#536057] border-[#DDE2DC]",
  };

  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
