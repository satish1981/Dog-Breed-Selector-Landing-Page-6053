import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalization } from '../../hooks/useLocalization';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './SafeIcon';

const { FiGlobe, FiChevronDown } = FiIcons;

const LanguageToggle = ({ position = 'fixed', className = '' }) => {
  const { currentLanguage, supportedLanguages, changeLanguage, loading } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = supportedLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = async (languageCode) => {
    await changeLanguage(languageCode);
    setIsOpen(false);
  };

  const positionClasses = position === 'fixed' ? 'fixed' : 'relative';

  return (
    <div className={`${positionClasses} ${className}`}>
      <motion.div className="relative">
        {/* Language Toggle Button - Responsive sizing */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 text-sm sm:text-base min-h-[2.5rem] sm:min-h-[3rem]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon icon={FiGlobe} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          <span className="text-base sm:text-lg">{currentLang?.flag}</span>
          <span className="text-xs sm:text-sm font-medium text-gray-700 hidden xs:block">
            {currentLang?.code.toUpperCase()}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <SafeIcon icon={FiChevronDown} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </motion.div>
        </motion.button>

        {/* Dropdown Menu - Mobile responsive */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-40 sm:w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
            >
              {supportedLanguages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-2 sm:gap-3 ${
                    currentLanguage === language.code
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700'
                  } min-h-[2.5rem] sm:min-h-[3rem]`}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <span className="text-base sm:text-xl">{language.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base truncate">{language.nativeName}</div>
                    <div className="text-xs text-gray-500 truncate">{language.name}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageToggle;