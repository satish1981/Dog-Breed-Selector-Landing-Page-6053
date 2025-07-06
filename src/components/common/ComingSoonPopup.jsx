import React from 'react';
import { motion } from 'framer-motion';
import { useLocalization } from '../../hooks/useLocalization';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './SafeIcon';
import Modal from './Modal';

const { FiClock, FiBell, FiStar, FiUsers } = FiIcons;

const ComingSoonPopup = ({ isOpen, onClose, isDarkMode = false }) => {
  const { t } = useLocalization();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isDarkMode={isDarkMode}
      maxWidth="max-w-lg"
    >
      <div className="text-center space-y-6">
        {/* Icon Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
        >
          <SafeIcon icon={FiClock} className="w-10 h-10 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {t('popup.coming_soon.title', 'Coming Soon!')}
        </motion.h3>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('popup.coming_soon.description', 
              'We\'re working hard to bring you this amazing feature! It will be available very soon.'
            )}
          </p>

          {/* Features List */}
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {t('popup.coming_soon.upcoming_features', 'What\'s Coming:')}
            </h4>
            <div className="space-y-2">
              {[
                { icon: FiUsers, text: t('popup.coming_soon.feature_1', 'Local breeder directory') },
                { icon: FiBell, text: t('popup.coming_soon.feature_2', 'Breeder contact information') },
                { icon: FiStar, text: t('popup.coming_soon.feature_3', 'Verified breeder ratings') }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <SafeIcon icon={feature.icon} className="w-4 h-4 text-white" />
                  </div>
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t('popup.coming_soon.got_it', 'Got it!')}
        </motion.button>
      </div>
    </Modal>
  );
};

export default ComingSoonPopup;