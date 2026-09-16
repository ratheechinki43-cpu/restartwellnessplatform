import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfileSettings({ darkMode, setDarkMode, onOpenAuthModal }) {
  const { user, isLoggedIn, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // overview, settings

  const [accentColor, setAccentColor] = useState('sage'); // sage, ocean, amber, lavender, rose
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [aiInsightsEnabled, setAiInsightsEnabled] = useState(true);
  const [audioSoundsEnabled, setAudioSoundsEnabled] = useState(false);
  const [restartCount, setRestartCount] = useState(6);
  const [showNotification, setShowNotification] = useState(false);

  const handleUpdateProfile = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const accentColors = [
    { id: 'sage', bg: 'bg-primary', ring: 'ring-primary' },
    { id: 'ocean', bg: 'bg-secondary', ring: 'ring-secondary' },
    { id: 'amber', bg: 'bg-tertiary-fixed-dim', ring: 'ring-tertiary-fixed-dim' },
    { id: 'lavender', bg: 'bg-[#d0bcff]', ring: 'ring-[#d0bcff]' },
    { id: 'rose', bg: 'bg-[#ffb4ab]', ring: 'ring-[#ffb4ab]' },
  ];

  return (
    <main class="flex-grow w-full max-w-[1100px] mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-8 pb-24 md:pb-16">
      {/* Toast Notification */}
      {showNotification && (
        <div class="fixed top-24 right-6 bg-primary text-on-primary px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 animate-bounce">
          <span class="material-symbols-outlined text-sm">check_circle</span>
          <span class="font-label-caps text-xs">Profile lifestyle updated successfully!</span>
        </div>
      )}

      {/* Profile Header */}
      <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden breathing-pulse border-4 border-primary-container/30">
          <img
            alt={user?.name || "User Avatar"}
            className="w-full h-full object-cover"
            src={user?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"}
          />
        </div>
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary dark:text-primary-fixed">
              {isLoggedIn ? user?.name : 'Sanctuary Guest'}
            </h1>
            <span className="bg-primary-container/20 text-primary dark:text-primary-fixed text-xs px-3 py-1 rounded-full font-label-caps font-bold">
              {isLoggedIn ? 'Sanctuary Member' : 'Guest Account'}
            </span>
          </div>
          <p className="text-on-surface-variant dark:text-outline-variant text-sm md:text-base mb-4 max-w-md">
            {isLoggedIn ? (user?.email || 'Embracing the journey of continuous renewal.') : 'Sign in to sync your wellness journey, personalized AI resets, and history.'}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <button
              onClick={handleUpdateProfile}
              className="bg-primary text-on-primary rounded-full px-6 py-2.5 font-label-caps text-xs hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Update My Lifestyle
            </button>

            {!isLoggedIn ? (
              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
                className="bg-surface-container-high dark:bg-surface-container text-on-surface rounded-full px-6 py-2.5 font-label-caps text-xs hover:bg-surface-variant transition-colors flex items-center justify-center gap-2 border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-sm">login</span>
                Sign In / Sign Up
              </button>
            ) : (
              <button
                onClick={logout}
                className="bg-error-container/30 text-error rounded-full px-5 py-2.5 font-label-caps text-xs hover:bg-error-container/50 transition-colors flex items-center justify-center gap-1.5 border border-error/20"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Sign Out
              </button>
            )}
          </div>
        </div>
      </section>


      {/* Stats Bento Grid */}
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* ReStart Count */}
        <div class="bg-surface-container-low dark:bg-inverse-surface/40 rounded-[24px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md border border-surface-container-high dark:border-outline/20">
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-primary opacity-10 rounded-full blur-2xl"></div>
          <div>
            <h3 class="font-label-caps text-xs text-on-surface-variant dark:text-outline-variant mb-1 flex items-center gap-2 font-bold uppercase tracking-wider">
              <span class="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                restart_alt
              </span>
              ReStart Count
            </h3>
            <p class="text-on-surface-variant dark:text-outline-variant text-xs opacity-80">
              Moments you explicitly chose to begin again without shame.
            </p>
          </div>
          <div class="mt-6 flex items-baseline justify-between">
            <div class="flex items-baseline gap-2">
              <span class="font-stats-lg text-4xl font-bold text-primary dark:text-primary-fixed">
                {restartCount}
              </span>
              <span class="text-on-surface-variant dark:text-outline-variant text-sm">times</span>
            </div>
            <button 
              onClick={() => setRestartCount(prev => prev + 1)}
              class="px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-xs font-label-caps hover:scale-105 transition-transform"
            >
              + Log ReStart
            </button>
          </div>
        </div>

        {/* Consistency Score */}
        <div class="bg-surface-container-low dark:bg-inverse-surface/40 rounded-[24px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md border border-surface-container-high dark:border-outline/20">
          <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary opacity-10 rounded-full blur-2xl"></div>
          <div>
            <h3 class="font-label-caps text-xs text-on-surface-variant dark:text-outline-variant mb-1 flex items-center gap-2 font-bold uppercase tracking-wider">
              <span class="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                monitoring
              </span>
              Consistency Index
            </h3>
            <p class="text-on-surface-variant dark:text-outline-variant text-xs opacity-80">
              Steady progress over perfection. No zero-days.
            </p>
          </div>
          <div class="mt-6 flex items-center gap-6">
            <div class="relative w-20 h-20">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  class="text-surface-variant dark:text-outline-variant/30"
                  cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8"
                />
                <circle
                  class="text-primary dark:text-primary-fixed"
                  cx="50" cy="50" r="40" fill="transparent" stroke="currentColor"
                  strokeDasharray="251.2" strokeDashoffset="40" strokeLinecap="round" strokeWidth="8"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="font-stats-lg text-xl text-primary dark:text-primary-fixed font-bold">84%</span>
              </div>
            </div>
            <div>
              <p class="text-xs font-bold text-on-surface dark:text-on-surface">Very Balanced</p>
              <p class="text-xs text-on-surface-variant dark:text-outline-variant mt-1">
                4 days of active reflection this week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section class="mt-8">
        <div class="flex gap-8 border-b border-surface-variant dark:border-outline/20 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            class={`pb-4 font-label-caps text-xs transition-colors ${
              activeTab === 'overview'
                ? 'text-primary dark:text-primary-fixed border-b-2 border-primary font-bold'
                : 'text-on-surface-variant dark:text-outline-variant hover:text-primary'
            }`}
          >
            Sanctuary Preferences
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            class={`pb-4 font-label-caps text-xs transition-colors ${
              activeTab === 'settings'
                ? 'text-primary dark:text-primary-fixed border-b-2 border-primary font-bold'
                : 'text-on-surface-variant dark:text-outline-variant hover:text-primary'
            }`}
          >
            Account & Privacy
          </button>
        </div>

        {activeTab === 'overview' && (
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Appearance Settings */}
            <div class="bg-surface-container-low dark:bg-inverse-surface/40 rounded-[24px] p-6 md:p-8 border border-surface-container-high dark:border-outline/20">
              <h3 class="font-headline-lg-mobile text-lg text-primary dark:text-primary-fixed mb-6 font-semibold">
                Appearance & Theme
              </h3>
              
              <div class="flex items-center justify-between mb-8">
                <div>
                  <p class="font-medium text-sm text-on-surface dark:text-on-surface mb-0.5">Theme Mode</p>
                  <p class="text-xs text-on-surface-variant dark:text-outline-variant">
                    Choose your sanctuary's lighting environment.
                  </p>
                </div>
                <div class="flex bg-surface-variant dark:bg-surface-container-high rounded-full p-1 border border-surface-container">
                  <button
                    onClick={() => setDarkMode(false)}
                    class={`px-3 py-1.5 rounded-full font-label-caps text-xs flex items-center gap-1.5 transition-all ${
                      !darkMode
                        ? 'bg-background shadow-sm text-primary font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span class="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      light_mode
                    </span>
                    Light
                  </button>
                  <button
                    onClick={() => setDarkMode(true)}
                    class={`px-3 py-1.5 rounded-full font-label-caps text-xs flex items-center gap-1.5 transition-all ${
                      darkMode
                        ? 'bg-background dark:bg-inverse-surface text-primary-fixed font-bold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span class="material-symbols-outlined text-sm">dark_mode</span>
                    Dark
                  </button>
                </div>
              </div>

              <div>
                <p class="font-medium text-sm text-on-surface dark:text-on-surface mb-3">Accent Color Theme</p>
                <div class="flex gap-4">
                  {accentColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setAccentColor(color.id)}
                      class={`w-10 h-10 rounded-full ${color.bg} flex items-center justify-center transition-transform hover:scale-110 ${
                        accentColor === color.id ? `ring-2 ring-offset-2 ${color.ring}` : ''
                      }`}
                    >
                      {accentColor === color.id && (
                        <span class="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications & Preferences */}
            <div class="bg-surface-container-low dark:bg-inverse-surface/40 rounded-[24px] p-6 md:p-8 border border-surface-container-high dark:border-outline/20">
              <h3 class="font-headline-lg-mobile text-lg text-primary dark:text-primary-fixed mb-6 font-semibold">
                Nudges & Guidance
              </h3>

              <div class="space-y-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-sm text-on-surface dark:text-on-surface">Gentle Reminders</p>
                    <p class="text-xs text-on-surface-variant dark:text-outline-variant">
                      Soft nudges for mindful reset moments.
                    </p>
                  </div>
                  <button
                    onClick={() => setRemindersEnabled(!remindersEnabled)}
                    class={`w-12 h-6 rounded-full relative transition-colors ${
                      remindersEnabled ? 'bg-primary' : 'bg-surface-variant'
                    }`}
                  >
                    <div
                      class={`w-4 h-4 bg-on-primary rounded-full absolute top-1 transition-transform ${
                        remindersEnabled ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-sm text-on-surface dark:text-on-surface">AI Insights & Reflections</p>
                    <p class="text-xs text-on-surface-variant dark:text-outline-variant">
                      Personalized emotional pattern summaries.
                    </p>
                  </div>
                  <button
                    onClick={() => setAiInsightsEnabled(!aiInsightsEnabled)}
                    class={`w-12 h-6 rounded-full relative transition-colors ${
                      aiInsightsEnabled ? 'bg-primary' : 'bg-surface-variant'
                    }`}
                  >
                    <div
                      class={`w-4 h-4 bg-on-primary rounded-full absolute top-1 transition-transform ${
                        aiInsightsEnabled ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-sm text-on-surface dark:text-on-surface">Ambient Relaxation Audio</p>
                    <p class="text-xs text-on-surface-variant dark:text-outline-variant">
                      Soft background rain and forest sounds.
                    </p>
                  </div>
                  <button
                    onClick={() => setAudioSoundsEnabled(!audioSoundsEnabled)}
                    class={`w-12 h-6 rounded-full relative transition-colors ${
                      audioSoundsEnabled ? 'bg-primary' : 'bg-surface-variant'
                    }`}
                  >
                    <div
                      class={`w-4 h-4 bg-on-primary rounded-full absolute top-1 transition-transform ${
                        audioSoundsEnabled ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div class="bg-surface-container-low dark:bg-inverse-surface/40 rounded-[24px] p-6 md:p-8 border border-surface-container-high dark:border-outline/20">
            <h3 class="font-headline-lg-mobile text-lg text-primary dark:text-primary-fixed mb-4 font-semibold">
              Account Safety & Data
            </h3>
            <p class="text-xs text-on-surface-variant dark:text-outline-variant mb-6">
              Your personal data and chat history are private to your device. ReStart never sells or shares emotional reflection data.
            </p>
            <div class="flex gap-4">
              <button class="px-6 py-2.5 bg-surface-variant dark:bg-surface-container-high text-on-surface rounded-full text-xs font-label-caps hover:bg-surface-container-highest transition-colors">
                Export Reflection Journal
              </button>
              <button class="px-6 py-2.5 bg-error-container text-on-error-container rounded-full text-xs font-label-caps hover:bg-error hover:text-on-error transition-colors">
                Clear Local Chat Cache
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
