import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiGlobe } = FiIcons;

const LanguageSelector = ({ language, onLanguageChange, isDarkMode = false }) => {
  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' }
  ];

  return (
    <div className="flex items-center gap-2 mb-4 sm:mb-6">
      <SafeIcon icon={FiGlobe} className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      <div className="flex rounded-lg overflow-hidden border-2 border-gray-200">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 min-h-[2.5rem] sm:min-h-[3rem] flex items-center gap-1 sm:gap-2 ${
              language === lang.code
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm sm:text-base">{lang.flag}</span>
            <span className="hidden xs:inline">{lang.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;