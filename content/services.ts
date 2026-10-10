export type Service = { id: string; title: string; tagline: string; description: string; deliverables: string[] };

export const serviceList: Service[] = [
  {
    id: 'web',
    title: 'Web platforms',
    tagline: 'Scalable, fast, measurable',
    description: 'Production micro-frontend platforms, design-system-driven UI and performance-first apps with React, Next.js and Module Federation.',
    deliverables: ['Micro-frontend architecture', 'Storefronts & dashboards', 'Performance budgets', 'CI/CD and release gates'],
  },
  {
    id: 'mobile',
    title: 'Mobile apps & SDKs',
    tagline: 'One codebase, both stores',
    description: 'Cross-platform iOS and Android with React Native and Capacitor: native feel, push, deep links, offline-first, and embed SDKs for any runtime.',
    deliverables: ['App Store & Play Store releases', 'Push & Crashlytics', 'Offline caching', 'Embed SDKs (iOS / Android / Flutter)'],
  },
  {
    id: 'design-systems',
    title: 'Design systems',
    tagline: 'From Figma to published package',
    description: 'Multi-brand component libraries on Radix and Tailwind, with tokens, Storybook, e2e specs and semver releases your teams can depend on.',
    deliverables: ['Token pipelines', 'Component libraries on npm', 'Storybook & visual tests', 'Migration from legacy kits'],
  },
];
