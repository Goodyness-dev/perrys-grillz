import React, { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';
import { gsap } from 'gsap';

export default function AllServicesPage({ onOpenWizard, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const menuContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = [
    'All',
    'Fresh Catch',
    'Octopus & Platters',
    'Starters & Salads',
    'Curries & Chicken',
    'Coconuts & Drinks'
  ];

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (service.featuredDishes && service.featuredDishes.some(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())));
    
    if (!matchesSearch) return false;
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Fresh Catch' && service.id.includes('catch')) return true;
    if (selectedCategory === 'Octopus & Platters' && service.id.includes('octopus')) return true;
    if (selectedCategory === 'Starters & Salads' && service.id.includes('starter')) return true;
    if (selectedCategory === 'Curries & Chicken' && service.id.includes('poultry')) return true;
    if (selectedCategory === 'Coconuts & Drinks' && service.id.includes('tropical')) return true;
    return true;
  });

  // GSAP animation for smooth entrance of menu items
  useEffect(() => {
    if (menuContainerRef.current) {
      const cards = menuContainerRef.current.querySelectorAll('.dish-showcase-card');
      gsap.fromTo(cards, 
        { opacity: 0, y: 25, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#f0fdfa] text-ocean-dark min-h-screen pt-4 pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="flex items-center justify-between py-6 border-b border-teal-200/80">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-teal-800 hover:text-teal-600 transition cursor-pointer"
        >
          <span>← Back to Perry's Grillz Experience</span>
        </button>

        <span className="text-xs font-mono font-bold text-teal-700 tracking-widest uppercase">
          Les Canelles Rd • Mahé, Seychelles
        </span>
      </div>

      {/* Hero Header on Light Teal */}
      <div className="py-12 sm:py-16 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-teal-200 shadow-xs text-xs font-mono font-bold uppercase tracking-widest text-teal-800">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>// 01 AUTHENTIC CREOLE GASTRONOMY</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-ocean-dark tracking-tight leading-[1.08]">
          The Island Menu
        </h1>

        <p className="text-base sm:text-lg text-teal-900/80 font-light leading-relaxed max-w-2xl mx-auto">
          Every dish is prepared fresh atop Les Canelles mountain. Hand-caught ocean harvests, flame-charred octopus, and fragrant coconut pumpkin curries.
        </p>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="mb-14 space-y-6">
        {/* Search Input on Light Teal */}
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search whole fish, octopus curry, red snapper, prawns, rum..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border-2 border-teal-200/80 bg-white px-6 py-3.5 pl-12 text-sm text-ocean-dark placeholder-teal-800/50 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
          />
          <svg className="w-5 h-5 text-teal-600 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-md -translate-y-0.5'
                  : 'bg-white border border-teal-200/90 text-teal-900 hover:bg-teal-50 hover:border-teal-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services and Big Image Dishes Listing */}
      <div ref={menuContainerRef} className="space-y-20">
        {filteredServices.map((service) => (
          <div 
            key={service.id}
            className="space-y-8"
          >
            {/* Category Header Banner */}
            <div className="bg-white border-2 border-teal-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700">
                    {service.badge}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ocean-dark">
                  {service.name}
                </h2>
                <p className="text-sm text-teal-900/80 font-light max-w-2xl">
                  {service.shortDescription}
                </p>
              </div>

              <button
                onClick={() => onOpenWizard(service.name)}
                className="self-start md:self-center rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-3 text-xs uppercase tracking-wider transition shadow-md active:scale-95 cursor-pointer shrink-0"
              >
                Reserve Table for This Menu
              </button>
            </div>

            {/* BIG IMAGE-FIRST DISH CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.featuredDishes.map((dish, i) => (
                <div 
                  key={i}
                  className="dish-showcase-card card-thick-hover overflow-hidden flex flex-col justify-between group cursor-pointer"
                  onClick={() => onOpenWizard(dish.name)}
                >
                  {/* BIG PROMINENT FOOD IMAGE - THE MAIN THING ON THE CARD */}
                  <div className="relative w-full h-64 sm:h-76 md:h-80 overflow-hidden bg-teal-50">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Vignette for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70 group-hover:opacity-90 transition-opacity" />

                    {/* Price Pill Tag on the Image */}
                    <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-teal-900 font-serif font-bold text-sm shadow-md">
                      {dish.price}
                    </div>

                    {/* Category / Freshness Pill on the Image */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-teal-700/90 backdrop-blur-md text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                      Seychelles Fresh
                    </div>

                    {/* Hover Prompt */}
                    <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-white text-teal-900 text-xs font-bold shadow-lg">
                        <span>Book This Dish</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>

                  {/* Editorial Details Section Below the Big Image */}
                  <div className="p-6 sm:p-7 text-left space-y-3 bg-white flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-serif font-bold text-xl sm:text-2xl text-ocean-dark group-hover:text-teal-700 transition-colors">
                          {dish.name}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-teal-900/75 font-light leading-relaxed mt-2">
                        {dish.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-teal-100 flex items-center justify-between">
                      <span className="text-xs font-mono text-teal-700 font-semibold uppercase tracking-wider">
                        {service.sidesIncluded.split('+')[0]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenWizard(dish.name);
                        }}
                        className="text-xs font-bold uppercase tracking-wider text-teal-700 group-hover:text-teal-900 hover:underline flex items-center space-x-1"
                      >
                        <span>Reserve Table</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
