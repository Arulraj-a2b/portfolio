export const profile = {
  name: 'Arulraj Venkadachalam',
  firstName: 'Arulraj',
  role: 'Senior Software Engineer, Frontend',
  roleShort: 'Frontend Engineer',
  tagline:
    'I build scalable web applications and cross-platform mobile apps with modern frontend technologies. Currently leading frontend at The Reward Store, architecting 5 micro-frontend web platforms composed of 12+ independently deployed web modules, along with native iOS and Android mobile apps.',
  bio: `Hi, I'm Arulraj Venkadachalam, a Senior Software Engineer, Frontend with over five years of experience building scalable web applications and cross-platform mobile apps. Currently at The Reward Store, I architect 5 micro-frontend web platforms (Store Front, Client Panel, Admin Panel, Vendor Dashboard, and Microsite) composed of 12+ independently deployed web modules, alongside native iOS and Android mobile apps. I lead frontend teams and deliver high-quality user experiences across web and mobile. Proficient in React.js, React Native (Expo & CLI), TypeScript, Redux Toolkit, Next.js, Tailwind CSS, Micro-Frontends, GraphQL, and Angular.js. Experienced with AI tools like Claude, Cursor, and MCP Server for accelerating development workflows. Passionate about crafting clean, performant, and user-centric interfaces that solve real-world problems.`,
  resumeUrl: '/Arulraj_Venkadachalam_CV.pdf',
  avatarUrl: '/profile.png',
  stats: [
    { label: 'Years Experience', value: 5, suffix: '+' },
    { label: 'Companies', value: 5, suffix: '' },
    { label: 'Projects Shipped', value: 10, suffix: '+' },
  ],
  social: {
    github: 'https://github.com/Arulraj-a2b',
    linkedin: 'https://www.linkedin.com/in/abofficial1997',
    whatsapp: 'https://wa.me/918189838485',
    email: 'abofficial1997@gmail.com',
  },
  address: {
    country: 'India',
    state: 'Tamil Nadu',
    city: 'Salem',
    street: '6/6 H, Thirumalaigiri, Salem - 636307',
  },
  phone: '+91 81898 38485',
};

export type Profile = typeof profile;
