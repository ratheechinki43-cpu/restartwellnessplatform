import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navigation({ activeTab, setActiveTab, darkMode, setDarkMode, onOpenAuthModal }) {
  const { user, isLoggedIn, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { id: 'ai_companion', label: 'AI Companion', icon: 'auto_awesome' },
    { id: 'membership', label: 'Services & Pricing', icon: 'card_membership' },
    { id: 'stories', label: 'Stories', icon: 'explore' },
    { id: 'journey', label: 'Journey', icon: 'history' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block w-full top-0 sticky bg-background/90 dark:bg-inverse-surface/90 backdrop-blur-md z-50 border-b border-surface-variant/40 dark:border-outline/20">
        <div className="flex justify-between items-center h-20 px-container-padding-desktop max-w-[1100px] mx-auto w-full">
          {/* Brand */}
          <button 
            onClick={() => setActiveTab('ai_companion')}
            className="font-headline-lg text-headline-lg font-semibold text-primary dark:text-primary-fixed flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            ReStart
          </button>

          {/* Nav Links */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`font-label-caps text-label-caps py-2 transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed'
                      : 'text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary dark:hover:text-primary-fixed'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Trailing Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle Light/Dark Theme"
              className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-variant dark:bg-surface-container-high dark:text-on-surface flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-lg">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* User Auth Section */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/40 hover:border-primary transition-all focus:outline-none flex items-center justify-center bg-primary/10"
                >
                  <img
                    alt={user?.name || "User profile avatar"}
                    className="w-full h-full object-cover"
                    src={user?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"}
                  />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-background dark:bg-inverse-surface border border-outline-variant/30 dark:border-outline/20 rounded-2xl shadow-xl p-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <div className="px-3 py-2 border-b border-outline-variant/20 mb-1">
                      <p className="text-xs font-bold text-on-background dark:text-on-surface truncate">{user?.name}</p>
                      <p className="text-[11px] text-on-surface-variant dark:text-outline-variant truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setShowDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-xs font-semibold text-left text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant rounded-xl flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">person</span>
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-xs font-semibold text-left text-error hover:bg-error-container/20 rounded-xl flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="py-2 px-4 rounded-xl bg-primary text-on-primary dark:bg-primary-fixed dark:text-on-primary-fixed font-label-caps text-xs font-bold hover:opacity-95 shadow-sm transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">login</span>
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-2xl bg-surface-container dark:bg-inverse-surface shadow-lg border-t border-surface-variant/30 px-container-padding-mobile py-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary scale-105'
                    : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant'
                }`}
              >
                <span className={`material-symbols-outlined text-xl ${isActive ? 'fill' : ''}`}>
                  {item.icon}
                </span>
                <span className="font-label-caps text-[10px] mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
