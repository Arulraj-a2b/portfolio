import SvgCounty from '../../icons/SvgCounty';
import SvgEmail from '../../icons/SvgEmail';
import SvgMobileApp from '../../icons/SvgMobileApp';
import SvgPhone from '../../icons/SvgPhone';
import SvgUiDesign from '../../icons/SvgUiDesign';
import SvgWebDevelopment from '../../icons/SvgWebDevelopment';
/* eslint max-len: ["error", { "code": 20000 }] */

export const addressList = [
  {
    title: 'Residence',
    value: 'IND',
  },
  // {
  //   title: 'Freelance',
  //   value: 'Available',
  // },
];

export const languagesList = [
  {
    title: 'Tamil',
    value: '100%',
  },
  {
    title: 'English',
    value: '90%',
  },
];

export const skillList = [
  {
    title: 'HTML & CSS',
    value: '90%',
  },
  {
    title: 'React.js & React Native (Expo & CLI)',
    value: '85%',
  },
  {
    title: 'TypeScript',
    value: '85%',
  },
  {
    title: 'Redux Toolkit',
    value: '85%',
  },
  {
    title: 'JavaScript',
    value: '85%',
  },
  {
    title: 'Tailwind CSS',
    value: '85%',
  },
  {
    title: 'Next.js',
    value: '80%',
  },
  {
    title: 'GraphQL',
    value: '75%',
  },
  {
    title: 'Storybook',
    value: '80%',
  },
  {
    title: 'Unit Testing (Jest & RTL)',
    value: '80%',
  },
  {
    title: 'Angular.js',
    value: '65%',
  },
  {
    title: 'Flutter (Basic)',
    value: '40%',
  },
];

export const extraSkill = [
  {
    title: 'Micro-Frontends (Module Federation, Rspack)',
  },
  {
    title: 'MUI & Ant Design',
  },
  {
    title: 'Capacitor, Cordova & Ionic',
  },
  {
    title: 'Google Maps & Firebase Push Notifications',
  },
  {
    title: 'Google Analytics',
  },
  {
    title: 'AWS Frontend Deployment',
  },
  {
    title: 'AI Tools (Claude, Cursor, Antigravity, Figma Make, MCP Server)',
  },
  {
    title: 'SQL, Go & Node.js',
  },
  {
    title: 'Git & GitHub',
  },
  {
    title: 'Netlify & Vercel',
  },
  {
    title: 'Razorpay Integration',
  },
  {
    title: 'Storybook',
  },
];

export const serviceList = [
  {
    title: 'Web Development',
    icon: <SvgWebDevelopment />,
    des: 'Blog, E-Commerce',
  },
  {
    title: 'App Development',
    icon: <SvgMobileApp />,
    des: 'Android, IOS',
  },
  {
    title: 'UI/UX design',
    icon: <SvgUiDesign />,
    des: 'Mobile App, Website Design',
  },
];

export const educationList = [
  {
    collegeName: 'Thiagarajar Polytechnic College, Salem',
    date: '2015 - 2017',
    course: 'Diploma',
    position: 'Student',
    des: [
      {
        data: [
          'Electronics and Communication Engineering.',
          'Percentage: 89%.',
        ],
        url: '',
      },
    ],
  },
  {
    collegeName: 'Thiagarajar College of Engineering, Madurai',
    date: '2017 - 2020',
    course: 'Bachelor of Engineering',
    position: 'Student',
    des: [
      {
        data: ['Computer Science Engineering.', 'CGPA: 7.03.'],
        url: '',
      },
    ],
  },
];

