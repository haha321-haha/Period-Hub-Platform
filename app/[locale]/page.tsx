import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import SearchBox from '@/components/SearchBox';
import { getAllArticles } from '@/lib/articles';

// Generate metadata for the page
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'site' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function HomePage() {
  // Get translations for the homepage
  const t = useTranslations('homepage');
  const commonT = useTranslations('common');
  const locale = useLocale();

  // Get all articles for search functionality
  const articles = getAllArticles(locale);
  
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                {t('hero.headline')}
              </h1>
              <p className="text-lg md:text-xl text-neutral-700">
                {t('hero.subheadline')}
              </p>
              <p className="text-neutral-600 max-w-lg mx-auto md:mx-0">
                {t('hero.bodyCopy')}
              </p>
              {/* Quick Search Box */}
              <div className="max-w-md mx-auto md:mx-0 mb-6">
                <SearchBox
                  articles={articles}
                  locale={locale}
                  placeholder={locale === 'zh' ? '🔍 快速搜索痛经解决方案...' : '🔍 Quick search for pain relief solutions...'}
                  className="w-full"
                />
                <p className="text-sm text-neutral-500 mt-2 text-center md:text-left">
                  {locale === 'zh'
                    ? '💡 试试搜索"5分钟缓解"、"热敷"、"前列腺素"'
                    : '💡 Try searching "5-minute relief", "heat therapy", "prostaglandins"'
                  }
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href={`/${locale}/immediate-relief`} className="btn-primary">
                  {t('hero.ctaExplore')}
                </Link>
                <Link href={`/${locale}/interactive-tools`} className="btn-outline">
                  {t('hero.ctaCheckSymptoms')}
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
              {/* Hero image placeholder - shows required image specifications */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
                <ImagePlaceholder
                  filename="hero-main-banner.jpg"
                  alt="Professional healthcare illustration showing diverse women in comfortable poses, conveying comfort and medical trust"
                  width={800}
                  height={450}
                  className="w-full h-full border-0"
                  description="Warm and professional healthcare illustration, young diverse women in comfortable poses, soft pink and blue gradient background, modern minimalist style"
                />
              </div>
              {/* TODO: Replace with actual image when available */}
              {/* <Image
                src="/images/hero/hero-main-banner.jpg"
                alt={t('hero.imageAlt')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 gradient-purple-pink text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'zh' ? '数据说话，效果可见' : 'Data-Driven Results'}
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto">
              {locale === 'zh'
                ? '基于真实用户反馈和科学研究的数据统计'
                : 'Statistics based on real user feedback and scientific research'
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center animate-slide-up">
              <div className="text-4xl md:text-5xl font-bold mb-2">92%</div>
              <p className="text-primary-100">{locale === 'zh' ? '用户症状改善' : 'Users Report Improvement'}</p>
            </div>
            <div className="text-center animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl md:text-5xl font-bold mb-2">{locale === 'zh' ? '10万+' : '100K+'}</div>
              <p className="text-primary-100">{locale === 'zh' ? '累计用户' : 'Total Users'}</p>
            </div>
            <div className="text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <p className="text-primary-100">{locale === 'zh' ? '在线支持' : 'Online Support'}</p>
            </div>
            <div className="text-center animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <p className="text-primary-100">{locale === 'zh' ? '专业文章' : 'Expert Articles'}</p>
            </div>
          </div>

          {/* Statistics Infographic */}
          <div className="flex justify-center">
            <ImagePlaceholder
              filename="stats-infographic.svg"
              alt="Medical statistics infographic showing women's health data with clean data visualization"
              width={800}
              height={400}
              className="bg-white/20 backdrop-blur-sm"
              description="Medical statistics infographic, clean data visualization, pink and blue color scheme, professional charts and graphs"
            />
          </div>
        </div>
      </section>

      {/* Modules Section - Core Features */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-10 text-center">
            {t('modules.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Interactive Solutions Module */}
            <div className="card flex flex-col h-full">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                {t('modules.interactiveSolutions.title')}
              </h3>
              <p className="text-neutral-600 mb-4 flex-grow">
                {t('modules.interactiveSolutions.description')}
              </p>
              <Link href={`/${locale}/interactive-tools`} className="text-secondary-600 hover:text-secondary-700 font-medium inline-flex items-center">
                {commonT('tryNow')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Daily Conditioning Module */}
            <div className="card flex flex-col h-full">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 text-accent-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                {t('modules.dailyConditioning.title')}
              </h3>
              <p className="text-neutral-600 mb-4 flex-grow">
                {t('modules.dailyConditioning.description')}
              </p>
              <Link href={`/${locale}/natural-therapies`} className="text-accent-600 hover:text-accent-700 font-medium inline-flex items-center">
                {commonT('learnMore')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Health Guide Module */}
            <div className="card flex flex-col h-full">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 0 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 1 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                {locale === 'zh' ? '痛经健康指南' : 'Health Guide'}
              </h3>
              <p className="text-neutral-600 mb-4 flex-grow">
                {locale === 'zh'
                  ? '全面的痛经健康知识体系，从基础理解到高级管理策略，助您掌握经期健康。'
                  : 'Comprehensive menstrual health knowledge system, from basic understanding to advanced management strategies.'
                }
              </p>
              <Link href={`/${locale}/health-guide`} className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                {commonT('learnMore')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tools Highlight Section */}
      <section className="py-12 bg-gradient-to-r from-secondary-50 to-primary-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
              {locale === 'zh' ? '智能健康工具' : 'Smart Health Tools'}
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              {locale === 'zh'
                ? '专业的评估和追踪工具，帮助您更好地了解和管理经期健康'
                : 'Professional assessment and tracking tools to help you better understand and manage your menstrual health'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Smart Symptom Assessment */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-3">
                {locale === 'zh' ? '智能症状评估' : 'Smart Symptom Assessment'}
              </h3>
              <p className="text-neutral-600 mb-6 flex-grow">
                {locale === 'zh'
                  ? '通过专业问卷快速识别疼痛类型，为您提供精准的个性化建议。只需回答5个简单问题，获取针对您特定情况的缓解方案。'
                  : 'Quickly identify pain types through professional questionnaires and receive precise personalized recommendations. Just answer 5 simple questions to get relief solutions tailored to your specific situation.'
                }
              </p>
              <Link href={`/${locale}/interactive-tools/symptom-assessment`} className="btn-primary w-full text-center">
                {locale === 'zh' ? '立即评估' : 'Start Assessment'}
              </Link>
            </div>

            {/* Period Pain Assessment Tool */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary-700 mb-3">
                {locale === 'zh' ? '痛经速测小工具' : 'Period Pain Assessment'}
              </h3>
              <p className="text-neutral-600 mb-6 flex-grow">
                {locale === 'zh'
                  ? '回答几个简单问题，初步了解你的痛经类型和严重程度，获得个性化的健康建议和就医指导。'
                  : 'Answer a few simple questions to understand your period pain type and severity, and get personalized health recommendations and medical guidance.'
                }
              </p>
              <Link href={`/${locale}/interactive-tools/period-pain-assessment`} className="btn-secondary w-full text-center">
                {locale === 'zh' ? '立即评估' : 'Quick Assessment'}
              </Link>
            </div>

            {/* Smart Tracking System */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 text-accent-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-accent-700 mb-3">
                {locale === 'zh' ? '智能追踪系统' : 'Smart Tracking System'}
              </h3>
              <p className="text-neutral-600 mb-6 flex-grow">
                {locale === 'zh'
                  ? '记录疼痛模式，分析趋势变化，优化治疗效果。通过可视化图表了解您的经期健康状况，发现规律，调整方案。'
                  : 'Record pain patterns, analyze trend changes, and optimize treatment effectiveness. Understand your menstrual health through visual charts, discover patterns, and adjust your approach.'
                }
              </p>
              <Link href={`/${locale}/interactive-tools/pain-tracker`} className="btn-outline w-full text-center">
                {locale === 'zh' ? '开始记录' : 'Start Tracking'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-12 bg-neutral-100">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-10 text-center">
            {t('featuredContent.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* This would typically be dynamically generated from your content */}
            <Link href={`/${locale}/articles/understanding-your-cycle`} className="card group block">
              <article>
                <h3 className="text-xl font-semibold text-primary-600 group-hover:text-primary-700 mb-2">
                  {locale === 'zh' ? '了解您的月经周期' : 'Understanding Your Menstrual Cycle'}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {locale === 'zh'
                    ? '学习月经周期的基础知识、各个阶段以及激素如何在您的每月健康中发挥关键作用。'
                    : 'Learn the basics of the menstrual cycle, its phases, and how hormones play a key role in your monthly health.'
                  }
                </p>
                <span className="font-medium text-primary-500 group-hover:text-primary-600 transition-colors">
                  {t('featuredContent.readMore')} &rarr;
                </span>
              </article>
            </Link>
            
            <Link href={`/${locale}/scenario-solutions`} className="card group block">
              <article>
                <h3 className="text-xl font-semibold text-primary-600 group-hover:text-primary-700 mb-2">
                  {locale === 'zh' ? '情景解决方案' : 'Scenario Solutions'}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {locale === 'zh'
                    ? '针对不同场景的专业解决方案，包括工作、学习、运动等各种情况下的痛经应对策略。'
                    : 'Professional solutions for different scenarios, including menstrual pain management strategies for work, study, exercise, and various life situations.'
                  }
                </p>
                <span className="font-medium text-primary-500 group-hover:text-primary-600 transition-colors">
                  {t('featuredContent.readMore')} &rarr;
                </span>
              </article>
            </Link>
            
            <Link href={`/${locale}/articles/nutrition-and-periods`} className="card group block">
              <article>
                <h3 className="text-xl font-semibold text-primary-600 group-hover:text-primary-700 mb-2">
                  {locale === 'zh' ? '营养与经期健康' : 'Nutrition & Menstrual Health'}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {locale === 'zh'
                    ? '饮食如何影响经期症状，以及哪些食物可以帮助减轻炎症和不适。'
                    : 'How diet affects menstrual symptoms and which foods can help reduce inflammation and discomfort.'
                  }
                </p>
                <span className="font-medium text-primary-500 group-hover:text-primary-600 transition-colors">
                  {t('featuredContent.readMore')} &rarr;
                </span>
              </article>
            </Link>
          </div>
          
          <div className="text-center mt-10">
            <Link href={`/${locale}/articles`} className="btn-outline">
              {t('featuredContent.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* User Success Stories */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-10 text-center">
            {locale === 'zh' ? '用户成功案例' : 'User Success Stories'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-lg font-bold text-primary-600 mr-4">
                  {locale === 'zh' ? '李' : 'L'}
                </div>
                <div>
                  <h3 className="font-semibold">{locale === 'zh' ? '李小雅' : 'Lisa Li'}</h3>
                  <p className="text-sm text-neutral-500">{locale === 'zh' ? 'IT从业者，25岁' : 'IT Professional, 25'}</p>
                </div>
              </div>
              <p className="text-neutral-600 mb-4">
                {locale === 'zh'
                  ? '"通过个性化评估发现我属于前列腺素过度分泌型痛经，按照平台建议调整饮食和运动，3个月后疼痛强度从8分降到3分，工作效率大幅提升！"'
                  : '"Through personalized assessment, I discovered I have prostaglandin-excess type dysmenorrhea. Following the platform\'s dietary and exercise recommendations, my pain intensity dropped from 8 to 3 points in 3 months, and my work efficiency improved significantly!"'
                }
              </p>
              <div className="flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center text-lg font-bold text-secondary-600 mr-4">
                  {locale === 'zh' ? '张' : 'T'}
                </div>
                <div>
                  <h3 className="font-semibold">{locale === 'zh' ? '张婷婷' : 'Tina Zhang'}</h3>
                  <p className="text-sm text-neutral-500">{locale === 'zh' ? '大学生，20岁' : 'University Student, 20'}</p>
                </div>
              </div>
              <p className="text-neutral-600 mb-4">
                {locale === 'zh'
                  ? '"青少年专区的内容太有用了！学会了热敷、瑜伽和呼吸法，现在考试期间来大姨妈也不怕了。还帮助室友一起改善，大家感情更好了。"'
                  : '"The teen section content is so helpful! I learned heat therapy, yoga, and breathing techniques. Now I\'m not afraid of getting my period during exams. I even helped my roommates improve, and our relationships got better!"'
                }
              </p>
              <div className="flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center text-lg font-bold text-accent-600 mr-4">
                  {locale === 'zh' ? '王' : 'W'}
                </div>
                <div>
                  <h3 className="font-semibold">{locale === 'zh' ? '王芳' : 'Wendy Wang'}</h3>
                  <p className="text-sm text-neutral-500">{locale === 'zh' ? '职场妈妈，32岁' : 'Working Mother, 32'}</p>
                </div>
              </div>
              <p className="text-neutral-600 mb-4">
                {locale === 'zh'
                  ? '"疼痛日志功能帮我发现了痛经与压力的关联性。配合医生治疗使用平台建议，现在基本告别了每月的痛苦，生活质量改善明显。"'
                  : '"The pain diary feature helped me discover the connection between menstrual pain and stress. Combined with doctor\'s treatment and platform recommendations, I\'ve basically said goodbye to monthly suffering, and my quality of life has improved significantly."'
                }
              </p>
              <div className="flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-neutral-700">
              {locale === 'zh'
                ? '已有超过10,000+女性在这里找到了属于自己的解决方案'
                : 'Over 10,000+ women have found their own solutions here'
              }
            </p>
            <Link href={`/${locale}/interactive-tools`} className="btn-primary mt-4">
              {locale === 'zh' ? '加入她们，开始您的康复之旅' : 'Join them and start your healing journey'}
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Content Section */}
      <section className="py-12 bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-10 text-center">
            {locale === 'zh' ? '专业内容板块' : 'Professional Content'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-primary-700 mb-4">
                {locale === 'zh' ? '平时调理方案' : 'Daily Conditioning Plans'}
              </h3>
              <p className="text-neutral-600 mb-4">
                {locale === 'zh'
                  ? '长期调理是预防痛经的关键。通过饮食、运动和生活方式的科学调整，从根源减少疼痛发生。'
                  : 'Long-term conditioning is key to preventing menstrual pain. Through scientific adjustments in diet, exercise, and lifestyle, reduce pain occurrence from the source.'
                }
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-4 space-y-1">
                <li>{locale === 'zh' ? '抗炎饮食指导与营养补充' : 'Anti-inflammatory diet guidance & nutritional supplements'}</li>
                <li>{locale === 'zh' ? '月经周期运动计划' : 'Menstrual cycle exercise plans'}</li>
                <li>{locale === 'zh' ? '压力管理与睡眠优化' : 'Stress management & sleep optimization'}</li>
                <li>{locale === 'zh' ? '中医调理与草本疗法' : 'Traditional Chinese medicine & herbal therapies'}</li>
              </ul>
              <Link href={`/${locale}/natural-therapies`} className="text-primary-600 hover:text-primary-700 font-medium">
                {locale === 'zh' ? '了解详情 →' : 'Learn More →'}
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold text-primary-700 mb-4">
                {locale === 'zh' ? '医学原理研究' : 'Medical Research'}
              </h3>
              <p className="text-neutral-600 mb-4">
                {locale === 'zh'
                  ? '基于WHO、Mayo Clinic等权威机构的最新研究，深度解析痛经成因与治疗机制。'
                  : 'Based on the latest research from authoritative institutions like WHO and Mayo Clinic, providing in-depth analysis of menstrual pain causes and treatment mechanisms.'
                }
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-4 space-y-1">
                <li>{locale === 'zh' ? '原发性vs继发性痛经病理' : 'Primary vs secondary dysmenorrhea pathology'}</li>
                <li>{locale === 'zh' ? '前列腺素与疼痛传导机制' : 'Prostaglandin & pain transmission mechanisms'}</li>
                <li>{locale === 'zh' ? '药物治疗原理与选择' : 'Pharmaceutical treatment principles & selection'}</li>
                <li>{locale === 'zh' ? '最新临床研究进展' : 'Latest clinical research developments'}</li>
              </ul>
              <Link href={`/${locale}/articles`} className="text-primary-600 hover:text-primary-700 font-medium">
                {locale === 'zh' ? '阅读研究 →' : 'Read Research →'}
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold text-primary-700 mb-4">
                {locale === 'zh' ? '知识与故事中心' : 'Knowledge & Stories Center'}
              </h3>
              <p className="text-neutral-600 mb-4">
                {locale === 'zh'
                  ? '丰富的健康资讯、真实用户康复故事和专家深度访谈，为您提供全方位支持。'
                  : 'Rich health information, real user recovery stories, and in-depth expert interviews to provide you with comprehensive support.'
                }
              </p>
              <ul className="list-disc list-inside text-neutral-600 mb-4 space-y-1">
                <li>{locale === 'zh' ? '每周更新的健康资讯' : 'Weekly updated health information'}</li>
                <li>{locale === 'zh' ? '真实用户康复经历分享' : 'Real user recovery experience sharing'}</li>
                <li>{locale === 'zh' ? '妇科专家深度访谈' : 'In-depth gynecologist interviews'}</li>
                <li>{locale === 'zh' ? '青少年经期健康指导' : 'Teen menstrual health guidance'}</li>
              </ul>
              <Link href={`/${locale}/articles`} className="text-primary-600 hover:text-primary-700 font-medium">
                {locale === 'zh' ? '浏览文章 →' : 'Browse Articles →'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <div className="container-custom">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 my-8" role="alert">
          <p className="font-bold">
            {locale === 'zh' ? '医疗免责声明' : 'Medical Disclaimer'}
          </p>
          <p className="text-sm">
            {commonT('medicalDisclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
}
