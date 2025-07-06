import React from 'react';
import { motion } from 'framer-motion';

const SurveyProgress = ({ currentStep, totalSteps, isDarkMode = false, language = 'en' }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 sm:mb-8">
      <div className="flex justify-between items-center mb-2 sm:mb-3 px-1">
        <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {language === 'hi' ? 'प्रगति' : 'Progress'}
        </span>
        <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {currentStep} / {totalSteps}
        </span>
      </div>
      
      <div className={`w-full h-2 sm:h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      
      <div className="mt-1 sm:mt-2 text-center">
        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {Math.round(progress)}% {language === 'hi' ? 'पूर्ण' : 'Complete'}
        </span>
      </div>
    </div>
  );
};

export default SurveyProgress;