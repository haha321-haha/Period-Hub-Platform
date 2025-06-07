'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Play,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  FileText,
  Heart,
  Brain,
  Activity
} from 'lucide-react';
import { useSymptomAssessment } from '../shared/hooks/useSymptomAssessment';
import { useNotifications } from '../shared/hooks/useNotifications';
import NotificationContainer from '../shared/components/NotificationContainer';
import LoadingSpinner from '../shared/components/LoadingSpinner';
import { AssessmentAnswer } from '../shared/types';

interface SymptomAssessmentToolProps {
  locale: string;
}

export default function SymptomAssessmentTool({ locale }: SymptomAssessmentToolProps) {
  const t = useTranslations('painTracker.assessment');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});

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
    startAssessment,
    answerQuestion,
    goToPreviousQuestion,
    goToNextQuestion,
    completeAssessment,
    resetAssessment
  } = useSymptomAssessment();

  // 监听result变化
  useEffect(() => {
    console.log('Result changed:', result);
  }, [result]);

  const {
    notifications,
    removeNotification,
    addSuccessNotification,
    addErrorNotification
  } = useNotifications();

  const handleStartAssessment = () => {
    console.log('Starting assessment with locale:', locale);
    startAssessment(locale);
  };

  const handleAnswerChange = (value: any) => {
    if (!currentQuestion) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));

    const answer: AssessmentAnswer = {
      questionId: currentQuestion.id,
      value,
      timestamp: new Date().toISOString()
    };

    answerQuestion(answer);
  };

  const handleNext = () => {
    console.log('handleNext called:', {
      currentQuestionIndex,
      totalQuestions,
      isLastQuestion: currentQuestionIndex >= totalQuestions - 1
    });

    if (currentQuestionIndex >= totalQuestions - 1) {
      // 已经是最后一题，完成评估
      console.log('Completing assessment...');
      const assessmentResult = completeAssessment();
      console.log('Assessment result:', assessmentResult);

      if (assessmentResult) {
        addSuccessNotification(
          t('messages.assessmentComplete'),
          t('messages.assessmentCompleteDesc')
        );
        // 强制重新渲染以显示结果
        setTimeout(() => {
          console.log('Result should be visible now:', result);
        }, 100);
      } else {
        console.error('Assessment result is null');
        addErrorNotification(
          t('messages.assessmentFailed'),
          t('messages.assessmentFailedDesc')
        );
      }
    } else {
      goToNextQuestion();
    }
  };

  const handlePrevious = () => {
    goToPreviousQuestion();
  };

  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion) return false;
    const answer = selectedAnswers[currentQuestion.id];

    if (currentQuestion.validation?.required) {
      if (currentQuestion.type === 'multiple') {
        return Array.isArray(answer) && answer.length > 0;
      }
      return answer !== undefined && answer !== null && answer !== '';
    }

    return true;
  };

  // Start screen
  if (!currentSession) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t('subtitle')}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              {t('start.title')}
            </h3>
            <p className="text-blue-800 mb-4">
              {t('start.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {t('start.features', { returnObjects: true }).map((feature: string, index: number) => {
                const icons = [Heart, Brain, CheckCircle, Activity];
                const Icon = icons[index];
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-800">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartAssessment}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-colors inline-flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>{t('start.startButton')}</span>
            </button>

            <p className="text-sm text-gray-500 mt-4">
              {t('start.disclaimer')}
            </p>
          </div>
        </div>

        <NotificationContainer
          notifications={notifications}
          onRemove={removeNotification}
        />
      </div>
    );
  }

  // Results screen
  if (result) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('result.title')}
            </h2>
          </div>

          {/* Score and Severity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                {t('result.yourScore')}
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {result.score}/{result.maxScore}
              </p>
              <p className="text-sm text-gray-600">
                {Math.round(result.percentage)}%
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                {t('result.severity')}
              </h3>
              <p className="text-xl font-bold text-gray-900">
                {t(`severity.${result.severity}`)}
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                {t('result.severity')}
              </h3>
              <p className="text-xl font-bold text-gray-900">
                {t(`severity.${result.type}`)}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('result.summary')}
            </h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700">{result.message}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('result.recommendations')}
            </h3>
            <div className="space-y-4">
              {result.recommendations.map((recommendation) => (
                <div key={recommendation.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {recommendation.title}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      recommendation.priority === 'high' ? 'bg-red-100 text-red-800' :
                      recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {t(`priority.${recommendation.priority}`)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{recommendation.description}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    <strong>{t('result.timeframe')}</strong> {recommendation.timeframe}
                  </p>

                  {recommendation.actionSteps && recommendation.actionSteps.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">{t('result.actionSteps')}</h5>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {recommendation.actionSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetAssessment}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              {t('result.retakeAssessment')}
            </button>
            <button
              onClick={() => addSuccessNotification(
                t('messages.resultsSaved'),
                t('messages.resultsSavedDesc')
              )}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              {t('result.saveResults')}
            </button>
          </div>
        </div>

        <NotificationContainer
          notifications={notifications}
          onRemove={removeNotification}
        />
      </div>
    );
  }

  // Question screen
  console.log('Rendering question screen:', {
    currentQuestionIndex,
    totalQuestions,
    progress,
    currentQuestion: currentQuestion?.id
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              {t('progress.questionOf', {
                current: Math.min(currentQuestionIndex + 1, totalQuestions),
                total: totalQuestions
              })}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(Math.min(progress, 100))}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        {currentQuestion && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentQuestion.title}
            </h2>
            {currentQuestion.description && (
              <p className="text-gray-600 mb-6">
                {currentQuestion.description}
              </p>
            )}

            {/* Question Input */}
            <div className="space-y-3">
              {currentQuestion.type === 'single' && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAnswers[currentQuestion.id] === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option.value}
                        checked={selectedAnswers[currentQuestion.id] === option.value}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        selectedAnswers[currentQuestion.id] === option.value
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQuestion.id] === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                        )}
                      </div>
                      {option.icon && (
                        <span className="text-lg mr-3">{option.icon}</span>
                      )}
                      <span className="text-gray-900">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'multiple' && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = Array.isArray(selectedAnswers[currentQuestion.id]) &&
                      selectedAnswers[currentQuestion.id].includes(option.value);

                    return (
                      <label
                        key={option.value}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            const currentValues = selectedAnswers[currentQuestion.id] || [];
                            const newValues = e.target.checked
                              ? [...currentValues, option.value]
                              : currentValues.filter((v: any) => v !== option.value);
                            handleAnswerChange(newValues);
                          }}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        {option.icon && (
                          <span className="text-lg mr-3">{option.icon}</span>
                        )}
                        <span className="text-gray-900">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === 'scale' && (
                <div className="space-y-4">
                  <input
                    type="range"
                    min={currentQuestion.validation?.min || 1}
                    max={currentQuestion.validation?.max || 10}
                    value={selectedAnswers[currentQuestion.id] || (currentQuestion.validation?.min || 1)}
                    onChange={(e) => handleAnswerChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{currentQuestion.validation?.min || 1}</span>
                    <span className="font-medium text-lg text-gray-900">
                      {selectedAnswers[currentQuestion.id] || (currentQuestion.validation?.min || 1)}
                    </span>
                    <span>{currentQuestion.validation?.max || 10}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('navigation.previous')}
          </button>

          <div className="flex space-x-3">
            {!currentQuestion?.validation?.required && (
              <button
                onClick={handleNext}
                className="px-6 py-2 text-gray-600 hover:text-gray-900"
              >
                {t('navigation.skip')}
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {currentQuestionIndex >= totalQuestions - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t('navigation.finish')}
                </>
              ) : (
                <>
                  {t('navigation.next')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}
      </div>

      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  );
}
