import React, { useState, useEffect, useRef } from 'react';
import { imageManifest } from '../../data/imageManifest';
import { gsap } from 'gsap';

export default function PedestalMenuSection({ onOpenWizard, onViewAllServices }) {
  const [activeItem, setActiveItem] = useState(0);
  const cardsContainerRef = useRef(null);

  const pedestalPlates = [
    {
      id: 0,
      name: "Catch of the Day Feast for Two",
      course: "Ocean Fresh Harvest",
      technique: "Wood-Fired Embers",
      description: "Whole local ocean catch flame-grilled with lemongrass, garlic Creole butter, sweet potato, and aromatic Creole rice.",
      image: imageManifest.pedestals[0].image,
      price: "SCR 850 (~$60 USD)",
      notes: "Harvested Daily from Mahé Waters"
    },
    {
      id: 1,
      name: "Charred Creole Grilled Octopus & Prawns",
      course: "Signature Seafood Grill",
      technique: "Spicy Citrus Herb Rub",
      description: "Tender octopus tentacles and jumbo wild ocean prawns kissed by flame, seasoned with island lemon and savory Creole butter.",
      image: imageManifest.pedestals[1].image,
      price: "SCR 550 (~$39 USD)",
      notes: "Melt-In-Your-Mouth Island Classic"
    },
    {
      id: 2,
      name: "Red Snapper Fillet with Creole Fried Rice",
      course: "Island Specialty",
      technique: "Pan-Grilled Perfection",
      description: "Succulent pan-seared red snapper fillet seasoned with island chili rub, accompanied by Creole spiced fried rice and slaw.",
      image: imageManifest.pedestals[2].image,
      price: "SCR 520 (~$37 USD)",
      notes: "Pairs with: Chilled SeyBrew Draught"
    },
    {
      id: 3,
      name: "Octopus Curry with Sweet Pumpkin & Rice",
      course: "Traditional Creole",
      technique: "Slow-Simmered Coconut Milk",
      description: "Slow-cooked octopus in rich coconut cream, roasted cumin, cinnamon, fresh ginger, and tender sweet garden pumpkin.",
      image: imageManifest.pedestals[3].image,
      price: "SCR 580 (~$42 USD)",
      notes: "Seychelles' Crown Culinary Jewel"
    }
  ];

  // GSAP animation for pedestal cards entrance
  useEffect(() => {
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.pedestal-card-item');
      gsap.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col text-left space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-teal-700">
          <span className="w-2 h-2 rounded-full bg-teal-500" />
          <span>// 01 SIGNATURE PLATES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-ocean-dark tracking-tight">
          Featured Creole Dishes
        </h2>
        <p className="text-sm sm:text-base text-teal-900/80 font-light leading-relaxed max-w-md">
          Cooked over wood embers and seasoned with generations of family recipes. Click any card to reserve your table.
        </p>
      </div>

      {/* Big-Image Cards Grid */}
      <div ref={cardsContainerRef} className="space-y-6 sm:space-y-8">
        {pedestalPlates.map((plate) => {
          const isSelected = activeItem === plate.id;
          
          return (
            <div 
              key={plate.id}
              onClick={() => setActiveItem(plate.id)}
              className="pedestal-card-item group cursor-pointer"
            >
              {/* Card Container: White on Light Teal with Thick Shadow */}
              <div 
                className={`relative rounded-3xl bg-white border-2 p-5 sm:p-7 transition-all duration-500 flex flex-col ${
                  isSelected 
                    ? 'border-teal-500 shadow-thick-hover ring-2 ring-teal-500/40 -translate-y-1' 
                    : 'border-teal-100 shadow-thick hover:border-teal-400 hover:-translate-y-1'
                }`}
              >
                {/* BIG FOOD IMAGE - THE MAIN THING ON EACH CARD */}
                <div className="relative w-full h-56 sm:h-64 md:h-72 rounded-2xl overflow-hidden bg-teal-50 shadow-inner">
                  <img 
                    src={plate.image} 
                    alt={plate.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-wider text-teal-900 font-bold shadow-xs">
                    {plate.course}
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute top-3 right-3 px-3.5 py-1.5 rounded-full bg-teal-800/90 backdrop-blur-md text-white font-serif font-bold text-xs sm:text-sm shadow-md">
                    {plate.price}
                  </div>

                  {/* Wood Fire Embers Pill */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-teal-200 font-mono">
                    {plate.technique}
                  </div>
                </div>

                {/* Dish Details Below the Image */}
                <div className="pt-5 text-left space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-ocean-dark group-hover:text-teal-700 transition-colors">
                      {plate.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-teal-950/75 font-light leading-relaxed">
                    {plate.description}
                  </p>

                  {/* Bottom Strip */}
                  <div className="pt-3 border-t border-teal-100 flex items-center justify-between text-xs text-teal-800">
                    <span className="font-mono text-[11px] text-teal-600 font-medium">
                      {plate.notes}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenWizard(plate.name);
                      }}
                      className="text-teal-700 font-bold hover:text-teal-900 hover:underline flex items-center space-x-1"
                    >
                      <span>Reserve this dish</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={onViewAllServices}
          className="rounded-full bg-white border-2 border-teal-600 text-teal-800 hover:bg-teal-700 hover:text-white px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
        >
          VIEW FULL CREOLE MENU
        </button>

        <button
          onClick={() => onOpenWizard()}
          className="rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-3 text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
        >
          BOOK A TABLE
        </button>
      </div>

    </div>
  );
}
