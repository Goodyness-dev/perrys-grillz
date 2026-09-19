import React, { useState } from 'react';
import { imageManifest } from '../../data/imageManifest';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ChefAndReviewsSection({ onOpenWizard }) {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const reviews = BUSINESS_INFO.reviews;
  const currentReview = reviews[activeReviewIdx];

  const handleNextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-8 flex flex-col justify-between h-full">
      
      {/* 1. About Us: Perry & Family Bento Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-800 bg-stone-950 group min-h-[360px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-8">
        
        {/* Background Image */}
        <img
          src={imageManifest.features.terrace}
          alt={imageManifest.chef.alt}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 pointer-events-none" />

        {/* Content Details */}
        <div className="relative z-10 space-y-2 text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-stone-950 font-bold">
            Family Hospitality & Creole Roots
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-tight">
            About Perry's Grillz
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-lg line-clamp-3">
            "{BUSINESS_INFO.executiveChef.quote}"
          </p>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                {BUSINESS_INFO.executiveChef.name}
              </p>
              <p className="text-xs text-amber-400 font-medium">
                {BUSINESS_INFO.executiveChef.role}
              </p>
            </div>

            <button
              onClick={() => onOpenWizard()}
              className="rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-2 text-[11px] font-bold uppercase tracking-wider shadow transition"
            >
              Reserve Table
            </button>
          </div>
        </div>

      </div>

      {/* 2. Customer Reviews Card */}
      <div className="relative rounded-3xl bg-[#1c1917] border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-[0.2em] text-amber-500 font-semibold">
              Traveler & Local Feedback
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
              Customer Reviews
            </h4>
          </div>

          {/* 5 Stars SVG */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Current Review Quote */}
        <p className="text-sm sm:text-base text-stone-300 font-light italic leading-relaxed min-h-[72px]">
          "{currentReview.comment}"
        </p>

        {/* Reviewer Information and Controls */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-stone-100 font-serif">
              {currentReview.author}
            </p>
            <p className="text-xs text-stone-400">
              {currentReview.location} • <span className="text-amber-400 font-medium">{currentReview.source}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevReview}
              className="w-8 h-8 rounded-full border border-stone-700 hover:border-amber-500 flex items-center justify-center text-stone-300 hover:text-amber-400 transition"
              aria-label="Previous Review"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextReview}
              className="w-8 h-8 rounded-full border border-stone-700 hover:border-amber-500 flex items-center justify-center text-stone-300 hover:text-amber-400 transition"
              aria-label="Next Review"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
