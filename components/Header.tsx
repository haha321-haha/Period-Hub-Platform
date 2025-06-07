'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigation items
  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: locale === 'zh' ? '互动解决方案' : 'Interactive Solutions', href: `/${locale}/interactive-tools` },
    { name: locale === 'zh' ? '文章PDF下载中心' : 'Articles & Downloads', href: `/${locale}/articles` },
    { name: t('scenarioSolutions'), href: `/${locale}/scenario-solutions` },
    // { name: locale === 'zh' ? '🚀 框架演示' : '🚀 Framework Demo', href: `/${locale}/framework-demo` }, // 暂时隐藏 - 可快速恢复
    { name: locale === 'zh' ? '平时调理' : 'Natural Care', href: `/${locale}/natural-therapies` },
    { name: locale === 'zh' ? '痛经健康指南' : 'Health Guide', href: `/${locale}/health-guide` },
  ];

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-200/80' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <span className="font-bold text-xl text-primary-600 hover:text-primary-700 transition-colors">
                periodhub.health
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Language Switcher and Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <X className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Language Switcher Component
function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const switchLocale = (newLocale: string) => {
    // Replace the current locale segment in the pathname with the new locale
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPath; // Use window.location for a full page refresh
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 text-sm font-medium text-neutral-600 hover:text-primary-600 rounded hover:bg-neutral-100 transition-colors"
        aria-expanded={isOpen}
      >
        <span>{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-neutral-200 z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLocale(language.code)}
                className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left hover:bg-neutral-50 transition-colors ${
                  locale === language.code ? 'bg-primary-50 text-primary-600' : 'text-neutral-700'
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
