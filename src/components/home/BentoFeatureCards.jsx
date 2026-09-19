import React from 'react';
import { imageManifest } from '../../data/imageManifest';

export default function BentoFeatureCards({ onOpenWizard, onViewAllServices }) {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        
        {/* Left Bento Card: Fresh Catch & Wood Grill */}
        <div className="card-thick-hover p-6 sm:p-8 flex flex-col justify-between group">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            
            {/* BIG IMAGE - THE DOMINANT VISUAL ANCHOR */}
            <div className="w-full sm:w-56 h-56 sm:h-52 rounded-2xl overflow-hidden bg-teal-50 flex-shrink-0 relative shadow-sm">
              <img
                src={imageManifest.features.grill}
                alt="Fresh ocean catch grilling over wood coals"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-teal-700 text-[10px] font-mono uppercase tracking-wider text-white font-bold shadow-xs">
                Daily Harvest
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700">
                <span>// DOCK-TO-TERRACE</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-ocean-dark font-bold tracking-tight">
                Wood-Fired Ocean Catch
              </h3>
              <p className="text-xs sm:text-sm text-teal-950/75 font-light leading-relaxed">
                Hand-caught every morning by Mahé fishermen and seasoned with garlic Creole butter, lime, and mountain herbs before kissing aromatic hardwood embers.
              </p>
            </div>

          </div>

          <div className="mt-6 pt-5 border-t border-teal-100 flex items-center justify-between">
            <span className="text-xs font-mono text-teal-700 tracking-wider">
              Whole Catch • Red Snapper • Grilled Octopus
            </span>
            <button
              onClick={onViewAllServices}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition shadow-sm active:scale-95 cursor-pointer"
            >
              Explore Catch
            </button>
          </div>
        </div>

        {/* Right Bento Card: Hilltop Terrace & View */}
        <div className="card-thick-hover p-6 sm:p-8 flex flex-col justify-between group">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            
            {/* BIG IMAGE - THE DOMINANT VISUAL ANCHOR */}
            <div className="w-full sm:w-56 h-56 sm:h-52 rounded-2xl overflow-hidden bg-teal-50 flex-shrink-0 relative shadow-sm">
              <img
                src={imageManifest.features.terrace}
                alt="Panoramic view from Perrys Grillz open-air terrace"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-teal-900 font-bold shadow-xs">
                Mahé Vista
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700">
                <span>// OPEN-AIR DINING</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-ocean-dark font-bold tracking-tight">
                Hilltop Terrace & Views
              </h3>
              <p className="text-xs sm:text-sm text-teal-950/75 font-light leading-relaxed">
                Perched high along the scenic Les Canelles mountain ridge. Unwind under cool tropical breezes, panoramic canopy vistas, and sunset cocktails over the Indian Ocean.
              </p>
            </div>

          </div>

          <div className="mt-6 pt-5 border-t border-teal-100 flex items-center justify-between">
            <span className="text-xs font-mono text-teal-700 tracking-wider">
              Free Parking • Hotel Shuttle Available
            </span>
            <button
              onClick={() => onOpenWizard()}
              className="rounded-full bg-white border-2 border-teal-600 text-teal-800 hover:bg-teal-700 hover:text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition shadow-sm active:scale-95 cursor-pointer"
            >
              Book Table
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
