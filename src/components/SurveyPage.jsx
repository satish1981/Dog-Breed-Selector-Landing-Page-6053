import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SurveyContainer from './Survey/SurveyContainer';
import EnhancedRecommendationResults from './Results/EnhancedRecommendationResults';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSun, FiMoon } = FiIcons;

const SurveyPage = ({ isDarkMode = false, onBack, onToggleTheme }) => {
  const [currentStep, setCurrentStep] = useState('survey'); // 'survey', 'results'
  const [surveyResults, setSurveyResults] = useState(null);
  const [language, setLanguage] = useState('en');

  const handleSurveyComplete = (responses, sessionId) => {
    setSurveyResults({ responses, sessionId });
    setCurrentStep('results');
  };

  const handleBackToSurvey = () => {
    setCurrentStep('survey');
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Show results page
  if (currentStep === 'results' && surveyResults) {
    return (
      <div className="relative">
        {/* Theme Toggle */}
        <motion.button
          onClick={onToggleTheme}
          className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <SafeIcon icon={isDarkMode ? FiSun : FiMoon} className="w-6 h-6" />
        </motion.button>

        <EnhancedRecommendationResults
          userResponses={surveyResults.responses}
          isDarkMode={isDarkMode}
          language={language}
          onBack={handleBackToSurvey}
        />
      </div>
    );
  }

  // Show survey
  return (
    <div className="relative">
      {/* Theme Toggle */}
      <motion.button
        onClick={onToggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SafeIcon icon={isDarkMode ? FiSun : FiMoon} className="w-6 h-6" />
      </motion.button>

      <SurveyContainer
        isDarkMode={isDarkMode}
        onComplete={handleSurveyComplete}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
};

export default SurveyPage;