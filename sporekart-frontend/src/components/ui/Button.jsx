import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary', // primary | secondary | ghost | destructive
  size = 'md',        // sm | md | lg
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles = "font-semibold rounded-md transition-all duration-160 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer";
  
  const variants = {
    primary: "bg-[#234D3C] hover:bg-[#1B3D30] active:bg-[#153127] text-white focus:ring-[#234D3C]/40 shadow-xs hover:shadow-sm",
    secondary: "bg-transparent border border-[#234D3C] text-[#234D3C] hover:bg-[#234D3C]/5 active:bg-[#234D3C]/10 focus:ring-[#234D3C]/20",
    ghost: "bg-transparent text-[#536057] hover:text-[#17231D] hover:bg-[#F4F4EF] active:bg-[#ECEDE7] focus:ring-slate-300",
    destructive: "bg-[#C44747] hover:bg-[#A83B3B] active:bg-[#8E3232] text-white focus:ring-[#C44747]/40 shadow-xs",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs min-h-[36px]",
    md: "px-5 py-2.5 text-sm min-h-[44px]",
    lg: "px-6 py-3.5 text-base min-h-[48px]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
