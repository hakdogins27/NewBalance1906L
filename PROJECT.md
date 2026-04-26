# PROJECT.md — LIVING SYSTEM CONTEXT
> This file is the single source of truth for this project.
> Update it after every meaningful change. Never let it go stale.

---

## 0. AI INSTRUCTIONS *(read this first)*

- Stack is fixed — do not suggest alternatives unless asked
- Language/typing rules: TypeScript (strict mode)
- Naming conventions: camelCase (vars), PascalCase (components), kebab-case (folders)
- Folder pattern: feature-based architecture
- Do not add unlisted libraries or packages without asking
- All secrets come from `.env` — never hardcode
- Follow the API contract in Section 9 exactly — never break it
- Use AI-assisted workflows (prompt → generate → refine)
- Optimize for performance (scroll-based animation must stay smooth)
- When in doubt, ask before assuming

---

## 1. PROJECT OVERVIEW

- **Project name:** 1906L Breakdown Scroll Experience
- **Description:** A modern interactive website showcasing a detailed breakdown of a hybrid sneaker-loafer using scroll-based frame-by-frame animation.
- **Problem it solves:** Most product showcases are static. This project turns product understanding into an immersive storytelling experience.
- **Target users:**
  - Designers (UI/UX, product, footwear)
  - Recruiters reviewing portfolio work
  - Creative developers
  - Sneaker enthusiasts
- **Core goal:** Deliver a visually striking, smooth, and informative scroll experience that explains shoe anatomy in a modern, engaging way.
- **Out of scope:**
  - E-commerce functionality
  - User accounts
  - Payments
  - Complex backend systems

> RULE: This section defines the "why." The goal is fixed. Everything else evolves.

---

## 2. CURRENT STATE *(live status — update constantly)*

**Completed:**
- Project concept defined
- Shoe anatomy breakdown finalized
- Animation direction (frame-by-frame scroll) planned
- Asset planning (frames, prompts, sequence)

**In progress:**
- Frame generation (AI images / sequences)
- Scroll animation implementation

**Not started:**
- Final UI polish
- Performance optimization
- Deployment

**Blockers / notes:**
- Need consistent lighting/style across frames
- Large image sizes may affect performance
- Need optimized image sequence loading

> RULE: Always update after each meaningful change. Stale status = broken context.

---

## 3. FEATURE BACKLOG *(evolving roadmap)*

**MVP (must-have):**
- [ ] Scroll-based frame-by-frame animation
- [ ] Shoe breakdown sections (Upper, Midsole, Outsole, etc.)
- [ ] Smooth performance (no lag on scroll)
- [ ] Responsive layout

**Post-MVP (planned):**
- [ ] Interactive hotspots (hover/click on shoe parts)
- [ ] Text animations synced with scroll
- [ ] Sound design (optional subtle effects)

**Ideas (unvalidated):**
- [ ] Compare multiple shoes
- [ ] Dark/light theme toggle
- [ ] AI-generated variations of shoes

**Priority queue:**
1. Frame generation consistency
2. Scroll performance
3. UI clarity

> RULE: Features are flexible. Priorities can change. Mark done items with ~~strikethrough~~.

---

## 4. TECH STACK

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Frontend | Next.js | Latest | Main framework |
| Styling | Tailwind CSS | Latest | Utility-first |
| Animation | GSAP / ScrollTrigger | Latest | Scroll animation |
| Backend | None | — | Not required |
| Database | None | — | Not required |
| Auth | None | — | Not required |
| Hosting | Vercel | — | Free deployment |
| CI/CD | Vercel | — | Auto deploy |
| Other | FFmpeg | — | Frame extraction |

---

## 5. SYSTEM ARCHITECTURE

**Architecture type:** Static Frontend (No backend)

**Core modules:**
- Scroll Animation Engine
- Frame Loader
- UI Overlay System

**Data flow:**
```
[User Scroll] → [Scroll Handler] → [Frame Index Calculation] → [Render Image Frame]
```

**Key decisions:**

| Decision | Choice | Reason |
|---|---|---|
| Animation type | Frame-by-frame | Cinematic control |
| Backend | None | Zero cost + simplicity |
| Hosting | Vercel | Fast + free |
| Assets | Pre-rendered images | Better control vs real-time |

---

## 6. FRONTEND STRUCTURE

