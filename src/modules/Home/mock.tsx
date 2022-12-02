import SvgCounty from "../../icons/SvgCounty";
import SvgEmail from "../../icons/SvgEmail";
import SvgMobileApp from "../../icons/SvgMobileApp";
import SvgPhone from "../../icons/SvgPhone";
import SvgUiDesign from "../../icons/SvgUiDesign";
import SvgWebDevelopment from "../../icons/SvgWebDevelopment";

export const addressList = [
  {
    title: "Residence",
    value: "IND",
  },
  {
    title: "Freelance",
    value: "Available",
  },
];

export const languagesList = [
  {
    title: "Tamil",
    value: "100%",
  },
  {
    title: "English",
    value: "75%",
  },
];

export const skillList = [
  {
    title: "HTML",
    value: "90%",
  },
  {
    title: "CSS",
    value: "80%",
  },
  {
    title: "React JS & React Native",
    value: "85%",
  },
  {
    title: "Javascript",
    value: "80%",
  },
  {
    title: "Redux",
    value: "95%",
  },
  {
    title: "Typescript",
    value: "90%",
  },
  {
    title: "Jest & Enzyme",
    value: "75%",
  },
  {
    title: "Angular",
    value: "70%",
  },
  {
    title: "Flutter",
    value: "50%",
  },
];

export const extraSkill = [
  {
    title: "Bootstrap, Materialize",
  },
  {
    title: "Styles, Sass, Less",
  },
  {
    title: "GIT Knowledge",
  },
  {
    title: "NPM Knowledge",
  },
];

export const serviceList = [
  {
    title: "Web Development",
    icon: <SvgWebDevelopment />,
    des: "Blog, E-Commerce",
  },
  {
    title: "App Development",
    icon: <SvgMobileApp />,
    des: "Android, IOS",
  },
  {
    title: "UI/UX design",
    icon: <SvgUiDesign />,
    des: "Mobile App, Website Design",
  },
];

export const educationList = [
  {
    collegeName: "Thiagarajar Polytechic College, Salem",
    date: "2015 - 2017",
    course: "Diploma",
    position: "Student",
    des: [
      {
        data: [
          "Electronics and communications Engineering.",
          "Percentage: 89%.",
        ],
        url: "",
      },
    ],
  },
  {
    collegeName: "Thiagarajar College of Engineering, Madurai",
    date: "2017 - 2020",
    course: "Bachelor of Engineering",
    position: "Student",
    des: [
      {
        data: ["Computer Science Engineering.", "CGPA : 7.03"],
        url: "",
      },
    ],
  },
];

export const workList = [
  {
    collegeName: "Squash Apps, Coimbatore",
    date: "April 2022 - Present",
    course: "Senior Software Engineer",
    position: "Developer",
    des: [
      {
        data: [
          "Developing Payment Convenience Android, IOS, and Web Applications Using Ionic Angular framework.",
        ],
        url: "https://www.payfiniti.com",
      },
      {
        data: [
          "Developed Office Desk booking Applications Android, IOS Using React Native Cli.",
        ],
        url: "https://www.hydesq.com",
      },
    ],
  },
  {
    collegeName: "Zita, Coimbatore",
    date: "October 2021 - March 2022",
    course: "Frontend Developer",
    position: "Developer",
    des: [
      {
        data: [
          "Developed the front end of the complete AI-powered application in React js.",
        ],
        url: "https://www.zita.ai",
      },
    ],
  },
  {
    collegeName: "ShopUp, Bangalore",
    date: "2020 - October 2021",
    course: "Frontend Developer",
    position: "Developer",
    des: [
      {
        data: [
          "Worked on Companies Customized UI Component NPM Library. And a UI for managing all the products.",
        ],
        url: "https://uikit.shopup.center",
      },
    ],
  },
];

export const contactList = [
  {
    icon: <SvgCounty />,
    list: [
      { title: "Country", value: "India" },
      { title: "State", value: "Tamil Nadu" },
      { title: "City", value: "Salem" },
      { title: "Street", value: "6/6 H, Thirumalaigiri, Salem - 636307" },
    ],
  },
  {
    icon: <SvgEmail />,
    list: [
      { title: "Email", value: "abofficial1997@gmail.com" },
      { title: "Skype", value: "https://join.skype.com/invite/wdUBsZhp9MSb" },
      // { title: "Instagram", value: "https://www.instagram.com/arul__ab__" },
    ],
  },
  {
    icon: <SvgPhone />,
    list: [{ title: "Phone", value: "+918189838485" }],
  },
];
