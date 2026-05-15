# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**jogjakarsa.id** is a cinematic scrollytelling landing page celebrating Yogyakarta's cultural heritage. It uses Astro as the static site framework with React components for interactive elements.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Production build to dist/
npm run preview   # Preview production build
npm run astro     # Run Astro CLI directly
```

## Architecture

### Framework Pattern: Astro + React Islands

Astro handles the static shell and layout. React components are mounted selectively with `client:load`. The main page is `src/pages/index.astro`, which composes the full page from React components imported with `client:load`.

Layouts live in `src/layouts/BaseLayout.astro` and handle the HTML shell, Google Fonts, and visual overlays (grain texture, gradient layers).

### Animation Stack

Two libraries work in concert:
- **Lenis** (`src/components/SmoothScroll.tsx`): replaces native scroll with smooth inertia. Syncs its tick to GSAP's RAF loop via `ScrollTrigger.update()`.
- **GSAP + ScrollTrigger** (`src/lib/gsap.ts`): lazy-loaded and registered once. All components import from `src/lib/gsap.ts`, not directly from `gsap`.

Custom hooks wrap GSAP for components:
- `useGsapContext` — scopes animations inside `gsap.context()` and auto-reverts on unmount
- `useScrollReveal` — applies a standardized fromTo reveal (autoAlpha, y offset, blur) on scroll entry

All animations must respect `prefers-reduced-motion`. Use `prefersReducedMotion()` from `src/lib/gsap.ts` or the `usePrefersReducedMotion` hook before registering GSAP timelines.

### State Management

Zustand store at `src/store/useProgressStore.js` tracks scroll progress, visited sections, and the NPC companion ("Awan") dialog state. The Awan NPC (`src/components/AwanNPC.jsx`) shows idle hints after 60s and contextual messages as sections are visited.

### Content Data

All landing page content (nav items, philosophy cards, territory cards, pillar cards, footer links) lives in `src/data/landing.ts`. Edit content here rather than inside components.

### Styling

- **Tailwind** with a custom theme defined in `tailwind.config.js`. Use the semantic color tokens: `ink`, `night`, `mist`, `sun`, `clay`, `lagoon`, `cypress`.
- **CSS custom properties** and component classes (`.glass-panel`, `.eyebrow`, `.cinematic-copy`, `.section-shell`, etc.) are defined in `src/styles/global.css`.
- Fonts: `font-display` = EB Garamond (headings), `font-sans`/`font-accent` = Alegreya Sans (body).

### GSAP SSR Consideration

`astro.config.mjs` adds GSAP to Vite's `ssr.noExternal` list so it bundles correctly for Astro's SSR pass. Do not remove this.

## Design Constraints

The site follows a **cinematic dark exhibition aesthetic**. When adding or modifying UI:
- Background is always dark (`ink`/`night`). Light text on dark surfaces only.
- Animations should be slow and deliberate (gallery-walkthrough pacing), not snappy.
- Glass panels use `backdrop-blur` — preserve this on modal/overlay elements.
- Avoid generic web patterns. Refer to `.github/skills/frontend-design/SKILL.md` for the full design philosophy when making significant UI decisions.
