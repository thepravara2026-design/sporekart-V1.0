import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary', // primary | secondary | light | text | destructive | ghost
  size = 'md',        // sm (36px) | md (44px) | lg (52px)
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles = "font-semibold rounded-[10px] transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer select-none active:translate-y-0 min-h-[44px]";

  const variants = {
    primary: "bg-[#1F4D35] hover:bg-[#173B2A] text-white focus:ring-[#1F4D35]/30 shadow-xs hover:shadow-sm hover:-translate-y-0.5",
    secondary: "bg-transparent border border-[#1F4D35] text-[#1F4D35] hover:bg-[#1F4D35]/10 focus:ring-[#1F4D35]/20 hover:-translate-y-0.5",
    light: "bg-[#F6F2E8] text-[#173B2A] hover:bg-[#EBDCC5] focus:ring-[#173B2A]/20 hover:-translate-y-0.5",
    text: "bg-transparent text-[#1F4D35] hover:text-[#173B2A] font-semibold text-sm transition-colors duration-150 p-0 min-h-0 focus:ring-0",
    ghost: "bg-transparent text-[#59645B] hover:text-[#172019] hover:bg-[#F3F4ED] active:bg-[#E1E5DA] focus:ring-slate-300 min-h-[36px]",
    destructive: "bg-[#C44747] hover:bg-[#A83B3B] text-white focus:ring-[#C44747]/40 shadow-xs hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs h-[36px] min-h-[36px]",
    md: "px-5 py-2.5 text-sm h-[44px] min-h-[44px]",
    lg: "px-6 py-3 text-base h-[52px] min-h-[52px]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${variant !== 'text' ? sizes[size] : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
