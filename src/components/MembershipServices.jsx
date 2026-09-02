import React, { useState } from 'react';

export default function MembershipServices({ onSelectPlan }) {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Sanctuary',
      tagline: 'Gentle introduction to daily mindfulness & basic AI check-ins.',
      priceMonthly: '$0',
      priceAnnual: '$0',
      period: 'Forever free',
      highlighted: false,
      cta: 'Get Started Free',
      features: [
        'Daily gentle mood check-in',
        '3 AI companion conversations/week',
        'Basic progress ring history',
        'Access to community stories'
      ]
    },
    {
      id: 'pro',
      name: 'Sanctuary Pro',
      tagline: 'Our most popular plan for continuous growth & guided AI companion.',
      priceMonthly: '$14.99',
      priceAnnual: '$59.99',
      period: isAnnual ? '/ year (Save 66%)' : '/ month',
      badge: 'Most Popular',
      highlighted: true,
      cta: 'Start 7-Day Free Trial',
      features: [
        'Unlimited AI Companion conversations',
        'Personalized daily reset rituals',
        'Full Journey history & mood analytics',
        'Guided breathing & ambient soundscapes',
        'Priority community resilience library',
        'Zero streak anxiety design'
      ]
    },
    {
      id: 'guidance',
      name: 'Complete Guidance',
      tagline: 'Deep restoration with 1-on-1 human wellness expert check-ins.',
      priceMonthly: '$29.99',
      priceAnnual: '$199.99',
      period: isAnnual ? '/ year' : '/ month',
      highlighted: false,
      cta: 'Choose Complete Guidance',
      features: [
        'Everything in Sanctuary Pro',
        'Monthly 1-on-1 human coaching session',
        'Customized weekly recovery action plans',
        'Direct messaging with wellness guides',
        'Exclusive sanctuary retreats & workshops'
      ]
    }
  ];

  return (
    <main class="flex-grow w-full max-w-[1100px] mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-8 pb-24 md:pb-16">
      {/* Header */}
      <section class="text-center mb-12 max-w-2xl mx-auto">
        <span class="font-label-caps text-label-caps text-primary dark:text-primary-fixed tracking-widest uppercase mb-3 block">
          Membership Services
        </span>
        <h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">
          Invest in your peace of mind.
        </h1>
        <p class="text-on-surface-variant dark:text-outline-variant text-base leading-relaxed">
          No rigid pressure. Flexible memberships built around the ReStart philosophy: choose what supports your current journey.
        </p>

        {/* Toggle */}
        <div class="inline-flex items-center bg-surface-container-high dark:bg-inverse-surface/60 rounded-full p-1.5 mt-8 border border-surface-variant/40">
          <button
            onClick={() => setIsAnnual(false)}
            class={`px-5 py-2 rounded-full font-label-caps text-xs transition-all ${
              !isAnnual
                ? 'bg-background dark:bg-surface-container-high text-primary dark:text-primary-fixed shadow-sm font-bold'
                : 'text-on-surface-variant dark:text-outline-variant hover:text-on-surface'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            class={`px-5 py-2 rounded-full font-label-caps text-xs transition-all flex items-center gap-2 ${
              isAnnual
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'text-on-surface-variant dark:text-outline-variant hover:text-on-surface'
            }`}
          >
            Annual Billing
            <span class="bg-tertiary-container text-on-tertiary-container text-[10px] px-2 py-0.5 rounded-full font-semibold">
              Save 66%
            </span>
          </button>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            class={`rounded-[24px] p-8 flex flex-col justify-between relative transition-all duration-300 ${
              plan.highlighted
                ? 'bg-surface dark:bg-inverse-surface/80 border-2 border-primary dark:border-primary-fixed shadow-[0_12px_40px_rgba(62,100,74,0.12)] scale-[1.02]'
                : 'bg-surface-container-low dark:bg-inverse-surface/40 border border-surface-container-high dark:border-outline/20 hover:shadow-md'
            }`}
          >
            {plan.badge && (
              <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-caps text-[11px] px-4 py-1 rounded-full shadow-sm tracking-wider uppercase">
                {plan.badge}
              </span>
            )}

            <div>
              <h3 class="font-headline-lg-mobile text-xl text-primary dark:text-primary-fixed mb-2 font-semibold">
                {plan.name}
              </h3>
              <p class="text-on-surface-variant dark:text-outline-variant text-xs mb-6 min-h-[36px] leading-relaxed">
                {plan.tagline}
              </p>

              <div class="mb-8 flex items-baseline gap-2">
                <span class="font-display-lg text-4xl font-bold text-on-surface dark:text-on-surface">
                  {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                </span>
                <span class="text-on-surface-variant dark:text-outline-variant text-xs">
                  {plan.period}
                </span>
              </div>

              {/* Feature List */}
              <ul class="space-y-3.5 mb-8 border-t border-surface-variant/40 dark:border-outline/20 pt-6">
                {plan.features.map((feat, i) => (
                  <li key={i} class="flex items-start gap-3 text-xs md:text-sm text-on-surface-variant dark:text-outline-variant">
                    <span class="material-symbols-outlined text-primary text-lg shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan(plan, isAnnual)}
              class={`w-full py-4 rounded-full font-label-caps text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                plan.highlighted
                  ? 'bg-primary text-on-primary hover:bg-surface-tint shadow-md breathing-pulse'
                  : 'bg-surface-variant dark:bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary'
              }`}
            >
              <span>{plan.cta}</span>
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        ))}
      </section>

      {/* ReStart Philosophy Callout */}
      <section class="mt-16 bg-primary-container/15 dark:bg-primary-container/20 rounded-[24px] p-8 text-center max-w-3xl mx-auto border border-primary-container/30">
        <div class="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mx-auto mb-4">
          <span class="material-symbols-outlined text-2xl">published_with_changes</span>
        </div>
        <h3 class="font-headline-lg-mobile text-lg text-primary dark:text-primary-fixed font-semibold mb-2">
          Cancel or Pause Anytime
        </h3>
        <p class="text-on-surface-variant dark:text-outline-variant text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          We honor your natural cycle of growth and rest. If you ever need to pause your membership, your data and progress remain safe in your sanctuary forever.
        </p>
      </section>
    </main>
  );
}
