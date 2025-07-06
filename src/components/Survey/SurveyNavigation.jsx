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
  const buttonBaseClasses = "px-4 sm:px-6 py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base min-h-[3rem] sm:min-h-[3.5rem]";
  
  const primaryButtonClasses = `${buttonBaseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl`;
  
  const secondaryButtonClasses = `${buttonBaseClasses} ${
    isDarkMode 
      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
  }`;
  
  const disabledButtonClasses = `${buttonBaseClasses} bg-gray-400 text-gray-600 cursor-not-allowed opacity-50`;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-2xl mx-auto mt-6 sm:mt-8">
      {/* Previous Button */}
      <motion.button
        onClick={onPrevious}
        disabled={!canGoBack}
        className={`w-full sm:w-auto order-2 sm:order-1 ${canGoBack ? secondaryButtonClasses : disabledButtonClasses}`}
        whileHover={canGoBack ? { scale: 1.05 } : {}}
        whileTap={canGoBack ? { scale: 0.95 } : {}}
      >
        <SafeIcon icon={FiArrowLeft} className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>{language === 'hi' ? 'पिछला' : 'Previous'}</span>
      </motion.button>

      {/* Next/Submit Button */}
      <motion.button
        onClick={isLastQuestion ? onSubmit : onNext}
        disabled={!canGoNext}
        className={`w-full sm:w-auto order-1 sm:order-2 ${canGoNext ? primaryButtonClasses : disabledButtonClasses}`}
        whileHover={canGoNext ? { scale: 1.05 } : {}}
        whileTap={canGoNext ? { scale: 0.95 } : {}}
      >
        <span>
          {isLastQuestion 
            ? (language === 'hi' ? 'सबमिट करें' : 'Submit')
            : (language === 'hi' ? 'अगला' : 'Next')
          }
        </span>
        <SafeIcon 
          icon={isLastQuestion ? FiCheck : FiArrowRight} 
          className="w-4 h-4 sm:w-5 sm:h-5" 
        />
      </motion.button>
    </div>
  );
};

export default SurveyNavigation;