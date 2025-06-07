'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
  Question, 
  AssessmentAnswer, 
  AssessmentSession, 
  AssessmentResult,
  Recommendation 
} from '../types';
import { assessmentQuestions } from '../data/assessmentQuestions';
import { saveToStorage, loadFromStorage, createStorageKey } from '../utils';

interface UseSymptomAssessmentReturn {
  // Current session
  currentSession: AssessmentSession | null;
  currentQuestionIndex: number;
  currentQuestion: Question | null;
  isComplete: boolean;
  
  // Progress
  progress: number;
  totalQuestions: number;
  
  // Actions
  startAssessment: (locale: string) => void;
  answerQuestion: (answer: AssessmentAnswer) => void;
  goToQuestion: (index: number) => void;
  goToPreviousQuestion: () => void;
  goToNextQuestion: () => void;
  completeAssessment: () => AssessmentResult | null;
  resetAssessment: () => void;
  
  // Results
  result: AssessmentResult | null;
  
  // State
  isLoading: boolean;
  error: string | null;
}

export const useSymptomAssessment = (userId?: string): UseSymptomAssessmentReturn => {
  const [currentSession, setCurrentSession] = useState<AssessmentSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storageKey = createStorageKey(userId || 'anonymous', 'assessment_session');

  // Load saved session on mount
  useEffect(() => {
    const savedSession = loadFromStorage<AssessmentSession>(storageKey);
    if (savedSession && !savedSession.completedAt) {
      setCurrentSession(savedSession);
      setCurrentQuestionIndex(savedSession.answers.length);
    }
  }, [storageKey]);

  // Save session whenever it changes
  useEffect(() => {
    if (currentSession) {
      saveToStorage(storageKey, currentSession);
    }
  }, [currentSession, storageKey]);

  const questions = currentSession ? assessmentQuestions[currentSession.locale] || assessmentQuestions.en : [];
  const currentQuestion = questions[currentQuestionIndex] || null;
  const isComplete = currentQuestionIndex >= questions.length;
  const progress = questions.length > 0 ? Math.min((currentQuestionIndex / questions.length) * 100, 100) : 0;

  const startAssessment = useCallback((locale: string) => {
    const sessionId = `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newSession: AssessmentSession = {
      id: sessionId,
      answers: [],
      startedAt: new Date().toISOString(),
      locale
    };
    
    setCurrentSession(newSession);
    setCurrentQuestionIndex(0);
    setResult(null);
    setError(null);
  }, []);

  const answerQuestion = useCallback((answer: AssessmentAnswer) => {
    if (!currentSession) return;

    setCurrentSession(prev => {
      if (!prev) return prev;
      
      // Remove any existing answer for this question
      const filteredAnswers = prev.answers.filter(a => a.questionId !== answer.questionId);
      
      // Add the new answer
      const updatedAnswers = [...filteredAnswers, answer];
      
      return {
        ...prev,
        answers: updatedAnswers
      };
    });
  }, [currentSession]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index <= questions.length) {
      setCurrentQuestionIndex(index);
    }
  }, [questions.length]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const calculateScore = useCallback((answers: AssessmentAnswer[], questions: Question[]): number => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    questions.forEach(question => {
      const answer = answers.find(a => a.questionId === question.id);
      if (!answer) return;

      maxPossibleScore += question.weight * 10; // Assuming max weight per question is 10

      if (question.type === 'scale') {
        totalScore += (answer.value as number) * question.weight;
      } else if (question.type === 'single') {
        const option = question.options?.find(opt => opt.value === answer.value);
        if (option && option.weight !== undefined) {
          totalScore += option.weight * question.weight;
        }
      } else if (question.type === 'multiple') {
        const selectedValues = answer.value as string[];
        selectedValues.forEach(value => {
          const option = question.options?.find(opt => opt.value === value);
          if (option && option.weight !== undefined) {
            totalScore += option.weight * question.weight;
          }
        });
      }
    });

    return Math.min(totalScore, maxPossibleScore);
  }, []);

  const generateRecommendations = useCallback((score: number, percentage: number, answers: AssessmentAnswer[]): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // Emergency recommendations
    if (percentage >= 80) {
      recommendations.push({
        id: 'emergency_medical',
        category: 'medical',
        title: '建议立即就医',
        description: '您的症状可能需要专业医疗评估和治疗',
        priority: 'high',
        timeframe: '立即',
        actionSteps: [
          '联系您的妇科医生',
          '如果疼痛剧烈，考虑急诊就医',
          '记录详细的症状日志'
        ]
      });
    }

    // Pain management recommendations
    if (percentage >= 40) {
      recommendations.push({
        id: 'pain_management',
        category: 'immediate',
        title: '疼痛管理策略',
        description: '多种方法可以帮助缓解经期疼痛',
        priority: 'high',
        timeframe: '立即可用',
        actionSteps: [
          '使用热敷垫或热水袋',
          '尝试轻度运动如散步',
          '考虑非处方止痛药（按说明使用）'
        ]
      });
    }

    // Lifestyle recommendations
    recommendations.push({
      id: 'lifestyle_changes',
      category: 'lifestyle',
      title: '生活方式调整',
      description: '长期的生活方式改变可以显著改善症状',
      priority: 'medium',
      timeframe: '2-3个月见效',
      actionSteps: [
        '保持规律的运动习惯',
        '确保充足的睡眠',
        '学习压力管理技巧',
        '保持均衡饮食'
      ]
    });

    // Self-care recommendations
    recommendations.push({
      id: 'selfcare_practices',
      category: 'selfcare',
      title: '自我护理实践',
      description: '日常的自我护理可以帮助您更好地管理症状',
      priority: 'medium',
      timeframe: '持续进行',
      actionSteps: [
        '练习深呼吸和冥想',
        '使用疼痛追踪器记录症状',
        '建立支持网络',
        '学习放松技巧'
      ]
    });

    return recommendations;
  }, []);

  const completeAssessment = useCallback((): AssessmentResult | null => {
    console.log('completeAssessment called:', {
      currentSession: !!currentSession,
      answersCount: currentSession?.answers.length,
      questionsCount: questions.length
    });

    if (!currentSession) {
      console.error('No current session');
      return null;
    }

    setIsLoading(true);

    try {
      const score = calculateScore(currentSession.answers, questions);
      const maxScore = questions.reduce((sum, q) => sum + (q.weight * 10), 0);
      const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

      console.log('Assessment calculation:', {
        score,
        maxScore,
        percentage,
        answersCount: currentSession.answers.length
      });
      
      let severity: 'mild' | 'moderate' | 'severe' | 'emergency';
      let type: 'normal' | 'mild' | 'moderate' | 'severe' | 'emergency';
      let message: string;
      let summary: string;

      if (percentage >= 80) {
        severity = 'emergency';
        type = 'emergency';
        message = '您的症状较为严重，建议尽快咨询医疗专业人士。';
        summary = '评估显示您可能需要专业医疗关注。';
      } else if (percentage >= 60) {
        severity = 'severe';
        type = 'severe';
        message = '您的症状比较严重，建议采取综合管理策略。';
        summary = '您的症状需要积极的管理和可能的医疗干预。';
      } else if (percentage >= 40) {
        severity = 'moderate';
        type = 'moderate';
        message = '您有中等程度的症状，可以通过多种方法进行管理。';
        summary = '您的症状是可以管理的，建议采用多种缓解策略。';
      } else {
        severity = 'mild';
        type = 'mild';
        message = '您的症状相对较轻，通过简单的自我护理就能很好地管理。';
        summary = '您的症状较轻，可以通过生活方式调整来改善。';
      }

      const recommendations = generateRecommendations(score, percentage, currentSession.answers);
      
      const assessmentResult: AssessmentResult = {
        sessionId: currentSession.id,
        type,
        severity,
        score,
        maxScore,
        percentage,
        recommendations,
        emergency: percentage >= 80,
        message,
        summary,
        relatedArticles: [
          '/articles/menstrual-pain-management',
          '/articles/lifestyle-tips-for-period-health',
          '/articles/when-to-see-a-doctor'
        ],
        nextSteps: [
          '使用疼痛追踪器记录症状',
          '尝试推荐的缓解方法',
          '如果症状持续或恶化，请咨询医生'
        ],
        createdAt: new Date().toISOString()
      };

      // Update session with completion time and result
      const completedSession = {
        ...currentSession,
        result: assessmentResult,
        completedAt: new Date().toISOString()
      };

      console.log('Setting completed session and result:', {
        completedSession,
        assessmentResult
      });

      setCurrentSession(completedSession);
      setResult(assessmentResult);

      console.log('Result state should be updated');

      return assessmentResult;
    } catch (err) {
      console.error('Failed to complete assessment:', err);
      setError('评估完成时出现错误，请重试。');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [currentSession, calculateScore, generateRecommendations, questions]);

  const resetAssessment = useCallback(() => {
    setCurrentSession(null);
    setCurrentQuestionIndex(0);
    setResult(null);
    setError(null);
    // Clear saved session
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    // Current session
    currentSession,
    currentQuestionIndex,
    currentQuestion,
    isComplete,
    
    // Progress
    progress,
    totalQuestions: questions.length,
    
    // Actions
    startAssessment,
    answerQuestion,
    goToQuestion,
    goToPreviousQuestion,
    goToNextQuestion,
    completeAssessment,
    resetAssessment,
    
    // Results
    result,
    
    // State
    isLoading,
    error
  };
};
