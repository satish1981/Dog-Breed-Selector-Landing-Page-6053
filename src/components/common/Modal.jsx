import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './SafeIcon';

const { FiX } = FiIcons;

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  isDarkMode = false,
  maxWidth = 'max-w-2xl',
  showCloseButton = true
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content - Mobile responsive */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full ${maxWidth} ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto m-4`}
            >
              {/* Header - Mobile responsive */}
              {(title || showCloseButton) && (
                <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  {title && (
                    <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold pr-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <motion.button
                      onClick={onClose}
                      className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                        isDarkMode
                          ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300'
                          : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SafeIcon icon={FiX} className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.button>
                  )}
                </div>
              )}

              {/* Content - Mobile responsive padding */}
              <div className="p-4 sm:p-6">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;