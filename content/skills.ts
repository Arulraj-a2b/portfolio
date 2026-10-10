/**
 * Skill groups, mirroring the résumé's Technical Skills lines (plus the tools from the earlier CV that
 * the shorter résumé dropped). `core` is shown as highlighted cards, `more` as chips. No invented percentages.
 */
export type SkillGroup = { id: string; title: string; core: string[]; more: string[] };

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    core: ['React 19', 'TypeScript', 'JavaScript', 'React Router 7', 'Redux Toolkit / RTK Query', 'Next.js'],
    more: ['Vite', 'Tailwind CSS v4', 'Radix UI', 'Styled Components', 'React Hooks', 'HTML & CSS', 'Angular.js (working knowledge)', 'Bootstrap', 'MUI', 'Ant Design'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    core: ['Micro-frontends', 'Module Federation (Rspack, Webpack)', 'Design systems (Radix, shadcn/ui, cva)', 'npm publishing (tsup, Changesets)', 'Monorepos (pnpm, Turborepo)', 'Performance budgets'],
    more: ['Caching strategies', 'Performance optimisation', 'PWA', 'Scalable system design'],
  },
  {
    id: 'quality',
    title: 'Testing & Quality',
    core: ['Playwright', 'Vitest', 'Jest', 'React Testing Library', 'Storybook', 'ESLint architecture rules'],
    more: ['Husky', 'size-limit', 'Coverage gates', 'Docs-drift checks'],
  },
  {
    id: 'mobile',
    title: 'Mobile & SDK',
    core: ['Capacitor', 'React Native (Expo, CLI, Web)', 'App Store & Play Store releases', 'Firebase (push, Crashlytics, Analytics)', 'SDK packaging (iOS / Android / Flutter)', 'CodePush OTA updates'],
    more: ['Ionic / Cordova', 'Deep links', 'Swift (basics)', 'Kotlin (basics)', 'Flutter / Dart (basics)'],
  },
  {
    id: 'backend',
    title: 'Backend & API',
    core: ['REST', 'OpenAPI', 'GraphQL / Apollo', 'SSE', 'Socket.IO', 'Firebase Auth'],
    more: ['OAuth', 'SSO / OTP / TOTP', 'Razorpay', 'UPI payments', 'Google Maps', 'Google reCAPTCHA v3', 'WebRTC', 'Webhooks', 'Go / gRPC (AI-assisted, working knowledge)', 'PostgreSQL (working knowledge)'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    core: ['AWS Amplify', 'CI/CD pipelines', 'Staging & production environments', 'Release management', 'Git / GitHub', 'Netlify'],
    more: ['Vercel', 'Build-time gates', 'Source-map handling', 'Microsoft Clarity', 'Google Analytics'],
  },
  {
    id: 'ai',
    title: 'AI-assisted',
    core: ['Claude Code', 'Cursor', 'Codex', 'MCP server authoring', 'Agent skills & hooks', 'Automated review gates'],
    more: ['HyperDX / ClickHouse log tracing', 'AI pair-programming'],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    core: ['Architecture decisions', 'Product flow support', 'Code review', 'Coding standards', 'Mentoring', 'Team coordination'],
    more: ['Production support & incident fixes', 'Cross-functional collaboration', 'Architecture decision records'],
  },
  {
    id: 'learning',
    title: 'Currently learning',
    core: ['Go', 'Kafka', 'Databases (SQL)', 'Flutter'],
    more: [],
  },
];

export const languagesList = [
  { title: 'Tamil', value: 100 },
  { title: 'English', value: 90 },
];

/** Logos on the floating tiles in the 3D background (simple-icons slugs). Order mixes groups so every area shows early. */
export const sceneSkills: { slug: string; label: string }[] = [
  { slug: 'siReact', label: 'React' },
  { slug: 'siTypescript', label: 'TypeScript' },
  { slug: 'siNodedotjs', label: 'Node.js' },
  { slug: 'siClaude', label: 'Claude Code' },
  { slug: 'siTailwindcss', label: 'Tailwind CSS' },
  { slug: 'siGo', label: 'Go' },
  { slug: 'siNextdotjs', label: 'Next.js' },
  { slug: 'siModelcontextprotocol', label: 'MCP' },
  { slug: 'siExpo', label: 'React Native' },
  { slug: 'siGraphql', label: 'GraphQL' },
  { slug: 'siRedux', label: 'Redux' },
  { slug: 'siPostgresql', label: 'PostgreSQL' },
  { slug: 'siStorybook', label: 'Storybook' },
  { slug: 'siCursor', label: 'Cursor' },
  { slug: 'siCapacitor', label: 'Capacitor' },
  { slug: 'siFirebase', label: 'Firebase' },
  { slug: 'siVitest', label: 'Vitest' },
  { slug: 'siSocketdotio', label: 'Socket.IO' },
  { slug: 'siWebpack', label: 'Module Federation' },
  { slug: 'siGit', label: 'Git' },
  { slug: 'siVite', label: 'Vite' },
  { slug: 'siFigma', label: 'Figma' },
  { slug: 'siDocker', label: 'Docker' },
  { slug: 'siFlutter', label: 'Flutter' },
];
