/**
 * Everything about Arulraj that is not a job, a project or a skill.
 * Metadata, JSON-LD, the OG image and every section read from here.
 */
export const profile = {
  name: 'Arulraj Venkadachalam',
  firstName: 'Arulraj',
  shortName: 'Arulraj V',
  role: 'Senior Software Engineer, Frontend',
  roleShort: 'Senior Frontend Engineer',
  /** Typed in the hero, one after another. */
  roles: ['Senior Frontend Engineer', 'Frontend Architect', 'Micro-frontend & design-system builder', 'React Native shipper'],
  tagline: 'I architect micro-frontend platforms, build the design systems behind them, and ship React Native apps to both stores.',
  summary:
    'Senior Frontend Engineer with 6+ years of experience building scalable web and mobile applications, currently leading frontend engineering across three product lines at The Reward Store.',
  bio: 'I lead frontend at The Reward Store: a micro-frontend platform of 9 shared remotes consumed by 4 host apps, a 76-component multi-brand design system, native apps on both stores and a six-runtime embed SDK. Before that I built for Ripple Street, Squash Apps, Zita.ai and ShopUp. I care about clean systems, fast interfaces and mentoring the people who build them, and I pair with AI tools (Claude Code, Cursor, MCP servers) to move faster without cutting corners.',
  availability: 'Open to senior frontend roles',
  currently: { org: 'The Reward Store', detail: 'Lead frontend' },
  stack: ['React', 'React Native', 'TypeScript', 'Micro-frontends'],
  facts: [
    { label: 'Location', value: 'Salem, Tamil Nadu, India (IST)' },
    { label: 'Experience', value: '6+ years' },
    { label: 'Email', value: 'abofficial1997@gmail.com', href: 'mailto:abofficial1997@gmail.com' },
    { label: 'Phone', value: '+91 81898 38485', href: 'tel:+918189838485' },
    { label: 'Languages', value: 'Tamil (native), English (professional)' },
    { label: 'Availability', value: 'Open to senior frontend roles' },
  ],
  stats: [
    { id: 'years', label: 'Years of experience', value: 6, suffix: '+' },
    { id: 'companies', label: 'Companies', value: 5, suffix: '' },
    { id: 'projects', label: 'Projects shipped', value: 10, suffix: '+' },
    { id: 'packages', label: 'Published packages', value: 10, suffix: '+' },
  ],
  resumeUrl: '/Arulraj_Venkadachalam_CV.pdf',
  avatarUrl: '/avatar-3d.jpg',
  avatarCircleUrl: '/avatar-3d-circle.jpg',
  social: {
    github: 'https://github.com/Arulraj-a2b',
    linkedin: 'https://www.linkedin.com/in/abofficial1997',
    whatsapp: 'https://wa.me/918189838485',
    email: 'abofficial1997@gmail.com',
  },
  address: { country: 'India', countryShort: 'IN', state: 'Tamil Nadu', city: 'Salem', timezone: 'IST' },
  phone: '+91 81898 38485',
  phoneRaw: '+918189838485',
  siteUrl: 'https://arulraj1997.netlify.app',
  siteTitle: 'Arulraj Venkadachalam — Senior Frontend Engineer & Frontend Architect',
  siteDescription:
    'Portfolio of Arulraj Venkadachalam: micro-frontend platforms, multi-brand design systems and React Native apps, built with React 19, TypeScript and Module Federation.',
};

export type Profile = typeof profile;
