export type TimelineEntry = {
  org: string;
  date: string;
  role: string;
  url?: string;
  bullets: string[];
};

export const workList: TimelineEntry[] = [
  {
    org: 'The Reward Store',
    date: 'Jan 2025 – Present',
    role: 'Senior Software Engineer, Frontend',
    url: 'https://www.therewardstore.com',
    bullets: [
      'Architect and maintain five production micro-frontend web platforms (Store Front, Client Panel, Admin Panel, Vendor Dashboard, and Microsite) composed of 12+ independently deployed web modules using Webpack Module Federation and Rspack.',
      'Built the Store Front (8 micro-frontends) for product browsing, gift card redemption, flight booking, bill payments, and recharges.',
      'Developed the Client Panel (4 micro-frontends) for reward distribution, automated rewards engine, and reporting.',
      'Created the Admin Panel (15 federated modules) with a drag-and-drop page builder and catalog management.',
      'Leading frontend development efforts, driving architecture decisions, establishing coding standards, and mentoring junior developers.',
      'Developed cross-platform iOS and Android apps using React Native with CodePush OTA updates.',
      'Maintaining a private npm package (@therewardstore/ui) with 40+ components and 15+ custom hooks.',
      'Designed end-to-end features: flight booking, real-time UPI bill payments, e-commerce catalog, automated rewards engine, webhook management.',
      'Integrated Razorpay, Google reCAPTCHA v3, and Microsoft Clarity analytics.',
    ],
  },
  {
    org: 'Ripple Street',
    date: 'Jul 2023 – Jan 2025',
    role: 'Software Engineer',
    url: 'https://www.ripplestreet.com',
    bullets: [
      'Developed cross-platform iOS and Android apps for a leading B2H marketing platform.',
      'Designed responsive interfaces for mobile and tablet devices.',
      'Took ownership of core features, optimizing performance and maintainability.',
    ],
  },
  {
    org: 'Squash Apps',
    date: 'Apr 2022 – Jul 2023',
    role: 'Senior Software Engineer',
    url: 'https://www.payfiniti.com',
    bullets: [
      'Led development of a hospital management system with three apps: Doctor, Patient, Nurse.',
      'Built cross-platform iOS and Android apps.',
      'Managed engineers to ensure timely delivery.',
      'Developed payment solution web/Android/iOS apps (Payfiniti).',
      'Developed an office desk booking app for Android and iOS using React Native CLI.',
    ],
  },
  {
    org: 'Zita.ai',
    date: 'Oct 2021 – Mar 2022',
    role: 'Frontend Developer',
    url: 'https://www.zita.ai',
    bullets: [
      'Leveraged AI to streamline resume evaluation, reducing candidate selection time by 50%.',
      'Developed the entire frontend using React.js.',
      'Took complete ownership of the project from design to deployment.',
    ],
  },
  {
    org: 'ShopUp',
    date: 'May 2020 – Oct 2021',
    role: 'Frontend Developer',
    url: 'https://uikit.shopup.center',
    bullets: [
      'Developed a customized UI component NPM library to standardize UI across projects.',
      'Designed and implemented a product management UI with intuitive interaction patterns.',
    ],
  },
];

export const educationList: TimelineEntry[] = [
  {
    org: 'Thiagarajar College of Engineering',
    date: '2017 – 2020',
    role: 'B.E. Computer Science Engineering',
    bullets: ['Computer Science Engineering.', 'CGPA: 7.03.'],
  },
  {
    org: 'Thiagarajar Polytechnic College',
    date: '2015 – 2017',
    role: 'Diploma, Electronics & Communication',
    bullets: ['Electronics and Communication Engineering.', 'Percentage: 89%.'],
  },
];
