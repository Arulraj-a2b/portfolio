# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for a Senior Software Engineer. Built with React 18 + TypeScript, using Create React App. Deployed on Netlify.

## Common Commands

```bash
yarn start          # Dev server on localhost:3000
yarn build          # Production build to /build
yarn test           # Jest test runner (interactive watch mode)
yarn check:types    # TypeScript type checking (tsc --noEmit)
yarn lint           # ESLint check across src/
yarn lint:fix       # ESLint with auto-fix
yarn prettify       # Prettier format all source files
```

## Architecture

**Key patterns:**
- CSS Modules for scoped styling; global theme via CSS variables on `body`
- Dark theme is default; light mode via `body[theme='light']`; persists in localStorage
- Framer Motion `whileInView` for scroll-triggered animations (all `once: true`); Hero uses `animate` (plays on load)
- Common animation pattern: `staggerContainer` parent + `fadeUp`/`scaleIn` children
- Formik for contact form state; Email.js for sending emails (credentials in `utils/constants.tsx`)
- `react-responsive` for mobile/desktop layout switching
- No Redux or Context — all state is local; only shared state is localStorage theme + `body[theme]` attribute
- All portfolio data lives in `modules/Home/mock.tsx` — the single file to edit for content changes

### Entry Points

- **`src/index.tsx`** — React 18 `createRoot` on `#root`, wraps `<App>` in `StrictMode`. Imports `index.css` (global resets, Lato font-face, custom scrollbar) and `theme/default.css`.
- **`src/App.tsx`** — Root component. Renders `<Navbar>` + `<main>` with Hero, About, Skills, Experience, Projects, Services, Contact + `<Footer>`. `useEffect` on mount reads localStorage theme and sets `body[theme]` attribute.

### src/components/ — Page Sections

Each component has a `.tsx` + `.module.css` pair.

- **Navbar** (`Navbar.tsx`) — Fixed top nav. `useScrollDirection` hides it on scroll-down (y: -100 when down && scrollY > 100). `useActiveSection` highlights current section with a `layoutId="activeNav"` sliding underline. `useScroll`/`useTransform` drives a scaleX progress bar. Theme toggle via `useTheme()`. Mobile: spring-animated slide-in panel from right with hamburger→X transform. Nav links: Home, About, Skills, Experience, Projects, Services, Contact.
- **Hero** (`Hero.tsx`) — Full-viewport landing. Name and role split into word arrays, each word gets `singleWord` variant for staggered reveal on load. Role words delayed 0.5s after name. Profile image has infinite float animation (`y: [0, -12, 0]`, 4s loop) + CSS `ringPulse`. CTA: "Hire Me" scrolls to `#contact`; "Download CV" links to `/Arulraj_Venkadachalam_CV.pdf`. Scroll indicator hidden on mobile via CSS.
- **About** (`About.tsx`) — Two-column bio + profile image, then 3 `StatCard` sub-components (5+ Years, 5 Companies, 10+ Projects). Each `StatCard` uses `useInView` (once, -50px margin) + `useCountUp` to animate numbers when visible. Social links: GitHub, LinkedIn, WhatsApp.
- **Skills** (`Skills.tsx`) — `SkillBar` sub-component: `useInView`-triggered width animation from 0 to skill percentage (1.2s). Shimmer overlay on bars > 30%. `CircularProgress` sub-component: SVG ring using `strokeDashoffset` animation (1.5s). Extra skills as `scaleIn` pill badges. Data from `skillList`, `languagesList`, `extraSkill`.
- **Experience** (`Timeline.tsx`) — Default export is `Experience`. Renders two `TimelineSection` instances (Work History from `workList`, Education from `educationList`). `TimelineCard` has local `expanded` state — shows max 2 bullet points with "Show N more…" toggle. `TimelineSection` uses `useScroll`/`useTransform` to fill a vertical timeline line (0→100% height) as user scrolls through.
- **Projects** (`Projects.tsx`) — Grid of `ProjectCard` sub-components. Each renders a `<video autoPlay loop muted playsInline>` from public folder. Cards lift y: -6 with golden glow on hover. Tech badges + external links (Website/Android/iOS). Data from `projectList` (6 projects).
- **Services** (`Services.tsx`) — 3-card grid from `serviceList`. Cards lift y: -8 with golden glow on hover. Icon wrapper has `whileHover={{ scale: 1.1, rotate: 5 }}` spring.
- **Contact** (`Contact.tsx`) — Floating-label form (name, email, phone, subject, message) + contact info sidebar. Uses Formik for state/validation, `emailjs.send()` for submission. Inline `Toast` sub-component with AnimatePresence auto-dismisses after 4s. Inline `FloatingInput` sub-component implements CSS floating-label pattern. Validation: name ≥ 3 chars, email regex, phone required, message ≥ 70 chars.
- **Footer** (`Footer.tsx`) — Social links (GitHub, LinkedIn, WhatsApp) with hover scale/lift. Copyright with dynamic `getFullYear()`. Back-to-top smooth scroll button.

