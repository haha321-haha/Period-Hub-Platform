'use client';

interface NavigationTabsProps {
  locale: string;
}

export default function NavigationTabs({ locale }: NavigationTabsProps) {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="flex justify-center">
      <div className="bg-neutral-100 p-1 rounded-lg inline-flex">
        <button
          onClick={() => scrollToSection('articles-section')}
          className="px-6 py-2 rounded-md text-neutral-700 hover:bg-white hover:shadow-sm transition-all"
        >
          {locale === 'zh' ? '📚 专业文章' : '📚 Articles'}
        </button>
        <button
          onClick={() => scrollToSection('downloads-section')}
          className="px-6 py-2 rounded-md text-neutral-700 hover:bg-white hover:shadow-sm transition-all"
        >
          {locale === 'zh' ? '📥 PDF下载' : '📥 PDF Downloads'}
        </button>
      </div>
    </section>
  );
}
