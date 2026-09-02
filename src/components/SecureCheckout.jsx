import React, { useState } from 'react';

export default function SecureCheckout({ selectedPlan, isAnnual, onCheckoutSuccess, onCancel }) {
  const planName = selectedPlan ? selectedPlan.name : 'Sanctuary Pro Annual';
  const rawPrice = selectedPlan ? (isAnnual ? selectedPlan.priceAnnual : selectedPlan.priceMonthly) : '$59.99';
  const numericPrice = parseFloat(rawPrice.replace('$', '')) || 59.99;

  const [paymentMethod, setPaymentMethod] = useState('card'); // card, apple, google
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('•••');
  const [nameOnCard, setNameOnCard] = useState('Alex Morgan');
  const [country, setCountry] = useState('United States');

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'RESTART2026') {
      const discVal = numericPrice * 0.2;
      setDiscount(discVal);
      setPromoSuccess('20% Sanctuary discount applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "RESTART2026"');
      setPromoSuccess('');
    }
  };

  const finalTotal = Math.max(0, numericPrice - discount).toFixed(2);

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  return (
    <main class="flex-grow w-full max-w-[1100px] mx-auto px-container-padding-mobile md:px-container-padding-desktop py-8 pb-24 md:pb-16">
      {/* Header Bar */}
      <div class="flex justify-between items-center mb-8 pb-4 border-b border-surface-variant dark:border-outline/20">
        <div>
          <span class="font-headline-lg text-xl font-bold text-primary dark:text-primary-fixed flex items-center gap-2">
            <span class="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            ReStart
          </span>
        </div>
        <button
          onClick={onCancel}
          class="flex items-center gap-1 font-label-caps text-xs text-on-surface-variant hover:text-primary transition-colors"
        >
          <span class="material-symbols-outlined text-base">close</span>
          Cancel Checkout
        </button>
      </div>

      <div class="mb-8 text-center md:text-left">
        <h1 class="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl font-semibold text-on-background mb-2">
          Complete your journey
        </h1>
        <p class="text-on-surface-variant dark:text-outline-variant text-sm max-w-2xl">
          Unlock premium wellness insights, guided AI relaxation, and full access to your personal sanctuary.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Order Summary */}
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="bg-surface-container-low dark:bg-inverse-surface/40 rounded-3xl p-6 md:p-8 border border-surface-container-high dark:border-outline/20 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <span class="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
              <h2 class="font-headline-lg-mobile text-lg font-bold text-on-surface dark:text-on-surface">
                {planName}
              </h2>
            </div>

            {/* Trial Callout */}
            <div class="bg-primary-container text-on-primary-container rounded-2xl p-4 mb-6 flex items-start gap-3 text-xs">
              <span class="material-symbols-outlined mt-0.5 text-base shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <div>
                <p class="font-bold mb-0.5">Includes 7-Day Free Trial</p>
                <p class="opacity-90">You won't be charged until your trial ends. Cancel anytime with one click.</p>
              </div>
            </div>

            {/* Price Line Items */}
            <div class="space-y-3 border-b border-surface-variant dark:border-outline/20 pb-4 mb-4 text-xs md:text-sm">
              <div class="flex justify-between items-center text-on-surface-variant dark:text-outline-variant">
                <span>{planName} ({isAnnual ? 'Billed yearly' : 'Billed monthly'})</span>
                <span class="font-medium text-on-surface">${numericPrice.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div class="flex justify-between items-center text-primary dark:text-primary-fixed font-semibold">
                  <span>Sanctuary Promo Discount (20%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div class="flex justify-between items-center text-on-surface-variant dark:text-outline-variant">
                <span>Tax (Calculated at checkout)</span>
                <span>$0.00</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div class="mb-6">
              <label class="block font-label-caps text-[10px] text-on-surface-variant dark:text-outline-variant mb-1.5 uppercase font-bold tracking-wider">
                Promo Code
              </label>
              <div class="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Try 'RESTART2026'"
                  class="flex-grow bg-surface-container dark:bg-inverse-surface/80 border border-outline-variant/40 rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-xs text-on-surface"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  class="bg-surface-variant dark:bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoSuccess && <p class="text-primary text-[11px] mt-1 font-semibold">{promoSuccess}</p>}
              {promoError && <p class="text-error text-[11px] mt-1 font-semibold">{promoError}</p>}
            </div>

            {/* Total */}
            <div class="flex justify-between items-end pt-2">
              <span class="font-headline-lg-mobile text-base font-bold text-on-surface">Total Due Today</span>
              <div class="text-right">
                <span class="font-display-lg text-3xl font-bold text-primary dark:text-primary-fixed">
                  $0.00
                </span>
                <p class="text-[11px] text-on-surface-variant dark:text-outline-variant mt-0.5">
                  (${finalTotal} / {isAnnual ? 'year' : 'month'} after trial)
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div class="bg-surface-container-lowest dark:bg-inverse-surface/20 rounded-2xl border border-surface-variant/40 dark:border-outline/20 p-5 flex flex-col gap-4 text-xs">
            <div class="flex items-center gap-3.5 text-on-surface-variant dark:text-outline-variant">
              <div class="bg-secondary-container text-on-secondary-container p-2.5 rounded-full shrink-0">
                <span class="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shield_lock
                </span>
              </div>
              <div>
                <p class="font-semibold text-on-surface dark:text-on-surface">Encrypted 256-Bit Checkout</p>
                <p class="text-[11px]">Your payment information is end-to-end encrypted.</p>
              </div>
            </div>
            <div class="flex items-center gap-3.5 text-on-surface-variant dark:text-outline-variant">
              <div class="bg-secondary-container text-on-secondary-container p-2.5 rounded-full shrink-0">
                <span class="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
              <div>
                <p class="font-semibold text-on-surface dark:text-on-surface">30-Day Sanctuary Guarantee</p>
                <p class="text-[11px]">Full refund anytime if you're not completely satisfied.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Methods */}
        <div class="lg:col-span-7">
          <div class="bg-surface-container-lowest dark:bg-inverse-surface/40 rounded-3xl p-6 md:p-8 border border-surface-container-high dark:border-outline/20 shadow-sm">
            <h3 class="font-headline-lg-mobile text-lg font-semibold text-on-surface mb-6">
              Select Payment Method
            </h3>

            {/* Wallet Options */}
            <div class="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('apple')}
                class={`border rounded-2xl p-3.5 flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'apple'
                    ? 'border-primary bg-primary-container/10 text-primary font-bold shadow-sm'
                    : 'border-outline-variant/40 hover:bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <span class="material-symbols-outlined">account_balance_wallet</span>
                <span class="text-xs font-semibold">Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('google')}
                class={`border rounded-2xl p-3.5 flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'google'
                    ? 'border-primary bg-primary-container/10 text-primary font-bold shadow-sm'
                    : 'border-outline-variant/40 hover:bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <span class="material-symbols-outlined">payments</span>
                <span class="text-xs font-semibold">Google Pay</span>
              </button>
            </div>

            <div class="relative flex py-4 items-center mb-4">
              <div class="flex-grow border-t border-surface-variant dark:border-outline/20"></div>
              <span class="flex-shrink-0 mx-4 text-on-surface-variant text-[11px] font-label-caps uppercase font-bold">
                Or pay with card
              </span>
              <div class="flex-grow border-t border-surface-variant dark:border-outline/20"></div>
            </div>

            {/* Card Form */}
            <form onSubmit={handleSubmitPayment} class="space-y-4">
              <div>
                <label class="block font-label-caps text-[10px] text-on-surface-variant dark:text-outline-variant mb-1 uppercase font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="w-full bg-surface-container-low dark:bg-inverse-surface/80 border border-outline-variant/40 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none text-on-surface"
                />
              </div>

              <div>
                <label class="block font-label-caps text-[10px] text-on-surface-variant dark:text-outline-variant mb-1 uppercase font-bold">
                  Card Information
                </label>
                <div class="border border-outline-variant/40 rounded-xl overflow-hidden bg-surface-container-low dark:bg-inverse-surface/80">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    class="w-full bg-transparent px-4 py-3 text-xs border-b border-outline-variant/30 focus:outline-none text-on-surface"
                  />
                  <div class="flex">
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      class="w-1/2 bg-transparent px-4 py-3 text-xs border-r border-outline-variant/30 focus:outline-none text-on-surface"
                    />
                    <input
                      type="text"
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="CVC"
                      class="w-1/2 bg-transparent px-4 py-3 text-xs focus:outline-none text-on-surface"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label class="block font-label-caps text-[10px] text-on-surface-variant dark:text-outline-variant mb-1 uppercase font-bold">
                  Name on Card
                </label>
                <input
                  type="text"
                  required
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  class="w-full bg-surface-container-low dark:bg-inverse-surface/80 border border-outline-variant/40 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none text-on-surface"
                />
              </div>

              <div>
                <label class="block font-label-caps text-[10px] text-on-surface-variant dark:text-outline-variant mb-1 uppercase font-bold">
                  Country or Region
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  class="w-full bg-surface-container-low dark:bg-inverse-surface/80 border border-outline-variant/40 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none text-on-surface"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Germany</option>
                </select>
              </div>

              <div class="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  class="w-full bg-primary text-on-primary rounded-full py-4 px-6 font-label-caps text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-tint transition-all breathing-pulse shadow-md"
                >
                  {isProcessing ? (
                    <span class="flex items-center gap-2">
                      <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Securing Sanctuary...
                    </span>
                  ) : (
                    <>
                      <span class="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        lock
                      </span>
                      Start 7-Day Free Trial
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Confirmation Modal */}
      {showSuccessModal && (
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-background dark:bg-inverse-surface rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-primary/30 animate-fade-in">
            <div class="w-20 h-20 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-6 breathing-pulse">
              <span class="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
            </div>
            <h2 class="font-headline-lg-mobile text-2xl font-bold text-primary dark:text-primary-fixed mb-2">
              Welcome to ReStart Sanctuary!
            </h2>
            <p class="text-on-surface-variant dark:text-outline-variant text-xs md:text-sm mb-6 leading-relaxed">
              Your 7-day free trial has been activated. Explore your AI companion, guided breathing, and personalized growth tools right away.
            </p>
            <button
              onClick={onCheckoutSuccess}
              class="w-full py-3.5 bg-primary text-on-primary rounded-full font-label-caps text-xs font-bold hover:bg-surface-tint transition-colors shadow-md"
            >
              Enter AI Companion
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
