---
name: ReStart AI Wellness
colors:
  surface: '#f9faf5'
  surface-dim: '#d9dad6'
  surface-bright: '#f9faf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4ef'
  surface-container: '#edeee9'
  surface-container-high: '#e7e9e4'
  surface-container-highest: '#e2e3de'
  on-surface: '#1a1c19'
  on-surface-variant: '#424942'
  inverse-surface: '#2e312e'
  inverse-on-surface: '#f0f1ec'
  outline: '#727972'
  outline-variant: '#c1c8c0'
  surface-tint: '#41674c'
  primary: '#3e644a'
  on-primary: '#ffffff'
  primary-container: '#567d62'
  on-primary-container: '#f6fff4'
  inverse-primary: '#a7d1b0'
  secondary: '#31647a'
  on-secondary: '#ffffff'
  secondary-container: '#b1e4fd'
  on-secondary-container: '#34677c'
  tertiary: '#7d5400'
  on-tertiary: '#ffffff'
  tertiary-container: '#9d6a03'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c2edcb'
  primary-fixed-dim: '#a7d1b0'
  on-primary-fixed: '#00210f'
  on-primary-fixed-variant: '#294e36'
  secondary-fixed: '#bde9ff'
  secondary-fixed-dim: '#9bcee6'
  on-secondary-fixed: '#001f2a'
  on-secondary-fixed-variant: '#134c61'
  tertiary-fixed: '#ffddb0'
  tertiary-fixed-dim: '#fabb57'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#614000'
  background: '#f9faf5'
  on-background: '#1a1c19'
  surface-variant: '#e2e3de'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  stats-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.03em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding-mobile: 20px
  container-padding-desktop: 40px
  gutter: 16px
  section-gap: 48px
---

## Brand & Style
The design system embodies a "High-End Sanctuary" aesthetic, merging **Minimalism** with **Bold, Premium** accents. It is designed to feel like a supportive companion rather than a strict supervisor. The emotional response should be one of immediate relief and quiet confidence.

Key characteristics include:
- **Intelligent Warmth:** A balance of high-tech AI precision with soft, organic textures.
- **Non-Judgmental Interface:** Absence of "streak" counters or aggressive "shame-based" red alerts.
- **The "ReStart" Philosophy:** UI elements prioritize the ability to begin again at any moment, using soft transitions and welcoming entry points.
- **Signature Motif:** AI-driven moments utilize a "Breathing Pulse"—a soft, glowing scale animation that mimics human respiration to signal processing or guidance.

## Colors
The palette is rooted in a warm, "Paper-like" neutral base that reduces eye strain and feels more tactile than pure white.

- **Primary (Sage Green):** Used for growth, recovery actions, and primary "ReStart" buttons.
- **Secondary (Ocean Blue):** Dedicated to calm, reflection, and deep-dive data.
- **User Accents (Amber, Lavender, Rose):** Used for categorizing different wellness pillars (e.g., Sleep, Mindfulness, Nutrition) without using weight or calorie-based metrics.
- **Neutral:** A warm parchment (#F1F2ED) for light mode and a deep forest obsidian (#151F19) for dark mode.

## Typography
The typographic hierarchy creates a distinction between human guidance and technical data.

- **Headlines (Sora):** Modern and friendly. Use tight letter-spacing for large display text to maintain a premium "editorial" look.
- **Body (Inter):** Highly legible and neutral. Used for all guidance, articles, and descriptions to maintain a professional, trustworthy tone.
- **Stats/Numbers (Space Grotesk):** Geometric and tech-forward. Used exclusively for time, percentages, and progress markers to signify AI-driven accuracy.

## Layout & Spacing
This design system utilizes a **Fluid Grid** with generous "breathable" margins to prevent cognitive overload.

- **Safe Zones:** Use a minimum of 20px side margins on mobile to ensure the UI feels airy.
- **Vertical Rhythm:** A strict 8px baseline grid. Section headers should be preceded by at least 48px of whitespace to signal a "new start" for the content.
- **Content Max-Width:** On desktop, center-align content with a max-width of 1100px to maintain a focused, intimate reading experience.

## Elevation & Depth
The design system avoids heavy shadows, opting instead for **Ambient Depth** and **Tonal Layers**.

- **Surface Layers:** Use subtle shifts in background color (e.g., a slightly darker or lighter version of the neutral base) to define sections.
- **Shadows:** Use extra-diffused, low-opacity shadows (10% opacity) with a hint of the Primary Sage color in the shadow tint to create an "organic lift."
- **AI Moments:** Components featuring AI interaction should use the "Breathing Pulse"—a soft outer glow that expands and contracts, rather than a static shadow.

## Shapes
The shape language is defined by **High Circularity**.

- **Cards:** Use a minimum of 24px corner radius for container cards to evoke a "pebble" or "soft stone" feel.
- **Buttons:** Fully pill-shaped (rounded-full) to represent the cycle of recovery and the lack of "sharp edges" in the user journey.
- **Icons:** Simple 2pt line icons with rounded terminals.

## Components
- **The "ReStart" Button:** A prominent, pill-shaped primary action button in Sage Green. It never features a "Close" or "Cancel" icon; instead, it uses "Back" or "Pause" to avoid finality.
- **Wellness Cards:** Large containers with 24px+ corners. No borders; depth is created via the tonal background shifts mentioned in the Elevation section.
- **Progress Rings:** Use thick, soft-ended strokes. Never show a "0%" or "Failed" state; emphasize the "Active" or "Resting" status instead.
- **Input Fields:** Softly inset with a warm grey background. The focus state uses a 2px Sage Green glow (the "Breathing" effect).
- **Disclaimer Footer:** Present on every wellness insight screen in `label-caps` typography, styled with low-contrast text to remain present but non-intrusive.
- **Instructional Chips:** Used for mood tags or activity types, utilizing the Ocean, Amber, and Lavender accent colors with 20% opacity backgrounds.