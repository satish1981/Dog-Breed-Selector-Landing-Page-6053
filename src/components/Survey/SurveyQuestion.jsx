import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheck } = FiIcons;

const SurveyQuestion = ({ question, response, onChange, language = 'en', isDarkMode = false }) => {
  const questionText = language === 'hi' ? question.question_text_hi : question.question_text_en;
  const options = question.options?.options || [];

  const handleSingleChoice = (value) => {
    onChange(value);
  };

  const handleMultipleChoice = (value) => {
    const currentValues = Array.isArray(response) ? response : [];
    const newValues = currentValues.includes(value) 
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onChange(newValues);
  };

  const handleTextInput = (value) => {
    onChange(value);
  };

  const handleSliderChange = (value) => {
    onChange(parseInt(value));
  };

  const renderSingleChoice = () => (
    <div className="space-y-3">
      {options.map((option, index) => {
        const label = language === 'hi' ? option.label_hi : option.label_en;
        const isSelected = response === option.value;

        return (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative cursor-pointer p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
              isSelected 
                ? isDarkMode 
                  ? 'border-blue-400 bg-blue-900/20' 
                  : 'border-blue-500 bg-blue-50'
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-800 hover:border-gray-500 active:bg-gray-700' 
                  : 'border-gray-200 bg-white hover:border-gray-300 active:bg-gray-50'
            } min-h-[3rem] sm:min-h-[3.5rem]`}
            onClick={() => handleSingleChoice(option.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between h-full">
              <span className={`font-medium text-sm sm:text-base leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {label}
              </span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                >
                  <SafeIcon icon={FiCheck} className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {options.map((option, index) => {
        const label = language === 'hi' ? option.label_hi : option.label_en;
        const isSelected = Array.isArray(response) && response.includes(option.value);

        return (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative cursor-pointer p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
              isSelected 
                ? isDarkMode 
                  ? 'border-purple-400 bg-purple-900/20' 
                  : 'border-purple-500 bg-purple-50'
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-800 hover:border-gray-500 active:bg-gray-700' 
                  : 'border-gray-200 bg-white hover:border-gray-300 active:bg-gray-50'
            } min-h-[3rem] sm:min-h-[3.5rem]`}
            onClick={() => handleMultipleChoice(option.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between h-full">
              <span className={`font-medium text-sm sm:text-base leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {label}
              </span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                >
                  <SafeIcon icon={FiCheck} className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderTextInput = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <textarea
        value={response || ''}
        onChange={(e) => handleTextInput(e.target.value)}
        placeholder={language === 'hi' ? 'यहाँ अपना उत्तर लिखें...' : 'Type your answer here...'}
        className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 resize-none text-sm sm:text-base ${
          isDarkMode 
            ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-blue-400' 
            : 'border-gray-200 bg-white text-gray-800 placeholder-gray-500 focus:border-blue-500'
        } focus:outline-none focus:ring-0 min-h-[4rem] sm:min-h-[5rem]`}
        rows={4}
      />
    </motion.div>
  );

  const renderNumberInput = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <input
        type="number"
        value={response || ''}
        onChange={(e) => handleTextInput(e.target.value)}
        placeholder={language === 'hi' ? 'संख्या दर्ज करें' : 'Enter a number'}
        className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 text-sm sm:text-base ${
          isDarkMode 
            ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-blue-400' 
            : 'border-gray-200 bg-white text-gray-800 placeholder-gray-500 focus:border-blue-500'
        } focus:outline-none focus:ring-0 min-h-[3rem] sm:min-h-[3.5rem]`}
      />
    </motion.div>
  );

  const renderSlider = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex justify-between text-xs sm:text-sm">
        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          {language === 'hi' ? 'कम' : 'Low'}
        </span>
        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          {language === 'hi' ? 'अधिक' : 'High'}
        </span>
      </div>
      <div className="px-2">
        <input
          type="range"
          min="1"
          max="10"
          value={response || 5}
          onChange={(e) => handleSliderChange(e.target.value)}
          className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
      <div className="text-center">
        <span className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {response || 5}
        </span>
      </div>
    </motion.div>
  );

  const renderQuestionInput = () => {
    switch (question.question_type) {
      case 'single_choice': return renderSingleChoice();
      case 'multiple_choice': return renderMultipleChoice();
      case 'text': return renderTextInput();
      case 'number': return renderNumberInput();
      case 'slider': return renderSlider();
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {questionText}
        </h2>
        {question.required && (
          <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {language === 'hi' ? '* आवश्यक' : '* Required'}
          </span>
        )}
      </div>

      <div className="max-w-2xl mx-auto">
        {renderQuestionInput()}
      </div>
    </motion.div>
  );
};

export default SurveyQuestion;