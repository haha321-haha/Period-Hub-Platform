'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function UserSuccessStories() {
  const locale = useLocale();
  const t = useTranslations('userSuccessStories');

  const stories = [
    {
      id: 1,
      name: t('stories.story1.name', locale === 'en' ? 'Lisa Li' : '李小雅'),
      role: t('stories.story1.role', locale === 'en' ? 'IT Professional, 25' : 'IT从业者，25岁'),
      initial: t('stories.story1.initial', locale === 'en' ? 'L' : '李'),
      testimonial: t('stories.story1.testimonial', locale === 'en'
        ? '"Through personalized assessment, I discovered I have prostaglandin-excess type dysmenorrhea. Following the platform\'s dietary and exercise recommendations, my pain intensity dropped from 8 to 3 points in 3 months, and my work efficiency improved significantly!"'
        : '"通过个性化评估发现我属于前列腺素过度分泌型痛经，按照平台建议调整饮食和运动，3个月后疼痛强度从8分降到3分，工作效率大幅提升！"'),
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-600'
    },
    {
      id: 2,
      name: t('stories.story2.name', locale === 'en' ? 'Tina Zhang' : '张婷婷'),
      role: t('stories.story2.role', locale === 'en' ? 'University Student, 20' : '大学生，20岁'),
      initial: t('stories.story2.initial', locale === 'en' ? 'T' : '张'),
      testimonial: t('stories.story2.testimonial', locale === 'en'
        ? '"The teen section content is so helpful! I learned heat therapy, yoga, and breathing techniques. Now I\'m not afraid of getting my period during exams. I even helped my roommates improve, and our relationships got better!"'
        : '"青少年专区的内容太有用了！学会了热敷、瑜伽和呼吸法，现在考试期间来大姨妈也不怕了。还帮助室友一起改善，大家感情更好了。"'),
      bgColor: 'bg-secondary-100',
      textColor: 'text-secondary-600'
    },
    {
      id: 3,
      name: t('stories.story3.name', locale === 'en' ? 'Wendy Wang' : '王芳'),
      role: t('stories.story3.role', locale === 'en' ? 'Working Mother, 32' : '职场妈妈，32岁'),
      initial: t('stories.story3.initial', locale === 'en' ? 'W' : '王'),
      testimonial: t('stories.story3.testimonial', locale === 'en'
        ? '"The pain diary feature helped me discover the connection between menstrual pain and stress. Combined with doctor\'s treatment and platform recommendations, I\'ve basically said goodbye to monthly suffering, and my quality of life has improved significantly."'
        : '"疼痛日志功能帮我发现了痛经与压力的关联性。配合医生治疗使用平台建议，现在基本告别了每月的痛苦，生活质量改善明显。"'),
      bgColor: 'bg-accent-100',
      textColor: 'text-accent-600'
    }
  ];

  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-10 text-center">
          {t('title', locale === 'en' ? 'User Success Stories' : '用户成功案例')}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="card">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full ${story.bgColor} flex items-center justify-center text-lg font-bold ${story.textColor} mr-4`}>
                  {story.initial}
                </div>
                <div>
                  <h3 className="font-semibold">{story.name}</h3>
                  <p className="text-sm text-neutral-500">{story.role}</p>
                </div>
              </div>
              <p className="text-neutral-600 mb-4">
                {story.testimonial}
              </p>
              <div className="flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-neutral-700">
            {t('statistic', locale === 'en'
              ? 'Over 10,000+ women have found their own solutions here'
              : '已有超过10,000+女性在这里找到了属于自己的解决方案'
            )}
          </p>
          <Link href={`/${locale}/interactive-tools`} className="btn-primary mt-4 mobile-touch-target">
            {t('ctaButton', locale === 'en' ? 'Join them and start your healing journey' : '加入她们，开始您的康复之旅')}
          </Link>
        </div>
      </div>
    </section>
  );
}
