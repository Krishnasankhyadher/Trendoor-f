import React, { useState } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden w-full aspect-[4/5] bg-gray-200">
      
      {/* 1. THE SHIMMER LOADER 
          - Only visible when !isLoaded
          - Uses a gradient that moves from left to right
      */}
      {!isLoaded && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
        </div>
      )}

      {/* 2. THE IMAGE REVEAL 
          - Starts slightly zoomed in (scale-110) and blurred (blur-md)
          - Transitions to clear and normal size on load
      */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`
            w-full h-full object-cover 
            transition-all duration-700 ease-in-out
            ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-lg'} 
            ${className}
        `}
      />

      {/* Tailwind Config Note: 
         If the 'animate-[shimmer...]' class doesn't work immediately, 
         add the <style> block below or update your tailwind.config.js 
      */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default LazyImage;