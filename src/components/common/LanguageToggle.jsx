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

  const positionClasses = position === 'fixed' 
    ? 'fixed top-6 left-6 z-50' 
    : 'relative';

  return (
    <div className={`${positionClasses} ${className}`}>
      <motion.div className="relative">
        {/* Language Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon icon={FiGlobe} className="w-4 h-4 text-gray-600" />
          <span className="text-lg">{currentLang?.flag}</span>
          <span className="text-sm font-medium text-gray-700">
            {currentLang?.code.toUpperCase()}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-600" />
          </motion.div>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-10"
            >
              {supportedLanguages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 ${
                    currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <span className="text-xl">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-gray-500">{language.name}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-blue-600 rounded-full"
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
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageToggle;