import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBreedRecommendations } from '../../hooks/useBreedRecommendations';
import BreedCard from './BreedCard';
import ResultsHeader from './ResultsHeader';
import GameificationElements from './GameificationElements';
import NextStepsGuide from './NextStepsGuide';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiLoader, FiAlertCircle, FiArrowLeft, FiRefreshCw } = FiIcons;

const EnhancedRecommendationResults = ({ 
  userResponses, 
  isDarkMode = false, 
  language = 'en', 
  onBack 
}) => {
  const { recommendations, loading, error, metadata, generateRecommendations } = useBreedRecommendations();
  const [favorites, setFavorites] = useState(new Set());
  const [userProgress, setUserProgress] = useState({
    averageScore: 0,
    totalBreeds: 0,
    likedBreeds: 0,
    completionTime: 0
  });

  useEffect(() => {
    if (userResponses && Object.keys(userResponses).length > 0) {
      generateRecommendations(userResponses);
    }
  }, [userResponses, generateRecommendations]);

  useEffect(() => {
    if (recommendations.length > 0) {
      const avgScore = Math.round(
        recommendations.reduce((sum, rec) => sum + rec.score, 0) / recommendations.length
      );
      
      setUserProgress({
        averageScore: avgScore,
        totalBreeds: metadata?.totalBreeds || 0,
        likedBreeds: favorites.size,
        completionTime: Math.floor(Math.random() * 300) + 120 // Simulated completion time
      });
    }
  }, [recommendations, favorites.size, metadata]);

  const handleToggleFavorite = (breedId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(breedId)) {
        newFavorites.delete(breedId);
      } else {
        newFavorites.add(breedId);
      }
      return newFavorites;
    });
  };

  const handleRetry = () => {
    if (userResponses) {
      generateRecommendations(userResponses);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}>
        <div className="text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <SafeIcon icon={FiLoader} className={`w-16 h-16 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </motion.div>
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'hi' ? 'सिफारिशें तैयार की जा रही हैं...' : 'Generating Recommendations...'}
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'hi' 
                ? 'हम आपके लिए सबसे अच्छी नस्लों का विश्लेषण कर रहे हैं' 
                : 'We\'re analyzing the best breed matches for you'
              }
            </p>
          </div>
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}>
        <div className="text-center space-y-6 max-w-md">
          <SafeIcon icon={FiAlertCircle} className="w-16 h-16 text-red-500 mx-auto" />
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'hi' ? 'कुछ गलत हुआ' : 'Something went wrong'}
            </h2>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {error}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              onClick={handleRetry}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiRefreshCw} className="w-5 h-5" />
              {language === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}
            </motion.button>
            <motion.button
              onClick={onBack}
              className={`px-6 py-3 rounded-full font-semibold border-2 transition-all duration-300 flex items-center gap-2 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
              {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <motion.button
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            {language === 'hi' ? 'वापस जाएं' : 'Back to Survey'}
          </motion.button>
        </div>

        {/* Results Header */}
        <ResultsHeader 
          userScore={userProgress.averageScore}
          totalBreeds={userProgress.totalBreeds}
          isDarkMode={isDarkMode}
          language={language}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Breed Recommendations */}
          <div className="lg:col-span-2 space-y-8">
            {recommendations.length > 0 ? (
              recommendations.map((recommendation, index) => (
                <BreedCard
                  key={recommendation.breed.id}
                  breed={recommendation.breed}
                  rank={index + 1}
                  score={recommendation.score}
                  isDarkMode={isDarkMode}
                  language={language}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.has(recommendation.breed.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <SafeIcon icon={FiAlertCircle} className={`w-16 h-16 mx-auto mb-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {language === 'hi' ? 'कोई सिफारिश नहीं मिली' : 'No Recommendations Found'}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language === 'hi' 
                    ? 'कृपया सर्वेक्षण को फिर से पूरा करने का प्रयास करें' 
                    : 'Please try completing the survey again'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Gamification Elements */}
            <GameificationElements
              userProgress={userProgress}
              isDarkMode={isDarkMode}
              language={language}
            />

            {/* Next Steps Guide */}
            <NextStepsGuide
              isDarkMode={isDarkMode}
              language={language}
            />
          </div>
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`mt-16 text-center p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <div className="text-4xl mb-4">🐕💕</div>
          <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'hi' ? 'आपकी यात्रा शुरू हो रही है!' : 'Your Journey Begins!'}
          </h3>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'hi' 
              ? 'अब आप अपने सपनों के साथी को खोजने के लिए तैयार हैं। शुभकामनाएं!'
              : 'You\'re now ready to find your dream companion. Good luck!'
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedRecommendationResults;