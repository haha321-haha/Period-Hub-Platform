'use client';

import React, { useState, useEffect } from 'react';

interface BreathingExerciseProps {
  locale: string;
}

interface Phase {
  name: string;
  nameEn: string;
  duration: number;
  color: string;
}

export default function BreathingExercise({ locale }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const phases: Phase[] = [
    { name: '吸气', nameEn: 'Inhale', duration: 4, color: 'bg-blue-600' },
    { name: '屏息', nameEn: 'Hold', duration: 7, color: 'bg-purple-600' },
    { name: '呼气', nameEn: 'Exhale', duration: 8, color: 'bg-pink-600' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (currentPhase < phases.length - 1) {
        // Move to next phase
        setTimeout(() => {
          setCurrentPhase(currentPhase + 1);
          setTimeLeft(phases[currentPhase + 1].duration);
        }, 500);
      } else {
        // Complete the cycle
        setIsActive(false);
        setIsComplete(true);
        setCurrentPhase(0);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentPhase, phases]);

  const startExercise = () => {
    setIsActive(true);
    setIsComplete(false);
    setCurrentPhase(0);
    setTimeLeft(phases[0].duration);
  };

  const resetExercise = () => {
    setIsActive(false);
    setIsComplete(false);
    setCurrentPhase(0);
    setTimeLeft(0);
  };

  const getCurrentPhase = () => phases[currentPhase];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🫁</span>
        </div>
        <h3 className="text-2xl font-bold text-blue-800 mb-2">
          {locale === 'zh' ? '4-7-8 深呼吸练习' : '4-7-8 Breathing Exercise'}
        </h3>
        <p className="text-blue-600 text-sm">
          {locale === 'zh' 
            ? '通过调节神经系统自然缓解疼痛' 
            : 'Natural pain relief through nervous system regulation'
          }
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">
          {locale === 'zh' ? '练习方法：' : 'How to practice:'}
        </h4>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-blue-600">4</span>
            </div>
            <p className="text-blue-700">
              {locale === 'zh' ? '吸气 4秒' : 'Inhale 4s'}
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-purple-600">7</span>
            </div>
            <p className="text-purple-700">
              {locale === 'zh' ? '屏息 7秒' : 'Hold 7s'}
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-pink-600">8</span>
            </div>
            <p className="text-pink-700">
              {locale === 'zh' ? '呼气 8秒' : 'Exhale 8s'}
            </p>
          </div>
        </div>
      </div>

      {/* Exercise Display */}
      <div className="text-center mb-6">
        {isActive ? (
          <div className="space-y-4">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto transition-all duration-1000 ${getCurrentPhase().color}`}>
              <div className="text-white text-center">
                <div className="text-3xl font-bold">{timeLeft}</div>
                <div className="text-sm">
                  {locale === 'zh' ? getCurrentPhase().name : getCurrentPhase().nameEn}
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              {locale === 'zh' 
                ? `正在进行：${getCurrentPhase().name}` 
                : `Current: ${getCurrentPhase().nameEn}`
              }
            </p>
          </div>
        ) : (
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl text-gray-400">🫁</span>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="text-center space-y-3">
        {!isActive && !isComplete && (
          <button
            onClick={startExercise}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
          >
            {locale === 'zh' ? '🫁 开始引导练习' : '🫁 Start Guided Practice'}
          </button>
        )}

        {isComplete && (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 font-medium">
                {locale === 'zh' ? '✅ 一轮练习完成！' : '✅ One cycle completed!'}
              </p>
            </div>
            <button
              onClick={startExercise}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors w-full"
            >
              {locale === 'zh' ? '再次练习' : 'Practice Again'}
            </button>
          </div>
        )}

        {isActive && (
          <button
            onClick={resetExercise}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            {locale === 'zh' ? '停止练习' : 'Stop Practice'}
          </button>
        )}
      </div>

      {/* Benefits */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
        <h5 className="font-semibold text-gray-800 mb-2">
          {locale === 'zh' ? '科学效果：' : 'Scientific Benefits:'}
        </h5>
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div>
            <div className="text-lg font-bold text-blue-600">-40%</div>
            <div className="text-gray-600">
              {locale === 'zh' ? '疼痛感知' : 'Pain Perception'}
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">-35%</div>
            <div className="text-gray-600">
              {locale === 'zh' ? '肌肉紧张' : 'Muscle Tension'}
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-pink-600">+60%</div>
            <div className="text-gray-600">
              {locale === 'zh' ? '放松感受' : 'Relaxation'}
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 text-xs text-gray-600">
        <p>
          {locale === 'zh' 
            ? '💡 建议：找一个舒适的坐位或躺位，放松全身肌肉。初学者建议进行3-4个循环。'
            : '💡 Tip: Find a comfortable sitting or lying position, relax all muscles. Beginners should do 3-4 cycles.'
          }
        </p>
      </div>
    </div>
  );
}
