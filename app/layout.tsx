import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';
import { profile } from '@/content/profile';
import { themeInitScript } from '@/lib/useTheme';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { SceneRoot } from '@/components/scene/SceneRoot';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display', display: 'swap' });
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: profile.siteTitle,
  description: profile.siteDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: profile.siteUrl,
    title: profile.siteTitle,
    description: profile.siteDescription,
    siteName: profile.name,
  },
  twitter: { card: 'summary_large_image', title: profile.siteTitle, description: profile.siteDescription },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a12' },
    { media: '(prefers-color-scheme: light)', color: '#eef0fa' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  url: profile.siteUrl,
  email: profile.social.email,
  telephone: profile.phoneRaw,
  address: { '@type': 'PostalAddress', addressLocality: profile.address.city, addressRegion: profile.address.state, addressCountry: profile.address.countryShort },
  sameAs: [profile.social.github, profile.social.linkedin],
  worksFor: { '@type': 'Organization', name: profile.currently.org },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SceneRoot />
        <SmoothScroll />
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
