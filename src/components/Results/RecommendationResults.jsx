import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBreedRecommendations } from '../../hooks/useBreedRecommendations';
import RecommendationCard from './RecommendationCard';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiLoader, FiAlertCircle, FiHeart, FiArrowLeft } = FiIcons;

const RecommendationResults = ({ 
  userResponses, 
  isDarkMode = false, 
  language = 'en',
  onBack 
}) => {
  const { 
    recommendations, 
    loading, 
    error, 
    metadata,
    generateRecommendations 
  } = useBreedRecommendations();

  useEffect(() => {
    if (userResponses && Object.keys(userResponses).length > 0) {
      generateRecommendations(userResponses);
    }
  }, [userResponses, generateRecommendations]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}>
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <SafeIcon icon={FiLoader} className={`w-16 h-16 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </motion.div>
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'hi' ? 'सिफारिशें तैयार की जा रही हैं...' : 'Generating Recommendations...'}
          </h2>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'hi' 
              ? 'हम आपके लिए सबसे अच्छी नस्लों का विश्लेषण कर रहे हैं'
              : 'We\'re analyzing the best breed matches for you'
            }
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}>
        <div className="text-center space-y-4 max-w-md">
          <SafeIcon icon={FiAlertCircle} className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'hi' ? 'त्रुटि हुई' : 'Something went wrong'}
          </h2>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {error}
          </p>
          <motion.button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
          >
            {language === 'hi' ? 'आपके लिए सिफारिशें 🐾' : 'Your Perfect Matches 🐾'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {language === 'hi' 
              ? 'आपके उत्तरों के आधार पर, यहाँ आपके लिए सबसे अच्छी कुत्ते की नस्लें हैं'
              : 'Based on your responses, here are the best dog breeds matched to your lifestyle'
            }
          </motion.p>
        </div>

        {/* Metadata */}
        {metadata && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-center mb-8 p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex justify-center items-center gap-6 text-sm">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'hi' ? 'विश्लेषित नस्लें' : 'Breeds Analyzed'}: {metadata.totalBreeds}
              </span>
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'hi' ? 'औसत स्कोर' : 'Average Score'}: {metadata.averageScore}%
              </span>
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'hi' ? 'उत्तर दिए गए' : 'Responses'}: {metadata.userResponses}
              </span>
            </div>
          </motion.div>
        )}

        {/* Back button */}
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

        {/* Recommendations */}
        {recommendations.length > 0 ? (
          <div className="grid gap-8 max-w-4xl mx-auto">
            {recommendations.map((recommendation, index) => (
              <RecommendationCard
                key={recommendation.breed.id}
                recommendation={recommendation}
                rank={index + 1}
                isDarkMode={isDarkMode}
                language={language}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <SafeIcon icon={FiHeart} className={`w-16 h-16 mx-auto mb-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
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

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mt-12 p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'hi' ? 'अगले कदम' : 'Next Steps'}
          </h3>
          <div className="space-y-2 text-sm">
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'hi' 
                ? '• स्थानीय प्रजनकों या आश्रयों से मिलें'
                : '• Research local breeders or visit shelters'
              }
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'hi' 
                ? '• पशु चिकित्सक से सलाह लें'
                : '• Consult with veterinarians about breed-specific care'
              }
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'hi' 
                ? '• कुत्ते की देखभाल की लागत की योजना बनाएं'
                : '• Plan for ongoing costs of dog ownership'
              }
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'hi' 
                ? '• अपने घर को कुत्ते के लिए तैयार करें'
                : '• Prepare your home for your new companion'
              }
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecommendationResults;