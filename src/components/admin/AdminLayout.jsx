import React, { useState, useEffect } from 'react';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import InboxView from './InboxView';
import AdminSettings from './AdminSettings';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';
import { authApi, quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminLayout({ user, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modalQuote, setModalQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });

  useEffect(() => {
    quotesApi.getStats().then(setStats).catch(() => {});
  }, [activeTab]);

  const handleLogout = async () => {
    await authApi.logout();
    onLogout();
  };

  const navItems = [
    { id: 'dashboard', label: 'Management Overview', badge: null },
    { id: 'orders', label: 'Table Reservations', badge: stats.total > 0 ? stats.total : null },
    { id: 'inbox', label: 'Guest Messages', badge: stats.pending > 0 ? stats.pending : null },
  ];

  return (
    <div className="min-h-screen bg-[#f0fdfa] text-ocean-dark font-sans flex antialiased">
      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a2e2a] text-white border-r border-teal-900/60 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-xl ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Header & Logo */}
        <div>
          <div className="h-20 flex items-center px-5 border-b border-teal-900/60 space-x-3">
            <img 
              src="/images/gallery-new-01.jpg" 
              alt="Perrys Grillz Hilltop" 
              className="w-10 h-10 rounded-full object-cover border-2 border-teal-400 shadow-sm"
            />
            <div className="overflow-hidden text-left">
              <span className="font-serif font-bold text-white text-sm tracking-tight block truncate">
                Perry's Grillz
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-teal-300 block font-mono font-semibold">
                Management Suite
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md font-bold'
                      : 'text-teal-100/80 hover:bg-teal-900/50 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== null && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-teal-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-teal-900/60 space-y-2.5">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-teal-700/50 text-teal-200 hover:text-white hover:bg-teal-900/50 text-xs font-medium transition cursor-pointer"
          >
            <span>← View Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs text-red-300 hover:bg-red-950/40 transition font-medium cursor-pointer"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-teal-200/90 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3 overflow-hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-xs font-bold uppercase tracking-wider text-teal-900 shadow-xs cursor-pointer shrink-0"
              aria-label="Open Navigation Menu"
            >
              Menu
            </button>
            <h1 className="font-serif text-base sm:text-xl lg:text-2xl font-bold text-ocean-dark capitalize truncate">
              {activeTab === 'dashboard' ? "Management Overview" :
               activeTab === 'orders' ? "Table Reservations" :
               "Guest Concierge Inbox"}
            </h1>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsNewOrderOpen(true)}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 sm:px-6 py-2.5 text-xs uppercase tracking-wider transition shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
            >
              + Reservation
            </button>

            <img 
              src="/images/gallery-new-01.jpg" 
              alt="Management" 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-teal-400 shadow-xs"
            />
          </div>
        </header>

        {/* View Component Render */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#f0fdfa]">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              stats={stats}
              onViewAllOrders={() => setActiveTab('orders')}
              onOpenQuoteDetail={(q) => setModalQuote(q)}
              onNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView 
              onOpenQuoteDetail={(q) => setModalQuote(q)}
              onNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'inbox' && (
            <InboxView 
              onOpenQuoteDetail={(q) => setModalQuote(q)}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings />
          )}
        </main>
      </div>

      {/* Quote Detail Modal */}
      {modalQuote && (
        <QuoteDetailModal 
          quote={modalQuote}
          onClose={() => setModalQuote(null)}
          onUpdated={() => {
            quotesApi.getStats().then(setStats).catch(() => {});
          }}
        />
      )}

      {/* New Order Modal */}
      {isNewOrderOpen && (
        <NewOrderModal 
          isOpen={isNewOrderOpen}
          onClose={() => setIsNewOrderOpen(false)}
          onCreated={() => {
            setIsNewOrderOpen(false);
            quotesApi.getStats().then(setStats).catch(() => {});
            setActiveTab('orders');
          }}
        />
      )}
    </div>
  );
}