export const workList = [
  {
    collegeName: 'The Reward Store (Vananam Rewards Private Limited)',
    date: 'Present',
    course: 'Senior Software Engineer, Frontend',
    position: 'Developer',
    des: [
      {
        data: [
          'Architected and maintain three production micro-frontend platforms comprising 12+ independently deployed applications using Webpack Module Federation and Rspack — enabling parallel team development, independent deployments, and zero-downtime releases across 1,750+ TypeScript files.',
          'Built the Store Front (8 micro-frontends, 1,100+ TS files) for product browsing, gift card redemption, flight booking, bill payments, and recharges; the Client Panel (4 micro-frontends, 487 TS files) for reward distribution, automated rewards engine, and reporting; and the Admin Panel (15 federated modules, 170 TS files) with drag-and-drop page builder and catalog management.',
          'Leading all frontend development efforts, driving architecture decisions, establishing coding standards, conducting code reviews, and mentoring junior developers.',
          'Developed cross-platform mobile applications for iOS and Android using React Native with CodePush OTA updates for instant production deployments.',
          'Maintaining a private npm package (@therewardstore/ui) with 40+ reusable components and 15+ custom hooks, plus a visual UI Builder library driving consistency across all platforms.',
          'Designed end-to-end features including flight booking with multi-city search, real-time bill payments with UPI, e-commerce catalog with cart management, automated rewards engine, and webhook management system.',
          'Integrated Razorpay payment gateway, Google reCAPTCHA v3, and Microsoft Clarity analytics for secure transactions and data-driven UX improvements.',
          'Collaborating with backend, design, and product teams with standardized commits, pre-commit validation, and strict TypeScript enforcement.',
        ],
        url: 'https://www.therewardstore.com',
      },
    ],
  },
  {
    collegeName: 'Ripple Street India Private Limited, Bangalore',
    date: 'Jul 2023 - Jun 2025',
    course: 'Software Engineer',
    position: 'Developer',
    des: [
      {
        data: [
          'Ripple Street is the leading business-to-humans (B2H) marketing platform, connecting brands with their most passionate fans at home. For over a decade, our proprietary platform has driven brand awareness and sales, empowering brands to IDENTIFY, ENGAGE, AMPLIFY, and MEASURE their success.',
          'We have developed cross-platform mobile applications for both iOS and Android, enhancing user engagement and brand visibility.',
          'Designed and implemented responsive interfaces tailored for both mobile and tablet devices, ensuring a seamless user experience across different platforms.',
          'Took ownership of core features, optimizing performance and eliminating redundant code to enhance maintainability.',
        ],
        url: 'https://www.ripplestreet.com',
      },
    ],
  },
  {
    collegeName: 'Squash Apps, Coimbatore',
    date: 'April 2022 - Jul 2023',
    course: 'Senior Software Engineer',
    position: 'Developer',
    des: [
      {
        data: [
          'Led the development of a hospital management system consisting of three key applications: Doctor, Patient, and Nurse.',
          'Developed cross-platform mobile applications for both iOS and Android.',
          'Led a team of one engineer to ensure smooth project execution.',
          'Designed and implemented responsive interfaces for mobile and tablet devices.',
          'Utilized a theme-based NPM package to ensure consistency and scalability across the project.',
        ],
        url: '',
      },
      {
        data: [
          'Developed web, Android, and iOS applications that provide seamless payment solutions.',
          'Took ownership of core features, optimizing performance and eliminating redundant code to enhance maintainability.',
          'Led a team of two engineers, overseeing feature implementation and ensuring timely delivery.',
        ],
        url: 'https://www.payfiniti.com',
      },
      {
        data: [
          'Developed an office desk booking application for Android and iOS using React Native CLI.',
        ],
        url: '',
      },
    ],
  },
  {
    collegeName: 'Zita, Coimbatore',
    date: 'October 2021 - March 2022',
    course: 'Frontend Developer',
    position: 'Developer',
    des: [
      {
        data: [
          `Harnessed the power of Zita's AI to streamline the resume evaluation process, reducing candidate selection time by 50% compared to traditional methods.`,
          'Developed the entire front-end of the AI-powered application using React.js.',
          'Took complete ownership of the project, overseeing all aspects from design to deployment.',
        ],
        url: 'https://www.zita.ai',
      },
    ],
  },
  {
    collegeName: 'ShopUp, Bangalore',
    date: 'May 2020 - Oct 2021',
    course: 'Frontend Developer',
    position: 'Developer',
    des: [
      {
        data: [
          'Developed a customized UI component NPM library tailored for companies to streamline and standardize UI across various projects.',
          'Designed and implemented a UI for managing all products, ensuring intuitive interaction and efficient management capabilities.',
        ],
        url: 'https://uikit.shopup.center',
      },
    ],
  },
];

