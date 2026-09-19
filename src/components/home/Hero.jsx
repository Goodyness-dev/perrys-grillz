import React, { useState, useEffect, useRef } from 'react';
import { imageManifest } from '../../data/imageManifest';
import { BUSINESS_INFO } from '../../data/businessData';
import { gsap } from 'gsap';

export default function Hero({ onOpenWizard }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const heroTextRef = useRef(null);

  const heroSlides = [
    {
      image: imageManifest.hero.banner,
      headlineTop: "A Taste of",
      headlineBottom: "Seychelles",
      subtitle: "Les Canelles Hilltop • Mahé, Seychelles",
      tagline: "Wood-Fired Ocean Fresh Catch, Charred Octopus & Panoramic Island Views",
      alt: "Authentic seafood feast at Perrys Grillz terrace"
    },
    {
      image: imageManifest.features.terrace,
      headlineTop: "Breathtaking",
      headlineBottom: "Ocean Vistas",
      subtitle: "Perched Above The Tropical Canopy",
      tagline: "Open-Air Mountain Terrace With Cool Island Breezes & Spectacular Sunsets",
      alt: "Panoramic ocean view from Perrys Grillz terrace"
    },
    {
      image: imageManifest.features.seafood,
      headlineTop: "Authentic",
      headlineBottom: "Creole Feast",
      subtitle: "Heartfelt Seychellois Family Hospitality",
      tagline: "Famous Octopus Pumpkin Curry, Garlic Prawns & Freshly Picked Coconuts",
      alt: "Charred octopus and Creole seafood specialties"
    }
  ];

  const currentSlide = heroSlides[slideIndex];

  // GSAP animation on slide change
  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(heroTextRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [slideIndex]);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative pt-2 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Outer Banner Wrapper with Flanking Arrows */}
      <div className="relative flex items-center justify-center">
        
        {/* Left Carousel Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:-left-3 lg:-left-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-teal-900 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 border border-teal-200 cursor-pointer"
          aria-label="Previous Showcase Slide"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* The Large Rounded Hero Frame */}
        <div className="w-full relative h-[440px] sm:h-[540px] md:h-[620px] lg:h-[660px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-teal-950 border-2 border-teal-200/80 group">
          
          {/* Background Image */}
          <img
            src={currentSlide.image}
            alt={currentSlide.alt}
            fetchPriority="high"
            className="w-full h-full object-cover object-center transition-all duration-700 scale-100 group-hover:scale-105"
          />

          {/* Luxury Warm Gradients & Ambient Shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-black/40 to-teal-950/25 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(4,47,44,0.6)_100%)] pointer-events-none" />

          {/* Centered Editorial Typography Overlay */}
          <div ref={heroTextRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12 z-10">
            
            {/* Subtitle Pill */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-teal-100 text-[11px] sm:text-xs tracking-[0.25em] uppercase font-mono font-bold mb-4 sm:mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
              <span>{currentSlide.subtitle}</span>
            </div>

            {/* High-Contrast Editorial Serif Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] drop-shadow-lg max-w-4xl">
              <span className="italic font-normal opacity-95 block sm:inline font-serif">
                {currentSlide.headlineTop}{' '}
              </span>
              <span className="font-semibold text-teal-200 font-serif">
                {currentSlide.headlineBottom}
              </span>
            </h1>

            {/* Tagline */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-teal-50 font-light max-w-2xl tracking-wide leading-relaxed drop-shadow">
              {currentSlide.tagline}
            </p>

            {/* Primary Action Buttons: White on Light Teal styling */}
            <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenWizard()}
                className="rounded-full bg-white hover:bg-teal-50 text-teal-900 font-bold px-8 py-3.5 text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-xl active:scale-95 cursor-pointer border-2 border-white"
              >
                RESERVE A TABLE
              </button>

              <a
                href="#gallery"
                className="rounded-full bg-teal-900/60 hover:bg-teal-900/80 text-white border border-teal-300/40 backdrop-blur-md px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
              >
                VIEW VISUAL GALLERY
              </a>
            </div>

          </div>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  slideIndex === idx ? 'w-8 h-2 bg-teal-400' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Right Carousel Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:-right-3 lg:-right-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-teal-900 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 border border-teal-200 cursor-pointer"
          aria-label="Next Showcase Slide"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>

    </section>
  );
}
