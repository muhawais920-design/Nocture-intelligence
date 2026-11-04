---
name: Nocturne Intelligence
colors:
  surface: '#0a112d'
  surface-dim: '#0a112d'
  surface-bright: '#313855'
  surface-container-lowest: '#050c28'
  surface-container-low: '#131a36'
  surface-container: '#171e3a'
  surface-container-high: '#222845'
  surface-container-highest: '#2d3351'
  on-surface: '#dde1ff'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#dde1ff'
  inverse-on-surface: '#282f4c'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#5de6ff'
  on-secondary: '#00363e'
  secondary-container: '#00cbe6'
  on-secondary-container: '#00515d'
  tertiary: '#47ddc1'
  on-tertiary: '#00382f'
  tertiary-container: '#007463'
  on-tertiary-container: '#6efde0'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#a2eeff'
  secondary-fixed-dim: '#2fd9f4'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5a'
  tertiary-fixed: '#6af9dd'
  tertiary-fixed-dim: '#47ddc1'
  on-tertiary-fixed: '#00201a'
  on-tertiary-fixed-variant: '#005144'
  background: '#0a112d'
  on-background: '#dde1ff'
  surface-variant: '#2d3351'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

This design system expresses a forward-leaning, high-intelligence student ecosystem tailored for modern university life. It merges the structure of next-generation academic utilities with the sleek immersion of ambient, dark-mode computing.

The aesthetic blends **Modern Material Glassmorphism** with high-clarity technical discipline:
- **Atmosphere:** Deep cosmic navies create a calm, focused digital canvas that relieves cognitive strain during late-night study cycles and dense scheduling contexts.
- **Energy & Luminescence:** Focused accents of electric violet, cobalt, and glowing mint provide responsive, energetic feedback, positioning AI features as intuitive, hyper-responsive partners.
- **Tactility & Depth:** Semi-translucent panels, hairline chromatic borders, and soft diffuse ambient glows establish distinct spatial tiers without resorting to heavy skeuomorphism or harsh contrast walls.

## Colors

The palette relies on layered navy tiers to build structural contrast, accented by an iridescent spectrum of purples, cyans, and emeralds for status, focus, and computational insight.

### Color Tiers
- **Canvas Base (`#080F2B`):** Deep infinite ground. Used for root app scaffolding, dynamic status bars, and full-bleed viewport backgrounds.
- **Secondary Canvas (`#101A3A`):** Grouped content zones, tab backdrops, and recessed structural sections.
- **Surface Level 1 (`#172447`):** Primary standard card containers, feed items, lecture cards, and interactive modal sheets.
- **Surface Level 2 (`#1E2D58`):** Hovered states, floating action sheets, context popovers, and elevated pill badges.
- **Primary Accent (`#7C3AED`) & Electric Violet (`#8B5CF6`):** Core action drivers, primary key interactive targets, and AI activity indicators. Often applied as an energetic linear gradient from `#4F46E5` to `#9333EA`.
- **Secondary Accent Cyan (`#22D3EE`):** Data metrics, active schedule highlights, and active tab indicator indicators.
- **Tertiary Accent Mint (`#10BFA5`):** Positive metric trends, completed assignment states, AI confirmations, and live status beacons.
- **Border Stroke (`#29375C`):** Hairline edge boundary for translucent surfaces and floating elements.
- **Typography Tokens:**
  - **Primary Text (`#FFFFFF`):** High emphasis, headers, active states.
  - **Secondary Text (`#B8C4E0`):** Body context, metadata, unselected label tiers.
  - **Muted Text (`#8996B5`):** Timestamps, structural borders, placeholder glyphs.
  - **Functional Feedback:** Error state anchored at `#EF4444`, Success state anchored at `#22C55E`.

## Typography

The typography system uses **Manrope** across all scales. Its modern geometric curves and balanced open counters provide high legibility on high-density OLED and mobile screens while maintaining a polished academic feel.

- **Display & Large Headlines:** Geometric weight anchoring (`800` & `700`) with tight letter spacing reinforces presence and structure in dashboard overview headers and metrics.
- **Body & Content:** Scaled for rapid scanning (`14px` and `16px`), using open heights (`1.42` to `1.5` ratio) to maximize comfort across dense schedule breakdowns and AI study summaries.
- **Micro Labels & Data Tags:** Tight, uppercase-capable sizing (`10px`–`12px`) with expanded letter tracking ensures crisp recognition on elevated pill chips and status nodes.

## Layout & Spacing

Designed primarily for standard compact mobile devices (393px × 852px viewport standard) with fluid horizontal constraints:

