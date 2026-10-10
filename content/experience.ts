/**
 * Work history and education. Bullets mirror the résumé (arulraj-resume/content.js), with the feature-level
 * detail from the earlier CV kept where the shorter résumé dropped it. `workList[0]` is the current role.
 * A bullet may start with a "Label: " prefix; the Experience section renders the label bold.
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
      'Leads all frontend engineering and the frontend team for a global rewards company: responsive web and native apps for gift cards, merchandise, travel, flight and bus booking, bill payments, recharges and reward links, across the rewards storefront, Rekyndl (loyalty) and Applaud IQ (employee recognition).',
    bullets: [
      'Micro-frontend platform: Architected 9 shared storefront remotes on Rspack Module Federation consumed by 4 host applications across three product lines, so shared features ship once instead of per product; runtime retry and warm-up keep federated loading reliable, with parallel team development, independent deployments and zero-downtime releases.',
      'Multi-product delivery: Built the Rekyndl client and member portals (31 + 14 modules: reward links, landing pages, multi-tenancy, OTP / SSO / TOTP, RBAC) and the Applaud IQ HR and employee portals (24 modules, SSE realtime, push) from scratch; maintain the Store Front (8 micro-frontends: product browsing, gift-card redemption, flight booking, bill payments, recharges), Client Panel (4 micro-frontends: reward distribution, automated rewards engine, sub-accounts, real-time activity wall), Admin Panel (15 federated modules, 50+ screens: drag-and-drop landing-page builder, multi-step microsite wizard, custom attribute engine) and Vendor Dashboard.',
      'Design system: Designed and built @therewardstore/* — 76 accessible Radix + Tailwind v4 components, 6 brands × light/dark + 8 presets with runtime white-labelling, 390+ Playwright e2e specs; 80 versions released in 11 weeks via Changesets, retiring two legacy UI kits (including the earlier @therewardstore/ui with 40+ components, 15+ hooks and a visual UI Builder).',
      'End-to-end features: Flight booking with multi-city search, real-time bill payments with UPI, an e-commerce catalogue with cart management and a webhook management system; integrated the Razorpay payment gateway, Google reCAPTCHA v3 and Microsoft Clarity analytics.',
      'Mobile & SDKs: Published the storefront and Applaud IQ apps to the App Store and Google Play on a remote-URL Capacitor shell with mandatory updates, so every web deploy reaches installed apps without a store review cycle; shipped the Applaud IQ embed SDK for 6 runtimes (iOS, Android, React Native, Flutter, Capacitor / Ionic, Cordova) on one bridge protocol with 66 native tests.',
      'Scaffolding CLI & packages: Built @therewardstore/create-app (3 templates, 15 feature layers) so every new repo enforces dependency boundaries, size budgets and bundler settings from its first commit, verified by a 16-row install-and-build matrix with byte-identical output; own 10+ packages on npm, Maven Central, CocoaPods / SwiftPM and pub.dev with semver releases and changelogs.',
      'Quality & AI workflow: Standardised engineering with Claude Code / Cursor / Codex skills, MCP servers for the design system and production logs, and agent hooks that lint touched files and run a fresh-context AI review on 150+ line changes; added-lines-only checks and 95% unit-test coverage (lines and branches) on changed files gate every change before human review.',
      'CI/CD & production: Sole owner of frontend delivery: AWS Amplify pipelines with build-time gates, size budgets and source-map stripping block regressions before deploy; run staging and production, store releases, live-issue debugging and hotfixes.',
      'Leadership: Lead frontend delivery and priorities, support product flows end to end with product and design, set coding standards, review pull requests, mentor developers and drive architecture decisions with product and backend (45+ architecture decision records); deliver backend feature logic in Go / gRPC with AI pair-programming when needed.',
    ],
    skills: ['React 19', 'React Native', 'TypeScript', 'Redux Toolkit', 'Rspack', 'Module Federation', 'Tailwind v4', 'Capacitor', 'Playwright', 'Razorpay', 'Storybook', 'AWS Amplify', 'Claude Code', 'MCP'],
  },
  {
    org: 'Ripple Street',
    descriptor: 'Business-to-humans (B2H) marketing platform (Ripple Street India Private Limited)',
    role: 'Software Engineer',
    date: 'Jul 2023 – Jan 2025',
    start: '2023-07',
    end: '2025-01',
    url: 'https://www.ripplestreet.com',
    summary: 'Developed the cross-platform mobile apps for the leading business-to-humans marketing platform, connecting brands with their most passionate fans.',
    bullets: [
      'Shipped the iOS and Android React Native apps to both stores, enhancing user engagement and brand visibility.',
      'Designed and implemented responsive interfaces for mobile and tablet, ensuring a seamless experience across devices.',
      'Owned core features and removed redundant code, cutting bundle size by 20% and improving load times.',
    ],
    skills: ['React Native', 'React.js', 'Redux', 'TypeScript', 'JavaScript', 'Apollo GraphQL'],
  },
  {
    org: 'Squash Apps',
    descriptor: 'Healthcare, FinTech and workplace solutions',
    role: 'Senior Software Engineer',
    date: 'Apr 2022 – Jul 2023',
    start: '2022-04',
    end: '2023-07',
    summary: 'Led development of multiple applications across healthcare and fintech, managing team delivery and cross-platform quality.',
    bullets: [
      'Led a team of 2 engineers delivering the Payfiniti payment apps for web, Android and iOS on time.',
      'Led the development of a hospital management system (Testosteronology) with Doctor, Patient and Nurse apps for web and mobile.',
      'Built an offline-capable office desk-booking app for Android and iOS with React Native CLI.',
      'Used a theme-based npm package architecture to keep UI consistent and scalable across projects.',
    ],
    skills: ['React Native (CLI)', 'React.js', 'Next.js', 'Angular.js', 'Ionic', 'Redux', 'TypeScript', 'JavaScript', 'Google Maps', 'WebRTC', 'npm'],
  },
  {
    org: 'Zita.ai',
    descriptor: 'AI-powered recruitment platform',
    role: 'Frontend Developer',
    date: 'Oct 2021 – Mar 2022',
    start: '2021-10',
    end: '2022-03',
    url: 'https://www.zita.ai',
    summary: 'Took complete ownership of the frontend for an AI-powered resume-evaluation platform, from design to deployment.',
    bullets: [
      'Owned the entire frontend of the AI resume-evaluation platform in React.js, from UI/UX to production.',
      'Streamlined the evaluation flow, cutting candidate selection time by 50% versus the manual process.',
    ],
    skills: ['React.js', 'Redux', 'TypeScript', 'JavaScript', 'Bootstrap', 'Storybook', 'HTML', 'CSS'],
  },
  {
    org: 'ShopUp',
    descriptor: 'Retailer e-commerce platform',
    role: 'Frontend Developer',
    date: 'May 2020 – Oct 2021',
    start: '2020-05',
    end: '2021-10',
    summary: 'Built reusable UI component libraries and product-management interfaces to standardise development across the organisation.',
    bullets: [
      'Built a UI component npm library that standardised UI across projects (+30% developer productivity).',
      'Designed and implemented the product-management interface for the retailer catalogue.',
    ],
    skills: ['React Native', 'React Native Web', 'TypeScript', 'JavaScript', 'Storybook'],
  },
];

export type Education = { org: string; place: string; degree: string; date: string; note: string };

export const educationList: Education[] = [
  { org: 'Thiagarajar College of Engineering', place: 'Madurai', degree: 'B.E. Computer Science and Engineering', date: '2017 – 2020', note: 'CGPA 7.03' },
  { org: 'Thiagarajar Polytechnic College', place: 'Salem', degree: 'Diploma, Electronics & Communication Engineering', date: '2015 – 2017', note: '89%' },
];
