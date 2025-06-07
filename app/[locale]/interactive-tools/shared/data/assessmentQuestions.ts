import { Question } from '../types';

export const assessmentQuestions: Record<string, Question[]> = {
  zh: [
    // 基础信息
    {
      id: 'age_range',
      type: 'single',
      category: 'basic',
      weight: 1,
      title: '您的年龄范围是？',
      description: '这有助于我们提供更准确的建议',
      validation: { required: true },
      options: [
        { value: '12-17', label: '12-17岁', weight: 1 },
        { value: '18-25', label: '18-25岁', weight: 1 },
        { value: '26-35', label: '26-35岁', weight: 1 },
        { value: '36-45', label: '36-45岁', weight: 1.2 },
        { value: '46+', label: '46岁以上', weight: 1.5 }
      ]
    },
    {
      id: 'cycle_regularity',
      type: 'single',
      category: 'basic',
      weight: 2,
      title: '您的月经周期规律吗？',
      description: '月经周期通常为21-35天',
      validation: { required: true },
      options: [
        { value: 'very_regular', label: '非常规律（误差±2天）', weight: 0 },
        { value: 'mostly_regular', label: '基本规律（误差±5天）', weight: 1 },
        { value: 'irregular', label: '不太规律（误差>5天）', weight: 2 },
        { value: 'very_irregular', label: '非常不规律', weight: 3 }
      ]
    },
    
    // 疼痛相关
    {
      id: 'pain_severity',
      type: 'scale',
      category: 'pain',
      weight: 3,
      title: '您经期疼痛的平均强度是？',
      description: '1表示几乎无痛，10表示剧烈疼痛',
      validation: { required: true, min: 1, max: 10 },
      options: Array.from({ length: 10 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}`,
        weight: i + 1
      }))
    },
    {
      id: 'pain_duration',
      type: 'single',
      category: 'pain',
      weight: 2,
      title: '疼痛通常持续多长时间？',
      validation: { required: true },
      options: [
        { value: 'few_hours', label: '几小时', weight: 1 },
        { value: 'half_day', label: '半天', weight: 2 },
        { value: 'one_day', label: '1天', weight: 3 },
        { value: 'two_days', label: '2天', weight: 4 },
        { value: 'three_plus_days', label: '3天或更长', weight: 5 }
      ]
    },
    {
      id: 'pain_location',
      type: 'multiple',
      category: 'pain',
      weight: 2,
      title: '疼痛主要出现在哪些部位？',
      description: '可以选择多个部位',
      validation: { required: true },
      options: [
        { value: 'lower_abdomen', label: '下腹部', icon: '🤰', weight: 2 },
        { value: 'lower_back', label: '下背部', icon: '🔙', weight: 2 },
        { value: 'upper_back', label: '上背部', icon: '⬆️', weight: 1 },
        { value: 'thighs', label: '大腿内侧', icon: '🦵', weight: 1 },
        { value: 'head', label: '头部', icon: '🧠', weight: 1 },
        { value: 'chest', label: '胸部/乳房', icon: '💗', weight: 1 }
      ]
    },
    {
      id: 'pain_impact',
      type: 'single',
      category: 'pain',
      weight: 3,
      title: '疼痛对您日常活动的影响程度？',
      validation: { required: true },
      options: [
        { value: 'no_impact', label: '几乎无影响', weight: 0 },
        { value: 'mild_impact', label: '轻微影响，但能正常活动', weight: 1 },
        { value: 'moderate_impact', label: '中等影响，需要调整活动', weight: 2 },
        { value: 'severe_impact', label: '严重影响，难以进行日常活动', weight: 3 },
        { value: 'unable_function', label: '无法正常活动，需要卧床休息', weight: 4 }
      ]
    },

    // 伴随症状
    {
      id: 'accompanying_symptoms',
      type: 'multiple',
      category: 'symptoms',
      weight: 2,
      title: '您还有哪些伴随症状？',
      description: '可以选择多个症状',
      options: [
        { value: 'nausea', label: '恶心', icon: '🤢', weight: 2 },
        { value: 'vomiting', label: '呕吐', icon: '🤮', weight: 3 },
        { value: 'diarrhea', label: '腹泻', icon: '💩', weight: 2 },
        { value: 'constipation', label: '便秘', icon: '🚫', weight: 1 },
        { value: 'bloating', label: '腹胀', icon: '🎈', weight: 1 },
        { value: 'headache', label: '头痛', icon: '🤕', weight: 2 },
        { value: 'dizziness', label: '头晕', icon: '💫', weight: 2 },
        { value: 'fatigue', label: '极度疲劳', icon: '😴', weight: 2 },
        { value: 'mood_swings', label: '情绪波动', icon: '😤', weight: 1 },
        { value: 'anxiety', label: '焦虑', icon: '😰', weight: 2 },
        { value: 'depression', label: '情绪低落', icon: '😢', weight: 2 }
      ]
    },

    // 生活方式
    {
      id: 'exercise_frequency',
      type: 'single',
      category: 'lifestyle',
      weight: 1,
      title: '您平时的运动频率是？',
      validation: { required: true },
      options: [
        { value: 'daily', label: '每天', weight: 0 },
        { value: 'few_times_week', label: '每周几次', weight: 0 },
        { value: 'weekly', label: '每周一次', weight: 1 },
        { value: 'monthly', label: '每月几次', weight: 2 },
        { value: 'rarely', label: '很少运动', weight: 3 }
      ]
    },
    {
      id: 'stress_level',
      type: 'scale',
      category: 'lifestyle',
      weight: 2,
      title: '您最近的压力水平如何？',
      description: '1表示无压力，10表示压力极大',
      validation: { required: true, min: 1, max: 10 },
      options: Array.from({ length: 10 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}`,
        weight: Math.floor(i / 3)
      }))
    },
    {
      id: 'sleep_quality',
      type: 'single',
      category: 'lifestyle',
      weight: 1,
      title: '您的睡眠质量如何？',
      validation: { required: true },
      options: [
        { value: 'excellent', label: '很好，睡眠充足', weight: 0 },
        { value: 'good', label: '良好', weight: 0 },
        { value: 'fair', label: '一般', weight: 1 },
        { value: 'poor', label: '较差，经常失眠', weight: 2 },
        { value: 'very_poor', label: '很差，严重失眠', weight: 3 }
      ]
    },

    // 医疗历史
    {
      id: 'previous_treatment',
      type: 'multiple',
      category: 'medical',
      weight: 1,
      title: '您曾经尝试过哪些治疗方法？',
      description: '可以选择多个选项',
      options: [
        { value: 'otc_painkillers', label: '非处方止痛药', weight: 0 },
        { value: 'prescription_meds', label: '处方药物', weight: 1 },
        { value: 'birth_control', label: '避孕药', weight: 1 },
        { value: 'heat_therapy', label: '热敷', weight: 0 },
        { value: 'massage', label: '按摩', weight: 0 },
        { value: 'acupuncture', label: '针灸', weight: 0 },
        { value: 'yoga', label: '瑜伽', weight: 0 },
        { value: 'dietary_changes', label: '饮食调整', weight: 0 },
        { value: 'none', label: '从未尝试过任何治疗', weight: 2 }
      ]
    },
    {
      id: 'medical_conditions',
      type: 'multiple',
      category: 'medical',
      weight: 3,
      title: '您是否有以下医疗状况？',
      description: '请如实选择，这有助于提供更安全的建议',
      options: [
        { value: 'endometriosis', label: '子宫内膜异位症', weight: 4 },
        { value: 'fibroids', label: '子宫肌瘤', weight: 3 },
        { value: 'pcos', label: '多囊卵巢综合征', weight: 2 },
        { value: 'thyroid', label: '甲状腺疾病', weight: 2 },
        { value: 'diabetes', label: '糖尿病', weight: 2 },
        { value: 'heart_disease', label: '心脏病', weight: 3 },
        { value: 'mental_health', label: '心理健康问题', weight: 2 },
        { value: 'none', label: '以上都没有', weight: 0 }
      ]
    }
  ],
  
  en: [
    // Basic Information
    {
      id: 'age_range',
      type: 'single',
      category: 'basic',
      weight: 1,
      title: 'What is your age range?',
      description: 'This helps us provide more accurate recommendations',
      validation: { required: true },
      options: [
        { value: '12-17', label: '12-17 years', weight: 1 },
        { value: '18-25', label: '18-25 years', weight: 1 },
        { value: '26-35', label: '26-35 years', weight: 1 },
        { value: '36-45', label: '36-45 years', weight: 1.2 },
        { value: '46+', label: '46+ years', weight: 1.5 }
      ]
    },
    {
      id: 'cycle_regularity',
      type: 'single',
      category: 'basic',
      weight: 2,
      title: 'Is your menstrual cycle regular?',
      description: 'A typical cycle is 21-35 days',
      validation: { required: true },
      options: [
        { value: 'very_regular', label: 'Very regular (±2 days)', weight: 0 },
        { value: 'mostly_regular', label: 'Mostly regular (±5 days)', weight: 1 },
        { value: 'irregular', label: 'Somewhat irregular (>5 days)', weight: 2 },
        { value: 'very_irregular', label: 'Very irregular', weight: 3 }
      ]
    },
    
    // Pain-related questions
    {
      id: 'pain_severity',
      type: 'scale',
      category: 'pain',
      weight: 3,
      title: 'What is the average intensity of your menstrual pain?',
      description: '1 means almost no pain, 10 means severe pain',
      validation: { required: true, min: 1, max: 10 },
      options: Array.from({ length: 10 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}`,
        weight: i + 1
      }))
    },
    // ... (继续添加英文版本的其他问题)
  ]
};
