import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrophy, FiStar, FiHeart, FiShare2 } = FiIcons;

const ResultsHeader = ({ userScore, totalBreeds, isDarkMode = false, language = 'en' }) => {
  const getScoreMessage = (score) => {
    if (score >= 90) return {
      title: language === 'hi' ? 'अद्भुत मैच!' : 'Amazing Matches!',
      subtitle: language === 'hi' ? 'आपको बेहतरीन साथी मिल गए हैं' : 'You found perfect companions',
      emoji: '🎉',
      color: 'from-green-400 to-green-600'
    };
    if (score >= 80) return {
      title: language === 'hi' ? 'बेहतरीन परिणाम!' : 'Great Results!',
      subtitle: language === 'hi' ? 'ये नस्लें आपके लिए बहुत अच्छी हैं' : 'These breeds are great for you',
      emoji: '⭐',
      color: 'from-blue-400 to-blue-600'
    };
    if (score >= 70) return {
      title: language === 'hi' ? 'अच्छे विकल्प!' : 'Good Options!',
      subtitle: language === 'hi' ? 'कुछ विचार करने योग्य बातें हैं' : 'Some considerations to keep in mind',
      emoji: '👍',
      color: 'from-yellow-400 to-yellow-600'
    };
    return {
      title: language === 'hi' ? 'दिलचस्प विकल्प!' : 'Interesting Options!',
      subtitle: language === 'hi' ? 'इन नस्लों पर विचार करें' : 'Consider these breeds carefully',
      emoji: '🤔',
      color: 'from-orange-400 to-orange-600'
    };
  };

  const scoreData = getScoreMessage(userScore);

  return (
    <div className="text-center mb-12">
      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="text-6xl mb-4">{scoreData.emoji}</div>
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${scoreData.color} bg-clip-text text-transparent`}>
          {scoreData.title}
        </h1>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {scoreData.subtitle}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8"
      >
        {/* Average Score */}
        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <SafeIcon icon={FiStar} className="w-5 h-5 text-yellow-500" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'hi' ? 'औसत स्कोर' : 'Average Score'}
            </span>
          </div>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {userScore}%
          </div>
        </div>

        {/* Breeds Analyzed */}
        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <SafeIcon icon={FiTrophy} className="w-5 h-5 text-blue-500" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'hi' ? 'विश्लेषित नस्लें' : 'Breeds Analyzed'}
            </span>
          </div>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {totalBreeds}
          </div>
        </div>

        {/* Top Matches */}
        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <SafeIcon icon={FiHeart} className="w-5 h-5 text-red-500" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'hi' ? 'शीर्ष मैच' : 'Top Matches'}
            </span>
          </div>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            3
          </div>
        </div>
      </motion.div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        {userScore >= 90 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-medium shadow-lg">
            <span className="text-lg">🏆</span>
            {language === 'hi' ? 'परफेक्ट मैच' : 'Perfect Match'}
          </div>
        )}
        {userScore >= 80 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-medium shadow-lg">
            <span className="text-lg">⭐</span>
            {language === 'hi' ? 'उत्कृष्ट विकल्प' : 'Excellent Choice'}
          </div>
        )}
        {totalBreeds >= 15 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-full font-medium shadow-lg">
            <span className="text-lg">🔍</span>
            {language === 'hi' ? 'व्यापक खोज' : 'Comprehensive Search'}
          </div>
        )}
      </motion.div>

      {/* Share Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
          isDarkMode 
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SafeIcon icon={FiShare2} className="w-4 h-4" />
        {language === 'hi' ? 'परिणाम साझा करें' : 'Share Results'}
      </motion.button>
    </div>
  );
};

export default ResultsHeader;