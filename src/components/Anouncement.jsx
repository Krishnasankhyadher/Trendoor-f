import React, { useState } from 'react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  // If the user closed the banner, render nothing
  if (!isVisible) return null;

  return (
    <div className="bg-neutral-950 text-neutral-300 border-b border-white/10 overflow-hidden py-2.5 relative z-50">
      
      {/* The Moving Text */}
      <div className="animate-marquee flex whitespace-nowrap items-center font-mono">
        
        {/* Block 1 */}
        <span className="mx-8 text-xs tracking-[0.2em] uppercase text-neutral-500">
          [ Limited Offer ]
        </span>
        <span className="text-white font-bold text-sm">
          ANY 3 ITEMS FOR ₹599 + FREE DELIVERY ON ORDERS ABOVE ₹500
        </span>
        <span className="mx-3 text-neutral-600">|</span>
        <span className="text-white font-bold text-sm">
          CODE: WELCOME
        </span>

        {/* Block 2 */}
        <span className="mx-8 text-xs tracking-[0.2em] uppercase text-neutral-500">
          [ Limited Offer ]
        </span>
        <span className="text-white font-bold text-sm">
          ANY 3 ITEMS FOR ₹599 + FREE DELIVERY ON ORDERS ABOVE ₹500
        </span>
        <span className="mx-3 text-neutral-600">|</span>
        <span className="text-white font-bold text-sm">
          CODE: WELCOME
        </span>

        {/* Block 3 */}
        <span className="mx-8 text-xs tracking-[0.2em] uppercase text-neutral-500">
          [ Limited Offer ]
        </span>
        <span className="text-white font-bold text-sm">
          ANY 3 ITEMS FOR ₹599 + FREE DELIVERY ON ORDERS ABOVE ₹500
        </span>
        <span className="mx-3 text-neutral-600">|</span>
        <span className="text-white font-bold text-sm">
          CODE: WELCOME
        </span>

        {/* Block 4 */}
        <span className="mx-8 text-xs tracking-[0.2em] uppercase text-neutral-500">
          [ Limited Offer ]
        </span>
        <span className="text-white font-bold text-sm">
          ANY 3 ITEMS FOR ₹599 + FREE DELIVERY ON ORDERS ABOVE ₹500
        </span>
        <span className="mx-3 text-neutral-600">|</span>
        <span className="text-white font-bold text-sm">
          CODE: WELCOME
        </span>

      </div>

      {/* The Close Button */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-0 top-0 h-full px-5 bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-900 border-l border-white/10 z-20 transition-colors flex items-center justify-center"
        aria-label="Close Announcement"
      >
        ✕
      </button>

    </div>
  );
}