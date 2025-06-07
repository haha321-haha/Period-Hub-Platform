import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import '../globals.css';

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Generate metadata
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'site' });
  
  return {
    title: {
      template: '%s | periodhub.health',
      default: t('title'),
    },
    description: t('description'),
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
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en',
        'zh-CN': '/zh',
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: '/',
      title: t('title'),
      description: t('description'),
      siteName: t('name'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
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
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate the requested locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the requested locale
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main className="flex-grow container-custom py-8">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
