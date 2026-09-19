import React, { useState, useEffect } from 'react';
import { submitQuoteRequest } from '../../services/quoteService';

export default function QuoteWizardModal({ isOpen, onClose, initialCategory = null }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    seatingArea: initialCategory || 'Panoramic Hillside Terrace',
    partySize: '2 Guests',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '7:00 PM',
    occasion: 'Vacation Dining in Seychelles',
    culinaryNotes: '',
    hotelPickup: false,
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentStep(1);
      setSubmissionResult(null);
      setErrorMsg('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const seatingOptions = [
    {
      title: 'Panoramic Hillside Terrace',
      desc: 'Our signature open-air deck overlooking the lush mountain canopy and southern Mahé coast.',
      badge: 'Most Popular'
    },
    {
      title: 'Covered Open-Air Verandah',
      desc: 'Sheltered dining beneath tropical wooden eaves with cool mountain breezes.',
      badge: 'Shaded & Breezy'
    },
    {
      title: 'Sunset Ocean View Tables',
      desc: 'Perimeter tables positioned for golden hour sunsets over the Indian Ocean.',
      badge: 'Romantic'
    },
    {
      title: 'Family Feast Long Table',
      desc: 'Spacious banquet seating perfect for sharing whole catch of the day and seafood platters.',
      badge: 'Group Banquets'
    }
  ];

  const timeSlots = [
    '12:00 PM', '1:00 PM', '2:00 PM', '5:30 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
  ];

  const partySizes = [
    '2 Guests (Couple)', '3–4 Guests', '5–6 Guests', '7–8 Guests (Family)', '9+ Banquet / Group'
  ];

  const occasions = [
    'Vacation Dining in Seychelles', 'Anniversary / Romance', 'Birthday Celebration', 'Sunset Dinner & Cocktails', 'Family Seafood Feast', 'Casual Creole Lunch'
  ];

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1 && !formData.seatingArea) {
      setErrorMsg('Please select your preferred seating area.');
      return;
    }
    if (currentStep === 2 && (!formData.date || !formData.timeSlot)) {
      setErrorMsg('Please select your dining date and time slot.');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setErrorMsg('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please provide your name, email, and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitQuoteRequest({
        ...formData,
        serviceName: formData.seatingArea,
        vehicleDetails: `Party: ${formData.partySize} | Time: ${formData.timeSlot} | Shuttle: ${formData.hotelPickup ? 'YES' : 'NO'}`
      });
      setSubmissionResult(result);
      setCurrentStep(4);
    } catch (err) {
      setErrorMsg('Reservation request could not be processed. Please call +248 2 527 260.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#1c1917] border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Header */}
        <div className="bg-[#151413] px-6 py-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border border-amber-500/70 flex items-center justify-center font-serif text-amber-400 font-bold text-xs">
              PG
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                Perry's Grillz Table Reservation
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-amber-400">
                Les Canelles • Mahé, Seychelles
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-900 border border-stone-750 hover:bg-stone-800 text-stone-300 flex items-center justify-center transition"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-stone-900">
          <div 
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: Seating Atmosphere */}
          {currentStep === 1 && (
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                  Select Seating Area
                </h4>
                <p className="text-xs sm:text-sm text-stone-400 font-light">
                  Choose your preferred setting atop Les Canelles mountain.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seatingOptions.map((opt) => {
                  const isSelected = formData.seatingArea === opt.title;
                  return (
                    <div
                      key={opt.title}
                      onClick={() => setFormData(prev => ({ ...prev, seatingArea: opt.title }))}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-amber-500 bg-amber-950/30 shadow-md -translate-y-0.5'
                          : 'border-stone-800 bg-stone-900/60 hover:border-amber-500/40 hover:bg-stone-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-bold text-sm sm:text-base text-stone-100">
                          {opt.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-amber-300 font-medium">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 font-light leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Date, Time & Party Size */}
          {currentStep === 2 && (
            <div className="space-y-5 text-left">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                  Party Size & Reservation Time
                </h4>
                <p className="text-xs sm:text-sm text-stone-400 font-light">
                  When will you be joining Perry & family?
                </p>
              </div>

              {/* Party Size */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-2">
                  Party Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {partySizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, partySize: size }))}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition ${
                        formData.partySize === size
                          ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm font-bold'
                          : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-1.5">
                    Dining Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3.5 py-2.5 text-sm font-medium text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
                    className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3.5 py-2.5 text-sm font-medium text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-1.5">
                  Dining Occasion
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3.5 py-2.5 text-sm font-medium text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>

              {/* Hotel Pick-up Shuttle Toggle */}
              <label className="flex items-center space-x-3 cursor-pointer pt-1 bg-stone-900/60 p-3 rounded-xl border border-stone-800">
                <input
                  type="checkbox"
                  checked={formData.hotelPickup}
                  onChange={(e) => setFormData(prev => ({ ...prev, hotelPickup: e.target.checked }))}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 border-stone-700 bg-stone-800"
                />
                <span className="text-xs sm:text-sm text-stone-200">
                  Request complimentary guest hotel pick-up shuttle (from Mahé hotels & resorts)
                </span>
              </label>
            </div>
          )}

          {/* STEP 3: Guest Contact & Notes */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                  Guest Contact & Reservation Notes
                </h4>
                <p className="text-xs sm:text-sm text-stone-400 font-light">
                  We will send your table confirmation and mountain directions directly.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-1">
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hanna Bakirova / Maxence Beaumont"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3.5 py-2.5 text-sm text-stone-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="guest@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3.5 py-2.5 text-sm text-stone-100 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+248 2 527 260"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3.5 py-2.5 text-sm text-stone-100 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-1">
                    Hotel Name (for Shuttle) or Dietary Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g. Staying at Anse Royale Resort, please pick us up at 6:30 PM. Vegetarian options requested..."
                    value={formData.culinaryNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, culinaryNotes: e.target.value }))}
                    className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3.5 py-2 text-sm text-stone-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Reservation Overview Card */}
              <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs space-y-1">
                <div className="flex justify-between font-semibold text-stone-100">
                  <span>Setting:</span>
                  <span className="text-amber-400">{formData.seatingArea}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Date & Time:</span>
                  <span>{formData.date} at {formData.timeSlot}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Party:</span>
                  <span>{formData.partySize}</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: Success Confirmation */}
          {currentStep === 4 && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500 text-amber-400 mx-auto flex items-center justify-center text-2xl shadow-sm">
                🏝️
              </div>

              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                Table Reservation Received!
              </h4>

              <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your reservation request for <strong>{formData.partySize}</strong> on <strong>{formData.date} at {formData.timeSlot}</strong> has been received by Perry and his team.
              </p>

              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 max-w-sm mx-auto text-xs text-stone-300 space-y-1 text-left">
                <p><strong>Reservation Ref:</strong> {submissionResult?.quoteId || 'RES-PERRYS'}</p>
                <p><strong>Area:</strong> {formData.seatingArea}</p>
                <p><strong>Direct Call:</strong> +248 2 527 260</p>
                <p><strong>Shuttle Pick-up:</strong> {formData.hotelPickup ? 'Requested (Perry will contact you)' : 'Self-driving'}</p>
              </div>

              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="rounded-full bg-amber-500 text-stone-950 font-bold px-8 py-2.5 text-xs uppercase tracking-widest hover:bg-amber-400 transition shadow"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {currentStep < 4 && (
          <div className="bg-[#151413] px-6 py-4 flex items-center justify-between border-t border-stone-800">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2 rounded-full border border-stone-700 text-xs font-semibold text-stone-300 hover:bg-stone-900 transition active:scale-95"
              >
                ← Back
              </button>
            ) : <div />}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-7 py-2.5 text-xs uppercase tracking-wider transition active:scale-95 shadow-md"
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-8 py-2.5 text-xs uppercase tracking-wider transition active:scale-95 shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Table Reservation'}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
