import React, { useState } from 'react';
import { authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const DEFAULT_KEY = 'perrys2024';
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAutofill = () => {
    setPassword(DEFAULT_KEY);
    setError('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(DEFAULT_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keyToSubmit = password.trim() || DEFAULT_KEY;
    if (!keyToSubmit) {
      setError('Please enter your admin access key.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authApi.login(keyToSubmit);
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setError(result.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError(err.data?.error || err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-stone-100 flex flex-col justify-center items-center px-4 py-8 sm:py-12 relative overflow-hidden font-sans">
      {/* Subtle Warm Backdrop Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Return to Site Link */}
      <div className="w-full max-w-md mb-5 z-10 text-left">
        <button
          onClick={onBackToSite}
          type="button"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-stone-400 hover:text-amber-400 transition px-3 py-1.5 rounded-xl hover:bg-stone-900 border border-transparent hover:border-stone-800 cursor-pointer"
        >
          ← Return to Guest Website
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#1c1917] border border-stone-800 rounded-3xl p-6 sm:p-9 shadow-2xl relative z-10 text-center">
        {/* Real Hilltop Photo */}
        <div className="flex justify-center mb-5">
          <img
            src="/images/perrys-view.jpg"
            alt="Perrys Grillz Hilltop"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amber-500 shadow-md"
          />
        </div>

        {/* Brand Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">
            {BUSINESS_INFO.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1.5 font-medium">
            Executive Portal & Table Reservations
          </p>
          <div className="inline-block mt-3 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-500/30">
            Staff & Concierge Suite
          </div>
        </div>

        {/* CREDENTIAL DISPLAY BANNER - 1-CLICK AUTOFILL & COPY */}
        <div className="mb-6 p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-xs text-left">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2 font-medium">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              Admin Access Key
            </span>
            <span className="text-[10px] uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full font-semibold border border-amber-500/30">
              Demo Access
            </span>
          </div>

          <div className="flex items-center justify-between bg-black/40 border border-stone-800 rounded-xl px-3 py-2">
            <code className="font-mono text-sm font-bold text-amber-400 tracking-wider">
              {DEFAULT_KEY}
            </code>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleAutofill}
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition active:scale-95 cursor-pointer"
                title="Autofill Password"
              >
                Autofill
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition active:scale-95 cursor-pointer"
                title="Copy Password"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <p className="text-[11px] text-stone-400 mt-2">
            Click Autofill to log in instantly without typing.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-1.5">
              Password or Access Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-200 text-xs"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest transition shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Verifying Access...' : 'Sign In to Management Portal'}
          </button>
        </form>

        <p className="text-[11px] text-stone-500 mt-6">
          Perry's Grillz • Les Canelles, Mahé, Seychelles
        </p>
      </div>
    </div>
  );
}