### src/modules/Home/mock.tsx — Portfolio Data

Central data store. All named exports:
- `addressList` — Residence badge (`[{ title: 'Residence', value: 'IND' }]`)
- `languagesList` — Tamil (100%), English (90%)
- `skillList` — 12 skills with percentages (HTML&CSS 90%, React 85%, TypeScript 85%, Redux 85%, JS 85%, Tailwind 85%, Next.js 80%, GraphQL 75%, Storybook 80%, Unit Testing 80%, Angular 65%, Flutter 40%)
- `extraSkill` — 12 tool/tech tags (Micro-Frontends, MUI, Capacitor, Google Maps, AI Tools, etc.)
- `serviceList` — 3 entries with inline SVG icon JSX (`SvgWebDevelopment`, `SvgMobileApp`, `SvgUiDesign`)
- `educationList` — 2 entries (Thiagarajar Polytechnic 2015-2017, Thiagarajar College of Engineering 2017-2020)
- `workList` — 5 entries (The Reward Store — current, Ripple Street, Squash Apps, Zita, ShopUp)
- `contactList` — 3 entries (location, email, phone) with inline icon JSX
- `projectList` — 6 projects with title, href, dates, description, technologies array, links array, and video path

Note: ESLint max-len overridden at top of file (`code: 20000`) for long text strings.

### src/package/ — Reusable UI Primitives

