import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiAward, FiTrophy, FiStar, FiHeart, FiTarget, FiZap, FiGift } = FiIcons;

const GameificationElements = ({ userProgress, achievements, isDarkMode = false, language = 'en' }) => {
  const badges = [
    {
      id: 'survey_complete',
      icon: FiAward,
      title: language === 'hi' ? 'सर्वेक्षण पूरा' : 'Survey Complete',
      description: language === 'hi' ? 'आपने सभी प्रश्नों के उत्तर दिए' : 'You answered all questions',
      color: 'from-green-400 to-green-600',
      unlocked: true
    },
    {
      id: 'perfect_match',
      icon: FiTrophy,
      title: language === 'hi' ? 'परफेक्ट मैच' : 'Perfect Match',
      description: language === 'hi' ? '90% से अधिक मैच स्कोर' : 'Scored 90%+ match',
      color: 'from-yellow-400 to-yellow-600',
      unlocked: userProgress?.averageScore >= 90
    },
    {
      id: 'thorough_researcher',
      icon: FiTarget,
      title: language === 'hi' ? 'गहन अनुसंधानकर्ता' : 'Thorough Researcher',
      description: language === 'hi' ? '15+ नस्लों का विश्लेषण' : 'Analyzed 15+ breeds',
      color: 'from-blue-400 to-blue-600',
      unlocked: userProgress?.totalBreeds >= 15
    },
    {
      id: 'dog_lover',
      icon: FiHeart,
      title: language === 'hi' ? 'कुत्ता प्रेमी' : 'Dog Lover',
      description: language === 'hi' ? 'एक या अधिक नस्लों को पसंद किया' : 'Liked one or more breeds',
      color: 'from-red-400 to-red-600',
      unlocked: userProgress?.likedBreeds > 0
    },
    {
      id: 'quick_decider',
      icon: FiZap,
      title: language === 'hi' ? 'त्वरित निर्णयकर्ता' : 'Quick Decider',
      description: language === 'hi' ? '5 मिनट में सर्वेक्षण पूरा किया' : 'Completed survey in 5 minutes',
      color: 'from-purple-400 to-purple-600',
      unlocked: userProgress?.completionTime <= 300
    },
    {
      id: 'first_timer',
      icon: FiGift,
      title: language === 'hi' ? 'पहली बार' : 'First Timer',
      description: language === 'hi' ? 'पहली बार ब्रीड सेलेक्टर का उपयोग' : 'First time using breed selector',
      color: 'from-indigo-400 to-indigo-600',
      unlocked: true
    }
  ];

  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);

  return (
    <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="text-center mb-6">
        <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {language === 'hi' ? '🎊 उपलब्धियां' : '🎊 Achievements'}
        </h3>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {language === 'hi' 
            ? `${unlockedBadges.length}/${badges.length} बैज अनलॉक किए गए` 
            : `${unlockedBadges.length}/${badges.length} badges unlocked`
          }
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedBadges.length / badges.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>
      </div>

      {/* Unlocked Badges */}
      {unlockedBadges.length > 0 && (
        <div className="mb-6">
          <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'hi' ? 'अर्जित बैज' : 'Earned Badges'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {unlockedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-4 rounded-xl bg-gradient-to-r ${badge.color} text-white text-center transform hover:scale-105 transition-transform duration-200`}
              >
                <div className="text-2xl mb-2">
                  <SafeIcon icon={badge.icon} className="w-6 h-6 mx-auto" />
                </div>
                <h5 className="font-bold text-sm mb-1">{badge.title}</h5>
                <p className="text-xs opacity-90">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div>
          <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'hi' ? 'आगामी बैज' : 'Upcoming Badges'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {lockedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 border-dashed text-center ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700/50' 
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="text-2xl mb-2 opacity-50">
                  <SafeIcon icon={badge.icon} className="w-6 h-6 mx-auto" />
                </div>
                <h5 className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {badge.title}
                </h5>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {badge.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Celebration Animation */}
      {unlockedBadges.length === badges.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-6 text-center"
        >
          <div className="text-4xl mb-2">🎉</div>
          <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'hi' ? 'बधाई हो!' : 'Congratulations!'}
          </h4>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'hi' 
              ? 'आपने सभी बैज अनलॉक कर लिए हैं!' 
              : 'You\'ve unlocked all badges!'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default GameificationElements;