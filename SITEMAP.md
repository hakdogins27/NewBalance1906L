# SITEMAP.md — 1906L Breakdown Scroll Experience
> This file is generated per project from PROJECT.md features.
> AI generates this based on the feature backlog and user flows.
> Once generated and approved, AI builds exactly what is defined here.
> Never reused across projects.

---

## GENERATION PROMPT

**Features to include:** 
- Scroll-based frame-by-frame animation
- Shoe breakdown sections (Upper, Midsole, Outsole, etc.)
- Smooth performance (no lag on scroll)
- Responsive layout

**Auth flow:** 
- None (Static experience, no user accounts or login required)

**Main user journey:** 
- User lands on the cinematic entry screen. 
- Scrolling triggers a high-performance frame-by-frame sequence of the 1906L loafer. 
- As the user reaches specific scroll depths, the shoe "breaks down" or rotates, revealing specific anatomy labels (Upper, Midsole, Outsole).
- A final "Archive" section allows the user to see the shoe in its complete form.

**Special pages needed:** 
- /debug (Developer tool to scrub through frames and check sync)

---

## 1. NAVIGATION STRUCTURE

### Route Map
```
Public layout (no auth)
├── /          (Main Experience)
└── /debug     (Frame Testing Utility)

Error pages
├── /404       (Vintage themed Not Found)
└── /500       (System Error)
```

### Navigation Components
```
Public navbar: 
- Minimal overlay at the top. 
- Logo (1906L) on the left.
- "The Anatomy" link to trigger scroll to top.
- "About" link to social/portfolio.

Mobile nav:
- Simplified logo-only or hidden during animation for maximum immersion.
```

---

## 2. PAGE DEFINITIONS

### PAGE: Home (Main Experience)
**Route:** `/`
**Auth required:** No
**Purpose:** Core product storytelling through scroll-driven animation.

**Layout:** Full-bleed cinematic canvas with sticky overlays.

**Sections:**

#### Section: Hero / Loading
- **Purpose:** Initial landing and asset pre-loading.
- **Components:**
  - `LoadingScreen`: High-contrast parchment text, progress bar in brass.
  - `EntryTitle`: Animated "1906L" reveal in Playfair Display.
- **Functions:**
  - `preLoadAssets()`: Loads the image sequence into memory.
- **API calls:** None.
- **States:**
  - Loading: Percentage counter active.
  - Success: "Scroll to Begin" callout appears.

#### Section: Scroll Sequence (Canvas)
- **Purpose:** Sticky container for the frame-by-frame shoe breakdown.
- **Components:**
  - `FrameCanvas`: WebGL or 2D Canvas for rendering frames.
  - `AnatomyLabels`: Floating labels that fade in/out based on scroll depth.
  - `ProgressIndicator`: Vertical brass line on the right showing scroll progress.
- **Functions:**
  - `syncScrollToFrame()`: Maps window.scrollY to frameIndex.
  - `triggerLabelEntry()`: Animates anatomy descriptions at specific indices.
- **States:**
  - Active: Frame rendering based on scrub.

#### Section: Anatomy Deep Dive
- **Purpose:** Detailed text descriptions that scroll over the fixed shoe frame.
- **Components:**
  - `ContentBlock`: Layout for "Upper", "Midsole", "Outsole" text.
  - `SpecCard`: Technical details in DM Mono.
- **States:**
  - Default: Hidden.
  - Visible: Triggered via ScrollTrigger when frame reaches "breakdown" state.

#### Section: Footer / Archive
- **Purpose:** Final CTA and project credits.
- **Components:**
  - `ArchiveCTA`: Link to New Balance official or portfolio.
  - `CreditFooter`: "Designed by [Name]" in vintage DM Mono.

---

### PAGE: Debug (Frame Testing)
**Route:** `/debug`
**Auth required:** No (Hidden/Dev use)
**Purpose:** To verify frame sequence consistency and timing.

**Layout:** Sidebar controls + Main Preview.

**Sections:**
#### Section: Scrubber
- **Components:**
  - `FrameSlider`: Manual control to scrub frames 1 to N.
  - `FrameMetadata`: Displays current frame ID, resolution, and load status.

---

## 3. SHARED COMPONENTS

| Component | Purpose | Used on |
|---|---|---|
| `BrandLogo` | Minimal "1906L" typography | Nav, Footer |
| `BrassButton` | Primary CTA with vintage hover | Hero, Footer |
| `AnatomyLabel` | Animated line + text overlay | Home |
| `GrainOverlay` | Global film grain texture | All Pages |
| `CustomCursor` | Brass dot cursor for interaction | All Pages |

---

## 4. USER FLOWS

### Flow: The Journey
```
Land (Loading) → Entry Reveal → Scroll (The Breakdown) → Label Discovery → Archive / Footer
```

### Flow: Deep Dive
```
Scroll to Midsole → Frame pauses/rotates → Label "Abzorb" appears → Description fades in → Continue scroll
```

---

## 5. MODALS & DRAWERS

| Name | Trigger | Content | Actions |
|---|---|---|---|
| `InfoDrawer` | Click on '?' icon | Details on the 1906L silhouette | Close |

---

## 6. TOAST NOTIFICATIONS

| Event | Type | Message |
|---|---|---|
| Frame Load Failure | Error | "Failed to load sequence. Please refresh." |
| Performance Drop | Warning | "Heavy rendering detected. Closing background tabs may help." |

---

## 7. RESPONSIVE RULES

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| FrameCanvas | 100vw x 100vh | 100vw x 100vh | 100vw x 100vh (Cover) |
| AnatomyLabels | Left/Right floating | Bottom floating | Full width overlay |
| Typography | 72px Display | 52px H1 | 36px H2 |
| Navbar | Visible | Hidden on scroll | Logo only |
