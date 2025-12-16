import React, { useState } from 'react';

const LazyImage = ({ src, alt, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder / Skeleton Background */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
      )}
      
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`transition-all duration-700 ease-in-out w-full h-full object-cover
          ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'} 
          ${className}`}
      />
    </div>
  );
};

export default LazyImage;