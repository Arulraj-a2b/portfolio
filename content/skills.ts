export type Skill = { title: string; value: number };
export type ExtraSkill = { title: string };
export type Language = { title: string; value: number };

export const skillList: Skill[] = [
  { title: 'HTML & CSS', value: 90 },
  { title: 'React.js & React Native', value: 85 },
  { title: 'TypeScript', value: 85 },
  { title: 'Redux Toolkit', value: 85 },
  { title: 'JavaScript', value: 85 },
  { title: 'Tailwind CSS', value: 85 },
  { title: 'Next.js', value: 80 },
  { title: 'GraphQL', value: 60 },
  { title: 'Storybook', value: 80 },
  { title: 'Unit Testing (Jest & RTL)', value: 80 },
  { title: 'Angular.js', value: 65 },
  { title: 'Flutter (Basic)', value: 40 },
  { title: 'AWS (Frontend Deployment)', value: 70 },
  { title: 'Go (Learning)', value: 30 },
  { title: 'Kafka (Learning)', value: 25 },
  { title: 'Databases (SQL, Learning)', value: 30 },
];

export const extraSkill: ExtraSkill[] = [
  { title: 'Micro-Frontends (Module Federation, Rspack)' },
  { title: 'MUI & Ant Design' },
  { title: 'Capacitor, Cordova & Ionic' },
  { title: 'Google Maps & Firebase Push' },
  { title: 'Google Analytics' },
  { title: 'AI Tools (Claude, Cursor, MCP)' },
  { title: 'Node.js' },
  { title: 'Git & GitHub' },
  { title: 'Netlify & Vercel' },
  { title: 'Razorpay Integration' },
];

export const languagesList: Language[] = [
  { title: 'Tamil', value: 100 },
  { title: 'English', value: 90 },
];
