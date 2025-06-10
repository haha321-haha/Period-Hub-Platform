import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';

import './globals.css';
import { AppProvider } from '../components/advanced/AppProvider';

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Generate metadata
export const metadata: Metadata = {
  title: {
    template: '%s | periodhub.health',
    default: 'periodhub.health - Your Guide to Menstrual Wellness',
  },
  description: 'Your compassionate guide to navigating menstrual pain with effective solutions, supportive resources, and a path to better menstrual health.',
  keywords: [
    'period pain relief',
    'menstrual cramps',
    'natural remedies',
    'period management',
    'women\'s health',
    'dysmenorrhea treatment',
    'periodhub.health',
    'menstrual health',
    'articles',
    'therapies'
  ],
  authors: [{ name: 'periodhub.health team' }],
  creator: 'periodhub.health',
  publisher: 'periodhub.health',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://periodhub.health'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current locale from headers or default to 'en'
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale = pathname.startsWith('/zh') ? 'zh' : 'en';

  return (
    <html lang={locale} className={`scroll-smooth ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="https://v3.fal.media" />
        <link rel="preconnect" href="https://unpkg.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased bg-neutral-50 text-neutral-900 flex flex-col min-h-screen">
        <AppProvider>
          {children}
        </AppProvider>

        {/* Medical Disclaimer - For compliance and user safety */}
        <div className="sr-only">
          This website provides information about menstrual health for educational purposes only.
          The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          Always seek the advice of your physician or other qualified health provider with any questions you may have.
        </div>
      </body>
    </html>
  );
}
