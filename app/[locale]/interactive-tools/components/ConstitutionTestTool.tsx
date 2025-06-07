'use client';

import React, { useState } from 'react';
import { useInteractiveToolTranslations } from '../shared/hooks/useAppTranslations';
import {
  Play,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  User,
  Heart,
  Leaf,
  Clock,
  MapPin,
  Utensils,
  Activity,
  AlertCircle,
  Lightbulb,
  BookOpen,
  FileText,
  MessageCircle,
  Copy,
  Users,
  Package
} from 'lucide-react';
import { useConstitutionTest } from '../shared/hooks/useConstitutionTest';
import { useNotifications } from '../shared/hooks/useNotifications';
import NotificationContainer from '../shared/components/NotificationContainer';
import LoadingSpinner from '../shared/components/LoadingSpinner';
import { ConstitutionAnswer, ConstitutionType } from '../shared/types/constitution';
import { constitutionTypeInfo } from '../shared/data/constitutionTypes';
import {
  menstrualPainAcupoints,
  menstrualPainLifestyleTips,
  getRecommendedArticles,
  communicationTemplates,
  scenarioBasedAdvice,
  emergencyKitRecommendations
} from '../shared/data/menstrualPainRecommendations';

interface ConstitutionTestToolProps {
  locale: string;
}