- **Button** (`Button.tsx`) — Wraps `<button>` with CSS module classes via `classnames/bind`. Auto-wraps string children in `<Text>`. Types: `"primary" | "secondary" | "link" | "tertiary"`. `buttonHelper.tsx` maps button type + disabled state to text color.
- **Text** (`Text.tsx`) — Polymorphic text via `tag` prop (default `"span"`). CSS module classes for color, size, bold, align, transform. Colors: `"primary" | "theme" | "white" | "link" | "gray" | "error" | "success"`. Sizes: even numbers 2–50. Types in `textTypes.tsx`.
- **Flex** (`Flex.tsx`) — Flexbox layout div. Boolean props for justify/align/direction/wrap. `column` is default direction. Inline styles for `flex`, `height`, `width`.
- **InputText** (`InputText.tsx`) — Text input wrapped in `LabelWrapper`. Type union `keyBoardProps` in `inputTextTypes.tsx`.
- **Loader** (`Loader.tsx`) — SVG spinner. Two modes: full-screen overlay or inline (`withOutOverlay`). Sizes: `"large" | "small" | "medium"`.
- **ErrorMessage** (`ErrorMessage.tsx`) — Formik-compatible. Shows `errors[name]` as red text only when `touched[name]` is truthy.
- **LabelWrapper** (`LabelWrapper.tsx`) — `React.memo`. Renders label + red asterisk above children if `label` is non-empty; otherwise renders children directly. Memo comparator only checks `children` equality.
- **PackageUtils/** — `helper.tsx`: `copyToClipboard(text)` via legacy `execCommand("copy")`. `validators.tsx`: `isEmpty(value)` — true for undefined/null/empty string.

### src/hooks/ — Custom Hooks

- **`useActiveSection(sectionIds: string[]): string`** — Returns ID of currently visible section. Scroll listener adds `innerHeight / 3` as threshold, iterates sections in reverse to find the last one above scroll position. Passive listener. Used by Navbar.
- **`useCountUp(end, duration=2000, startCounting=false): number`** — Animates 0→end over duration using rAF with `easeOutCubic`. No-op until `startCounting` is true (typically driven by `useInView`). Used by About's StatCards.
- **`useScrollDirection(): { scrollDirection: 'up'|'down', scrollY: number }`** — rAF-throttled scroll tracking. 5px minimum delta to prevent jitter. Used by Navbar for auto-hide.

### src/animations/variants.ts — Framer Motion Presets

11 named exports, all `Variants` objects:
- `fadeUp` — opacity 0→1, y 40→0, 0.6s easeOut
- `fadeIn` — opacity 0→1, 0.6s easeOut
- `staggerContainer` — staggers children 0.1s, 0.1s delay
- `staggerFast` — staggers children 0.06s, 0.05s delay
- `slideInLeft` — opacity 0→1, x -60→0, 0.6s easeOut
- `slideInRight` — opacity 0→1, x 60→0, 0.6s easeOut
- `scaleIn` — opacity 0→1, scale 0.8→1, 0.5s easeOut
- `letterReveal` — container, staggers children 0.04s
- `singleLetter` — opacity 0→1, y 20→0, 0.4s
- `wordReveal` — container, staggers children 0.08s
- `singleWord` — opacity 0→1, y 30→0, rotateX -20→0, 0.5s

### src/utils/ — Utilities

- **`constants.tsx`** — `EMAIL_SERVICE_KEY`, `TEMPLATE_KEY`, `EMAIL_KEY` (Email.js credentials, hardcoded). `RESUME_LINK = '/Arulraj_Venkadachalam_CV.pdf'`. `THIS_FIELD_REQUIRED`, `INVALID_EMAIL_ENTERED`, `INVALID_PHONE_ENTERED` error strings. `getLang` object with all UI strings (section titles, taglines, button labels, bio text). `screenHeight`/`screenWidth` computed at import time.
- **`helpers.tsx`** — `useTheme()`: toggles dark↔light by flipping localStorage + `body[theme]` attribute. `initTheme()`: sets theme from localStorage on init (not called — App.tsx has its own inline logic). Note: named with `use` prefix but these are plain functions, not React hooks.
- **`validators.tsx`** — `isEmpty(value)`, `isNotNumber(value)`, `isValidPhone(value)` (regex + rejects dots), `isValidEmail(value)` (regex).
- **`colors.tsx`** — Hardcoded hex constants (`WHITE`, `BLACK`, `GRAY_10`–`GRAY_80`, `PRIMARY`, `LINK`, `ERROR`, `SUCCESS`). Legacy — not referenced by current components which use CSS variables instead.

### src/icons/ — SVG Icon Components

18 components, all default exports with `defaultProps` for dimensions. All use inline SVG. Blue circle backgrounds on social/contact icons.

| Icon | Size | Used in |
|------|------|---------|
| `SvgGitUp` | 24×24 | About, Footer |
| `SvgLinkedIn` | 24×24 | About, Footer |
| `SvgWhatsApp` | 24×24 | About, Footer |
| `SvgContrast` | 30×30 | Navbar (theme toggle) |
| `SvgMenu` | 24.75×24.75 | Navbar (hamburger) |
| `SvgCloseWindow` | 20×20 | Close/X icon; CSS module for theme-adaptive fill |
| `SvgCounty` | 40×40 | Contact (location) |
| `SvgEmail` | 40×40 | Contact (email) |
| `SvgPhone` | 40×40 | Contact (phone) |
| `SvgContact` | 40×40 | Chat bubble |
| `SvgCv` | 40×40 | Person/CV |
| `SvgHome` | 40×40 | House |
| `SvgPortfolio` | 40×40 | Briefcase |
| `SvgService` | 40×40 | Code/service |
| `SvgExtraSkill` | 15×15 | Skills (extra skill pills) |
| `SvgWebDevelopment` | 68×68 | Services |
| `SvgMobileApp` | 68×68 | Services |
| `SvgUiDesign` | 68×68 | Services |

### src/theme/default.css — CSS Custom Properties

Dark theme on `:root` (default), light override on `body[theme='light']`.

Variable groups: primary colors + gradients, base (white/black), gray scale (10–80), semantic (link/error/success), backgrounds (body/section/card/hero), glass/frosted UI (bg/border), shadows (sm/md/lg + blue glow), transitions (fast 150ms, normal 300ms, slow 500ms), spacing (xs 4px → 3xl 64px), border radius (sm → full), bento layout (gap/radius/padding), navbar (bg/text), logo (bg/text).

Includes `@media (prefers-reduced-motion: reduce)` — sets all animation/transition durations to 0.01ms.

## Code Style

- ESLint: max line length 150, no unused vars (error level), camelCase warning
- Prettier: single quotes, trailing commas, no bracket spacing, arrow parens avoid
- TypeScript strict mode enabled, target ES5
