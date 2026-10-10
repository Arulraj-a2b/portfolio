import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';
import { profile } from '@/content/profile';
import { skillGroups } from '@/content/skills';
import { educationList } from '@/content/experience';
import { themeInitScript } from '@/lib/useTheme';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { SceneRoot } from '@/components/scene/SceneRoot';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: profile.siteTitle,
  description: profile.siteDescription,
  alternates: { canonical: '/' },
  applicationName: profile.shortName,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: 'technology',
  keywords: [
    'Arulraj Venkadachalam',
    'Senior Frontend Engineer',
    'Frontend Architect',
    'React',
    'React Native',
    'TypeScript',
    'Micro-frontends',
    'Module Federation',
    'Design systems',
    'Next.js',
    'Salem',
    'India',
  ],
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
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: profile.siteUrl,
    title: profile.siteTitle,
    description: profile.siteDescription,
    siteName: profile.name,
  },
  twitter: { card: 'summary_large_image', title: profile.siteTitle, description: profile.siteDescription },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a12' },
    { media: '(prefers-color-scheme: light)', color: '#eef0fa' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const person = {
  '@type': 'Person',
  '@id': `${profile.siteUrl}/#person`,
  name: profile.name,
  jobTitle: profile.role,
  description: profile.siteDescription,
  image: `${profile.siteUrl}/avatar-3d.jpg`,
  url: profile.siteUrl,
  email: profile.social.email,
  telephone: profile.phoneRaw,
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.address.city,
    addressRegion: profile.address.state,
    addressCountry: profile.address.countryShort,
  },
  sameAs: [profile.social.github, profile.social.linkedin],
  worksFor: { '@type': 'Organization', name: profile.currently.org },
  alumniOf: educationList.map((e) => ({ '@type': 'EducationalOrganization', name: e.org })),
  knowsAbout: skillGroups.flatMap((g) => g.core).slice(0, 24),
};
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    person,
    {
      '@type': 'WebSite',
      '@id': `${profile.siteUrl}/#website`,
      url: profile.siteUrl,
      name: profile.name,
      description: profile.siteDescription,
      inLanguage: 'en',
      publisher: { '@id': `${profile.siteUrl}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${profile.siteUrl}/#profilepage`,
      url: profile.siteUrl,
      name: profile.siteTitle,
      description: profile.siteDescription,
      inLanguage: 'en',
      isPartOf: { '@id': `${profile.siteUrl}/#website` },
      mainEntity: { '@id': `${profile.siteUrl}/#person` },
      primaryImageOfPage: `${profile.siteUrl}/opengraph-image`,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SceneRoot />
        <SmoothScroll />
        <div className="page-shell relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
