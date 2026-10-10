# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Personal portfolio of Arulraj Venkadachalam (Senior Software Engineer, Frontend). **v5 "Glass over 3D scene"**: one page, every section on a frosted-glass card, a slow React Three Fiber scene of drifting shapes fixed behind the content, dark theme by default with a light toggle. Next.js 16 App Router (static export), React 19, TypeScript strict, Tailwind CSS v4, `motion` (Framer Motion), Lenis, React Three Fiber + drei, react-hook-form + zod, EmailJS. Deployed on Netlify from `out/`.

## Commands

```bash
yarn dev            # http://localhost:3000
yarn build          # static export to out/
yarn check:types    # tsc --noEmit
yarn lint           # eslint (next core-web-vitals + typescript, React compiler rules on)
yarn format         # prettier
node scripts/make-posters.mjs   # regenerate public/posters/*.jpg from the project videos (needs Chrome; PLAYWRIGHT_CORE may point at a playwright-core install)
```

`check:types`, `lint` and `build` must all pass before finishing a task. Look at the result in the browser at 375, 768 and 1440 px in both themes; the visual result matters more than the gates.

## Where things live

- `content/*.ts` — all copy and data. `profile.ts` (identity, facts, stats, socials, SEO), `experience.ts` (roles, education), `projects.ts` (work grid; `categories` drive the filter; independent projects have no `dates`), `skills.ts` (groups with bars + chips), `services.ts`, `nav.ts`. Components contain no literal copy except micro-labels. The résumé in `public/Arulraj_Venkadachalam_CV.pdf` is the source of truth; keep `experience.ts` in sync with it.
- `design/tokens.css` — CSS variables for both themes and the Tailwind `@theme` bridge. Never hardcode colours in components; use `var(--…)` or the `text-accent` / `bg-accent` style utilities.
- `styles/globals.css` — reset, `.glass` / `.glass-2` / `.glass-bar`, container and section padding, keyframes, reduced-motion, scene fallback, service-card hover.
- `components/scene/` — `SceneRoot` (decides canvas vs static fallback via `useSyncExternalStore`), `SceneCanvas` (R3F canvas, DPR tiers, pauses when the tab is hidden), `Shapes` (7 simple shapes: rounded boxes, spheres, a torus and an icosahedron; drift, cursor tilt, scroll parallax, theme re-tint; the skill-logo tiles now live only in `HeroOrbit`), `useSceneQuality` (desktop 7 / tablet 5 / phone 4 shapes, camera further back on small tiers).
- `components/layout/` — `TopBar` (sticky glass bar, active-section underline), `MobileMenu` (right-side off-canvas menu that pushes the page aside, pins the body, focus trap, Esc/backdrop close), `ThemeToggle`, `SmoothScroll` (Lenis on pointer devices only), `Footer`.
- `components/sections/` — Hero, About, Skills, Work, Experience, Services, Contact, in page order.
- `components/ui/` — GlassCard, Section, SectionHeading, Button/ButtonLink, Chip/ChipButton, Counter, ProgressBar, Modal (dialog on tablet+, sheet on phones), Toast, FormField (floating label), ProjectCard, TypedText, IconLink, Icons.
- `components/avatar/AvatarOrb.tsx` — glass orb with `public/avatar-3d.jpg`, floats and tilts toward the cursor.
- `lib/` — `useTheme` (data-theme on `<html>`, localStorage, `themechange` event), `useActiveSection`, `useMediaQuery` (+ reduced-motion / pointer / breakpoint helpers), `useCountUp`, `motion` (variants, easing, viewport settings).
- `app/` — `layout.tsx` (fonts, theme init script, JSON-LD, scene, smooth scroll), `page.tsx`, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `not-found.tsx`.

## Rules

- Content rules: A2V2.ai and DrBrewerAI are **independent projects**, frontend scope, **no dates and never the word "freelance"**. Independent work is a project card, never a job entry.
- Motion: one easing (`EASE` in `lib/motion.ts`), `whileInView` once, animate only `transform`/`opacity` (exceptions: timeline fill, filter reflow). Everything must degrade under `prefers-reduced-motion` (no scene, no typing, no float).
- 3D: no shadows, no post-processing, no transmission materials, box tiles only (drei RoundedBox ignores per-face materials), `powerPreference: 'low-power'`, canvas paused when hidden. Keep the 3D chunk lazy (`next/dynamic`, `ssr: false`).
- Accessibility: every icon button has `aria-label`; sheets and dialogs trap focus and close on Esc; inputs are 16px so iOS does not zoom.
- React compiler lint rules are on: no `setState` directly in effects (use `useSyncExternalStore` for external state), no mutating `window.location.href` (use `assign`).

## Environment

EmailJS ids come from `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. Without them the contact form falls back to a `mailto:` link.

## Style

Single quotes, trailing commas, 2 spaces, 110 cols (`.prettierrc`). `'use client'` on anything with hooks, motion or three. `classnames` imported as `cn`.
