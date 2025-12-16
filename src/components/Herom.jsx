import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      title: "LATEST",
      subtitle: "Arrivals",
      description: "Discover our carefully curated collection",
      badge: "NEW 2025",
      image: "img_1.png"
    },
    {
      title: "TIMELESS",
      subtitle: "Elegance",
      description: "Sophisticated pieces for the modern wardrobe",
      badge: "BESTSELLERS",
      image: "img_2.png"
    },
    {
      title: "EXCLUSIVE",
      subtitle: "Collection",
      description: "Limited edition designs crafted with care",
      badge: "LIMITED",
      image: "img_3.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleSlideChange = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className='relative flex flex-col sm:flex-row border border-gray-200 overflow-hidden bg-white h-[600px] sm:h-[500px] lg:h-[600px]'>
      
      {/* Left Content Section */}
      {/* ADDED: h-1/2 sm:h-full (Splits height 50/50 on mobile) */}
      <div className='w-full sm:w-1/2 h-1/2 sm:h-full flex items-center justify-center py-12 sm:py-0 px-8 sm:px-12 relative bg-white z-10'>
        
        {/* Subtle background decoration */}
        <div className='absolute top-0 left-0 w-24 h-24 border-t border-l border-gray-100'></div>
        <div className='absolute bottom-0 right-0 w-24 h-24 border-b border-r border-gray-100'></div>
        
        <div className={`text-[#414141] relative z-10 max-w-md transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          
          {/* OUR BESTSELLERS with line */}
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-12 h-[1px] bg-gradient-to-r from-transparent to-[#414141]'></div>
            <p className='font-light text-xs tracking-[0.3em] uppercase'>Our Bestsellers</p>
          </div>
          
          {/* Main Heading */}
          <h1 className='text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4 font-light tracking-wide'>
            {slides[currentSlide].title}
            <br />
            <span className='font-serif italic text-5xl sm:text-6xl lg:text-7xl'>
              {slides[currentSlide].subtitle}
            </span>
          </h1>
          
          {/* Description text */}
          <p className='text-gray-500 text-sm md:text-base mb-10 font-light leading-relaxed hidden sm:block'>
             {/* Note: I added 'hidden sm:block' here optionally if text is too long for mobile split */}
            {slides[currentSlide].description}
          </p>
          
          {/* SHOP NOW with line */}
          <a href="/collection" className='group/link inline-flex items-center gap-3 hover:gap-5 transition-all duration-300'>
            <span className='font-medium text-sm tracking-[0.2em] uppercase'>Shop Now</span>
            <div className='flex items-center gap-2'>
              <div className='w-12 h-[1px] bg-[#414141] group-hover/link:w-16 transition-all duration-300'></div>
              <span className='text-lg'>→</span>
            </div>
          </a>

          {/* Slide Indicators */}
          <div className='flex gap-3 mt-12'>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`h-[2px] transition-all duration-300 ${
                  currentSlide === index ? 'w-12 bg-[#414141]' : 'w-8 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Image Section */}
      {/* ADDED: h-1/2 sm:h-full (Splits height 50/50 on mobile) */}
      <div className='w-full sm:w-1/2 h-1/2 sm:h-full relative overflow-hidden bg-gray-50'>
        
        {/* Image with transition */}
        <div className='relative h-full'>
          <img 
            src={slides[currentSlide].image}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            alt={`${slides[currentSlide].title} ${slides[currentSlide].subtitle}`}
            loading="lazy" 
          />
          
          {/* Elegant overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/5 to-transparent'></div>
          
          {/* Decorative corner accents */}
          <div className='absolute top-6 right-6 w-16 h-16 border-t border-r border-white/40'></div>
          <div className='absolute bottom-6 left-6 w-16 h-16 border-b border-l border-white/40'></div>
        </div>
        
        {/* Badge overlay */}
        <div className={`absolute top-8 left-8 bg-white/95 backdrop-blur-sm px-6 py-3 shadow-sm transition-all duration-500 ${
          isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
        }`}>
          <p className='text-xs tracking-[0.3em] font-light text-gray-600'>
            {slides[currentSlide].badge}
          </p>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => handleSlideChange((currentSlide - 1 + slides.length) % slides.length)}
          className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm'
          aria-label="Previous slide"
        >
          <span className='text-gray-700'>←</span>
        </button>
        <button
          onClick={() => handleSlideChange((currentSlide + 1) % slides.length)}
          className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm'
          aria-label="Next slide"
        >
          <span className='text-gray-700'>→</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;