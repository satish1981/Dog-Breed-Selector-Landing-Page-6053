import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiArrowLeft, FiArrowRight, FiCheck } = FiIcons;

const SurveyNavigation = ({ 
  onPrevious, 
  onNext, 
  onSubmit,
  canGoBack, 
  canGoNext, 
  isLastQuestion,
  isDarkMode = false,
  language = 'en'
}) => {
  const buttonBaseClasses = "px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2";
  const primaryButtonClasses = `${buttonBaseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl`;
  const secondaryButtonClasses = `${buttonBaseClasses} ${
    isDarkMode 
      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
  }`;
  const disabledButtonClasses = `${buttonBaseClasses} bg-gray-400 text-gray-600 cursor-not-allowed`;

  return (
    <div className="flex justify-between items-center max-w-2xl mx-auto mt-8">
      {/* Previous Button */}
      <motion.button
        onClick={onPrevious}
        disabled={!canGoBack}
        className={canGoBack ? secondaryButtonClasses : disabledButtonClasses}
        whileHover={canGoBack ? { scale: 1.05 } : {}}
        whileTap={canGoBack ? { scale: 0.95 } : {}}
      >
        <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
        {language === 'hi' ? 'पिछला' : 'Previous'}
      </motion.button>

      {/* Next/Submit Button */}
      <motion.button
        onClick={isLastQuestion ? onSubmit : onNext}
        disabled={!canGoNext}
        className={canGoNext ? primaryButtonClasses : disabledButtonClasses}
        whileHover={canGoNext ? { scale: 1.05 } : {}}
        whileTap={canGoNext ? { scale: 0.95 } : {}}
      >
        {isLastQuestion ? (
          <>
            {language === 'hi' ? 'सबमिट करें' : 'Submit'}
            <SafeIcon icon={FiCheck} className="w-5 h-5" />
          </>
        ) : (
          <>
            {language === 'hi' ? 'अगला' : 'Next'}
            <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default SurveyNavigation;