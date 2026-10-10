/** Skill groups, mirroring the résumé's Technical Skills lines. `bars` show as progress bars; `chips` as tags. */
export type SkillBar = { title: string; value: number };
export type SkillGroup = { id: string; title: string; bars: SkillBar[]; chips: string[] };

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    bars: [
      { title: 'React 19', value: 95 },
      { title: 'TypeScript', value: 92 },
      { title: 'Tailwind CSS v4', value: 90 },
      { title: 'Redux Toolkit / RTK Query', value: 88 },
      { title: 'Next.js', value: 85 },
      { title: 'React Router 7', value: 85 },
    ],
    chips: ['Vite', 'Radix UI', 'Styled Components', 'HTML & CSS', 'Angular.js', 'Bootstrap', 'MUI', 'Ant Design'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    bars: [
      { title: 'Micro-frontends', value: 95 },
      { title: 'Module Federation (Rspack, Webpack)', value: 92 },
      { title: 'Design systems', value: 92 },
      { title: 'Performance budgets', value: 85 },
      { title: 'Monorepos (pnpm, Turborepo)', value: 85 },
      { title: 'npm publishing (tsup, Changesets)', value: 85 },
    ],
    chips: ['shadcn/ui', 'cva', 'Caching', 'PWA', 'Scaffolding CLIs'],
  },
  {
    id: 'quality',
    title: 'Testing & Quality',
    bars: [
      { title: 'Playwright', value: 90 },
      { title: 'Vitest / Jest', value: 85 },
      { title: 'React Testing Library', value: 85 },
      { title: 'Storybook', value: 88 },
      { title: 'ESLint architecture rules', value: 90 },
      { title: 'size-limit & Husky gates', value: 88 },
    ],
    chips: ['Coverage gates', 'Visual tests', 'Docs-drift checks'],
  },
  {
    id: 'mobile',
    title: 'Mobile & SDK',
    bars: [
      { title: 'React Native (Expo, CLI, Web)', value: 90 },
      { title: 'Capacitor', value: 90 },
      { title: 'App Store & Play Store releases', value: 88 },
      { title: 'Firebase (push, Crashlytics, Analytics)', value: 82 },
      { title: 'SDK packaging (iOS / Android / Flutter)', value: 80 },
      { title: 'Ionic / Cordova', value: 70 },
    ],
    chips: ['Swift (basics)', 'Kotlin (basics)', 'Flutter / Dart (basics)', 'Deep links', 'CodePush'],
  },
  {
    id: 'backend',
    title: 'Backend & API',
    bars: [
      { title: 'REST / OpenAPI', value: 88 },
      { title: 'GraphQL / Apollo', value: 80 },
      { title: 'SSE & Socket.IO realtime', value: 82 },
      { title: 'Auth: SSO / OTP / TOTP / OAuth', value: 85 },
      { title: 'Firebase Auth', value: 80 },
      { title: 'Go / gRPC (working knowledge)', value: 55 },
    ],
    chips: ['Razorpay', 'Google Maps', 'reCAPTCHA', 'WebRTC', 'PostgreSQL (working knowledge)'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    bars: [
      { title: 'AWS Amplify', value: 88 },
      { title: 'CI/CD pipelines', value: 88 },
      { title: 'Release management', value: 85 },
      { title: 'Netlify / Vercel', value: 85 },
      { title: 'Git / GitHub', value: 92 },
      { title: 'Staging & production environments', value: 88 },
    ],
    chips: ['Build-time gates', 'Source-map handling', 'Hotfix workflows'],
  },
  {
    id: 'ai',
    title: 'AI-assisted',
    bars: [
      { title: 'Claude Code', value: 92 },
      { title: 'Cursor', value: 88 },
      { title: 'MCP server authoring', value: 85 },
      { title: 'Agent skills & hooks', value: 85 },
      { title: 'Automated review gates', value: 85 },
      { title: 'Codex', value: 75 },
    ],
    chips: ['HyperDX / ClickHouse log tracing', 'AI pair-programming'],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    bars: [
      { title: 'Architecture decisions', value: 92 },
      { title: 'Code review', value: 92 },
      { title: 'Coding standards', value: 90 },
      { title: 'Mentoring', value: 88 },
      { title: 'Team coordination', value: 85 },
      { title: 'Production support', value: 88 },
    ],
    chips: ['Cross-team collaboration', 'Incident fixes'],
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
