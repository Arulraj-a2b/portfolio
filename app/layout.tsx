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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
    'Portfolio',
  ],
  authors: [{ name: 'Arulraj Venkadachalam', url: SITE_URL }],
  creator: 'Arulraj Venkadachalam',
  alternates: {
    canonical: SITE_URL,
  },
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
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#050810',
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arulraj Venkadachalam',
  url: SITE_URL,
  image: `${SITE_URL}/profile.png`,
  jobTitle: 'Senior Software Engineer, Frontend',
  worksFor: {
    '@type': 'Organization',
    name: 'The Reward Store',
    url: 'https://www.therewardstore.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Salem',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'India',
  },
  email: 'mailto:abofficial1997@gmail.com',
  sameAs: [
    'https://github.com/Arulraj-a2b',
    'https://www.linkedin.com/in/arulraj-venkadachalam-b68146194/',
  ],
  knowsAbout: [
    'React',
    'React Native',
    'Next.js',
    'TypeScript',
    'Micro-Frontends',
    'Module Federation',
    'Redux Toolkit',
    'GraphQL',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
