import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHeart, FiAlertTriangle, FiInfo, FiCheck, FiX, FiTrendingUp } = FiIcons;

const RecommendationCard = ({ 
  recommendation, 
  rank, 
  isDarkMode = false,
  language = 'en'
}) => {
  const { breed, score, scoreDetails, healthWarnings, matchExplanation } = recommendation;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-blue-500 to-blue-600';
    if (score >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-500';
      case 'moderate': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: rank * 0.1 }}
      className={`rounded-2xl shadow-2xl overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      {/* Header with rank and score */}
      <div className={`relative p-6 bg-gradient-to-r ${getScoreGradient(score)}`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
              #{rank}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{breed.name}</h3>
              <p className="text-white/80">{breed.breed_group}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{score}%</div>
            <div className="text-white/80">Match</div>
          </div>
        </div>
      </div>

      {/* Breed image */}
      {breed.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={breed.image_url}
            alt={breed.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <p className={`text-sm leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {breed.description}
          </p>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-sm font-medium text-gray-500">Size</div>
            <div className={`font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {breed.size_category} ({breed.weight_min}-{breed.weight_max}kg)
            </div>
          </div>
          <div className={`p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-sm font-medium text-gray-500">Lifespan</div>
            <div className={`font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {breed.lifespan_min}-{breed.lifespan_max} years
            </div>
          </div>
          <div className={`p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-sm font-medium text-gray-500">Energy Level</div>
            <div className={`font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {breed.energy_level}/10
            </div>
          </div>
          <div className={`p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-sm font-medium text-gray-500">Training</div>
            <div className={`font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {breed.training_difficulty}/10
            </div>
          </div>
        </div>

        {/* Match explanation */}
        <div>
          <h4 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <SafeIcon icon={FiTrendingUp} className="w-5 h-5" />
            Why This Match?
          </h4>
          <p className={`text-sm mb-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {matchExplanation.summary}
          </p>
          
          {matchExplanation.strengths.length > 0 && (
            <div className="mb-3">
              <h5 className={`font-medium mb-2 text-green-600 flex items-center gap-2`}>
                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                Strengths
              </h5>
              <ul className="space-y-1">
                {matchExplanation.strengths.slice(0, 3).map((strength, index) => (
                  <li key={index} className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    • {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {matchExplanation.considerations.length > 0 && (
            <div className="mb-3">
              <h5 className={`font-medium mb-2 text-yellow-600 flex items-center gap-2`}>
                <SafeIcon icon={FiInfo} className="w-4 h-4" />
                Considerations
              </h5>
              <ul className="space-y-1">
                {matchExplanation.considerations.slice(0, 2).map((consideration, index) => (
                  <li key={index} className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    • {consideration}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Health warnings */}
        {healthWarnings.length > 0 && (
          <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${
            isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
          }`}>
            <h5 className={`font-medium mb-2 flex items-center gap-2 ${
              isDarkMode ? 'text-yellow-400' : 'text-yellow-700'
            }`}>
              <SafeIcon icon={FiAlertTriangle} className="w-4 h-4" />
              Health Considerations
            </h5>
            <div className="space-y-2">
              {healthWarnings.slice(0, 2).map((warning, index) => (
                <div key={index}>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
                  }`}>
                    {warning.message}
                  </p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>
                    {warning.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Score breakdown */}
        <div>
          <h5 className={`font-medium mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Score Breakdown
          </h5>
          <div className="space-y-2">
            {scoreDetails.details.slice(0, 5).map((detail, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {detail.category}
                </span>
                <span className={`text-sm font-medium ${getScoreColor(detail.score)}`}>
                  {detail.score}/10
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;