export const contactList = [
  {
    icon: <SvgCounty />,
    list: [
      {title: 'Country', value: 'India'},
      {title: 'State', value: 'Tamil Nadu'},
      {title: 'City', value: 'Salem'},
      {title: 'Street', value: '6/6 H, Thirumalaigiri, Salem - 636307'},
    ],
  },
  {
    icon: <SvgEmail />,
    list: [
      {title: 'Email', value: 'abofficial1997@gmail.com'},
      // {title: 'Skype', value: 'https://join.skype.com/invite/wdUBsZhp9MSb'},
      // { title: "Instagram", value: "https://www.instagram.com/arul__ab__" },
    ],
  },
  {
    icon: <SvgPhone />,
    list: [{title: 'Phone', value: '+918189838485'}],
  },
];

export const projectList = [
  {
    title: 'React Native Uikit',
    href: 'https://native-pilot-ui.netlify.app',
    dates: 'Present',
    description:
      'Published a theme-based React Native NPM package for building consistent cross-platform UIs.',
    technologies: [
      'React Native',
      'React Native Web',
      'Styled Components',
      'TypeScript',
      'StoryBook',
    ],
    links: [
      {type: 'Website', href: 'https://native-pilot-ui.netlify.app'},
      {
        type: 'Source',
        href: 'https://github.com/Arulraj-a2b/native_pilot_uikit',
      },
    ],
    video: '/native-pilot-ui.mov',
  },
  {
    title: 'Ripple Street',
    href: 'https://www.ripplestreet.com',
    dates: 'Jul 2023 - Jun 2025',
    description:
      'Cross-platform mobile applications for both iOS and Android, enhancing user engagement and brand visibility.',
    technologies: ['React Native', 'Redux', 'TypeScript', 'Apollo GraphQL'],
    links: [
      {type: 'Website', href: 'https://www.ripplestreet.com'},
      {
        type: 'Android',
        href: 'https://play.google.com/store/apps/details?id=com.ripplestreetfun',
      },
      {
        type: 'iOS',
        href: 'https://apps.apple.com/us/app/ripple-street-activities/id1623388148',
      },
    ],
    video: '/rippleStreet.mp4',
  },
  {
    title: 'Zita.ai',
    href: 'https://www.zita.ai',
    dates: 'Oct 2021 - Mar 2022',
    description:
      'AI-powered recruitment platform. Took complete ownership from design to deployment.',
    technologies: ['React.js', 'Redux', 'TypeScript', 'StoryBook'],
    links: [{type: 'Website', href: 'https://www.zita.ai'}],
    video: '/zitaAi.mov',
  },
  {
    title: 'Testosteronology',
    href: 'https://www.testosteronology.com',
    dates: 'Squash Apps',
    description:
      'Full ownership of frontend development for websites and mobile apps (Android & iOS), delivering high-quality user experiences.',
    technologies: [
      'React.js',
      'React Native (CLI)',
      'Redux',
      'TypeScript',
      'Material UI',
      'ChatBase',
    ],
    links: [
      {type: 'Website', href: 'https://www.testosteronology.com'},
      {
        type: 'Android',
        href: 'https://play.google.com/store/apps/details?id=com.testosteronology.health',
      },
      {
        type: 'iOS',
        href: 'https://apps.apple.com/us/app/testosteronology/id6479609801',
      },
    ],
    video: '/testosteronology.mov',
  },
  {
    title: 'DrugRound',
    href: 'https://play.google.com/store/apps/details?id=com.drug_round',
    dates: 'Squash Apps',
    description:
      'Mobile application for Android and iOS with offline caching, delivering responsive and intuitive healthcare interfaces.',
    technologies: [
      'React Native (CLI)',
      'Redux',
      'TypeScript',
      'Offline Caching',
    ],
    links: [
      {
        type: 'Android',
        href: 'https://play.google.com/store/apps/details?id=com.drug_round',
      },
      {
        type: 'iOS',
        href: 'https://apps.apple.com/in/app/druground/id1527065049',
      },
    ],
    video: '/druground.mp4',
  },
  {
    title: 'Dindigul Thookusatti',
    href: 'https://play.google.com/store/apps/details?id=com.thooku_satti',
    dates: 'Squash Apps',
    description:
      'Android mobile application with Google Maps integration, delivering high-quality user-centric experiences.',
    technologies: [
      'React Native (CLI)',
      'Redux',
      'TypeScript',
      'Google Maps API',
    ],
    links: [
      {
        type: 'Android',
        href: 'https://play.google.com/store/apps/details?id=com.thooku_satti',
      },
    ],
    video: '/dindigul.mp4',
  },
];
