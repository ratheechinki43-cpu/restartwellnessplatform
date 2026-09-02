import React from 'react';

export default function Navigation({ activeTab, setActiveTab, darkMode, setDarkMode }) {
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
      <header class="hidden md:block w-full top-0 sticky bg-background/90 dark:bg-inverse-surface/90 backdrop-blur-md z-50 border-b border-surface-variant/40 dark:border-outline/20">
        <div class="flex justify-between items-center h-20 px-container-padding-desktop max-w-[1100px] mx-auto w-full">
          {/* Brand */}
          <button 
            onClick={() => setActiveTab('ai_companion')}
            class="font-headline-lg text-headline-lg font-semibold text-primary dark:text-primary-fixed flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span class="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            ReStart
          </button>

          {/* Nav Links */}
          <nav class="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  class={`font-label-caps text-label-caps py-2 transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed'
                      : 'text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary dark:hover:text-primary-fixed'
                  }`}
                >
                  <span class="material-symbols-outlined text-lg">{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Trailing Actions */}
          <div class="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle Light/Dark Theme"
              class="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-variant dark:bg-surface-container-high dark:text-on-surface flex items-center justify-center transition-colors"
            >
              <span class="material-symbols-outlined text-lg">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Profile Avatar */}
            <button
              onClick={() => setActiveTab('profile')}
              class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors focus:outline-none"
            >
              <img
                alt="User profile avatar"
                class="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav class="md:hidden fixed bottom-0 w-full z-50 rounded-t-2xl bg-surface-container dark:bg-inverse-surface shadow-lg border-t border-surface-variant/30 px-container-padding-mobile py-2">
        <div class="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                class={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary scale-105'
                    : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant'
                }`}
              >
                <span className={`material-symbols-outlined text-xl ${isActive ? 'fill' : ''}`}>
                  {item.icon}
                </span>
                <span class="font-label-caps text-[10px] mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
