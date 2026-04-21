export type Service = {
  title: string;
  tagline: string;
  description: string;
  visual: 'blob' | 'cube' | 'stream';
  accent: string;
  deliverables: string[];
};

export const serviceList: Service[] = [
  {
    title: 'Web Development',
    tagline: 'Scalable, fast, delightful',
    description:
      'Production micro-frontend platforms, design-system driven UI, and performance-first SPAs. Build with React, Next.js, and Module Federation.',
    visual: 'blob',
    accent: '#3b82f6',
    deliverables: ['Design systems', 'Storefronts & dashboards', 'Micro-frontends', 'Perf tuning'],
  },
  {
    title: 'App Development',
    tagline: 'One codebase, both stores',
    description:
      'Cross-platform iOS and Android apps with React Native (CLI + Expo) — native feel, OTA updates via CodePush, and offline-first architecture.',
    visual: 'cube',
    accent: '#22d3ee',
    deliverables: ['Native navigation', 'Offline caching', 'Push notifications', 'Store deployment'],
  },
  {
    title: 'UI / UX Design',
    tagline: 'Interfaces people remember',
    description:
      'From Figma to production with clean systems, animated components, and pixel-accurate implementation. Design + engineering under one roof.',
    visual: 'stream',
    accent: '#f472b6',
    deliverables: ['Design systems', 'Motion language', 'Prototypes', 'Handoff-ready specs'],
  },
];
