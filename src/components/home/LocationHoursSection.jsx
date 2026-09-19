import React, { useState } from 'react';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function LocationHoursSection({ onOpenWizard }) {
  const [copied, setCopied] = useState(false);
  const shopOpen = isOpenNow();

  const currentDayIndex = new Date().getDay();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[currentDayIndex];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.address.formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const googleMapsPlaceUrl = "https://www.google.com/maps/place/Perry's+Grillz/@-4.7380124,55.5067468,17z/data=!3m1!4b1!4m6!3m5!1s0x231e2b2945d1f291:0x6d120762b71d749b!8m2!3d-4.7380124!4d55.5067468";

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#f0fdfa] border-t border-teal-200/80 relative overflow-hidden" aria-labelledby="location-heading">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-teal-200 shadow-xs text-xs font-mono font-bold uppercase tracking-widest text-teal-800">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span>// 04 LOCATION & VISITOR GUIDE</span>
          </div>

          <h2 id="location-heading" className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ocean-dark tracking-tight">
            Find Us on Les Canelles
          </h2>

          <p className="text-teal-900/80 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Perched high on the scenic Les Canelles mountain road connecting the east and west coasts of southern Mahé, Seychelles.
          </p>
        </div>

        {/* TOP STATUS & QUICK ACTIONS BAR: Pure White on Light Teal */}
        <div className="card-thick p-5 sm:p-6 mb-10 flex flex-wrap items-center justify-between gap-4">
          {/* Status Indicator */}
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center justify-center">
              <span className={`w-3.5 h-3.5 rounded-full ${shopOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className={`absolute w-3.5 h-3.5 rounded-full ${shopOpen ? 'bg-emerald-500 animate-ping opacity-75' : 'bg-amber-500'}`} />
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-base sm:text-lg text-ocean-dark">
                  {shopOpen ? 'Open for Hilltop Dining' : 'Currently Closed'}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-mono font-semibold">
                  Today is {currentDayName}
                </span>
              </div>
              <p className="text-xs text-teal-700 mt-0.5">
                {currentDayName === 'Wednesday' 
                  ? 'Wednesdays closed for weekly fishery harvest & kitchen prep.' 
                  : 'Daily Open from 12:00 PM (Tuesday from 9:00 AM) until 9:00 PM'}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyAddress}
              className="px-4 py-2.5 rounded-full bg-teal-50 hover:bg-teal-100 border border-teal-200 text-xs font-bold text-teal-900 transition active:scale-95 cursor-pointer"
            >
              {copied ? 'Address Copied!' : 'Copy Address'}
            </button>

            <a
              href="tel:+2482527260"
              className="px-4 py-2.5 rounded-full bg-teal-50 hover:bg-teal-100 border border-teal-200 text-xs font-bold text-teal-900 transition active:scale-95"
            >
              Call Perry: +248 2 527 260
            </a>

            <button
              onClick={() => onOpenWizard && onOpenWizard()}
              className="px-6 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm active:scale-95 cursor-pointer"
            >
              Reserve a Table
            </button>
          </div>
        </div>

        {/* GIGANTIC INTERACTIVE GOOGLE MAP CONTAINER */}
        <div className="card-thick overflow-hidden shadow-2xl transition">
          {/* Map Top Bar */}
          <div className="px-6 py-4 bg-white border-b border-teal-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <img 
                src="/images/gallery-new-01.jpg" 
                alt="Perrys Grillz Hilltop View" 
                className="w-11 h-11 rounded-2xl object-cover border-2 border-teal-400 shadow-xs"
              />
              <div className="text-left">
                <h3 className="font-serif font-bold text-base sm:text-lg text-ocean-dark leading-snug">
                  Perry's Grillz
                </h3>
                <p className="text-xs text-teal-700 font-mono">
                  Les Canelles Rd, Mahé, Seychelles (Free Parking on Premises)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
              >
                <span>Open in Google Maps</span>
                <span>↗</span>
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Perry's+Grillz+Les+Canelles+Rd+Mahe+Seychelles"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 text-xs font-bold transition flex items-center space-x-1.5"
              >
                <span>GPS Directions</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Huge Map Frame */}
          <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] bg-teal-100">
            <iframe
              title="Perry's Grillz Google Map Location on Les Canelles Rd, Mahé, Seychelles"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.184337415663!2d55.5067468!3d-4.7380124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x231e2b2945d1f291%3A0x6d120762b71d749b!2sPerry&#39;s%20Grillz!5e0!3m2!1sen!2s!4v1755720986076!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {/* Floating Bottom Info Pill inside the Map */}
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto z-10 bg-white/95 backdrop-blur-md border-2 border-teal-100 rounded-2xl p-4 shadow-xl max-w-md text-left">
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 font-serif font-bold text-xs">
                  PG
                </div>
                <div>
                  <span className="font-serif font-bold text-sm text-ocean-dark block">
                    Les Canelles Mountain Ridge
                  </span>
                  <p className="text-xs text-teal-800 mt-0.5 leading-relaxed">
                    Coordinates: 4.7380° S, 55.5067° E • Hotel guest pick-up shuttle available upon request.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
