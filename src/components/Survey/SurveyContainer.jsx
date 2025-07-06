import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSurveyData } from '../../hooks/useSurveyData';
import SurveyQuestion from './SurveyQuestion';
import SurveyProgress from './SurveyProgress';
import SurveyNavigation from './SurveyNavigation';
import LanguageSelector from './LanguageSelector';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiLoader, FiAlertCircle } = FiIcons;

const SurveyContainer = ({ isDarkMode = false, onComplete, onLanguageChange }) => {
  const { questions, loading, error, saveResponse } = useSurveyData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [language, setLanguage] = useState('en');
  const [sessionId] = useState(() => crypto.randomUUID());

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  // Filter questions based on conditional logic
  const getVisibleQuestions = () => {
    return questions.filter(question => {
      if (!question.dynamic_logic) return true;

      const conditions = question.dynamic_logic.conditions;
      if (!conditions) return true;

      return conditions.some(condition => {
        const ifCondition = condition.if;
        return Object.entries(ifCondition).every(([key, value]) => {
          return responses[key] === value;
        });
      });
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions[currentQuestionIndex];

  const handleResponseChange = (questionId, response) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  const handleNext = async () => {
    if (currentQuestion) {
      const response = responses[currentQuestion.question_id];

      // Save response to database
      try {
        await saveResponse(sessionId, currentQuestion.question_id, response);
      } catch (err) {
        console.error('Failed to save response:', err);
      }

      if (currentQuestionIndex < visibleQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (currentQuestion) {
      const response = responses[currentQuestion.question_id];

      // Save final response
      try {
        await saveResponse(sessionId, currentQuestion.question_id, response);
      } catch (err) {
        console.error('Failed to save final response:', err);
      }
    }

    // Call completion callback with all responses
    if (onComplete) {
      onComplete(responses, sessionId);
    }
  };

  const canGoNext = () => {
    if (!currentQuestion) return false;
    const response = responses[currentQuestion.question_id];

    if (!currentQuestion.required) return true;

    if (currentQuestion.question_type === 'multiple_choice') {
      return Array.isArray(response) && response.length > 0;
    }

    return response !== undefined && response !== null && response !== '';
  };

  const canGoBack = () => {
    return currentQuestionIndex > 0;
  };

  const isLastQuestion = currentQuestionIndex === visibleQuestions.length - 1;

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}>
        <div className="text-center space-y-4 max-w-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <SafeIcon icon={FiLoader} className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </motion.div>
          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'hi' ? 'सर्वेक्षण लोड हो रहा है...' : 'Loading survey...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}>
        <div className="text-center space-y-4 max-w-md">
          <SafeIcon icon={FiAlertCircle} className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto" />
          <h2 className={`text-lg sm:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'hi' ? 'त्रुटि' : 'Error'}
          </h2>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} px-4`}>
            {language === 'hi' 
              ? 'सर्वेक्षण लोड करने में समस्या हुई। कृपया पुनः प्रयास करें।'
              : 'There was a problem loading the survey. Please try again.'
            }
          </p>
        </div>
      </div>
    );
  }

  if (visibleQuestions.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}>
        <div className="text-center space-y-4">
          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'hi' ? 'कोई प्रश्न उपलब्ध नहीं है।' : 'No questions available.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header - Mobile responsive */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight`}
            >
              {language === 'hi' ? 'कुत्ते की नस्ल चयनकर्ता' : 'Dog Breed Selector'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-sm sm:text-base lg:text-lg px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {language === 'hi' 
                ? 'आपके लिए सही कुत्ते की नस्ल खोजने में हमारी मदद करें'
                : 'Help us find the perfect dog breed for you'
              }
            </motion.p>
          </div>

          {/* Language Selector - Responsive */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <LanguageSelector
              language={language}
              onLanguageChange={handleLanguageChange}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Progress Bar - Full width on mobile */}
          <div className="mb-6 sm:mb-8">
            <SurveyProgress
              currentStep={currentQuestionIndex + 1}
              totalSteps={visibleQuestions.length}
              isDarkMode={isDarkMode}
              language={language}
            />
          </div>

          {/* Question Container - Mobile optimized */}
          <div className={`rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <AnimatePresence mode="wait">
              {currentQuestion && (
                <SurveyQuestion
                  key={currentQuestion.question_id}
                  question={currentQuestion}
                  response={responses[currentQuestion.question_id]}
                  onChange={(response) => handleResponseChange(currentQuestion.question_id, response)}
                  language={language}
                  isDarkMode={isDarkMode}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Navigation - Mobile optimized */}
          <SurveyNavigation
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            canGoBack={canGoBack()}
            canGoNext={canGoNext()}
            isLastQuestion={isLastQuestion}
            isDarkMode={isDarkMode}
            language={language}
          />
        </div>
      </div>
    </div>
  );
};

export default SurveyContainer;