**Framework:** Next.js
**UI library:** None (custom)
**State management:** React state (minimal)
**Styling:** Tailwind CSS

**Pages:**
- `/` — Main scroll experience
- `/debug` — Frame testing (optional)

**Shared components:**
- Navbar: Minimal / hidden
- ScrollContainer: Main animation wrapper
- FrameCanvas: Renders image sequence
- SectionOverlay: Text + labels

**UI direction / design notes:**
- Dark theme
- Cinematic feel
- Minimal UI, focus on product
- Smooth transitions
- High contrast typography

---

## 7. BACKEND STRUCTURE

**API style:** None
**Runtime + framework:** N/A

**Core services:**
- None

**Authentication:** None
**Authorization / roles:** None

**Folder structure:**
```
app/
├── components/
├── features/
│   └── scroll-animation/
├── assets/
│   └── frames/
└── styles/
```

---

## 8. DATABASE DESIGN

**Database type:** None
**ORM / driver:** None

**Entities / collections:**
```
None
```

**Relationships:**
- None

**Indexes:**
- None

---

## 9. API CONTRACT *(critical — never break without updating)*

**Base URL:** N/A
**Auth header:** N/A

> No API used in this project.

**Standard response shape:**
```json
{
  "success": true,
  "data": {},
  "error": null
}
```

**Error shape:**
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "..."
  }
}
```

> RULE: Never change an existing endpoint silently. Update this table and bump the version.

---

## 10. SECURITY LAYER *(non-negotiable)*

- **Authentication method:** None — no user data collected
- **Password hashing:** N/A
- **Input validation:** N/A
- **Rate limiting:** N/A
- **CORS policy:** N/A
- **XSS / CSRF protection:** N/A (static site)
- **Secrets management:** `.env` only, never in source
- **HTTPS:** Enforced via Vercel in production

> RULE: Security is not optional. Even static sites must be safe.

---

## 11. PERFORMANCE STRATEGY

- **Caching:** Static asset caching via Vercel CDN
- **Lazy loading:** Load frames progressively
- **DB query rules:** N/A
- **Optimization targets:** 60fps scroll, <2s initial load
- **Monitoring:** Browser dev tools + Lighthouse

---

## 12. WORKFLOW USAGE MAP

| Phase | What it covers |
|---|---|
| Planning | Concept, animation idea |
| Architecture | Scroll system design |
| Frontend | UI + animation |
| Database | N/A |
| Debugging | Scroll lag, frame sync |
| Refactoring | Performance improvements |
| Review | Portfolio polish |

---

## 13. CONSTRAINTS

- **Budget:** $0 (zero cost)
- **Timeline:** Flexible (portfolio project)
- **Performance limits:** Must run smoothly on mid-range devices
- **API / service limits:** None
- **Device / browser support:** Modern browsers only
- **Regulatory / compliance:** None

---

## 14. KNOWN RISKS

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Large image size | High | High | Compress frames |
| Scroll lag | Medium | High | Optimize rendering |
| Inconsistent frames | High | Medium | Use consistent prompts |
| Mobile performance | Medium | High | Reduce frame count |

---

## 15. DEV RULES *(always follow)*

1. Build the smallest working version first
2. Do not over-engineer early
3. Performance > visual excess
4. Every feature must improve storytelling
5. Avoid unnecessary dependencies
6. No secrets in source code — ever
7. Update this file after every meaningful change
8. Unclear requirement = ask, don't assume

---

## 16. ENVIRONMENT VARIABLES

```bash
# .env.example — copy to .env and fill in values

# App
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=

# [Add others as needed]
```

> RULE: Every new env var must be added here immediately.

---

## 17. CHANGE LOG *(system history)*

### [v0.1.0] — 2026-04-26
- Initial project setup
- Defined scroll animation concept
- Added system architecture
- Established zero-cost tech stack

> RULE: Log every major change. Format: `[vX.X.X] — date — what changed and why.`

---

## 18. FUTURE IDEAS / EXPANSION

- Add multiple shoe breakdowns
- Turn into a design system showcase
- Add interactive 3D version
- Convert into case study site

*(No commitment. Just a parking lot for ideas.)*

---

## 19. FINAL PRINCIPLE

This is a living system.

- The **goal** is fixed
- Everything else **evolves**
- **Simplicity** > complexity
- **Clarity** > cleverness
- **Execution** > perfection
- **Update this file** or it becomes useless
