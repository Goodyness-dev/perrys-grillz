import React, { useState, useEffect } from 'react';
import { SERVICES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AllServicesPage({ onOpenWizard, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="bg-[#0f0e0c] text-stone-100 min-h-screen pt-4 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between py-6 border-b border-stone-800">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-stone-300 hover:text-amber-400 transition cursor-pointer"
        >
          <span>← Back to Perry's Grillz Experience</span>
        </button>

        <span className="text-xs text-amber-400 font-medium tracking-widest uppercase">
          Les Canelles Rd • Mahé, Seychelles
        </span>
      </div>

      {/* Page Header */}
      <div className="py-10 sm:py-14 text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
          Authentic Seychellois Creole Gastronomy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          The Creole Menu
        </h1>
        <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
          Every ocean catch is fresh from Mahé waters and cooked over hardwood embers. Savor tender octopus curry with pumpkin, grilled red snapper, and ice-cold young coconuts.
        </p>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="mb-12 space-y-5">
        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search fish, octopus curry, red snapper, prawns, coconuts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-stone-800 bg-stone-900 px-5 py-3 pl-11 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
          />
          <svg className="w-4 h-4 text-stone-400 absolute left-4 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'bg-stone-900 border border-stone-800 text-stone-300 hover:bg-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services and Dishes Listing */}
      <div className="space-y-16">
        {filteredServices.map((service) => (
          <div 
            key={service.id}
            className="rounded-3xl bg-[#1c1917] border border-stone-800 p-6 sm:p-10 shadow-xl text-left space-y-8"
          >
            {/* Service Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                  {service.badge}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                  {service.name}
                </h2>
                <p className="text-sm text-stone-400 font-light max-w-2xl">
                  {service.shortDescription}
                </p>
              </div>

              <button
                onClick={() => onOpenWizard(service.name)}
                className="self-start md:self-center rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition shadow active:scale-95"
              >
                Reserve This Selection
              </button>
            </div>

            {/* Featured Plates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.featuredDishes.map((dish, i) => (
                <div 
                  key={i}
                  className="rounded-2xl bg-stone-900/70 border border-stone-800 p-4 flex gap-4 items-center group hover:border-amber-500/50 transition"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-950 flex-shrink-0 relative">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-stone-100 group-hover:text-amber-400 transition truncate">
                        {dish.name}
                      </h4>
                      <span className="text-xs font-serif font-bold text-amber-400 whitespace-nowrap">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 font-light line-clamp-2 mt-1">
                      {dish.desc}
                    </p>
                    <button
                      onClick={() => onOpenWizard(dish.name)}
                      className="mt-2 text-[11px] text-amber-400 font-semibold uppercase tracking-wider hover:underline"
                    >
                      Book Table for This Dish →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights Bar */}
            <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">✓</span>
                <span>{service.sidesIncluded}</span>
              </div>
              <span className="italic text-stone-400">
                Recommended for: {service.recommendedFor}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
