import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import AiCompanion from './components/AiCompanion';
import MembershipServices from './components/MembershipServices';
import ProfileSettings from './components/ProfileSettings';
import RealStories from './components/RealStories';
import SecureCheckout from './components/SecureCheckout';
import JourneyHistory from './components/JourneyHistory';

export default function App() {
  const [activeTab, setActiveTab] = useState('ai_companion'); // ai_companion, membership, profile, stories, checkout, journey
  const [darkMode, setDarkMode] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [checkoutIsAnnual, setCheckoutIsAnnual] = useState(true);

  // Apply dark mode class to html document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectPlan = (plan, isAnnual) => {
    setCheckoutPlan(plan);
    setCheckoutIsAnnual(isAnnual);
    setActiveTab('checkout');
  };

  const handleCheckoutSuccess = () => {
    setActiveTab('ai_companion');
  };

  return (
    <div class="min-h-screen flex flex-col bg-background dark:bg-inverse-surface/95 text-on-background dark:text-on-surface transition-colors duration-300">
      {/* Navigation (Only show if not in checkout mode or show header) */}
      {activeTab !== 'checkout' && (
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      {/* View Switcher */}
      <div class="flex-grow flex flex-col">
        {activeTab === 'ai_companion' && <AiCompanion />}
        {activeTab === 'membership' && (
          <MembershipServices onSelectPlan={handleSelectPlan} />
        )}
        {activeTab === 'profile' && (
          <ProfileSettings darkMode={darkMode} setDarkMode={setDarkMode} />
        )}
        {activeTab === 'stories' && <RealStories />}
        {activeTab === 'checkout' && (
          <SecureCheckout
            selectedPlan={checkoutPlan}
            isAnnual={checkoutIsAnnual}
            onCheckoutSuccess={handleCheckoutSuccess}
            onCancel={() => setActiveTab('membership')}
          />
        )}
        {activeTab === 'journey' && <JourneyHistory />}
      </div>

      {/* Footer */}
      {activeTab !== 'checkout' && (
        <footer class="w-full py-6 bg-background dark:bg-inverse-surface border-t border-outline-variant/30 dark:border-outline/20 mt-auto hidden md:flex flex-col items-center gap-2 max-w-[1100px] mx-auto px-container-padding-desktop text-center text-xs">
          <div class="flex gap-6 mb-1">
            <button class="font-label-caps text-on-surface-variant dark:text-outline-variant opacity-80 hover:text-primary transition-opacity">
              Medical Disclaimer
            </button>
            <button class="font-label-caps text-on-surface-variant dark:text-outline-variant opacity-80 hover:text-primary transition-opacity">
              Privacy Policy
            </button>
            <button class="font-label-caps text-on-surface-variant dark:text-outline-variant opacity-80 hover:text-primary transition-opacity">
              Terms of Service
            </button>
          </div>
          <p class="font-label-caps font-bold text-on-surface-variant dark:text-outline-variant opacity-90">
            © 2026 ReStart AI Wellness. Your sanctuary for beginning again.
          </p>
        </footer>
      )}
    </div>
  );
}
