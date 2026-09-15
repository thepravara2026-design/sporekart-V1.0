import React from 'react';

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  action,
  className = '',
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center max-w-[680px] mx-auto' : 'max-w-[680px]'} ${className}`}>
      {eyebrow && (
        <span className="text-[12px] sm:text-[13px] font-bold tracking-widest text-[#607D52] uppercase block mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#172019] leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[16px] sm:text-[18px] text-[#59645B] mt-3 leading-[1.6]">
          {subtitle}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
