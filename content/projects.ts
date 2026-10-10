/**
 * Projects shown in the Work grid. Posters live in public/posters/<slug>.webp (generated from the videos).
 * Independent projects are undated on purpose.
 */
export type ProjectLink = { type: 'Website' | 'Android' | 'iOS' | 'Source'; href: string };
export type ProjectCategory = 'web' | 'mobile' | 'design-systems' | 'independent';

export type ProjectMedia = {
  poster: string;
  mp4?: string;
  /** Original upload (.mov). Used only when there is no mp4. */
  legacy?: string;
  /** Files over ~5 MB: never autoload, show a play button instead. */
  heavy?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  dates?: string;
  tagline: string;
  description: string;
  technologies: string[];
  categories: ProjectCategory[];
  links: ProjectLink[];
  media?: ProjectMedia;
  accent: string;
};

export const projectCategories: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'design-systems', label: 'Design systems' },
  { id: 'independent', label: 'Independent' },
];

export const projectList: Project[] = [
  {
    slug: 'the-reward-store',
    title: 'The Reward Store',
    dates: 'Jan 2025 – Present',
    tagline: 'Micro-frontend platform: 9 remotes, 4 hosts, one design system.',
    description:
      'Global rewards platform for gift cards, merchandise, flight and bus booking, bill payments and reward links. 9 shared storefront remotes on Rspack Module Federation consumed by 4 host apps, a 76-component multi-brand design system, native apps on both stores and a six-runtime embed SDK.',
    technologies: ['React 19', 'TypeScript', 'Rspack', 'Module Federation', 'Tailwind v4', 'Capacitor', 'Playwright'],
    categories: ['web', 'mobile', 'design-systems'],
    links: [{ type: 'Website', href: 'https://www.therewardstore.com' }],
    media: { poster: '/posters/the-reward-store.webp' },
    accent: '#818cf8',
  },
  {
    slug: 'trs-design-system',
    title: 'TRS Design System',
    dates: '2025 – Present',
    tagline: 'The Reward Store design system: 76 components, 6 brands, documented in Storybook.',
    description:
      'The @therewardstore/* design system behind every Reward Store product: 76 Radix + Tailwind v4 components, design tokens, 6 brands × light/dark plus 8 presets with runtime white-labelling, 390+ Playwright e2e specs, patterns and guidelines, all documented in a public Storybook. Retired two legacy UI kits across all products.',
    technologies: ['React 19', 'TypeScript', 'Radix UI', 'Tailwind v4', 'Storybook', 'Playwright', 'Design tokens'],
    categories: ['web', 'design-systems'],
    links: [{ type: 'Website', href: 'https://master.d2wh521lmmr77b.amplifyapp.com/' }],
    media: { poster: '/posters/trs-design-system.webp' },
    accent: '#a78bfa',
  },
  {
    slug: 'a2v2-frontend',
    title: 'A2V2.ai — frontend',
    tagline: 'HIPAA-compliant healthcare AI platform: dashboard, chat widget and UI kit.',
    description:
      'Built the web frontend of a healthcare AI platform: a 25-module customer dashboard (CRM, knowledge base, OAuth connectors, analytics), the patient chat shipped as both an iframe app and a Shadow-DOM embed widget from one codebase, and @a2v2ai/uikit, a 55-component Radix + Tailwind v4 library on npm with 60+ releases. Lint-enforced module boundaries, size budgets and AWS Amplify gates.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'RTK Query', 'Tailwind v4', 'Radix UI', 'Socket.IO', 'Storybook'],
    categories: ['web', 'design-systems', 'independent'],
    links: [
      { type: 'Website', href: 'https://www.a2v2.ai' },
      { type: 'Source', href: 'https://www.npmjs.com/package/@a2v2ai/uikit' },
    ],
    media: { poster: '/posters/a2v2-frontend.webp' },
    accent: '#2dd4bf',
  },
  {
    slug: 'drbrewerai-frontend',
    title: 'DrBrewerAI — frontend',
    tagline: 'Patient, subscriber and staff web app for PrevMed Health, architected from scratch.',
    description:
      'Architected the frontend of a role-gated patient and staff web app: Vite 8, React 19, React Router 7 and RTK Query with Firebase Auth against a versioned OpenAPI contract with generated types; a hand-authored 70-component UI kit with 150+ Storybook stories synced to Figma tokens; 12 automated gates and brotli size budgets on AWS Amplify.',
    technologies: ['React 19', 'TypeScript', 'Vite 8', 'React Router 7', 'RTK Query', 'Firebase Auth', 'Storybook', 'Figma tokens'],
    categories: ['web', 'design-systems', 'independent'],
    links: [{ type: 'Website', href: 'https://www.drbrewerai.com' }],
    media: { poster: '/posters/drbrewerai-frontend.webp' },
    accent: '#fb923c',
  },
  {
    slug: 'ripple-street',
    title: 'Ripple Street',
    dates: 'Jul 2023 – Jan 2025',
    tagline: 'Cross-platform app for a B2H marketing platform, live on both stores.',
    description: 'iOS and Android React Native apps for the leading business-to-humans marketing platform; owned core features and cut bundle size by 20%.',
    technologies: ['React Native', 'Redux', 'TypeScript', 'Apollo GraphQL'],
    categories: ['mobile'],
    links: [
      { type: 'Website', href: 'https://www.ripplestreet.com' },
      { type: 'Android', href: 'https://play.google.com/store/apps/details?id=com.ripplestreetfun' },
      { type: 'iOS', href: 'https://apps.apple.com/us/app/ripple-street-activities/id1623388148' },
    ],
    media: { poster: '/posters/ripple-street.webp', mp4: '/rippleStreet.mp4' },
    accent: '#f472b6',
  },
  {
    slug: 'zita-ai',
    title: 'Zita.ai',
    dates: 'Oct 2021 – Mar 2022',
    tagline: 'AI recruitment platform; whole frontend owned from UI/UX to production.',
    description: 'AI-powered resume-evaluation platform. Owned the entire React.js frontend; the streamlined evaluation flow cut candidate selection time by 50%.',
    technologies: ['React.js', 'Redux', 'TypeScript', 'Storybook'],
    categories: ['web'],
    links: [{ type: 'Website', href: 'https://www.zita.ai' }],
    media: { poster: '/posters/zita-ai.webp', legacy: '/zitaAi.mov', heavy: true },
    accent: '#22d3ee',
  },
  {
    slug: 'testosteronology',
    title: 'Testosteronology',
    tagline: 'Hospital management system: Doctor, Patient and Nurse apps.',
    description: 'Doctor, Patient and Nurse apps for web, iOS and Android, built with React and React Native; live on the App Store and Google Play.',
    technologies: ['React.js', 'React Native CLI', 'Redux', 'TypeScript', 'MUI'],
    categories: ['web', 'mobile', 'independent'],
    links: [
      { type: 'Website', href: 'https://www.testosteronology.com' },
      { type: 'Android', href: 'https://play.google.com/store/apps/details?id=com.testosteronology.health' },
      { type: 'iOS', href: 'https://apps.apple.com/us/app/testosteronology/id6479609801' },
    ],
    media: { poster: '/posters/testosteronology.webp', legacy: '/testosteronology.mov', heavy: true },
    accent: '#a855f7',
  },
  {
    slug: 'druground',
    title: 'DrugRound',
    tagline: 'Drug-administration tracker with offline caching.',
    description: 'Android drug-administration tracking app with offline caching, built with React Native CLI; live on Google Play.',
    technologies: ['React Native CLI', 'Redux', 'TypeScript', 'Offline caching'],
    categories: ['mobile', 'independent'],
    links: [
      { type: 'Android', href: 'https://play.google.com/store/apps/details?id=com.drug_round' },
      { type: 'iOS', href: 'https://apps.apple.com/us/app/druground/id1527065049' },
    ],
    media: { poster: '/posters/druground.webp', mp4: '/druground.mp4' },
    accent: '#10b981',
  },
];
