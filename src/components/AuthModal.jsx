import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' or 'signup'
  const { login, signup } = useAuth();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Status states
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccessMsg('');
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (activeTab === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!agreeTerms) {
        setError('Please agree to the Terms of Service & Privacy Policy.');
        return;
      }

      setIsSubmitting(true);
      const res = await signup(name, email, password);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMsg(res.isDemo ? 'Account created! (Demo Mode)' : 'Account created successfully!');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1200);
      } else {
        setError(res.error || 'Failed to create account.');
      }
    } else {
      if (!email.trim() || !password) {
        setError('Please enter both email and password.');
        return;
      }

      setIsSubmitting(true);
      const res = await login(email, password);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMsg(res.isDemo ? 'Logged in! (Demo Mode)' : 'Welcome back!');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1200);
      } else {
        setError(res.error || 'Invalid credentials.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity animate-fadeIn">
      {/* Container Card */}
      <div 
        className="relative w-full max-w-md bg-background dark:bg-inverse-surface border border-outline-variant/30 dark:border-outline/20 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container hover:bg-surface-variant dark:bg-surface-container-high dark:text-on-surface flex items-center justify-center text-on-surface-variant transition-colors"
          aria-label="Close auth modal"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary-container/40 dark:bg-primary/20 text-primary dark:text-primary-fixed flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          </div>
          <h2 className="text-2xl font-bold font-headline-lg text-on-background dark:text-on-surface">
            {activeTab === 'login' ? 'Welcome Back to ReStart' : 'Begin Your Sanctuary Journey'}
          </h2>
          <p className="text-xs text-on-surface-variant dark:text-outline-variant mt-1 font-body-sm">
            {activeTab === 'login' 
              ? 'Sign in to access your personalized wellness companion' 
              : 'Create your account with zero pressure'}
          </p>
        </div>

        {/* Segmented Tab Switcher */}
        <div className="flex p-1 mb-6 rounded-xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/20">
          <button
            type="button"
            onClick={() => handleTabSwitch('login')}
            className={`flex-1 py-2 text-sm font-label-caps font-semibold rounded-lg transition-all ${
              activeTab === 'login'
                ? 'bg-background dark:bg-primary text-primary dark:text-on-primary shadow-sm'
                : 'text-on-surface-variant dark:text-outline-variant hover:text-on-background'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('signup')}
            className={`flex-1 py-2 text-sm font-label-caps font-semibold rounded-lg transition-all ${
              activeTab === 'signup'
                ? 'bg-background dark:bg-primary text-primary dark:text-on-primary shadow-sm'
                : 'text-on-surface-variant dark:text-outline-variant hover:text-on-background'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-error-container/30 text-error border border-error/30 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div>
              <label className="block text-xs font-label-caps text-on-surface-variant dark:text-outline-variant mb-1 font-semibold">
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">
                  person
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container/50 dark:bg-surface-container-high border border-outline-variant/40 dark:border-outline/30 focus:outline-none focus:border-primary text-sm transition-colors text-on-background dark:text-on-surface"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-label-caps text-on-surface-variant dark:text-outline-variant mb-1 font-semibold">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container/50 dark:bg-surface-container-high border border-outline-variant/40 dark:border-outline/30 focus:outline-none focus:border-primary text-sm transition-colors text-on-background dark:text-on-surface"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-label-caps text-on-surface-variant dark:text-outline-variant mb-1 font-semibold">
              Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container/50 dark:bg-surface-container-high border border-outline-variant/40 dark:border-outline/30 focus:outline-none focus:border-primary text-sm transition-colors text-on-background dark:text-on-surface"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-background text-lg"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {activeTab === 'signup' && (
            <div>
              <label className="block text-xs font-label-caps text-on-surface-variant dark:text-outline-variant mb-1 font-semibold">
                Confirm Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">
                  verified_user
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container/50 dark:bg-surface-container-high border border-outline-variant/40 dark:border-outline/30 focus:outline-none focus:border-primary text-sm transition-colors text-on-background dark:text-on-surface"
                />
              </div>
            </div>
          )}

          {activeTab === 'signup' ? (
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-outline-variant text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-xs text-on-surface-variant dark:text-outline-variant">
                I agree to the <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer text-on-surface-variant dark:text-outline-variant">
                <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-primary font-semibold hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-2 rounded-xl bg-primary text-on-primary dark:bg-primary-fixed dark:text-on-primary-fixed font-label-caps font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="inline-block w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>{activeTab === 'login' ? 'Sign In' : 'Create Sanctuary Account'}</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-5">
          <div className="flex-grow border-t border-outline-variant/30 dark:border-outline/20"></div>
          <span className="flex-shrink mx-3 text-[11px] font-label-caps text-on-surface-variant/70">OR</span>
          <div className="flex-grow border-t border-outline-variant/30 dark:border-outline/20"></div>
        </div>

        {/* Social Options */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleTabSwitch('login')}
            className="py-2.5 px-3 rounded-xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 dark:border-outline/20 hover:bg-surface-variant text-xs font-semibold flex items-center justify-center gap-2 text-on-background dark:text-on-surface transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch('login')}
            className="py-2.5 px-3 rounded-xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 dark:border-outline/20 hover:bg-surface-variant text-xs font-semibold flex items-center justify-center gap-2 text-on-background dark:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-base">apple</span>
            <span>Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
}
