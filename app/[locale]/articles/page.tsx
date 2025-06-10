import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import { Download, FileText, Users, GraduationCap, Heart, CheckCircle, ClipboardList, Calendar, BarChart3 } from 'lucide-react';
import DownloadButton from '@/components/DownloadButton';
import NavigationTabs from '@/components/NavigationTabs';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import SearchBox from '@/components/SearchBox';

import { Locale, locales } from '@/i18n';



// PDF Resources Interface
interface PDFResource {
  id: string;
  titleKey: string;
  descriptionKey: string;
  filename: string;
  category: 'management-tools' | 'health-management' | 'communication-guidance';
  icon: React.ComponentType<any>;
  size: string;
  pages: number;
}

const pdfResources: PDFResource[] = [
  // 🛠️ 管理工具类 (Management Tools)
  {
    id: 'pain-tracking-form',
    titleKey: 'resources.painTrackingForm.title',
    descriptionKey: 'resources.painTrackingForm.description',
    filename: 'pain-tracking-form.html',
    category: 'management-tools',
    icon: ClipboardList,
    size: '移动端友好',
    pages: 1
  },
  {
    id: 'menstrual-cycle-nutrition-plan',
    titleKey: 'resources.menstrualCycleNutritionPlan.title',
    descriptionKey: 'resources.menstrualCycleNutritionPlan.description',
    filename: 'menstrual-cycle-nutrition-plan.html',
    category: 'management-tools',
    icon: Calendar,
    size: '移动端友好',
    pages: 1
  },
  {
    id: 'natural-therapy-assessment',
    titleKey: 'resources.naturalTherapyAssessment.title',
    descriptionKey: 'resources.naturalTherapyAssessment.description',
    filename: 'natural-therapy-assessment.html',
    category: 'management-tools',
    icon: BarChart3,
    size: '移动端友好',
    pages: 1
  },
  {
    id: 'healthy-habits-checklist',
    titleKey: 'resources.healthyHabits.title',
    descriptionKey: 'resources.healthyHabits.description',
    filename: 'healthy-habits-checklist.html',
    category: 'management-tools',
    icon: CheckCircle,
    size: '移动端友好',
    pages: 1
  },
  // 🏥 健康管理类 (Health Management)
  {
    id: 'specific-menstrual-pain-management-guide',
    titleKey: 'resources.specificPainManagement.title',
    descriptionKey: 'resources.specificPainManagement.description',
    filename: 'specific-menstrual-pain-management-guide.html',
    category: 'health-management',
    icon: Heart,
    size: '移动端友好',
    pages: 1
  },
  {
    id: 'menstrual-pain-complications-management',
    titleKey: 'resources.painComplications.title',
    descriptionKey: 'resources.painComplications.description',
    filename: 'menstrual-pain-complications-management.html',
    category: 'health-management',
    icon: Heart,
    size: '移动端友好',
    pages: 1
  },
  {
    id: 'magnesium-gut-health-menstrual-pain-guide',
    titleKey: 'resources.magnesiumGutHealth.title',
    descriptionKey: 'resources.magnesiumGutHealth.description',
    filename: 'magnesium-gut-health-menstrual-pain-guide.html',
    category: 'health-management',
    icon: Heart,
    size: '移动端友好',
    pages: 1
  },
  {
    id: 'zhan-zhuang-baduanjin-guide',
    titleKey: 'resources.zhanZhuangBaduanjin.title',
    descriptionKey: 'resources.zhanZhuangBaduanjin.description',
    filename: 'zhan-zhuang-baduanjin-illustrated-guide.html',
    category: 'health-management',
    icon: Heart,
    size: '移动端友好',
    pages: 1
  },
  // 💬 沟通指导类 (Communication Guidance)
  {
    id: 'campus-emergency-checklist',
    titleKey: 'resources.campusEmergency.title',
    descriptionKey: 'resources.campusEmergency.description',
    filename: 'campus-emergency-checklist.html',
    category: 'communication-guidance',
    icon: CheckCircle,
    size: '移动端友好',
    pages: 1
  },
  {
    id: 'parent-communication-guide',
    titleKey: 'resources.parentGuide.title',
    descriptionKey: 'resources.parentGuide.description',
    filename: 'parent-communication-guide.html',
    category: 'communication-guidance',
    icon: Users,
    size: '移动端友好',
    pages: 1
  },
  {
    id: 'teacher-health-manual',
    titleKey: 'resources.teacherManual.title',
    descriptionKey: 'resources.teacherManual.description',
    filename: 'teacher-health-manual.html',
    category: 'communication-guidance',
    icon: GraduationCap,
    size: '移动端友好',
    pages: 1
  },
  {
    id: 'teacher-collaboration-handbook',
    titleKey: 'resources.teacherCollaborationHandbook.title',
    descriptionKey: 'resources.teacherCollaborationHandbook.description',
    filename: 'teacher-collaboration-handbook.html',
    category: 'communication-guidance',
    icon: GraduationCap,
    size: '移动端友好',
    pages: 1
  }
];