export default function ConstitutionTestTool({ locale }: ConstitutionTestToolProps) {
  const { t } = useInteractiveToolTranslations('constitutionTest');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const {
    currentSession,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    isComplete,
    result,
    isLoading,
    error,
    startTest,
    answerQuestion,
    goToPreviousQuestion,
    goToNextQuestion,
    completeTest,
    resetTest
  } = useConstitutionTest();

  const {
    notifications,
    removeNotification,
    addSuccessNotification,
    addErrorNotification
  } = useNotifications();

  const handleStartTest = () => {
    startTest(locale);
    setSelectedAnswers({});
  };

  const handleAnswerSelect = (questionId: string, value: string | number) => {
    const stringValue = String(value);
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: stringValue
    }));

    const answer: ConstitutionAnswer = {
      questionId,
      selectedValues: [stringValue],
      timestamp: new Date().toISOString()
    };

    answerQuestion(answer);
  };

  const handleNext = () => {
    if (currentQuestionIndex >= totalQuestions - 1) {
      // 完成测试
      const testResult = completeTest();
      if (testResult) {
        addSuccessNotification(
          t('messages.testComplete'),
          t('messages.testCompleteDesc')
        );
      } else {
        addErrorNotification(
          t('messages.testFailed'),
          t('messages.testFailedDesc')
        );
      }
    } else {
      goToNextQuestion();
    }
  };

  const handlePrevious = () => {
    goToPreviousQuestion();
  };

  const getCurrentAnswer = () => {
    return currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;
  };

  const canProceed = () => {
    return getCurrentAnswer() !== undefined;
  };

  // 检查是否有痛经症状
  const hasMenstrualPainSymptoms = (answers: ConstitutionAnswer[]): boolean => {
    return answers.some(answer =>
      answer.questionId === 'menstrual_pain_severity' &&
      answer.selectedValues.some(value => value !== 'no_pain')
    );
  };

  // 获取痛经穴位建议
  const getMenstrualPainAcupoints = (constitutionType: ConstitutionType, locale: string): any[] => {
    const localeData = (menstrualPainAcupoints as any)[locale] || menstrualPainAcupoints.zh;
    return localeData[constitutionType] || [];
  };

  // 获取痛经生活方式建议
  const getMenstrualPainLifestyleTips = (constitutionType: ConstitutionType, locale: string): any[] => {
    const localeData = (menstrualPainLifestyleTips as any)[locale] || menstrualPainLifestyleTips.zh;
    return localeData[constitutionType] || [];
  };

  // 如果没有开始测试，显示介绍页面
  if (!currentSession) {
    return (
      <div className="max-w-4xl mx-auto">
        <NotificationContainer 
          notifications={notifications}
          onRemove={removeNotification}
        />
        
        {/* 介绍页面 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* 测试特点 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-4">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-neutral-800 mb-1">
              {t('features.quick.title')}
            </h3>
            <p className="text-sm text-neutral-600">
              {t('features.quick.description')}
            </p>
          </div>
          <div className="text-center p-4">
            <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold text-neutral-800 mb-1">
              {t('features.professional.title')}
            </h3>
            <p className="text-sm text-neutral-600">
              {t('features.professional.description')}
            </p>
          </div>
          <div className="text-center p-4">
            <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-neutral-800 mb-1">
              {t('features.personalized.title')}
            </h3>
            <p className="text-sm text-neutral-600">
              {t('features.personalized.description')}
            </p>
          </div>
          <div className="text-center p-4">
            <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-neutral-800 mb-1">
              {t('features.practical.title')}
            </h3>
            <p className="text-sm text-neutral-600">
              {t('features.practical.description')}
            </p>
          </div>
        </div>

        {/* 测试说明 */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h3 className="font-semibold text-blue-800 mb-2">
            {t('instructions.title')}
          </h3>
          <ul className="text-blue-700 space-y-1">
            <li>• {t('instructions.item1')}</li>
            <li>• {t('instructions.item2')}</li>
            <li>• {t('instructions.item3')}</li>
            <li>• {t('instructions.item4')}</li>
          </ul>
        </div>

        {/* 开始按钮 */}
        <div className="text-center">
          <button
            onClick={handleStartTest}
            className="btn-primary text-lg px-8 py-3"
          >
            <Play className="w-5 h-5 mr-2" />
            {t('navigation.startTest')}
          </button>
        </div>
      </div>
    );
  }

  // 如果测试完成，显示结果
  if (result) {
    const typeInfo = constitutionTypeInfo[locale]?.[result.primaryType] || constitutionTypeInfo.zh[result.primaryType];
    
    return (
      <div className="max-w-6xl mx-auto">
        <NotificationContainer 
          notifications={notifications}
          onRemove={removeNotification}
        />
        
        {/* 结果标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            {t('result.title')}
          </h1>
          <p className="text-lg text-neutral-600">
            {t('result.subtitle')}
          </p>
        </div>

        {/* 体质类型结果 */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              {typeInfo.name}
            </h2>
            <p className="text-lg text-neutral-700 mb-4">
              {typeInfo.description}
            </p>
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-full">
              <span className="text-sm text-neutral-600 mr-2">
                {t('result.match')}
              </span>
              <span className="font-semibold text-green-600">{result.confidence}%</span>
            </div>
          </div>

          {/* 体质特征 */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-800 mb-3 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                {t('result.constitutionFeatures')}
              </h3>
              <ul className="space-y-1">
                {typeInfo.characteristics.map((char, index) => (
                  <li key={index} className="text-sm text-neutral-700">• {char}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                {t('result.commonSymptoms')}
              </h3>
              <ul className="space-y-1">
                {typeInfo.commonSymptoms.map((symptom, index) => (
                  <li key={index} className="text-sm text-neutral-700">• {symptom}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 mb-3 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-600" />
                {t('result.menstrualFeatures')}
              </h3>
              <ul className="space-y-1">
                {typeInfo.menstrualFeatures.map((feature, index) => (
                  <li key={index} className="text-sm text-neutral-700">• {feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 个性化建议 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* 穴位建议 */}
          <div className="card">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-green-600" />
              {t('recommendations.acupoints.title')}
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-neutral-700 mb-3">
                {t('recommendations.acupoints.primaryAcupoints')}
              </h4>
              <div className="space-y-3">
                {result.recommendations.acupoints.primaryPoints.map((point, index) => (
                  <div key={index} className="bg-green-50 p-3 rounded-lg">
                    <h5 className="font-medium text-green-800">{point.name}</h5>
                    <p className="text-sm text-green-700 mb-1">
                      {t('recommendations.acupoints.location')}{point.location}
                    </p>
                    <p className="text-sm text-green-700 mb-1">
                      {t('recommendations.acupoints.function')}{point.function}
                    </p>
                    <p className="text-sm text-green-600">
                      {t('recommendations.acupoints.method')}{point.method}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-medium text-neutral-700 mb-2">
                {t('recommendations.acupoints.guidelines')}
              </h4>
              <p className="text-sm text-neutral-600 mb-1">
                <strong>{t('recommendations.acupoints.technique')}</strong>
                {result.recommendations.acupoints.massageTechnique}
              </p>
              <p className="text-sm text-neutral-600 mb-1">
                <strong>{t('recommendations.acupoints.frequency')}</strong>
                {result.recommendations.acupoints.frequency}
              </p>
              <p className="text-sm text-neutral-600">
                <strong>{t('recommendations.acupoints.duration')}</strong>
                {result.recommendations.acupoints.duration}
              </p>
            </div>
          </div>

          {/* 饮食建议 */}
          <div className="card">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center">
              <Utensils className="w-6 h-6 mr-2 text-orange-600" />
              {t('recommendations.dietary.title')}
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-green-700 mb-2">
                  {t('recommendations.dietary.beneficialFoods')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.recommendations.diet.beneficial.map((food, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {food}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-red-700 mb-2">
                  {t('recommendations.dietary.foodsToAvoid')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.recommendations.diet.avoid.map((food, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {food}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-neutral-700 mb-2">
                  {t('recommendations.dietary.dietaryPrinciples')}
                </h4>
                <ul className="space-y-1">
                  {result.recommendations.diet.principles.map((principle, index) => (
                    <li key={index} className="text-sm text-neutral-600">• {principle}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 场景化生活建议 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl mb-8">
          <h3 className="text-2xl font-semibold text-emerald-800 mb-6 flex items-center">
            <MapPin className="w-7 h-7 mr-3 text-green-600" />
            {t('recommendations.lifestyle.title')}
          </h3>

          <p className="text-emerald-700 mb-6">
            {t('recommendations.lifestyle.description')}
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            {scenarioBasedAdvice[locale]?.[result.primaryType]?.map((scenario, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
                <h4 className="font-semibold text-emerald-800 mb-4 flex items-center">
                  <span className="text-2xl mr-3">{scenario.icon}</span>
                  {scenario.scenario}
                </h4>

                <ul className="space-y-3">
                  {scenario.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-emerald-700 flex items-start">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )) || []}
          </div>

          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>{t('recommendations.lifestyle.reminder')}</strong>
              {t('recommendations.lifestyle.reminderText')}
            </p>
          </div>
        </div>

        {/* 痛经专项建议 */}
        {hasMenstrualPainSymptoms(currentSession?.answers || []) && (
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center">
              <Heart className="w-7 h-7 mr-3 text-pink-600" />
              {t('recommendations.menstrualPain.title')}
            </h3>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* 基于体质的痛经建议 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {t('recommendations.menstrualPain.acupointTherapy')}
                </h4>
                {getMenstrualPainAcupoints(result.primaryType, locale).map((point: any, index: number) => (
                  <div key={index} className="mb-3 p-3 bg-purple-50 rounded-lg">
                    <h5 className="font-medium text-purple-800">{point.name}</h5>
                    <p className="text-sm text-purple-700">{point.description}</p>
                  </div>
                ))}
              </div>

              {/* 生活方式建议 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  {t('recommendations.menstrualPain.lifestyleAdjustments')}
                </h4>
                <ul className="space-y-2">
                  {getMenstrualPainLifestyleTips(result.primaryType, locale).map((tip: any, index: number) => (
                    <li key={index} className="text-sm text-purple-700 flex items-start">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 个性化应急包推荐 */}
        {hasMenstrualPainSymptoms(currentSession?.answers || []) && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-semibold text-orange-800 mb-6 flex items-center">
              <Package className="w-7 h-7 mr-3 text-orange-600" />
              {t('emergencyKit.title')}
            </h3>

            <p className="text-orange-700 mb-6">
              {locale === 'zh'
                ? '根据您的体质特点，为您推荐专属的应急包物品清单。提前准备，让经期更从容。'
                : 'Based on your constitution characteristics, we recommend a personalized emergency kit item list. Be prepared for a more comfortable period.'}
            </p>

            <div className="space-y-6">
              {emergencyKitRecommendations[locale]?.[result.primaryType]?.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white p-6 rounded-lg shadow-sm border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-4 flex items-center">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                    {category.category}
                  </h4>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={`p-4 rounded-lg border-2 ${
                        item.priority === 'high' ? 'border-red-200 bg-red-50' :
                        item.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                        'border-green-200 bg-green-50'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-orange-800">{item.name}</h5>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.priority === 'high' ? 'bg-red-100 text-red-700' :
                            item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {item.priority === 'high' ? (locale === 'zh' ? '必需' : 'Essential') :
                             item.priority === 'medium' ? (locale === 'zh' ? '推荐' : 'Recommended') :
                             (locale === 'zh' ? '可选' : 'Optional')}
                          </span>
                        </div>

                        <p className="text-sm text-orange-600">
                          {item.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )) || []}
            </div>

            <div className="mt-6 p-4 bg-orange-100 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>{locale === 'zh' ? '📦 打包建议：' : '📦 Packing Tips:'}</strong>
                {locale === 'zh'
                  ? ' 优先携带"必需"物品，根据外出时间和场景选择"推荐"和"可选"物品。建议准备一个专用的小包，方便随时取用。'
                  : ' Prioritize "Essential" items, choose "Recommended" and "Optional" items based on outing duration and scenarios. Consider preparing a dedicated small bag for easy access.'}
              </p>
            </div>
          </div>
        )}

        {/* 相关文章推荐 */}
        <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-6 flex items-center">
            <BookOpen className="w-7 h-7 mr-3 text-blue-600" />
            {locale === 'zh' ? '为您推荐的健康文章' : 'Recommended Health Articles'}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getRecommendedArticles(result.primaryType, currentSession?.answers || [], locale).map((article, index) => (
              <div key={index} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <h4 className="font-semibold text-neutral-800 mb-2 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-sm text-neutral-600 mb-3 line-clamp-3">
                  {article.description}
                </p>
                <a
                  href={article.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {locale === 'zh' ? '阅读全文' : 'Read More'}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 社交沟通模板 */}
        {hasMenstrualPainSymptoms(currentSession?.answers || []) && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-6 flex items-center">
              <MessageCircle className="w-7 h-7 mr-3 text-blue-600" />
              {locale === 'zh' ? '沟通模板助手' : 'Communication Templates'}
            </h3>

            <p className="text-indigo-700 mb-6">
              {locale === 'zh'
                ? '经期不适时，与身边的人沟通很重要。这些模板可以帮助你更好地表达需求和寻求理解。'
                : 'Communication is important when experiencing menstrual discomfort. These templates can help you better express your needs and seek understanding.'}
            </p>

            <div className="grid lg:grid-cols-3 gap-6">
              {communicationTemplates[locale]?.map((scenario, scenarioIndex) => (
                <div key={scenarioIndex} className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-indigo-800 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    {scenario.scenario}
                  </h4>

                  <div className="space-y-4">
                    {scenario.templates.map((template, templateIndex) => (
                      <div key={templateIndex} className="border border-indigo-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-indigo-700">{template.title}</h5>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            template.tone === 'intimate' ? 'bg-pink-100 text-pink-700' :
                            template.tone === 'casual' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {template.tone === 'intimate' ? (locale === 'zh' ? '亲密' : 'Intimate') :
                             template.tone === 'casual' ? (locale === 'zh' ? '随意' : 'Casual') :
                             (locale === 'zh' ? '正式' : 'Formal')}
                          </span>
                        </div>

                        <p className="text-sm text-indigo-600 mb-3 leading-relaxed">
                          "{template.content}"
                        </p>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(template.content);
                            // 可以添加复制成功的提示
                          }}
                          className="flex items-center text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          {locale === 'zh' ? '复制文本' : 'Copy Text'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )) || []}
            </div>

            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>{locale === 'zh' ? '💡 使用提示：' : '💡 Usage Tips:'}</strong>
                {locale === 'zh'
                  ? ' 这些模板仅供参考，请根据你的实际情况和关系亲密度进行调整。真诚的沟通是建立理解的关键。'
                  : ' These templates are for reference only. Please adjust them based on your actual situation and relationship intimacy. Sincere communication is key to building understanding.'}
              </p>
            </div>
          </div>
        )}

        {/* 重新测试按钮 */}
        <div className="text-center">
          <button
            onClick={resetTest}
            className="btn-secondary"
          >
            {t('navigation.retakeTest')}
          </button>
        </div>
      </div>
    );
  }

  // 显示问题
  return (
    <div className="max-w-4xl mx-auto">
      <NotificationContainer 
        notifications={notifications}
        onRemove={removeNotification}
      />
      
      {isLoading && <LoadingSpinner />}
      
      {/* 进度条 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-neutral-600">
            {t('progress.questionOf', {
              current: currentQuestionIndex + 1,
              total: totalQuestions
            })}
          </span>
          <span className="text-sm text-neutral-600">
            {Math.round(progress)}% {t('progress.complete')}
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {currentQuestion && (
        <div className="card">
          {/* 问题标题 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-2">
              {currentQuestion.title}
            </h2>
            {currentQuestion.description && (
              <p className="text-neutral-600">
                {currentQuestion.description}
              </p>
            )}
          </div>

          {/* 选项 */}
          <div className="mb-8">
            {currentQuestion.type === 'scale' ? (
              // 滑块类型问题
              <div className="space-y-6">
                <div className="px-4">
                  <input
                    type="range"
                    min={currentQuestion.validation?.min || 0}
                    max={currentQuestion.validation?.max || 10}
                    value={selectedAnswers[currentQuestion.id] || 0}
                    onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
                    className="w-full pain-scale cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-neutral-600 mt-2">
                    <span>{t('painScale.levels.none')}</span>
                    <span>{t('painScale.levels.mild')}</span>
                    <span>{t('painScale.levels.moderate')}</span>
                    <span>{t('painScale.levels.severe')}</span>
                    <span>{t('painScale.levels.extreme')}</span>
                  </div>
                </div>

                {/* 当前选择的值显示 */}
                <div className="text-center">
                  <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full">
                    <Heart className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-lg font-semibold text-purple-800">
                      {t('painScale.title')}
                      <span className="text-2xl">{selectedAnswers[currentQuestion.id] || 0}</span>
                      <span className="text-sm ml-2">
                        ({currentQuestion.options.find(opt => opt.value == (selectedAnswers[currentQuestion.id] || 0))?.label})
                      </span>
                    </span>
                  </div>
                </div>

                {/* 疼痛程度说明 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">
                    {t('painScale.reference')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                    <div>• 0-2: {t('painScale.descriptions.0-2')}</div>
                    <div>• 3-4: {t('painScale.descriptions.3-4')}</div>
                    <div>• 5-7: {t('painScale.descriptions.5-7')}</div>
                    <div>• 8-10: {t('painScale.descriptions.8-10')}</div>
                  </div>
                </div>
              </div>
            ) : (
              // 普通单选/多选问题
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <label
                    key={option.value}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedAnswers[currentQuestion.id] === option.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-neutral-200 hover:border-green-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option.value}
                      checked={selectedAnswers[currentQuestion.id] === option.value}
                      onChange={() => handleAnswerSelect(currentQuestion.id, option.value)}
                      className="sr-only"
                    />
                    <span className="text-neutral-800">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 导航按钮 */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('navigation.previous')}
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex >= totalQuestions - 1
                ? t('navigation.completeTest')
                : t('navigation.next')
              }
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
