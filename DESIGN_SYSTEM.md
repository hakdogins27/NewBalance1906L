# DESIGN_SYSTEM.md — 1906L Breakdown Scroll Experience
> Generated for this project only. Never reuse across projects.
> AI follows every value here exactly — no freehand decisions.
> Review and approve before any frontend work begins.

---

## GENERATION INPUT

**Product name:** 1906L Breakdown Scroll Experience
**Target users:** UI/UX designers, creative developers, recruiters, sneaker enthusiasts
**Core purpose:** Immersive scroll-driven product storytelling — shoe anatomy breakdown
**Vibe / feel:** Cool, aesthetic, vintage — aged leather, heritage craft, cinematic editorial
**Mode:** Light (primary — no dark mode)
**Inspiration:** New Balance archive aesthetics, high-fashion editorial photography, vintage menswear lookbooks, A24 film titles
**What to avoid:** Neon, generic light blue, Material UI defaults, flat design, startup SaaS look

---

## 1. BRAND IDENTITY

**App name:** 1906L
**Tagline:** *Anatomy of a Classic.*
**Vibe:** Heritage leather goods meets modern editorial — quiet luxury, not hype
**Mode:** Light only
**Inspiration:** Vintage New Balance catalog pages, aged suede textures, cinema titling (Tár, Oppenheimer), Loro Piana editorial
**Avoid:** Streetwear hype aesthetics, neon accents, glitch effects, holographic tones

---

## 2. COLOR PALETTE

### Rationale
> Every color is pulled from aged leather, natural suede, raw canvas, and darkroom film tones.
> No pure whites — all backgrounds have a warm parchment undertone. No pure blacks — all text has a warm, deep leather/charcoal undertone.

### Primary
```
Primary:        #B58A2E   /* Aged brass / burnished gold — slightly deepened for light mode */
Primary hover:  #C4973A   /* Polished brass — brightens on interaction */
Primary light:  #B58A2E1A /* 10% opacity brass — for subtle highlights */
Primary text:   #F8F5F0   /* Off-white parchment — text on primary bg */
```

### Neutral (Light Backgrounds)
```
Background:     #F8F5F0   /* Aged parchment — base canvas */
Surface:        #F2EFE9   /* Lifted bone/cream — card/panel layer */
Surface alt:    #EBE7DF   /* Elevated raw canvas — hover/active panels */
Border:         #D6CEBD   /* Faded stone — default borders */
Border strong:  #B0A48E   /* Muted suede — emphasis borders */
```

### Text
```
Text primary:   #211E1A   /* Deep charcoal leather — main readable text */
Text secondary: #5C4E3D   /* Faded ink / dark suede — secondary text */
Text disabled:  #A8967E   /* Worn suede — disabled/placeholder */
Text inverse:   #F8F5F0   /* For text on dark/accent backgrounds */
```

### Semantic
```
Success:        #5A7250   /* Muted olive green — darkened for light mode */
Success light:  #5A725018
Warning:        #B58A2E   /* Reuses brass — intentional, on-brand */
Warning light:  #B58A2E18
Error:          #823B31   /* Worn burgundy — darkened for light mode */
Error light:    #823B3118
Info:           #3D5A72   /* Slate blue — darkened for light mode */
Info light:     #3D5A7218
```

### Project-Specific
```
Leather deep:   #4A3828   /* Deep tanned hide — for accents, thick lines */
Suede warm:     #8B6248   /* Mid-tone leather — for dividers, secondary accents */
Canvas highlight: #FFFFFFCC /* Soft white — for subtle light highlights */
Dust texture:   #00000005 /* Barely-visible overlay for texture effect */
```

---

## 3. TYPOGRAPHY

**Font family (Display/Heading):** `Playfair Display` — Serif, editorial, vintage publishing
**Font family (Body/UI):** `DM Sans` — Clean, modern, pairs beautifully with Playfair
**Font family (Labels/Code):** `DM Mono` — Minimal, technical precision
**Font source:** Google Fonts

