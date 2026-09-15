import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#173B2A] text-white text-[12px] sm:text-[13px] h-[36px] px-4 flex items-center justify-between font-medium border-b border-[#2F6B45]/40 select-none">
      <div className="mx-auto flex items-center gap-2 text-center">
        <span>🍄 Fresh mushrooms & spawn delivered across India</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-[#B8C9A8] hover:text-white transition p-1"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
