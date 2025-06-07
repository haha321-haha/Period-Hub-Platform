'use client';

import React, { useState } from 'react';
import { useInteractiveToolTranslations } from '../shared/hooks/useAppTranslations';
import { useTranslations } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useTranslations } from 'next-intl';

interface AssessmentResult {
  advice: string;
  needConsult: boolean;
  severity: 'low' | 'medium' | 'high';
}

interface PeriodPainAssessmentToolProps {
  locale?: string;
}

const PeriodPainAssessmentTool: React.FC<PeriodPainAssessmentToolProps> = ({ locale = 'zh' }) => {
  const t = useTranslations('InteractiveTools');
  const [intensity, setIntensity] = useState<string>('');
  const [onset, setOnset] = useState<string>('');
  const [severeSymptoms, setSevereSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  // 使用统一翻译Hook
  const { t } = useInteractiveToolTranslations('periodPainAssessment');

  const handleSevereSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSevereSymptoms([...severeSymptoms, symptom]);
    } else {
      setSevereSymptoms(severeSymptoms.filter(s => s !== symptom));
    }
  };

  const evaluateAssessment = () => {
    if (!intensity || !onset) {
      alert(t('results.validationMessage'));
      return;
    }

    let advice = '';
    let needConsult = false;
    let severity: 'low' | 'medium' | 'high' = 'low';

    // 检查是否有严重症状
    if (severeSymptoms.length > 0) {
      advice = t('results.assessments.severe_symptoms');
      needConsult = true;
      severity = 'high';
    }
    // 根据痛经强度和开始时间评估
    else if (intensity === 'severe') {
      if (onset === 'late') {
        advice = t('results.assessments.severe_late');
        needConsult = true;
        severity = 'high';
      } else {
        advice = t('results.assessments.severe_early');
        needConsult = true;
        severity = 'high';
      }
    } else if (intensity === 'moderate' && onset === 'late') {
      advice = t('results.assessments.moderate_late');
      needConsult = true;
      severity = 'medium';
    } else {
      advice = t('results.assessments.normal');
      needConsult = false;
      severity = 'low';
    }

    setResult({ advice, needConsult, severity });
    setShowResult(true);
  };

  const resetAssessment = () => {
    setIntensity('');
    setOnset('');
    setSevereSymptoms([]);
    setResult(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">{t('title')}</h2>
        <p className="text-gray-600">
          {t('subtitle')}
        </p>
      </div>

      {!showResult ? (
        <div className="space-y-8">
          {/* 痛经强度 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('questions.intensity.title')}</h3>
            <div className="space-y-3">
              {[
                { value: 'mild', label: t('questions.intensity.options.mild') },
                { value: 'moderate', label: t('questions.intensity.options.moderate') },
                { value: 'severe', label: t('questions.intensity.options.severe') }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="intensity"
                    value={option.value}
                    checked={intensity === option.value}
                    onChange={(e) => setIntensity(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 痛经开始时间 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('questions.onset.title')}</h3>
            <div className="space-y-3">
              {[
                { value: 'early', label: t('questions.onset.options.recent') },
                { value: 'late', label: t('questions.onset.options.later') }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="onset"
                    value={option.value}
                    checked={onset === option.value}
                    onChange={(e) => setOnset(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 严重症状 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('questions.symptoms.title')}</h3>
            <div className="space-y-3">
              {[
                { value: 'fever', label: t('questions.symptoms.options.fever') },
                { value: 'severe_vomiting', label: t('questions.symptoms.options.vomiting') },
                { value: 'fainting', label: t('questions.symptoms.options.dizziness') },
                { value: 'abnormal_bleeding', label: t('questions.symptoms.options.bleeding') },
                { value: 'non_period_pain', label: t('questions.symptoms.options.nonMenstrual') }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={severeSymptoms.includes(option.value)}
                    onChange={(e) => handleSevereSymptomChange(option.value, e.target.checked)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={evaluateAssessment}
              className="btn-primary text-lg font-bold min-w-[200px]"
            >
              {t('actions.assess')}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`p-6 rounded-lg border-l-4 ${
            result?.severity === 'high' ? 'border-red-500 bg-red-50' :
            result?.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
            'border-green-500 bg-green-50'
          }`}>
            <h3 className={`text-xl font-semibold mb-3 ${
              result?.severity === 'high' ? 'text-red-700' :
              result?.severity === 'medium' ? 'text-yellow-700' :
              'text-green-700'
            }`}>
              {t('results.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {result?.advice}
            </p>
          </div>

          {result?.needConsult && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-700 font-medium text-sm">
                {t('results.consultAdvice')}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={resetAssessment}
              className="btn-outline px-6 py-3 font-semibold"
            >
              {t('actions.reset')}
            </button>
            <a
              href={`/${locale}/teen-health`}
              className="btn-secondary px-6 py-3 font-semibold text-center"
            >
              {t('actions.moreInfo')}
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          ⚠️ 本工具仅供参考，不能替代专业医疗诊断。如有疑虑，请咨询医生。
        </p>
      </div>
    </div>
  );
};

export default PeriodPainAssessmentTool;
