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
    <div className="min-h-screen bg-[#f0fdfa] text-ocean-dark flex flex-col justify-center items-center px-4 py-8 sm:py-12 relative overflow-hidden font-sans">
      {/* Subtle Warm Backdrop Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Return to Site Link */}
      <div className="w-full max-w-md mb-5 z-10 text-left">
        <button
          onClick={onBackToSite}
          type="button"
          className="inline-flex items-center text-xs sm:text-sm font-bold text-teal-800 hover:text-teal-600 transition px-3.5 py-2 rounded-xl bg-white border border-teal-200 shadow-xs cursor-pointer"
        >
          ← Return to Guest Website
        </button>
      </div>

      {/* Login Card: Pure White on Light Teal */}
      <div className="w-full max-w-md bg-white border-2 border-teal-200 rounded-3xl p-6 sm:p-9 shadow-2xl relative z-10 text-center">
        {/* Real Hilltop Photo */}
        <div className="flex justify-center mb-5">
          <img
            src="/images/gallery-new-01.jpg"
            alt="Perrys Grillz Hilltop"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-teal-500 shadow-md"
          />
        </div>

        {/* Brand Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-ocean-dark">
            {BUSINESS_INFO.name}
          </h1>
          <p className="text-xs sm:text-sm text-teal-800 mt-1.5 font-medium">
            Executive Portal & Table Reservations
          </p>
          <div className="inline-block mt-3 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200">
            Staff & Concierge Suite
          </div>
        </div>

        {/* CREDENTIAL DISPLAY BANNER - 1-CLICK AUTOFILL & COPY */}
        <div className="mb-6 p-4 rounded-2xl bg-teal-50/70 border border-teal-200 shadow-xs text-left">
          <div className="flex items-center justify-between text-xs text-teal-800 mb-2 font-medium">
            <span className="text-teal-700 font-bold uppercase tracking-wider font-mono text-[11px]">
              Admin Access Key
            </span>
            <span className="text-[10px] uppercase tracking-wider text-teal-800 bg-white px-2.5 py-0.5 rounded-full font-mono font-bold border border-teal-200">
              Demo Access
            </span>
          </div>

          <div className="flex items-center justify-between bg-white border border-teal-200 rounded-xl px-3.5 py-2.5 shadow-xs">
            <code className="font-mono text-sm font-bold text-teal-700 tracking-wider">
              {DEFAULT_KEY}
            </code>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleAutofill}
                className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition active:scale-95 cursor-pointer"
                title="Autofill Password"
              >
                Autofill
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-900 text-xs font-bold transition active:scale-95 cursor-pointer"
                title="Copy Password"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <p className="text-[11px] text-teal-700 mt-2 font-mono">
            Click Autofill to log in instantly without typing.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-teal-900 mb-1.5">
              Password or Access Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full rounded-xl border-2 border-teal-100 bg-teal-50/40 px-3.5 py-2.5 text-sm text-ocean-dark placeholder-teal-800/40 focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-2.5 text-teal-700 hover:text-teal-900 text-xs font-bold"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-widest transition shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Verifying Access...' : 'Sign In to Management Portal'}
          </button>
        </form>

        <p className="text-[11px] text-teal-600 font-mono mt-6">
          Perry's Grillz • Les Canelles, Mahé, Seychelles
        </p>
      </div>
    </div>
  );
}
