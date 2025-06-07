import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Download, FileText, Users, GraduationCap, Heart, CheckCircle, ClipboardList, Calendar, BarChart3 } from 'lucide-react';
import type { Metadata } from 'next';
import DownloadButton from '@/components/DownloadButton';

type Locale = 'en' | 'zh';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'downloads' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

interface PDFResource {
  id: string;
  titleKey: string;
  descriptionKey: string;
  filename: string;
  category: 'emergency' | 'education' | 'health' | 'communication' | 'tools';
  icon: React.ComponentType<any>;
  size: string;
  pages: number;
}

const pdfResources: PDFResource[] = [
  // 健康管理工具集 - 新增推荐
  {
    id: 'pain-tracking-form',
    titleKey: 'resources.painTrackingForm.title',
    descriptionKey: 'resources.painTrackingForm.description',
    filename: 'pain-tracking-form.pdf',
    category: 'tools',
    icon: ClipboardList,
    size: '1.2 MB',
    pages: 4
  },
  {
    id: 'menstrual-cycle-nutrition-plan',
    titleKey: 'resources.menstrualCycleNutritionPlan.title',
    descriptionKey: 'resources.menstrualCycleNutritionPlan.description',
    filename: 'menstrual-cycle-nutrition-plan.pdf',
    category: 'tools',
    icon: Calendar,
    size: '2.8 MB',
    pages: 12
  },
  {
    id: 'natural-therapy-assessment',
    titleKey: 'resources.naturalTherapyAssessment.title',
    descriptionKey: 'resources.naturalTherapyAssessment.description',
    filename: 'natural-therapy-assessment.pdf',
    category: 'tools',
    icon: BarChart3,
    size: '1.8 MB',
    pages: 8
  },
  // 专业医学指南 - 重点推荐 (现已可用)
  {
    id: 'specific-menstrual-pain-management-guide',
    titleKey: 'resources.specificPainManagement.title',
    descriptionKey: 'resources.specificPainManagement.description',
    filename: 'specific-menstrual-pain-management-guide.pdf',
    category: 'health',
    icon: Heart,
    size: '4.2 MB',
    pages: 35
  },
  {
    id: 'menstrual-pain-complications-management',
    titleKey: 'resources.painComplications.title',
    descriptionKey: 'resources.painComplications.description',
    filename: 'menstrual-pain-complications-management.pdf',
    category: 'health',
    icon: Heart,
    size: '3.8 MB',
    pages: 28
  },
  {
    id: 'magnesium-gut-health-menstrual-pain-guide',
    titleKey: 'resources.magnesiumGutHealth.title',
    descriptionKey: 'resources.magnesiumGutHealth.description',
    filename: 'magnesium-gut-health-menstrual-pain-guide.pdf',
    category: 'health',
    icon: Heart,
    size: '4.5 MB',
    pages: 32
  },
  // 以下PDF文件正在准备中，即将上线
  // {
  //   id: 'menstrual-pain-project-summary',
  //   titleKey: 'resources.projectSummary.title',
  //   descriptionKey: 'resources.projectSummary.description',
  //   filename: 'menstrual-pain-project-summary.pdf',
  //   category: 'health',
  //   icon: Heart,
  //   size: '3.2 MB',
  //   pages: 45
  // },
  // {
  //   id: 'menstrual-pain-evaluation-report',
  //   titleKey: 'resources.evaluationReport.title',
  //   descriptionKey: 'resources.evaluationReport.description',
  //   filename: 'menstrual-pain-evaluation-report.pdf',
  //   category: 'health',
  //   icon: Heart,
  //   size: '2.8 MB',
  //   pages: 35
  // },
  // {
  //   id: 'comprehensive-natural-pain-relief',
  //   titleKey: 'resources.naturalReliefGuide.title',
  //   descriptionKey: 'resources.naturalReliefGuide.description',
  //   filename: 'comprehensive-natural-pain-relief-guide.pdf',
  //   category: 'health',
  //   icon: Heart,
  //   size: '4.1 MB',
  //   pages: 60
  // },
  // // 临床诊断指南
  // {
  //   id: 'differential-diagnosis-guide',
  //   titleKey: 'resources.differentialDiagnosis.title',
  //   descriptionKey: 'resources.differentialDiagnosis.description',
  //   filename: 'differential-diagnosis-guide.pdf',
  //   category: 'health',
  //   icon: Heart,
  //   size: '2.3 MB',
  //   pages: 30
  // },
  // {
  //   id: 'endometriosis-comprehensive-guide',
  //   titleKey: 'resources.endometriosisGuide.title',
  //   descriptionKey: 'resources.endometriosisGuide.description',
  //   filename: 'endometriosis-comprehensive-guide.pdf',
  //   category: 'health',
  //   icon: Heart,
  //   size: '2.7 MB',
  //   pages: 40
  // },
  // {
  //   id: 'iud-pain-management-guide',
  //   titleKey: 'resources.iudPainGuide.title',
  //   descriptionKey: 'resources.iudPainGuide.description',
  //   filename: 'iud-pain-management-guide.pdf',
  //   category: 'health',
  //   icon: Heart,
  //   size: '1.9 MB',
  //   pages: 25
  // },
  // // 症状管理手册
  // {
  //   id: 'symptom-management-bloating-nausea',
  //   titleKey: 'resources.symptomManagement.title',
  //   descriptionKey: 'resources.symptomManagement.description',
  //   filename: 'symptom-management-bloating-nausea.pdf',
  //   category: 'health',
  //   icon: Heart,
  //   size: '2.1 MB',
  //   pages: 28
  // },
  // {
  //   id: 'back-pain-menstrual-cramps',
  //   titleKey: 'resources.backPainGuide.title',
  //   descriptionKey: 'resources.backPainGuide.description',
  //   filename: 'back-pain-menstrual-cramps-guide.pdf',
  //   category: 'health',
  //   icon: Heart,
  //   size: '1.8 MB',
  //   pages: 22
  // },
  // {
  //   id: 'perimenopause-pain-management',
  //   titleKey: 'resources.perimenopauseGuide.title',
  //   descriptionKey: 'resources.perimenopauseGuide.description',
  //   filename: 'perimenopause-pain-management.pdf',
  //   category: 'health',
  //   icon: Heart,
  //   size: '2.0 MB',
  //   pages: 26
  // },
  // 原有资源
  {
    id: 'campus-emergency-checklist',
    titleKey: 'resources.campusEmergency.title',
    descriptionKey: 'resources.campusEmergency.description',
    filename: 'campus-emergency-checklist.html',
    category: 'emergency',
    icon: CheckCircle,
    size: '2.1 MB',
    pages: 8
  },
  {
    id: 'parent-communication-guide',
    titleKey: 'resources.parentGuide.title',
    descriptionKey: 'resources.parentGuide.description',
    filename: 'parent-communication-guide.html',
    category: 'communication',
    icon: Users,
    size: '1.8 MB',
    pages: 12
  },
  {
    id: 'teacher-health-manual',
    titleKey: 'resources.teacherManual.title',
    descriptionKey: 'resources.teacherManual.description',
    filename: 'teacher-health-manual.html',
    category: 'education',
    icon: GraduationCap,
    size: '3.2 MB',
    pages: 16
  },
  {
    id: 'healthy-habits-checklist',
    titleKey: 'resources.healthyHabits.title',
    descriptionKey: 'resources.healthyHabits.description',
    filename: 'healthy-habits-checklist.html',
    category: 'health',
    icon: Heart,
    size: '1.5 MB',
    pages: 6
  },
  {
    id: 'zhan-zhuang-baduanjin-guide',
    titleKey: 'resources.zhanZhuangBaduanjin.title',
    descriptionKey: 'resources.zhanZhuangBaduanjin.description',
    filename: 'zhan-zhuang-baduanjin-illustrated-guide.html',
    category: 'health',
    icon: Heart,
    size: '2.8 MB',
    pages: 14
  },
  {
    id: 'teacher-collaboration-handbook',
    titleKey: 'resources.teacherCollaboration.title',
    descriptionKey: 'resources.teacherCollaboration.description',
    filename: 'teacher-collaboration-handbook.html',
    category: 'education',
    icon: GraduationCap,
    size: '2.5 MB',
    pages: 18
  }
];

