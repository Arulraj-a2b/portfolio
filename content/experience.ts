/**
 * Work history and education, synced with the résumé (arulraj-resume/content.js).
 * `workList[0]` is the current role.
 */
export type Role = {
  org: string;
  descriptor: string;
  role: string;
  date: string;
  start: string;
  end?: string;
  url?: string;
  summary?: string;
  bullets: string[];
  skills: string[];
  current?: boolean;
};

export const workList: Role[] = [
  {
    org: 'The Reward Store',
    descriptor: 'Global rewards platform (Vananam Rewards Private Limited)',
    role: 'Senior Software Engineer, Frontend',
    date: 'Jan 2025 – Present',
    start: '2025-01',
    url: 'https://www.therewardstore.com',
    current: true,
    summary:
      'Leads all frontend engineering and the frontend team for a global rewards company: responsive web and native apps for gift cards, merchandise, flight and bus booking, bill payments, recharges and reward links, across the rewards storefront, Rekyndl (loyalty) and Applaud IQ (employee recognition).',
    bullets: [
      'Architected 9 shared storefront remotes on Rspack Module Federation consumed by 4 host applications, so shared features deploy across products without touching each host; runtime retry and remote warm-up keep the federated apps loading as one.',
      'Built the Rekyndl client and member portals (31 + 14 modules, reward links, landing pages, multi-tenancy, OTP / SSO / TOTP, RBAC) and the Applaud IQ HR and employee portals (24 modules, SSE realtime, push) from scratch; maintain the storefront, Client Panel, Admin Panel (50+ screens) and Vendor Dashboard.',
      'Designed and built the @therewardstore/* design system: 76 Radix + Tailwind v4 components, 6 brands × light/dark + 8 presets with runtime white-labelling, 390+ Playwright e2e specs; retired two legacy UI kits.',
      'Published the storefront and Applaud IQ apps to the App Store and Google Play (Capacitor, Firebase push, Crashlytics, deep links) and the Applaud IQ embed SDK for 6 runtimes (iOS, Android, React Native, Flutter, Capacitor / Ionic, Cordova) with one bridge protocol.',
      'Built @therewardstore/create-app, the scaffolding CLI for every new frontend repo (3 templates, 15 feature layers) so a generated app enforces dependency boundaries, size budgets and bundler settings from its first commit; own 10+ packages on npm, Maven Central, CocoaPods / SwiftPM and pub.dev.',
      'Standardised engineering across repos with Claude Code / Cursor / Codex skills, MCP servers for the design system and production logs, and agent hooks that lint touched files and trigger a fresh-context AI review on large changes; 95% unit-test coverage on changed files before human review.',
      'Sole owner of frontend delivery: AWS Amplify pipelines with build-time gates and size budgets, staging and production environments, store releases, live-issue debugging and hotfixes.',
      'Lead frontend delivery, set coding standards, review pull requests, mentor developers and collaborate with product and backend teams on architecture decisions.',
    ],
    skills: ['React 19', 'TypeScript', 'Rspack', 'Module Federation', 'Tailwind v4', 'Capacitor', 'Playwright', 'AWS Amplify', 'Claude Code', 'MCP'],
  },
  {
    org: 'Ripple Street',
    descriptor: 'Business-to-humans (B2H) marketing platform',
    role: 'Software Engineer',
    date: 'Jul 2023 – Jan 2025',
    start: '2023-07',
    end: '2025-01',
    url: 'https://www.ripplestreet.com',
    bullets: [
      'Shipped the iOS and Android React Native apps for a business-to-humans marketing platform to both stores.',
      'Owned core features and removed redundant code, cutting bundle size by 20% and improving load times.',
    ],
    skills: ['React Native', 'React.js', 'Redux', 'TypeScript', 'Apollo GraphQL'],
  },
  {
    org: 'Squash Apps',
    descriptor: 'FinTech and workplace solutions',
    role: 'Senior Software Engineer',
    date: 'Apr 2022 – Jul 2023',
    start: '2022-04',
    end: '2023-07',
    bullets: [
      'Led a team of 2 engineers delivering the Payfiniti payment apps for web, Android and iOS on time.',
      'Built an offline-capable office desk-booking app for Android and iOS with React Native CLI.',
    ],
    skills: ['React Native CLI', 'React.js', 'Next.js', 'Angular.js', 'Ionic', 'Redux', 'TypeScript', 'Google Maps', 'WebRTC'],
  },
  {
    org: 'Zita.ai',
    descriptor: 'AI-powered recruitment platform',
    role: 'Frontend Developer',
    date: 'Oct 2021 – Mar 2022',
    start: '2021-10',
    end: '2022-03',
    url: 'https://www.zita.ai',
    bullets: [
      'Owned the entire frontend of an AI resume-evaluation platform in React.js, from UI/UX to production.',
      'Streamlined the evaluation flow, cutting candidate selection time by 50% versus the manual process.',
    ],
    skills: ['React.js', 'Redux', 'TypeScript', 'Bootstrap', 'Storybook'],
  },
  {
    org: 'ShopUp',
    descriptor: 'Retailer e-commerce platform',
    role: 'Frontend Developer',
    date: 'May 2020 – Oct 2021',
    start: '2020-05',
    end: '2021-10',
    bullets: [
      'Built a UI component npm library that standardised UI across projects (+30% developer productivity).',
      'Designed and implemented the product-management interface for the retailer catalogue.',
    ],
    skills: ['React Native', 'React Native Web', 'TypeScript', 'Storybook'],
  },
];

export type Education = { org: string; place: string; degree: string; date: string; note: string };

export const educationList: Education[] = [
  { org: 'Thiagarajar College of Engineering', place: 'Madurai', degree: 'B.E. Computer Science and Engineering', date: '2017 – 2020', note: 'CGPA 7.03' },
  { org: 'Thiagarajar Polytechnic College', place: 'Salem', degree: 'Diploma, Electronics & Communication Engineering', date: '2015 – 2017', note: '89%' },
];
