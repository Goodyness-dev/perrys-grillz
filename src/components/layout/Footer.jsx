import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Footer({ onOpenWizard, onNavigate }) {
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigate) onNavigate('home');
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#0f0e0c] text-stone-300 text-sm border-t border-stone-800 pt-14 pb-12" role="contentinfo" id="contact">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          
          {/* Column 1 (4 cols): Brand & Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-amber-500/60 bg-stone-900 flex items-center justify-center font-serif font-bold text-amber-400 text-sm">
                PG
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-white leading-tight">
                  Perry's Grillz
                </h4>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-medium">
                  Les Canelles • Mahé, Seychelles
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              Seychelles' premier hillside Creole grill. Savor wood-fired catch of the day, charred tender octopus, slow-cooked pumpkin curry, and cold coconuts perched high above the tropical canopy.
            </p>

            {/* Contact Actions */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="px-3.5 py-1.5 rounded-full border border-stone-700 hover:border-amber-500 text-stone-300 hover:text-amber-400 text-xs font-semibold transition flex items-center space-x-1.5"
              >
                <span>Call: {BUSINESS_INFO.phone}</span>
              </a>
              <button
                onClick={() => onOpenWizard && onOpenWizard()}
                className="px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition"
              >
                Reserve Table
              </button>
            </div>
          </div>

          {/* Column 2 (2 cols): Gastronomy */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-100">
              Gastronomy
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-amber-400 transition">
                  Catch of the Day
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-amber-400 transition">
                  Grilled Octopus
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-amber-400 transition">
                  Octopus Pumpkin Curry
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-amber-400 transition">
                  Smoked Fish Salad
                </button>
              </li>
              <li>
                <button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-amber-400 transition">
                  Fresh Coconuts & Rum
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (3 cols): Dining Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-100">
              Hours & Service
            </h5>
            <div className="space-y-1.5 text-xs text-stone-400">
              <div className="flex justify-between py-1 border-b border-stone-800">
                <span className="font-medium">Mon, Thu – Sun:</span>
                <span>12:00 PM – 9:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800">
                <span className="font-medium">Tuesday:</span>
                <span>9:00 AM – 9:00 PM</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium text-amber-400">Wednesday:</span>
                <span className="italic">Closed (Harvest Rest)</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 pt-1">
              Complimentary guest hotel shuttle pick-up available upon request.
            </p>
          </div>

          {/* Column 4 (3 cols): Stylized Map Card */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-100">
                Location Guide
              </h5>
              <button
                onClick={(e) => handleLinkClick(e, '#location')}
                className="text-[11px] text-amber-400 hover:underline font-bold"
              >
                Full Map ↓
              </button>
            </div>

            {/* Map Preview Card */}
            <div className="rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 p-2 shadow-md group">
              <div className="relative h-32 w-full rounded-xl overflow-hidden bg-stone-800">
                <iframe
                  title="Perrys Grillz Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.184337415663!2d55.5067468!3d-4.7380124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x231e2b2945d1f291%3A0x6d120762b71d749b!2sPerry&#39;s%20Grillz!5e0!3m2!1sen!2s!4v1755720986076!5m2!1sen!2s"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
                <a 
                  href="#location"
                  onClick={(e) => handleLinkClick(e, '#location')}
                  className="absolute inset-0 bg-transparent hover:bg-black/20 transition"
                  aria-label="View interactive map"
                />
              </div>

              <div className="pt-2 px-1 flex items-center justify-between text-[11px]">
                <span className="font-serif font-bold text-stone-200 truncate">
                  Les Canelles Rd, Mahé
                </span>
                <a
                  href={BUSINESS_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 font-semibold hover:underline flex-shrink-0 ml-1"
                >
                  GPS Map →
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Copyright & Admin Portal Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.legalName} • Les Canelles, Mahé, Seychelles. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-amber-400 transition underline underline-offset-4 cursor-pointer"
            >
              Staff & Concierge Admin
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
