/**
 * Everything about Arulraj that is not a job, a project or a skill.
 * Metadata, JSON-LD, the OG image and every section read from here. Text mirrors the résumé.
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
  /** Résumé professional summary, verbatim. */
  summary:
    "Senior Frontend Engineer with 6+ years building scalable web and mobile applications, leading frontend engineering across three product lines at The Reward Store. Architected a micro-frontend platform shared by four host applications and a 76-component multi-brand design system, shipped native apps and a six-runtime embed SDK, and owns the team's standards, CI/CD, production and AI-assisted engineering workflow.",
  /** First-person version of the summary for the About section. */
  bio: "I'm a Senior Frontend Engineer with 6+ years building scalable web and mobile applications, currently leading frontend engineering across three product lines at The Reward Store. I architected a micro-frontend platform shared by four host applications and a 76-component multi-brand design system, shipped native apps and a six-runtime embed SDK, and I own the team's standards, CI/CD, production and AI-assisted engineering workflow. Along the way I've delivered flight booking, real-time payments and enterprise admin dashboards, and I enjoy mentoring the people who build them.",
  /** Résumé key strengths. */
  strengths: [
    'Frontend Architecture & Micro-Frontends',
    'Design Systems & Multi-brand Theming',
    'Mobile Development & SDK Publishing',
    'CI/CD, Deployments & Production Ownership',
    'Code Quality Automation & Review',
    'AI-Assisted Engineering Workflows',
    'Performance & Bundle Budgets',
    'Team Leadership & Mentoring',
    'Product Flow Support & Delivery',
    'Debugging & Quick Production Fixes',
    'Full-stack Delivery (React + Go with AI)',
    'Scalable System Design',
    'Cross-Functional Collaboration',
  ],
  availability: 'Open to senior frontend roles',
  currently: { org: 'The Reward Store', detail: 'Lead frontend' },
  stack: ['React', 'React Native', 'TypeScript', 'Micro-frontends'],
  facts: [
    { label: 'Location', value: 'Salem, Tamil Nadu, India (IST)' },
    { label: 'Experience', value: '6+ years' },
    { label: 'Email', value: 'abofficial1997@gmail.com', href: 'mailto:abofficial1997@gmail.com' },
    { label: 'Phone', value: '+91 81898 38485', href: 'tel:+918189838485' },
    { label: 'Languages', value: 'Tamil (native), English (professional working proficiency)' },
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
  siteTitle: 'Arulraj Venkadachalam | Frontend Architect & Engineer',
  siteDescription:
    'Senior Frontend Engineer and Frontend Architect in Salem, India. I build micro-frontend platforms, multi-brand design systems and React Native apps. Open to senior roles.',
};

export type Profile = typeof profile;