const categoryColors = {
  'management-tools': 'bg-blue-50 border-blue-200 text-blue-800',
  'health-management': 'bg-green-50 border-green-200 text-green-800',
  'communication-guidance': 'bg-orange-50 border-orange-200 text-orange-800'
};

// Generate metadata for the page
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const title = locale === 'zh' ? '文章PDF下载中心' : 'Articles & Downloads Center';
  const description = locale === 'zh'
    ? '浏览专业的痛经健康文章，下载实用的PDF资源指南，获取全面的经期健康支持。'
    : 'Browse professional menstrual health articles, download practical PDF resource guides, and get comprehensive period health support.';

  return {
    title,
    description,
  };
}

// Generate static params for all supported locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function ArticlesPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Get translations for the articles page
  const articleListT = useTranslations('articleList');
  const commonT = useTranslations('common');

  // Get all articles for the current locale
  const articles = getAllArticles(locale);

  // Define article categories and their corresponding article slugs
  const articleCategories = {
    immediate: [
      '5-minute-period-pain-relief',
      'heat-therapy-complete-guide',
      'hidden-culprits-of-menstrual-pain'
    ],
    natural: [
      'natural-physical-therapy-comprehensive-guide',
      'zhan-zhuang-baduanjin-for-menstrual-pain-relief',
      'global-traditional-menstrual-pain-relief',
      'magnesium-gut-health-comprehensive-guide'
    ],
    nutrition: [
      'anti-inflammatory-diet-period-pain',
      'period-friendly-recipes'
    ],
    medical: [
      'menstrual-pain-medical-guide',
      'comprehensive-medical-guide-to-dysmenorrhea',
      'comprehensive-iud-guide',
      'nsaid-menstrual-pain-professional-guide',
      'specific-menstrual-pain-management-guide',
      'menstrual-pain-complications-management'
    ],
    health: [
      'when-to-see-doctor-period-pain',
      'when-to-seek-medical-care-comprehensive-guide',
      'understanding-your-cycle'
    ],
    education: [
      'recommended-reading-list',
      'menstrual-pain-faq-expert-answers'
    ]
  };

  // Function to count articles in each category
  const getArticleCount = (categoryArticles: string[]) => {
    return categoryArticles.filter(slug =>
      articles.some(article => article.slug === slug)
    ).length;
  };
  
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <header className="text-center px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-700 mb-4 leading-tight">
          {locale === 'zh' ? '文章PDF下载中心' : 'Articles & Downloads Center'}
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
          {locale === 'zh'
            ? '浏览专业的痛经健康文章，下载实用的PDF资源指南，获取全面的经期健康支持。'
            : 'Browse professional menstrual health articles, download practical PDF resource guides, and get comprehensive period health support.'
          }
        </p>
      </header>

      {/* Navigation Tabs */}
      <NavigationTabs locale={locale} />

      {/* Search Box */}
      <div className="max-w-2xl mx-auto">
        <SearchBox
          articles={articles}
          locale={locale}
          placeholder={locale === 'zh' ? '搜索文章、症状、治疗方法...' : 'Search articles, symptoms, treatments...'}
          className="w-full"
        />
        <p className="text-sm text-gray-500 mt-2 text-center">
          {locale === 'zh'
            ? '💡 提示：可搜索"前列腺素"、"热敷"、"急诊"等关键词'
            : '💡 Tip: Try searching "prostaglandins", "heat therapy", "emergency", etc.'
          }
        </p>
      </div>

      {/* Articles Section */}
      <section id="articles-section" className="space-y-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
            {locale === 'zh' ? '专业健康文章' : 'Professional Health Articles'}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {locale === 'zh'
              ? '基于科学研究的专业文章，帮助您深入了解痛经管理和经期健康知识。'
              : 'Science-based professional articles to help you understand menstrual pain management and period health in depth.'
            }
          </p>
        </div>

        {/* 6大主题分类导航 */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              {locale === 'zh' ? '📚 按主题浏览文章' : '📚 Browse Articles by Theme'}
            </h3>
            <p className="text-neutral-600">
              {locale === 'zh'
                ? '选择您感兴趣的主题，快速找到相关的专业文章'
                : 'Choose your topic of interest to quickly find relevant professional articles'
              }
            </p>
          </div>

          {/* 即时缓解类 */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 text-xl sm:text-2xl">
                🚨
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-red-800">
                  {locale === 'zh' ? '即时缓解类' : 'Immediate Relief'}
                </h4>
                <p className="text-xs sm:text-sm text-red-600">
                  {locale === 'zh'
                    ? `${getArticleCount(articleCategories.immediate)}篇文章 • 紧急止痛与快速缓解`
                    : `${getArticleCount(articleCategories.immediate)} Articles • Emergency Pain Relief & Quick Solutions`
                  }
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Link href={`/${locale}/articles/5-minute-period-pain-relief`} className="bg-white rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow mobile-touch-target">
                <h5 className="font-semibold text-red-700 mb-2 text-sm sm:text-base">
                  {locale === 'zh' ? '5分钟快速缓解' : '5-Minute Quick Relief'}
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {locale === 'zh' ? '突发痛经的即时缓解技巧' : 'Immediate relief techniques for sudden menstrual pain'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/heat-therapy-complete-guide`} className="bg-white rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow mobile-touch-target">
                <h5 className="font-semibold text-red-700 mb-2 text-sm sm:text-base">
                  {locale === 'zh' ? '热敷疗法指南' : 'Heat Therapy Guide'}
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {locale === 'zh' ? '专业物理缓解方法' : 'Professional physical relief methods'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/hidden-culprits-of-menstrual-pain`} className="bg-white rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow mobile-touch-target sm:col-span-2 lg:col-span-1">
                <h5 className="font-semibold text-red-700 mb-2 text-sm sm:text-base">
                  {locale === 'zh' ? '痛经隐藏元凶' : 'Hidden Culprits of Pain'}
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {locale === 'zh' ? '快速识别疼痛根源' : 'Quickly identify pain sources'}
                </p>
              </Link>
            </div>
          </div>

          {/* 自然疗法类 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 text-xl sm:text-2xl">
                🌿
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-green-800">
                  {locale === 'zh' ? '自然疗法类' : 'Natural Therapies'}
                </h4>
                <p className="text-xs sm:text-sm text-green-600">
                  {locale === 'zh'
                    ? `${getArticleCount(articleCategories.natural)}篇文章 • 传统智慧与现代验证`
                    : `${getArticleCount(articleCategories.natural)} Articles • Traditional Wisdom & Modern Validation`
                  }
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Link href={`/${locale}/articles/natural-physical-therapy-comprehensive-guide`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-green-700 mb-2">
                  {locale === 'zh' ? '自然疗法综合指南' : 'Natural Therapy Guide'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '15种科学验证方法' : '15 scientifically validated methods'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/zhan-zhuang-baduanjin-for-menstrual-pain-relief`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-green-700 mb-2">
                  {locale === 'zh' ? '传统功法指南' : 'Traditional Practices Guide'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '站桩八段锦太极' : 'Standing meditation, Baduanjin, Tai Chi'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/global-traditional-menstrual-pain-relief`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-green-700 mb-2">
                  {locale === 'zh' ? '全球传统智慧' : 'Global Traditional Wisdom'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '国际视野疗法' : 'International perspective therapies'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/magnesium-gut-health-comprehensive-guide`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-green-700 mb-2">
                  {locale === 'zh' ? '镁平衡与肠道健康' : 'Magnesium & Gut Health'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '营养调理双重密码' : 'Dual key to nutritional therapy'}
                </p>
              </Link>
            </div>
          </div>

          {/* 营养饮食类 */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4 text-2xl">
                🥗
              </div>
              <div>
                <h4 className="text-lg font-bold text-yellow-800">
                  {locale === 'zh' ? '营养饮食类' : 'Nutrition & Diet'}
                </h4>
                <p className="text-sm text-yellow-600">
                  {locale === 'zh'
                    ? `${getArticleCount(articleCategories.nutrition)}篇文章 • 科学营养与实用食谱`
                    : `${getArticleCount(articleCategories.nutrition)} Articles • Scientific Nutrition & Practical Recipes`
                  }
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`/${locale}/articles/anti-inflammatory-diet-period-pain`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-yellow-700 mb-2">
                  {locale === 'zh' ? '抗炎饮食指南' : 'Anti-Inflammatory Diet Guide'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '科学营养疗法' : 'Scientific nutritional therapy'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/period-friendly-recipes`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-yellow-700 mb-2">
                  {locale === 'zh' ? '经期友好食谱' : 'Period-Friendly Recipes'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '实用美味料理' : 'Practical delicious recipes'}
                </p>
              </Link>
            </div>
          </div>

          {/* 医学专业类 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-2xl">
                🏥
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-800">
                  {locale === 'zh' ? '医学专业类' : 'Medical Professional'}
                </h4>
                <p className="text-sm text-blue-600">
                  {locale === 'zh'
                    ? `${getArticleCount(articleCategories.medical)}篇文章 • 专业诊断与科学治疗`
                    : `${getArticleCount(articleCategories.medical)} Articles • Professional Diagnosis & Scientific Treatment`
                  }
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <Link href={`/${locale}/articles/menstrual-pain-medical-guide`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-blue-700 mb-2">
                  {locale === 'zh' ? '痛经医学指南' : 'Medical Guide'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '病因诊断治疗' : 'Diagnosis & treatment'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/comprehensive-medical-guide-to-dysmenorrhea`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-blue-700 mb-2">
                  {locale === 'zh' ? '综合医学指南' : 'Comprehensive Guide'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '全面医学解析' : 'Complete medical analysis'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/comprehensive-iud-guide`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-blue-700 mb-2">
                  {locale === 'zh' ? '🛡️ IUD宫内节育器指南' : '🛡️ IUD Comprehensive Guide'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '避孕方法全面解析' : 'Complete contraception analysis'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/nsaid-menstrual-pain-professional-guide`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border-2 border-blue-200">
                <h5 className="font-semibold text-blue-700 mb-2">
                  {locale === 'zh' ? '💊 NSAIDs专业指南' : '💊 NSAIDs Professional Guide'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '安全用药与剂量计算' : 'Safe usage & dosage calculation'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/specific-menstrual-pain-management-guide`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-blue-700 mb-2">
                  {locale === 'zh' ? '特定情况管理' : 'Specific Management'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '个性化治疗方案' : 'Personalized treatment'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/menstrual-pain-complications-management`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-blue-700 mb-2">
                  {locale === 'zh' ? '并发症管理' : 'Complications Management'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '复杂情况处理' : 'Complex situation handling'}
                </p>
              </Link>
            </div>
          </div>

          {/* 健康管理类 */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 text-2xl">
                ⚠️
              </div>
              <div>
                <h4 className="text-lg font-bold text-orange-800">
                  {locale === 'zh' ? '健康管理类' : 'Health Management'}
                </h4>
                <p className="text-sm text-orange-600">
                  {locale === 'zh'
                    ? `${getArticleCount(articleCategories.health)}篇文章 • 危险信号识别与健康管理`
                    : `${getArticleCount(articleCategories.health)} Articles • Warning Signs Recognition & Health Management`
                  }
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href={`/${locale}/articles/when-to-see-doctor-period-pain`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border-l-4 border-red-500">
                <h5 className="font-semibold text-red-700 mb-2 flex items-center">
                  <span className="mr-2">🚨</span>
                  {locale === 'zh' ? '痛经急诊指南' : 'Menstrual Emergency Guide'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '7个危险信号与完整就医指导' : '7 warning signs & complete medical guidance'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/when-to-seek-medical-care-comprehensive-guide`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-orange-700 mb-2">
                  {locale === 'zh' ? '综合健康管理' : 'Comprehensive Health Management'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '自然缓解与就医' : 'Natural relief & medical care'}
                </p>
              </Link>
              <Link href={`/${locale}/articles/understanding-your-cycle`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-orange-700 mb-2">
                  {locale === 'zh' ? '了解月经周期' : 'Understanding Your Cycle'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '基础健康知识' : 'Basic health knowledge'}
                </p>
              </Link>
            </div>
          </div>

          {/* 教育资源类 */}
          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mr-4 text-2xl">
                📚
              </div>
              <div>
                <h4 className="text-lg font-bold text-cyan-800">
                  {locale === 'zh' ? '教育资源类' : 'Educational Resources'}
                </h4>
                <p className="text-sm text-cyan-600">
                  {locale === 'zh'
                    ? `${getArticleCount(articleCategories.education)}篇文章 • 深度学习与导航资源`
                    : `${getArticleCount(articleCategories.education)} Articles • In-depth Learning & Navigation Resources`
                  }
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`/${locale}/articles/recommended-reading-list`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-cyan-700 mb-2">
                  {locale === 'zh' ? '推荐书单' : 'Recommended Reading'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '深度学习资源' : 'In-depth learning resources'}
                </p>
              </Link>

              <Link href={`/${locale}/articles/menstrual-pain-faq-expert-answers`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="font-semibold text-cyan-700 mb-2">
                  {locale === 'zh' ? '痛经FAQ专家解答' : 'Menstrual Pain FAQ'}
                </h5>
                <p className="text-sm text-gray-600">
                  {locale === 'zh' ? '5个高频问题权威回应' : '5 most common questions answered'}
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* 精选文章 */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              {locale === 'zh' ? '⭐ 精选重点文章' : '⭐ Featured Articles'}
            </h3>
            <p className="text-neutral-600">
              {locale === 'zh'
                ? '编辑精选的重要文章，涵盖痛经管理的核心内容'
                : 'Editor-selected important articles covering core content of menstrual pain management'
              }
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.filter(article =>
                ['natural-physical-therapy-comprehensive-guide',
                 'menstrual-pain-medical-guide',
                 'nsaid-menstrual-pain-professional-guide',
                 'anti-inflammatory-diet-period-pain',
                 '5-minute-period-pain-relief',
                 'when-to-see-doctor-period-pain'].includes(article.slug)
              ).map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/articles/${article.slug}`}
                className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  {/* Article Category Cover Image */}
                  <div className="w-full h-48 rounded-lg mb-4 overflow-hidden">
                    <ImagePlaceholder
                      filename={`category-${article.category || 'medical-guide'}-cover.jpg`}
                      alt={`Cover image for ${article.category || 'medical guide'} category article`}
                      width={400}
                      height={200}
                      className="w-full h-full border-0"
                      description={`Professional healthcare setting for ${article.category || 'medical'} content, soft natural lighting, pink and blue accents`}
                    />
                  </div>

                  {/* Article Content */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <span>{article.date}</span>
                      <span>{locale === 'zh' ? article.reading_time_zh : article.reading_time}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {locale === 'zh' ? article.title_zh || article.title : article.title}
                    </h3>

                    <p className="text-neutral-600 line-clamp-3">
                      {locale === 'zh' ? article.summary_zh || article.summary : article.summary}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {(locale === 'zh' ? (article.tags_zh || article.tags) : article.tags)?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span className="text-primary-500 group-hover:text-primary-600 font-medium text-sm">
                        {commonT('readMore')} →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-primary-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <p className="text-neutral-600 text-lg">
                {articleListT('noArticles')}
              </p>
            </div>
          </div>
        )}
        </div>

        {/* 全部文章 */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              {locale === 'zh' ? '📖 全部文章列表' : '📖 All Articles'}
            </h3>
            <p className="text-neutral-600">
              {locale === 'zh'
                ? '浏览全部专业文章，按发布时间排序'
                : 'Browse all professional articles, sorted by publication date'
              }
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${locale}/articles/${article.slug}`}
                  className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    {/* Article Category Cover Image */}
                    <div className="w-full h-48 rounded-lg mb-4 overflow-hidden">
                      <ImagePlaceholder
                        filename={`category-${article.category || 'medical-guide'}-cover.jpg`}
                        alt={`Cover image for ${article.category || 'medical guide'} category article`}
                        width={400}
                        height={200}
                        className="w-full h-full border-0"
                        description={`Professional healthcare setting for ${article.category || 'medical'} content, soft natural lighting, pink and blue accents`}
                      />
                    </div>

                    {/* Article Content */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-neutral-500">
                        <span>{article.date}</span>
                        <span>{locale === 'zh' ? article.reading_time_zh : article.reading_time}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {locale === 'zh' ? article.title_zh || article.title : article.title}
                      </h3>

                      <p className="text-neutral-600 line-clamp-3">
                        {locale === 'zh' ? article.summary_zh || article.summary : article.summary}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {(locale === 'zh' ? (article.tags_zh || article.tags) : article.tags)?.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span className="text-primary-500 group-hover:text-primary-600 font-medium text-sm">
                          {commonT('readMore')} →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-primary-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <p className="text-neutral-600 text-lg">
                  {articleListT('noArticles')}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>



      {/* PDF Downloads Section */}
      <section id="downloads-section" className="space-y-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
            {locale === 'zh' ? '📋 健康管理资源下载' : '📋 Health Management Resources'}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {locale === 'zh'
              ? '专业的健康管理工具和指导资源，按类别分类，支持移动端友好的HTML格式，一键查看下载。'
              : 'Professional health management tools and guidance resources, categorized by type, supporting mobile-friendly HTML format for easy viewing and downloading.'
            }
          </p>
        </div>

        {/* Download Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FileText className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-neutral-900">{pdfResources.length}</div>
            <div className="text-neutral-600">
              {locale === 'zh' ? '可用资源' : 'Available Resources'}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Download className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-neutral-900">10,000+</div>
            <div className="text-neutral-600">
              {locale === 'zh' ? '总下载量' : 'Total Downloads'}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="w-8 h-8 text-accent-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-neutral-900">5,000+</div>
            <div className="text-neutral-600">
              {locale === 'zh' ? '活跃用户' : 'Active Users'}
            </div>
          </div>
        </div>

        {/* 🛠️ 管理工具类 */}
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-2xl">
              🛠️
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-800">
                {locale === 'zh' ? '管理工具类' : 'Management Tools'}
              </h3>
              <p className="text-sm text-blue-600">
                {locale === 'zh' ? '日常健康管理和症状追踪工具' : 'Daily health management and symptom tracking tools'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pdfResources.filter(resource => resource.category === 'management-tools').map((resource) => {
              const IconComponent = resource.icon;
              return (
                <div key={resource.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-blue-100 hover:border-blue-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[resource.category]}`}>
                        <span className="mr-2">🛠️</span>
                        {locale === 'zh' ? '管理工具' : 'Management Tools'}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {locale === 'zh' ?
                        (resource.id === 'pain-tracking-form' ? '痛经症状追踪表' :
                         resource.id === 'menstrual-cycle-nutrition-plan' ? '月经周期营养计划' :
                         resource.id === 'natural-therapy-assessment' ? '自然疗法效果评估表' :
                         resource.id === 'healthy-habits-checklist' ? '健康习惯养成清单' : resource.titleKey) :
                        (resource.id === 'pain-tracking-form' ? 'Pain Tracking Form' :
                         resource.id === 'menstrual-cycle-nutrition-plan' ? 'Cycle Nutrition Plan' :
                         resource.id === 'natural-therapy-assessment' ? 'Natural Therapy Assessment' :
                         resource.id === 'healthy-habits-checklist' ? 'Healthy Habits Checklist' : resource.titleKey)
                      }
                    </h3>

                    <p className="text-neutral-600 mb-4 text-sm line-clamp-3">
                      {locale === 'zh' ?
                        (resource.id === 'pain-tracking-form' ? '详细记录痛经症状、触发因素和缓解方法的专业表格。' :
                         resource.id === 'menstrual-cycle-nutrition-plan' ? '根据月经周期四个阶段的个性化饮食营养建议。' :
                         resource.id === 'natural-therapy-assessment' ? '系统评估不同自然疗法效果的专业工具。' :
                         resource.id === 'healthy-habits-checklist' ? '日常生活中预防和缓解痛经的健康习惯清单。' : resource.descriptionKey) :
                        (resource.id === 'pain-tracking-form' ? 'Professional form for detailed recording of menstrual pain symptoms and triggers.' :
                         resource.id === 'menstrual-cycle-nutrition-plan' ? 'Personalized dietary nutrition recommendations for four menstrual cycle phases.' :
                         resource.id === 'natural-therapy-assessment' ? 'Professional tool for systematically evaluating natural therapy effectiveness.' :
                         resource.id === 'healthy-habits-checklist' ? 'Checklist for developing healthy habits to prevent and relieve menstrual pain.' : resource.descriptionKey)
                      }
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-neutral-500">
                        <FileText className="w-4 h-4 mr-1" />
                        {locale === 'zh' ? 'HTML文档' : 'HTML Document'}
                      </div>
                      <DownloadButton filename={resource.filename} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🏥 健康管理类 */}
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 text-2xl">
              🏥
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-800">
                {locale === 'zh' ? '健康管理类' : 'Health Management'}
              </h3>
              <p className="text-sm text-green-600">
                {locale === 'zh' ? '专业健康指导和疾病管理资源' : 'Professional health guidance and disease management resources'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pdfResources.filter(resource => resource.category === 'health-management').map((resource) => {
              const IconComponent = resource.icon;
              return (
                <div key={resource.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-green-100 hover:border-green-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[resource.category]}`}>
                        <span className="mr-2">🏥</span>
                        {locale === 'zh' ? '健康管理' : 'Health Management'}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {locale === 'zh' ?
                        (resource.id === 'specific-menstrual-pain-management-guide' ? '特定痛经管理专题' :
                         resource.id === 'menstrual-pain-complications-management' ? '痛经并发症管理' :
                         resource.id === 'magnesium-gut-health-menstrual-pain-guide' ? '镁平衡与肠道健康' :
                         resource.id === 'zhan-zhuang-baduanjin-guide' ? '站桩八段锦图解指南' : resource.titleKey) :
                        (resource.id === 'specific-menstrual-pain-management-guide' ? 'Specific Pain Management' :
                         resource.id === 'menstrual-pain-complications-management' ? 'Pain Complications Management' :
                         resource.id === 'magnesium-gut-health-menstrual-pain-guide' ? 'Magnesium & Gut Health' :
                         resource.id === 'zhan-zhuang-baduanjin-guide' ? 'Traditional Exercise Guide' : resource.titleKey)
                      }
                    </h3>

                    <p className="text-neutral-600 mb-4 text-sm line-clamp-3">
                      {locale === 'zh' ?
                        (resource.id === 'specific-menstrual-pain-management-guide' ? '深入解析痛经的激素原理，识别妇科疾病危险信号。' :
                         resource.id === 'menstrual-pain-complications-management' ? '深入解析痛经伴随症状的成因机制和缓解策略。' :
                         resource.id === 'magnesium-gut-health-menstrual-pain-guide' ? '从营养-肠道-激素轴视角解析痛经缓解方案。' :
                         resource.id === 'zhan-zhuang-baduanjin-guide' ? '传统中医站桩和八段锦练习的详细图解指南。' : resource.descriptionKey) :
                        (resource.id === 'specific-menstrual-pain-management-guide' ? 'Comprehensive analysis of hormonal mechanisms and warning signs.' :
                         resource.id === 'menstrual-pain-complications-management' ? 'In-depth analysis of pain complications and relief strategies.' :
                         resource.id === 'magnesium-gut-health-menstrual-pain-guide' ? 'Nutrition-gut-hormone axis perspective on pain relief.' :
                         resource.id === 'zhan-zhuang-baduanjin-guide' ? 'Detailed illustrated guide for traditional Chinese exercises.' : resource.descriptionKey)
                      }
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-neutral-500">
                        <FileText className="w-4 h-4 mr-1" />
                        {locale === 'zh' ? 'HTML文档' : 'HTML Document'}
                      </div>
                      <DownloadButton filename={resource.filename} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 💬 沟通指导类 */}
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 text-2xl">
              💬
            </div>
            <div>
              <h3 className="text-xl font-bold text-orange-800">
                {locale === 'zh' ? '沟通指导类' : 'Communication Guidance'}
              </h3>
              <p className="text-sm text-orange-600">
                {locale === 'zh' ? '家长、教师和学校的沟通支持资源' : 'Communication support resources for parents, teachers, and schools'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pdfResources.filter(resource => resource.category === 'communication-guidance').map((resource) => {
              const IconComponent = resource.icon;
              return (
                <div key={resource.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-orange-100 hover:border-orange-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[resource.category]}`}>
                        <span className="mr-2">💬</span>
                        {locale === 'zh' ? '沟通指导' : 'Communication'}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {locale === 'zh' ?
                        (resource.id === 'campus-emergency-checklist' ? '校园应急处理清单' :
                         resource.id === 'parent-communication-guide' ? '家长沟通指导手册' :
                         resource.id === 'teacher-health-manual' ? '教师健康管理手册' :
                         resource.id === 'teacher-collaboration-handbook' ? '教师协作手册' : resource.titleKey) :
                        (resource.id === 'campus-emergency-checklist' ? 'Campus Emergency Checklist' :
                         resource.id === 'parent-communication-guide' ? 'Parent Communication Guide' :
                         resource.id === 'teacher-health-manual' ? 'Teacher Health Manual' :
                         resource.id === 'teacher-collaboration-handbook' ? 'Teacher Collaboration Handbook' : resource.titleKey)
                      }
                    </h3>

                    <p className="text-neutral-600 mb-4 text-sm line-clamp-3">
                      {locale === 'zh' ?
                        (resource.id === 'campus-emergency-checklist' ? '为学校和教育机构提供的痛经应急处理标准流程。' :
                         resource.id === 'parent-communication-guide' ? '帮助家长与青少年女儿就经期健康进行有效沟通。' :
                         resource.id === 'teacher-health-manual' ? '为教师和学校健康工作者提供的痛经管理专业指南。' :
                         resource.id === 'teacher-collaboration-handbook' ? '为教师提供实用信息，帮助识别和支持学生。' : resource.descriptionKey) :
                        (resource.id === 'campus-emergency-checklist' ? 'Standard emergency procedures for schools and educational institutions.' :
                         resource.id === 'parent-communication-guide' ? 'Guide to help parents communicate effectively about menstrual health.' :
                         resource.id === 'teacher-health-manual' ? 'Professional guide for teachers and school health workers.' :
                         resource.id === 'teacher-collaboration-handbook' ? 'Practical information for teachers to identify and support students.' : resource.descriptionKey)
                      }
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-neutral-500">
                        <FileText className="w-4 h-4 mr-1" />
                        {locale === 'zh' ? 'HTML文档' : 'HTML Document'}
                      </div>
                      <DownloadButton filename={resource.filename} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg">
        <p className="text-neutral-700">
          <strong className="text-primary-700">
            {locale === 'zh' ? '免责声明：' : 'Disclaimer:'}
          </strong>
          {locale === 'zh'
            ? '这些文章和资源中提供的信息仅供教育目的，不旨在替代专业医疗建议、诊断或治疗。'
            : 'The information provided in these articles and resources is for educational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment.'
          }
        </p>
      </section>
    </div>
  );
}
