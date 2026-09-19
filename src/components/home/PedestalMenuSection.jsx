import React, { useState } from 'react';
import { imageManifest } from '../../data/imageManifest';

export default function PedestalMenuSection({ onOpenWizard, onViewAllServices }) {
  const [activeItem, setActiveItem] = useState(0);

  const pedestalPlates = [
    {
      id: 0,
      name: "Catch of the Day Feast for Two Persons",
      course: "Ocean Fresh Harvest",
      aging: "Wood-Fired Embers",
      description: "Whole local ocean catch flame-grilled with lemongrass, garlic Creole butter, sweet potato, and aromatic Creole rice.",
      image: "/images/perrys-dish-1.jpg",
      price: "SCR 850 (~$60 USD)",
      notes: "Harvested Daily from Mahé Waters"
    },
    {
      id: 1,
      name: "Charred Creole Grilled Octopus & Prawns",
      course: "Signature Seafood Grill",
      aging: "Spicy Citrus Herb Rub",
      description: "Tender octopus tentacles and jumbo wild ocean prawns kissed by flame, seasoned with island lemon and savory Creole butter.",
      image: "/images/perrys-dish-2.jpg",
      price: "SCR 550 (~$39 USD)",
      notes: "Melt-In-Your-Mouth Island Classic"
    },
    {
      id: 2,
      name: "Red Snapper Fillet with Creole Fried Rice",
      course: "Island Specialty",
      aging: "Pan-Grilled Perfection",
      description: "Succulent pan-seared red snapper fillet seasoned with island chili rub, accompanied by Creole spiced fried rice and slaw.",
      image: "/images/perrys-dish-3.jpg",
      price: "SCR 520 (~$37 USD)",
      notes: "Pairs with: Chilled SeyBrew Draught"
    },
    {
      id: 3,
      name: "Octopus Curry with Sweet Pumpkin & Rice",
      course: "Traditional Creole",
      aging: "Slow-Simmered Coconut Milk",
      description: "Slow-cooked octopus in rich coconut cream, roasted cumin, cinnamon, fresh ginger, and tender garden sweet pumpkin.",
      image: "/images/perrys-dish-4.jpg",
      price: "SCR 580 (~$42 USD)",
      notes: "Seychelles' Crown Culinary Jewel"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col text-left">
        <span className="text-xs uppercase tracking-[0.22em] text-amber-500 font-semibold mb-1">
          Open-Air Hillside Specialties
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight">
          Our Menu
        </h2>
      </div>

      {/* Narrative Intro block */}
      <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-md text-left">
        Every plate reflects authentic island flavors cooked with heart. From whole ocean fish grilled over hardwood embers to tender octopus curry and ice-cold fresh coconuts.
      </p>

      {/* 3D Floating Plinth Pedestals */}
      <div className="pt-2 space-y-8 sm:space-y-10">
        {pedestalPlates.map((plate) => {
          const isSelected = activeItem === plate.id;
          
          return (
            <div 
              key={plate.id}
              onClick={() => setActiveItem(plate.id)}
              className="group cursor-pointer"
            >
              {/* Pedestal Container with 3D Depth */}
              <div 
                className={`relative rounded-2xl bg-[#1c1917] border border-stone-800 p-4 sm:p-5 transition-all duration-500 ${
                  isSelected 
                    ? 'ring-2 ring-amber-500 shadow-[0_20px_40px_-15px_rgba(217,119,6,0.3)] -translate-y-1.5' 
                    : 'shadow-lg hover:-translate-y-1 hover:border-amber-500/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  
                  {/* Plated Dish Photo */}
                  <div className="relative w-full sm:w-40 h-40 sm:h-36 rounded-xl overflow-hidden bg-stone-900 border border-stone-800 flex-shrink-0 shadow-inner">
                    <img 
                      src={plate.image} 
                      alt={plate.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-sm text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                      {plate.course}
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                        {plate.name}
                      </h3>
                      <span className="text-xs sm:text-sm font-serif font-bold text-amber-400 whitespace-nowrap">
                        {plate.price}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs sm:text-sm text-stone-400 line-clamp-2 font-light leading-relaxed">
                      {plate.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400">
                      <span className="italic text-amber-300 font-medium">
                        {plate.aging}
                      </span>
                      <span className="text-amber-400 font-semibold uppercase text-[10px] tracking-wider group-hover:underline">
                        Tap to select
                      </span>
                    </div>
                  </div>

                </div>

                {/* Pedestal Bottom Shelf Strip */}
                <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between text-[10px] tracking-wider text-stone-400 uppercase">
                  <span>{plate.notes}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenWizard(plate.name);
                    }}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Reserve this dish →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Full Menu Pill CTA */}
      <div className="pt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={onViewAllServices}
          className="rounded-full border border-stone-600 px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-200 hover:bg-stone-800 hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
        >
          VIEW FULL CREOLE MENU
        </button>

        <button
          onClick={() => onOpenWizard()}
          className="rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-7 py-2.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
        >
          BOOK A TABLE
        </button>
      </div>

    </div>
  );
}
