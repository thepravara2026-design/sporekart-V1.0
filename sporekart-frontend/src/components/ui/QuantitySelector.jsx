import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  value = 1,
  min = 1,
  max = 99,
  onChange,
  className = '',
}) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={`inline-flex items-center border border-[#DDE2DC] bg-[#F4F4EF] rounded-md overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="w-11 h-11 flex items-center justify-center text-[#536057] hover:text-[#17231D] hover:bg-[#ECEDE7] disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <Minus className="w-4 h-4" />
      </button>

      <span className="w-12 text-center font-bold text-sm text-[#17231D]">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="w-11 h-11 flex items-center justify-center text-[#536057] hover:text-[#17231D] hover:bg-[#ECEDE7] disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
