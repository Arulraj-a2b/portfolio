# Arulraj Venkadachalam — portfolio (v5 "Glass over 3D scene")

One-page portfolio: a slow 3D scene of drifting shapes behind frosted-glass cards, dark and light themes, typed roles, animated counters, skill tabs, a filterable work grid with a video lightbox, a scroll-filled résumé timeline and a contact form. Live at https://arulraj1997.netlify.app.

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS v4 · motion · Lenis · React Three Fiber + drei · react-hook-form + zod · EmailJS · Netlify.

## Commands

```bash
yarn install
yarn dev            # http://localhost:3000
yarn build          # static export to out/
yarn check:types && yarn lint
node scripts/make-posters.mjs   # regenerate project posters from the videos (uses Chrome)
```

## Editing content

Everything visible comes from `content/*.ts`:

- `profile.ts` — name, roles typed in the hero, bio, facts, counters, socials, SEO text.
- `experience.ts` — roles (`workList[0]` is the current one) and education; keep in sync with the CV in `public/`.
- `projects.ts` — the work grid. `categories` drive the filter chips; media points at `public/*.mp4|.mov` and `public/posters/*.jpg`.
- `skills.ts` — groups shown as tabs; `bars` get progress bars, `chips` get tags.
- `services.ts`, `nav.ts`.

Design tokens (both themes) live in `design/tokens.css`. The avatar is `public/avatar-3d.jpg` (and the `-circle` crop); replace both to change it.

## Environment

Copy `.env.example` to `.env.local` and set the EmailJS ids. Without them the form opens a `mailto:` link instead.

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

## Performance notes

The 3D scene is a lazy chunk that only mounts when WebGL is available and reduced motion is off; otherwise a CSS fallback with the same colours is shown. Phones get 4 shapes at DPR 1, tablets 5, desktops 7. The canvas pauses when the tab is hidden.
