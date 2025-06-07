import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

// Generate metadata for the page
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'naturalTherapiesPage' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function NaturalTherapiesPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // Get translations for the natural therapies page
  const t = useTranslations('naturalTherapiesPage');
  const commonT = useTranslations('common');
  
  const holisticApproaches = [
    {
      title: t('dietNutrition'),
      description: locale === 'zh'
        ? "某些食物可以帮助减少炎症并支持荷尔蒙平衡，而其他食物可能会加重症状。专注于全食物、水果、蔬菜和健康脂肪。"
        : "Certain foods can help reduce inflammation and support hormonal balance, while others might exacerbate symptoms. Focus on whole foods, fruits, vegetables, and healthy fats.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 10.5C21.75 6.799 18.701 3.75 15 3.75S8.25 6.799 8.25 10.5c0 3.701 3.049 6.75 6.75 6.75s6.75-3.049 6.75-6.75Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859" /></svg>,
      links: [
        { href: `/${locale}/articles/anti-inflammatory-diet-period-pain`, text: locale === 'zh' ? "抗炎饮食建议" : "Anti-Inflammatory Diet Tips" },
        { href: `/${locale}/articles/understanding-your-cycle`, text: locale === 'zh' ? "经期健康必需营养素" : "Essential Nutrients for Period Health" }
      ]
    },
    {
      title: t('herbalRemedies'),
      description: locale === 'zh'
        ? "特定的草药和营养补充剂在传统上或科学上被研究用于缓解经期不适和支持周期健康。"
        : "Specific herbs and nutritional supplements are traditionally or scientifically studied for their potential to alleviate menstrual discomfort and support cycle health.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /></svg>,
      links: [
        { href: `/${locale}/articles/global-traditional-menstrual-pain-relief`, text: locale === 'zh' ? "缓解痉挛的草药茶" : "Herbal Teas for Cramps" },
        { href: `/${locale}/articles/when-to-seek-medical-care-comprehensive-guide`, text: locale === 'zh' ? "经期疼痛关键补充剂" : "Key Supplements for Period Pain" }
      ]
    },
    {
      title: t('movementExercise'),
      description: locale === 'zh'
        ? "规律、适当的体育活动可以改善血液循环、减少压力并强化身体，有助于减轻疼痛。"
        : "Regular, appropriate physical activity can improve circulation, reduce stress, and strengthen the body, contributing to reduced pain.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" /></svg>,
      links: [
        { href: `/${locale}/articles/5-minute-period-pain-relief`, text: locale === 'zh' ? "经期健康瑜伽" : "Yoga for Menstrual Health" },
        { href: `/${locale}/articles/understanding-your-cycle`, text: locale === 'zh' ? "温和运动建议" : "Gentle Exercise Ideas" }
      ]
    },
    {
      title: t('mindBodyPractices'),
      description: locale === 'zh'
        ? "冥想、正念和深呼吸等技巧可以帮助管理疼痛感知并减少压力，这是影响经期症状的已知因素。"
        : "Techniques like meditation, mindfulness, and deep breathing can help manage pain perception and reduce stress, a known factor influencing menstrual symptoms.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
      links: [
        { href: `/${locale}/articles/5-minute-period-pain-relief`, text: locale === 'zh' ? "疼痛缓解引导冥想" : "Guided Meditation for Pain Relief" },
        { href: `/${locale}/articles/when-to-see-doctor-period-pain`, text: locale === 'zh' ? "压力管理技巧" : "Stress Management Techniques" }
      ]
    },
    {
      title: t('traditionalPractices'),
      description: locale === 'zh'
        ? "植根于传统中医或阿育吠陀等系统的方法为经期健康的身体平衡提供整体视角。"
        : "Approaches rooted in systems like Traditional Chinese Medicine or Ayurveda offer holistic perspectives on balancing the body for menstrual health.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.978 11.978 0 0112 13.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0a11.965 11.965 0 01-2.814 4.243m2.814-4.243L18.75 15.75M3.25 12L12 12m0 0l8.75 3.75M12 12l-8.75 3.75" /></svg>,
      links: [
        { href: `/${locale}/articles/zhan-zhuang-baduanjin-for-menstrual-pain-relief`, text: locale === 'zh' ? "经期中医入门" : "Introduction to TCM for Periods" },
        { href: `/${locale}/articles/global-traditional-menstrual-pain-relief`, text: locale === 'zh' ? "穴位按摩要点" : "Acupressure Points" }
      ]
    }
  ];

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          {t('description')}
        </p>
      </header>

      {/* Introduction Section */}
      <section className="bg-gradient-to-br from-secondary-50 to-neutral-50 p-6 md:p-8 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
            {t('introTitle')}
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            {t('introText')}
          </p>
          <p className="text-neutral-700 leading-relaxed mt-4">
            {locale === 'zh'
              ? "专注于自然方法可以让您与身体的自然节律协调工作，并可能解决潜在的失衡问题。虽然结果可能需要时间，每个人的情况也不同，但这些策略能让您在健康之旅中发挥积极作用。"
              : "Focusing on natural methods allows you to work with your body's natural rhythms and potentially address underlying imbalances. While results may take time and vary for each individual, these strategies empower you to take an active role in your health journey."
            }
          </p>
        </div>
      </section>

      {/* Holistic Approaches Section */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
          {t('holisticApproachesTitle')}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {holisticApproaches.map((approach) => (
            <div key={approach.title} className="card flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mr-3">
                  {approach.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-800">
                  {approach.title}
                </h3>
              </div>
              <p className="text-neutral-600 mb-4 flex-grow">
                {approach.description}
              </p>
              <div className="mt-auto">
                {approach.links.map(link => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="text-primary-600 hover:text-primary-700 font-medium block mb-1"
                  >
                    {link.text} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consistency is Key Section */}
      <section className="bg-neutral-100 p-6 md:p-8 rounded-xl">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
          {t('consistencyIsKeyTitle')}
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          {t('consistencyIsKeyText')}
        </p>
      </section>



      {/* Medical Disclaimer */}
      <section className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg">
        <p className="text-neutral-700">
          <strong className="text-primary-700">
            {locale === 'zh' ? '免责声明：' : 'Disclaimer:'}
          </strong>
          {locale === 'zh'
            ? '有关自然疗法的信息仅供教育目的。它不旨在替代专业医疗建议。如有任何健康问题或在改变健康方案之前，请务必咨询医疗保健提供者。'
            : 'The information on natural therapies is for educational purposes only. It is not intended to replace professional medical advice. Always consult with a healthcare provider for any health concerns or before making any changes to your health regimen.'
          }
        </p>
      </section>
    </div>
  );
}
