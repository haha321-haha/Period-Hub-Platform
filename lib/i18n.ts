import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Define supported locales
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = 'en' as const;

// For type safety with pathnames
export type Pathnames = {
  [K in string]: {
    [L in Locale]: string;
  };
};

// Define localized routes if needed
export const pathnames: Pathnames = {
  '/': {
    en: '/',
    zh: '/'
  },
  '/about': {
    en: '/about',
    zh: '/about'
  },
  '/articles': {
    en: '/articles',
    zh: '/articles'
  },
  '/therapies': {
    en: '/therapies',
    zh: '/therapies'
  },
  '/immediate-relief': {
    en: '/immediate-relief',
    zh: '/immediate-relief'
  },
  '/natural-therapies': {
    en: '/natural-therapies',
    zh: '/natural-therapies'
  },
  '/cultural-charms': {
    en: '/cultural-charms',
    zh: '/cultural-charms'
  }
};

// Configure how the locale prefix is handled
export const localePrefix = 'as-needed' as const;

// Main configuration for next-intl
export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request
  let locale = await requestLocale;

  // If no locale is provided, use the default locale
  if (!locale) {
    locale = defaultLocale;
  }

  // Validate the requested locale
  if (!locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  try {
    // Load all message files for the requested locale
    const [
      translation,
      downloads,
      painTracker
    ] = await Promise.all([
      import(`../public/locales/${locale}/translation.json`).then(m => m.default).catch(() => ({})),
      import(`../public/locales/${locale}/downloads.json`).then(m => m.default).catch(() => ({})),
      import(`../public/locales/${locale}/painTracker.json`).then(m => m.default).catch(() => ({}))
    ]);

    // Merge all messages
    const messages = {
      ...translation,
      downloads,
      painTracker
    };

    return {
      locale,
      messages,
      // Optional: You can add timeZone, now, formats, etc. here
      timeZone: 'UTC',
      // Optional: Add default formats
      formats: {
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }
        }
      }
    };
  } catch (error) {
    console.error(`Error loading messages for locale "${locale}":`, error);

    // Fallback to default locale if translation file is missing
    if (locale !== defaultLocale) {
      try {
        const [
          fallbackTranslation,
          fallbackDownloads,
          fallbackPainTracker
        ] = await Promise.all([
          import(`../public/locales/${defaultLocale}/translation.json`).then(m => m.default).catch(() => ({})),
          import(`../public/locales/${defaultLocale}/downloads.json`).then(m => m.default).catch(() => ({})),
          import(`../public/locales/${defaultLocale}/painTracker.json`).then(m => m.default).catch(() => ({}))
        ]);

        const fallbackMessages = {
          ...fallbackTranslation,
          downloads: fallbackDownloads,
          painTracker: fallbackPainTracker
        };

        return {
          locale: defaultLocale,
          messages: fallbackMessages,
          timeZone: 'UTC'
        };
      } catch (fallbackError) {
        console.error(`Error loading fallback messages:`, fallbackError);
      }
    }

    // Return empty messages as last resort
    return { locale: defaultLocale, messages: {}, timeZone: 'UTC' };
  }
});

// Export routing configuration for use in other files
export const routing = {
  locales,
  defaultLocale,
  localePrefix,
  pathnames
};