const categoryColors = {
  emergency: 'bg-red-50 border-red-200 text-red-800',
  education: 'bg-blue-50 border-blue-200 text-blue-800',
  health: 'bg-green-50 border-green-200 text-green-800',
  communication: 'bg-purple-50 border-purple-200 text-purple-800',
  tools: 'bg-orange-50 border-orange-200 text-orange-800'
};

export default async function DownloadsPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('downloads');



  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section with Gradient Background */}
      <div className="relative h-64 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-xl max-w-3xl">{t('subtitle')}</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">

        {/* Download Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FileText className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{pdfResources.length}</div>
            <div className="text-gray-600">{t('stats.totalResources')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Download className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">10,000+</div>
            <div className="text-gray-600">{t('stats.totalDownloads')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">5,000+</div>
            <div className="text-gray-600">{t('stats.activeUsers')}</div>
          </div>
        </div>

        {/* PDF Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {pdfResources.map((resource) => {
            const IconComponent = resource.icon;
            return (
              <div key={resource.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[resource.category]}`}>
                      <IconComponent className="w-4 h-4 mr-2" />
                      {t(`categories.${resource.category}`)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {resource.pages} {t('common.pages')} • {resource.size}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t(resource.titleKey)}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {t(resource.descriptionKey)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="w-4 h-4 mr-1" />
                      {t('common.document')}
                    </div>
                    <DownloadButton filename={resource.filename} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Usage Guidelines */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('guidelines.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('guidelines.usage.title')}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {t('guidelines.usage.item1')}
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {t('guidelines.usage.item2')}
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {t('guidelines.usage.item3')}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('guidelines.sharing.title')}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {t('guidelines.sharing.item1')}
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {t('guidelines.sharing.item2')}
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {t('guidelines.sharing.item3')}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            {t('contact.text')}{' '}
            <a href="mailto:tiyibaofu@outlook.com" className="text-pink-600 hover:text-pink-700 font-medium">
              tiyibaofu@outlook.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
