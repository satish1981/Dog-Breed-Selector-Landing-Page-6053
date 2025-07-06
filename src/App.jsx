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
      {/* Language Toggle */}
      <LanguageToggle position="fixed" />

      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SafeIcon icon={isDarkMode ? FiSun : FiMoon} className="w-6 h-6" />
      </motion.button>

      {/* Header */}
      <header className="container mx-auto px-6 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Perfect <br />
            Dog Breed Match! 🐕
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover the ideal canine companion that matches your lifestyle, living situation, and preferences with our intelligent breed recommendation system.
          </p>
        </motion.div>
      </header>

      {/* Hero Section with Dog Illustrations */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Ready to Meet Your New Best Friend?
            </h2>
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Take our comprehensive quiz to get personalized breed recommendations based on your unique situation and preferences.
            </p>
            <motion.button
              onClick={startSurvey}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto lg:mx-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
              <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right Side - Dog Illustrations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <DogIllustration isDarkMode={isDarkMode} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Why Choose Our Breed Selector?
            </h3>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Our advanced matching system considers every aspect of your lifestyle to find the perfect furry companion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className={`text-center p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  isDarkMode ? 'bg-gray-700' : 'bg-white'
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <SafeIcon icon={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h4 className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {feature.title}
                </h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Your Perfect Match is Just a Click Away! 🎾
          </h3>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of happy pet parents who found their ideal companion through our breed selector.
          </p>
          <motion.button
            onClick={startSurvey}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Take the Quiz Now
            <SafeIcon icon={FiArrowRight} className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default App;