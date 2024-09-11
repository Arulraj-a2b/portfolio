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
    value: '75%',
  },
];

export const skillList = [
  {
    title: 'HTML',
    value: '90%',
  },
  {
    title: 'CSS',
    value: '80%',
  },
  {
    title: 'React JS & React Native',
    value: '85%',
  },
  {
    title: 'Javascript',
    value: '80%',
  },
  {
    title: 'Redux',
    value: '95%',
  },
  {
    title: 'Typescript',
    value: '90%',
  },
  {
    title: 'Jest & Enzyme',
    value: '75%',
  },
  {
    title: 'Angular',
    value: '70%',
  },
  {
    title: 'Flutter',
    value: '50%',
  },
];

export const extraSkill = [
  {
    title: 'Bootstrap, Materialize',
  },
  {
    title: 'Styles, Sass, Less',
  },
  {
    title: 'GIT Knowledge',
  },
  {
    title: 'NPM Knowledge',
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
    collegeName: 'Thiagarajar Polytechic College, Salem',
    date: '2015 - 2017',
    course: 'Diploma',
    position: 'Student',
    des: [
      {
        data: [
          'Electronics and communications Engineering.',
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
        data: ['Computer Science Engineering.', 'CGPA : 7.03'],
        url: '',
      },
    ],
  },
];

export const workList = [
  {
    collegeName: 'Ripple Street India Private Limited, Bangalore.',
    date: 'Jul 2023 - Present',
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
          'Led the development of a hospital management system consisting of five key applications: Doctor, Patient, Nurse.',
          'Developed cross-platform mobile applications for both iOS and Android.',
          'Led a team of one engineer to ensure smooth project execution.',
          'Designed and implemented responsive interfaces for mobile and tablet devices.',
          'Utilized a theme-based NPM package to ensure consistency and scalability across the project.',
          '',
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
          'Developed Office Desk booking Applications Android, IOS Using React Native Cli.',
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
    date: '2020 - October 2021',
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
