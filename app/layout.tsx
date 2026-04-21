import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://arulraj1997.netlify.app';
const SITE_TITLE = 'Arulraj Venkadachalam — Senior Software Engineer, Frontend';
const SITE_DESCRIPTION =
  'Portfolio of Arulraj Venkadachalam — Senior Software Engineer (Frontend) crafting scalable web apps and cross-platform mobile apps with React, React Native, TypeScript, and Micro-Frontends.';

// TODO: Replace with real X/Twitter handle when available
const TWITTER_HANDLE = '@arulraj_a2b';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: 'Arulraj Venkadachalam Portfolio',
  keywords: [
    'Arulraj Venkadachalam',
    'Senior Frontend Engineer',
    'Senior Software Engineer Frontend',
    'React',
    'React Native',
    'Next.js',
    'TypeScript',
    'Micro-Frontends',
    'Module Federation',
    'Rspack',
    'Redux Toolkit',
    'GraphQL',
    'Tailwind CSS',
    'Portfolio',
    'Frontend Architect',
  ],
  authors: [{ name: 'Arulraj Venkadachalam', url: SITE_URL }],
  creator: 'Arulraj Venkadachalam',
  publisher: 'Arulraj Venkadachalam',
  category: 'Technology',
  alternates: {
    canonical: SITE_URL,
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Arulraj Venkadachalam',
    images: [
      {
        url: '/meta.png',
        width: 1200,
        height: 630,
        alt: 'Arulraj Venkadachalam — Senior Software Engineer, Frontend',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/meta.png'],
    creator: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    // TODO: Add Google Search Console token when verifying
    // google: 'REPLACE_WITH_SEARCH_CONSOLE_TOKEN',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0b10' },
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// TODO: Replace/Add social URLs when available
const SOCIAL_URLS = {
  github: 'https://github.com/Arulraj-a2b',
  linkedin: 'https://www.linkedin.com/in/abofficial1997',
  // twitter: 'https://twitter.com/arulraj_a2b',
  // instagram: 'https://www.instagram.com/arulraj_v/',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arulraj Venkadachalam',
  givenName: 'Arulraj',
  familyName: 'Venkadachalam',
  url: SITE_URL,
  image: `${SITE_URL}/profile.png`,
  jobTitle: 'Senior Software Engineer, Frontend',
  description: SITE_DESCRIPTION,
  worksFor: {
    '@type': 'Organization',
    name: 'The Reward Store',
    url: 'https://www.therewardstore.com',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Thiagarajar College of Engineering',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Madurai',
        addressCountry: 'India',
      },
    },
    {
      '@type': 'EducationalOrganization',
      name: 'Thiagarajar Polytechnic College',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Salem',
        addressCountry: 'India',
      },
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Salem',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'India',
  },
  email: 'mailto:abofficial1997@gmail.com',
  telephone: '+91-81898-38485',
  sameAs: Object.values(SOCIAL_URLS),
  knowsAbout: [
    'React',
    'React Native',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Micro-Frontends',
    'Module Federation',
    'Rspack',
    'Redux Toolkit',
    'GraphQL',
    'Tailwind CSS',
    'Storybook',
    'Node.js',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Arulraj Venkadachalam — Portfolio',
  alternateName: 'Arulraj V Portfolio',
  url: SITE_URL,
  inLanguage: 'en-US',
  description: SITE_DESCRIPTION,
  author: {
    '@type': 'Person',
    name: 'Arulraj Venkadachalam',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Person',
    name: 'Arulraj Venkadachalam',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