### Import
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
```

### Scale
```
Display:   font: 'Playfair Display'   size: 72px    weight: 700   line-height: 1.05   tracking: -0.02em
H1:        font: 'Playfair Display'   size: 52px    weight: 600   line-height: 1.1    tracking: -0.015em
H2:        font: 'Playfair Display'   size: 36px    weight: 600   line-height: 1.2    tracking: -0.01em
H3:        font: 'Playfair Display'   size: 24px    weight: 500   line-height: 1.3    tracking: -0.005em
Body lg:   font: 'DM Sans'           size: 18px    weight: 400   line-height: 1.7    tracking: 0.01em
Body:      font: 'DM Sans'           size: 15px    weight: 400   line-height: 1.65   tracking: 0.01em
Small:     font: 'DM Sans'           size: 13px    weight: 400   line-height: 1.5    tracking: 0.02em
Label:     font: 'DM Mono'           size: 11px    weight: 500   line-height: 1.4    tracking: 0.12em   transform: uppercase
Code:      font: 'DM Mono'           size: 13px    weight: 400
```

### Special — Italic Display (used for section callouts)
```
Display italic:  font: 'Playfair Display'   style: italic   weight: 400   size: 64px   line-height: 1.1
```

---

## 4. SPACING

**Base unit:** 4px

```
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   40px
2xl:  64px
3xl:  96px
4xl:  128px
```

---

## 5. BORDER RADIUS

```
None:   0px
Sm:     2px
Md:     4px
Lg:     8px
Xl:     12px
Full:   9999px
```

---

## 6. SHADOWS

```
None:   none
Sm:     0 1px 3px rgba(33,30,26,0.1)
Md:     0 4px 16px rgba(33,30,26,0.12)
Lg:     0 8px 32px rgba(33,30,26,0.15)
Xl:     0 16px 64px rgba(33,30,26,0.2)
Glow:   0 0 24px rgba(181,138,46,0.2)
```

---

## 7. COMPONENT STANDARDS

### Buttons
```
Primary:    bg: #B58A2E  text: #F8F5F0  border: none           font: DM Sans 500  tracking: 0.06em  uppercase
Secondary:  bg: transparent  text: #211E1A  border: 1px solid #D6CEBD  font: DM Sans 400
Ghost:      bg: transparent  text: #5C4E3D  border: none       hover: text #211E1A
Danger:     bg: transparent  text: #823B31  border: 1px solid #823B31
Disabled:   bg: #EBE7DF  text: #A8967E  cursor: not-allowed
Size sm:    height: 32px  padding: 0 12px  font-size: 12px
Size lg:    height: 52px  padding: 0 32px  font-size: 15px
Radius:     Sm (2px)
```

### Inputs
```
Height:        44px
Border:        1px solid #D6CEBD
Border focus:  1px solid #B58A2E
Border error:  1px solid #823B31
Radius:        Md (4px)
Background:    #FFFFFF
Padding:       0 16px
Font size:     15px (DM Sans 400)
```

### Cards
```
Background:  #F2EFE9
Border:      1px solid #D6CEBD
Radius:      Lg (8px)
Shadow:      Md
Padding:     24px
```

### Badges / Labels
```
Radius:     Sm (2px)
Font:       DM Mono  11px  500  uppercase  tracking: 0.12em
Padding:    4px 8px
Background: #EBE7DF
Text:       #5C4E3D
```

---

## 8. LAYOUT

```
Max content width:  1440px
Page padding:       0px (full bleed)
Grid columns:       12
Gutter:             24px
```

---

## 9. ANIMATION

```
Duration fast:    150ms
Duration base:    400ms
Duration slow:    800ms
Duration cinematic: 1200ms
Easing cinematic: cubic-bezier(0.16, 1, 0.3, 1)
```

---

## 10. TEXTURE & ATMOSPHERE

```
Paper texture overlay: pseudo-element  background: url('/paper.svg')  opacity: 0.05  pointer-events: none  fixed
Soft vignette:         radial-gradient(ellipse at center, transparent 70%, rgba(214,206,189,0.2) 100%)  fixed
Warm fade:             linear-gradient(to bottom, #F8F5F0 0%, transparent 15%, transparent 85%, #F8F5F0 100%)
```

---

## 11. TAILWIND CONFIG TOKENS

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary:     '#B58A2E',
          hover:       '#C4973A',
          light:       'rgba(181,138,46,0.1)',
        },
        bg: {
          base:        '#F8F5F0',
          surface:     '#F2EFE9',
          alt:         '#EBE7DF',
        },
        border: {
          DEFAULT:     '#D6CEBD',
          strong:      '#B0A48E',
        },
        text: {
          primary:     '#211E1A',
          secondary:   '#5C4E3D',
          disabled:    '#A8967E',
          inverse:     '#F8F5F0',
        },
        leather:       '#4A3828',
        suede:         '#8B6248',
        canvas:        '#EBE7DF',
      },
      fontFamily: {
        display:  ['Playfair Display', 'serif'],
        body:     ['DM Sans', 'sans-serif'],
        mono:     ['DM Mono', 'monospace'],
      },
    },
  },
}
```

---

## 12. FORBIDDEN PATTERNS

- ❌ Pure `#FFFFFF` (too sterile) or `#000000` (too harsh)
- ❌ Neon or vibrant, saturated colors
- ❌ Rounded corners > 12px
- ❌ Generic SaaS / Startup blue
- ❌ Box shadows with high opacity or color tints
- ❌ Gradient text
- ❌ Emoji or icon-heavy UI — text and anatomy labels only
- ❌ Bounce/elastic easing — vintage feel is settled and deliberate

---

## APPROVAL CHECKLIST

Before any frontend work begins, confirm:

- [ ] Color palette reviewed and approved
- [ ] Font pair reviewed (Playfair Display + DM Sans)
- [ ] Brass accent (`#C4973A`) confirmed as primary
- [ ] Tailwind config tokens ready to implement
- [ ] Animation timing values confirmed with GSAP setup
- [ ] Texture/atmosphere approach approved (grain, vignette)
