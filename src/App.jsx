import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LocalizationProvider } from './hooks/useLocalization';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';
import DogIllustration from './components/DogIllustration';
import SurveyPage from './components/SurveyPage';
import LanguageToggle from './components/common/LanguageToggle';
import './App.css';

const { FiSun, FiMoon, FiHeart, FiGlobe, FiUsers, FiArrowRight } = FiIcons;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'survey'

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const startSurvey = () => {
    setCurrentPage('survey');
  };

  const backToHome = () => {
    setCurrentPage('home');
  };

  return (
    <LocalizationProvider>
      <AppContent 
        isDarkMode={isDarkMode}
        currentPage={currentPage}
        toggleTheme={toggleTheme}
        startSurvey={startSurvey}
        backToHome={backToHome}
      />
    </LocalizationProvider>
  );
}

function AppContent({ isDarkMode, currentPage, toggleTheme, startSurvey, backToHome }) {
  const features = [
    {
      icon: FiHeart,
      titleKey: "feature.personalized.title",
      descriptionKey: "feature.personalized.description",
      title: "Personalized Recommendations",
      description: "Get matched with breeds that fit your lifestyle perfectly"
    },
    {
      icon: FiGlobe,
      titleKey: "feature.multilingual.title", 
      descriptionKey: "feature.multilingual.description",
      title: "Multilingual Support",
      description: "Available in multiple languages for global accessibility"
    },
    {
      icon: FiUsers,
      titleKey: "feature.family.title",
      descriptionKey: "feature.family.description", 
      title: "Family-Friendly",
      description: "Find breeds that work well with kids and other pets"
    }
  ];

  if (currentPage === 'survey') {
    return (
      <SurveyPage 
        isDarkMode={isDarkMode} 
        onBack={backToHome} 
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900'
    }`}>
      {/* Language Toggle - Responsive positioning */}
      <LanguageToggle position="fixed" className="sm:top-6 sm:left-6 top-4 left-4 z-50" />

      {/* Theme Toggle - Responsive positioning */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed sm:top-6 sm:right-6 top-4 right-4 z-50 p-2 sm:p-3 rounded-full shadow-lg transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SafeIcon icon={isDarkMode ? FiSun : FiMoon} className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      {/* Header - Mobile-first responsive design */}
      <header className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Find Your Perfect <br className="hidden sm:block" />
            <span className="sm:hidden">Perfect </span>Dog Breed Match! 🐕
          </h1>
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-2 leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover the ideal canine companion that matches your lifestyle, living situation, and preferences with our intelligent breed recommendation system.
          </p>
        </motion.div>
      </header>

      {/* Hero Section - Responsive grid layout */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Side - CTA - Mobile-first approach */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Ready to Meet Your New Best Friend?
            </h2>
            <p className={`text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Take our comprehensive quiz to get personalized breed recommendations based on your unique situation and preferences.
            </p>
            <motion.button
              onClick={startSurvey}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 mx-auto lg:mx-0 min-h-[3rem] sm:min-h-[3.5rem]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your Journey</span>
              <SafeIcon icon={FiArrowRight} className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </motion.div>

          {/* Right Side - Dog Illustrations - Responsive sizing */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative order-1 lg:order-2 h-64 sm:h-80 md:h-96"
          >
            <DogIllustration isDarkMode={isDarkMode} />
          </motion.div>
        </div>
      </section>

      {/* Features Section - Mobile-responsive grid */}
      <section className={`py-12 sm:py-16 lg:py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Why Choose Our Breed Selector?
            </h3>
            <p className={`text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto px-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Our advanced matching system considers every aspect of your lifestyle to find the perfect furry companion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className={`text-center p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  isDarkMode ? 'bg-gray-700' : 'bg-white'
                } ${index === 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {feature.title}
                </h4>
                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA - Mobile optimized */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Your Perfect Match is Just a Click Away! 🎾
          </h3>
          <p className={`text-base sm:text-lg mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto px-4 leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of happy pet parents who found their ideal companion through our breed selector.
          </p>
          <motion.button
            onClick={startSurvey}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 mx-auto max-w-sm sm:max-w-none min-h-[3.5rem] sm:min-h-[4rem]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Take the Quiz Now</span>
            <SafeIcon icon={FiArrowRight} className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default App;