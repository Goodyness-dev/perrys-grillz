import React from 'react';
import { imageManifest } from '../../data/imageManifest';

export default function BentoFeatureCards({ onOpenWizard, onViewAllServices }) {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto" id="gallery">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        
        {/* Left Bento Card: Fresh Catch & Wood Grill */}
        <div className="rounded-3xl bg-[#1c1917] border border-stone-800 p-7 sm:p-9 shadow-2xl text-stone-100 flex flex-col justify-between group">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            
            {/* Dish Image Vignette */}
            <div className="w-full sm:w-48 h-48 sm:h-44 rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 flex-shrink-0 relative">
              <img
                src={imageManifest.pedestals[0].image}
                alt="Fresh ocean catch grilling over wood coals"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-600/90 text-[10px] uppercase tracking-wider text-stone-950 font-bold">
                Daily Harvest
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-amber-400 font-semibold">
                Island Fishery Direct
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
                Wood-Fired Ocean Catch
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                Harvested daily by local Mahé fishermen and seasoned with garlic Creole butter, lemon, and mountain herbs before cooking over aromatic hardwood embers.
              </p>
            </div>

          </div>

          <div className="mt-6 pt-5 border-t border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-400 tracking-wider">
              Catch for Two • Red Snapper • Grilled Octopus
            </span>
            <button
              onClick={onViewAllServices}
              className="rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 px-6 py-2 text-xs font-bold uppercase tracking-wider transition shadow-md active:scale-95"
            >
              Discover Menu
            </button>
          </div>
        </div>

        {/* Right Bento Card: Hilltop Terrace & View */}
        <div className="rounded-3xl bg-[#1c1917] border border-stone-800 p-7 sm:p-9 shadow-xl text-stone-100 flex flex-col justify-between group">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            
            {/* View Image Vignette */}
            <div className="w-full sm:w-48 h-48 sm:h-44 rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 flex-shrink-0 relative">
              <img
                src={imageManifest.features.terrace}
                alt="Panoramic view from Perrys Grillz open-air terrace"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-sm text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                Mahé Vista
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-amber-400 font-semibold">
                Ambiance & Atmosphere
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
                Hilltop Terrace & Views
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                Perched high along the picturesque Les Canelles mountain road. Unwind with cool tropical breezes, panoramic canopy views, and sunset cocktails over the Indian Ocean.
              </p>
            </div>

          </div>

          <div className="mt-6 pt-5 border-t border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-400 tracking-wider">
              Open-Air Terrace • Sunset Cocktails • Free Parking
            </span>
            <button
              onClick={() => onOpenWizard()}
              className="rounded-full border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white px-6 py-2 text-xs font-semibold uppercase tracking-wider transition shadow-sm active:scale-95"
            >
              Book Table
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