- **Grid System:** Single-column modular fluid stack with a standard 16px (`1rem`) outer canvas margin and 16px intra-column gutter. Two-column nested child grids apply to quick-metric cards and split timetable modules.
- **Vertical Rhythm:** Strict 4px/8px-based spatial progression. Section clusters are separated by 20px–28px (`space-lg` to `space-xl`), while internal card components maintain 12px–16px structural breathing room.
- **Dynamic Anchoring & Safe Areas:** 
  - Top edge incorporates Android dynamic status bar padding (48px safe inset).
  - Bottom canvas includes a 96px offset zone accommodating the floating bottom navigation bar and gesture navigation bar, preventing overlap with critical interactive triggers.

## Elevation & Depth

Visual hierarchy uses a hybrid of **tonal surface elevation**, **diffuse colored ambient glows**, and **frosted glassmorphism**.

1. **Ground Layer (Elevation 0):** Flat `#080F2B` base canvas.
2. **Standard Surface (Elevation 1):** `#172447` with a 1px border stroke of `#29375C` (or rgba(41, 55, 92, 0.6)). Shadow: `0 4px 16px rgba(0, 0, 0, 0.35)`.
3. **Floating & Glass Panels (Elevation 2):** `#1E2D58` tinted with 70% opacity, paired with `backdrop-filter: blur(16px)` and a top-edge highlight stroke `rgba(255, 255, 255, 0.08)`. Shadow: `0 8px 32px rgba(4, 9, 26, 0.5)`.
4. **Active Luminescence (Accent Elevation):** Critical AI actions and floating indicators cast soft, saturated ambient drop shadows rather than dark silhouettes:
   - Primary Interactive: `0 8px 24px rgba(124, 58, 237, 0.35)`
   - Cyan Data Elements: `0 0 16px rgba(34, 211, 238, 0.25)`
   - Mint Live Status Nodes: `0 0 12px rgba(16, 191, 165, 0.3)`

## Shapes

The interface embraces smooth, rounded geometries inspired by modern Android Material Design 3 guidelines:

- **Primary Cards & Containers:** Standardized at 20px to 24px corner radii (`rounded-xl`), creating soft, ergonomic visual units that sit comfortably inside rounded smartphone displays.
- **Pill Tags & Controls:** Pill-shaped full radii (`9999px`) are reserved for filter chips, live status indicators, AI prompt tags, and the floating navigation shell.
- **Interactive Buttons & Inputs:** Standardized at 12px to 16px (`rounded-lg`) corner radii to maintain distinct affordance hierarchy between enclosing cards and internal actionable targets.

## Components

### Buttons
- **Primary AI & Action Buttons:** Styled with linear gradient (`#4F46E5` to `#9333EA`), full or 16px corner radius, bold white text, and an ambient purple glow shadow. Height: 48px–52px for comfortable touch targets.
- **Secondary / Ghost Buttons:** Elevated surface `#1E2D58` with `#29375C` stroke, illuminated on press with white text and cyan icon accents.

### Floating Bottom Navigation Bar
- A detached, floating glass capsule positioned 16px above the home indicator.
- Styled with dark translucent navy fill (`rgba(16, 26, 58, 0.85)`), 24px `backdrop-filter: blur(20px)`, and a 1px border of `#29375C`.
- Active items use a compact pill container highlight (`rgba(124, 58, 237, 0.2)`) containing an electric violet or cyan icon paired with an active dot indicator.

### Cards
- **Timetable & Lecture Cards:** Base `#172447` fill, 20px radius, with a continuous 1px `#29375C` border. Left edge utilizes a 4px accent indicator stripe (e.g., `#22D3EE` for upcoming, `#7C3AED` for in-progress).
- **AI Smart Assistant Card:** Frosted `#1E2D58` glass background with an inner gradient ring border (`#4F46E5` to `#22D3EE` at 30% opacity) and glowing contextual query pills.

### Chips & Pill Tags
- Small (24px–28px height) status capsules with fully rounded borders (`rounded-full`).
- Background: `rgba(30, 45, 88, 0.7)` with subtle contextual text colors:
  - Attendance/GPA chips: Text `#10BFA5`, background `rgba(16, 191, 165, 0.12)`
  - Exam alerts: Text `#EF4444`, background `rgba(239, 68, 68, 0.12)`
  - AI Suggestion tags: Text `#8B5CF6`, background `rgba(139, 92, 246, 0.12)`

### Input Fields & Search Bars
- Recessed `#101A3A` fill with a crisp `#29375C` stroke, transitioning to a glowing `#8B5CF6` border on focus.
- Placeholder text in `#8996B5`, accompanied by left-aligned cyan or violet icons.

### Status Bar & Header
- Integrated status bar with primary white indicators and time display.
- Header features student profile avatar with a mint `#10BFA5` online beacon ring, personalized greetings in `headline-md`, and an AI companion quick-trigger pill button.