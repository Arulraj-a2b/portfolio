export type ProjectLink = { type: 'Website' | 'Android' | 'iOS' | 'Source'; href: string };

export type Project = {
  title: string;
  dates: string;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  video: string;
  poster?: string;
  accent: string;
};

export const projectList: Project[] = [
  {
    title: 'React Native UIKit',
    dates: 'Present',
    description:
      'A theme-based React Native NPM package for building consistent cross-platform UIs. Published as native-pilot-ui.',
    technologies: ['React Native', 'RN Web', 'Styled Components', 'TypeScript', 'Storybook'],
    links: [
      { type: 'Website', href: 'https://native-pilot-ui.netlify.app' },
      { type: 'Source', href: 'https://github.com/Arulraj-a2b/native_pilot_uikit' },
    ],
    video: '/native-pilot-ui.mov',
    accent: '#3b82f6',
  },
  {
    title: 'Ripple Street',
    dates: 'Jul 2023 – Jun 2025',
    description:
      'Cross-platform mobile apps for a leading B2H marketing platform, enhancing engagement and brand visibility.',
    technologies: ['React Native', 'Redux', 'TypeScript', 'Apollo GraphQL'],
    links: [
      { type: 'Website', href: 'https://www.ripplestreet.com' },
      { type: 'Android', href: 'https://play.google.com/store/apps/details?id=com.ripplestreetfun' },
      { type: 'iOS', href: 'https://apps.apple.com/us/app/ripple-street-activities/id1623388148' },
    ],
    video: '/rippleStreet.mp4',
    accent: '#f472b6',
  },
  {
    title: 'Zita.ai',
    dates: 'Oct 2021 – Mar 2022',
    description:
      'AI-powered recruitment platform. Took complete ownership from design to deployment as primary frontend engineer.',
    technologies: ['React.js', 'Redux', 'TypeScript', 'Storybook'],
    links: [{ type: 'Website', href: 'https://www.zita.ai' }],
    video: '/zitaAi.mov',
    accent: '#22d3ee',
  },
  {
    title: 'Testosteronology',
    dates: 'Squash Apps',
    description:
      'Full ownership of frontend for websites and mobile apps (Android & iOS), delivering high-quality experiences for a health platform.',
    technologies: ['React.js', 'React Native (CLI)', 'Redux', 'TypeScript', 'Material UI', 'ChatBase'],
    links: [
      { type: 'Website', href: 'https://www.testosteronology.com' },
      { type: 'Android', href: 'https://play.google.com/store/apps/details?id=com.testosteronology.health' },
      { type: 'iOS', href: 'https://apps.apple.com/us/app/testosteronology/id6479609801' },
    ],
    video: '/testosteronology.mov',
    accent: '#a855f7',
  },
  {
    title: 'DrugRound',
    dates: 'Squash Apps',
    description:
      'Mobile app for Android and iOS with offline caching, delivering responsive and intuitive healthcare interfaces.',
    technologies: ['React Native (CLI)', 'Redux', 'TypeScript', 'Offline Caching'],
    links: [
      { type: 'Android', href: 'https://play.google.com/store/apps/details?id=com.drug_round' },
      { type: 'iOS', href: 'https://apps.apple.com/in/app/druground/id1527065049' },
    ],
    video: '/druground.mp4',
    accent: '#10b981',
  },
  {
    title: 'Dindigul Thookusatti',
    dates: 'Squash Apps',
    description:
      'Android mobile application with Google Maps integration, delivering high-quality user-centric experiences.',
    technologies: ['React Native (CLI)', 'Redux', 'TypeScript', 'Google Maps API'],
    links: [{ type: 'Android', href: 'https://play.google.com/store/apps/details?id=com.thooku_satti' }],
    video: '/dindigul.mp4',
    accent: '#f59e0b',
  },
];
