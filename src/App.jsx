import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import MainShowcaseSection from './components/home/MainShowcaseSection';
import BentoFeatureCards from './components/home/BentoFeatureCards';
import GallerySection from './components/home/GallerySection';
import LocationHoursSection from './components/home/LocationHoursSection';
import Footer from './components/layout/Footer';
import AllServicesPage from './components/services/AllServicesPage';
import QuoteWizardModal from './components/wizard/QuoteWizardModal';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import { BUSINESS_INFO } from './data/businessData';
import { authApi, getStoredToken } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'services' | 'admin'
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardCategory, setWizardCategory] = useState(null);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Check stored auth token on mount
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      authApi.verify()
        .then(res => {
          if (res.authenticated) {
            setIsAdminAuthenticated(true);
            setAdminUser(res.user);
          }
        })
        .catch(() => {
          setIsAdminAuthenticated(false);
        });
    }
  }, []);

  // Sync with browser URL hash for routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash === '#/admin' || hash === '#admin') {
        setCurrentPage('admin');
      } else if (
        hash === '#/menu' || 
        hash === '#menu' || 
        hash.startsWith('#/menu') ||
        hash === '#/services' || 
        hash === '#services' ||
        hash.startsWith('#/services')
      ) {
        setCurrentPage('services');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    if (page === 'services') {
      if (window.location.hash !== '#/menu') {
        window.location.hash = '#/menu';
      }
      setCurrentPage('services');
    } else if (page === 'admin') {
      if (window.location.hash !== '#/admin') {
        window.location.hash = '#/admin';
      }
      setCurrentPage('admin');
    } else {
      if (window.location.hash && (window.location.hash.includes('menu') || window.location.hash.includes('admin') || window.location.hash.includes('services'))) {
        window.history.pushState(null, '', window.location.pathname);
      }
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWizard = (category = null) => {
    setWizardCategory(category);
    setWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setWizardOpen(false);
    setWizardCategory(null);
  };

  // If on Admin route, render Admin portal
  if (currentPage === 'admin') {
    return isAdminAuthenticated ? (
      <AdminLayout
        user={adminUser}
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }}
        onBackToSite={() => handleNavigate('home')}
      />
    ) : (
      <AdminLogin
        onLoginSuccess={(user) => {
          setIsAdminAuthenticated(true);
          setAdminUser(user);
        }}
        onBackToSite={() => handleNavigate('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f0fdfa] text-[#0f2922] flex flex-col font-sans transition-colors duration-200 selection:bg-teal-500 selection:text-white">
      {/* Global Navbar */}
      <Navbar 
        onOpenWizard={() => handleOpenWizard()} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main View: Landing Page OR Full Menu Page */}
      <main className="flex-grow">
        {currentPage === 'services' ? (
          <AllServicesPage 
            onOpenWizard={handleOpenWizard}
            onBackToHome={() => handleNavigate('home')}
          />
        ) : (
          <>
            {/* Top Showcase Banner */}
            <Hero onOpenWizard={handleOpenWizard} />

            {/* Middle Main Showcase: Our Menu (Big Food Cards) + Executive Chef & Reviews */}
            <MainShowcaseSection 
              onOpenWizard={handleOpenWizard} 
              onViewAllServices={() => handleNavigate('services')}
            />

            {/* Bottom Bento Feature Cards */}
            <BentoFeatureCards 
              onOpenWizard={handleOpenWizard} 
              onViewAllServices={() => handleNavigate('services')}
            />

            {/* Visual Archive Gallery: 15 Premium User Photos with Filtering & Lightbox */}
            <GallerySection onOpenWizard={handleOpenWizard} />

            {/* Hilltop Location & Interactive Google Map */}
            <LocationHoursSection onOpenWizard={handleOpenWizard} />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer 
        onOpenWizard={() => handleOpenWizard()} 
        onNavigate={handleNavigate}
      />

      {/* Table Reservation & Shuttle Modal */}
      <QuoteWizardModal
        isOpen={wizardOpen}
        onClose={handleCloseWizard}
        initialCategory={wizardCategory}
      />

      {/* Sticky Mobile Bottom Reservation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-teal-200 p-3 flex items-center gap-3 shadow-2xl">
        <a
          href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
          className="flex-1 py-3 px-3.5 rounded-full bg-teal-50 text-teal-900 border border-teal-200 font-bold text-xs flex items-center justify-center space-x-1.5 active:scale-95 shadow-xs"
        >
          <span>Call: {BUSINESS_INFO.phone}</span>
        </a>
        <button
          onClick={() => handleOpenWizard()}
          className="flex-1 py-3 px-3.5 rounded-full bg-teal-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1 shadow-md active:scale-95"
        >
          <span>Book Table</span>
        </button>
      </div>
    </div>
  );
}
