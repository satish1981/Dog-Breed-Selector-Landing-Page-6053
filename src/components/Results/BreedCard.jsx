import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalization } from '../../hooks/useLocalization';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ComingSoonPopup from '../common/ComingSoonPopup';
import BreedDetailsPopup from '../common/BreedDetailsPopup';

const { FiHeart, FiInfo, FiAward, FiStar, FiShield, FiTrendingUp, FiUsers, FiHome, FiActivity, FiMapPin, FiBookOpen } = FiIcons;

const BreedCard = ({ 
  breed, 
  rank, 
  score, 
  isDarkMode = false, 
  onToggleFavorite, 
  isFavorite = false 
}) => {
  const { t, currentLanguage } = useLocalization();
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showBreedDetails, setShowBreedDetails] = useState(false);

  // Use localized breed data if available
  const breedName = breed.localizedName || breed.name;
  const breedDescription = breed.localizedDescription || breed.description;
  const breedTemperament = breed.localizedTemperament || breed.temperament || [];
  const healthConcerns = breed.localizedHealthConcerns || breed.health_concerns || [];
  const specialNeeds = breed.localizedSpecialNeeds || breed.special_needs || [];

  // Generate cartoon-style breed illustration
  const getBreedIllustration = (breedName) => {
    const illustrations = {
      'Labrador Retriever': '🦮',
      'German Shepherd': '🐕‍🦺',
      'Golden Retriever': '🐕',
      'French Bulldog': '🐾',
      'Bulldog': '🐕',
      'Poodle': '🐩',
      'Beagle': '🐕',
      'Rottweiler': '🐕‍🦺',
      'German Shorthaired Pointer': '🐕',
      'Yorkshire Terrier': '🐕',
      'Siberian Husky': '🐺',
      'Boston Terrier': '🐕',
      'Pembroke Welsh Corgi': '🐕',
      'Australian Shepherd': '🐕‍🦺',
      'Border Collie': '🐕‍🦺'
    };
    return illustrations[breedName] || '🐕';
  };

  const getRankBadge = (rank) => {
    const badges = {
      1: { emoji: '🏆', label: t('badge.perfect_match', 'Perfect Match'), color: 'from-yellow-400 to-yellow-600' },
      2: { emoji: '🥈', label: t('badge.great_match', 'Great Match'), color: 'from-gray-300 to-gray-500' },
      3: { emoji: '🥉', label: t('badge.good_match', 'Good Match'), color: 'from-amber-400 to-amber-600' }
    };
    return badges[rank] || { emoji: '⭐', label: t('badge.match', 'Match'), color: 'from-blue-400 to-blue-600' };
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getScoreGradient = (score) => {
    if (score >= 90) return 'from-green-400 to-green-600';
    if (score >= 80) return 'from-blue-400 to-blue-600';
    if (score >= 70) return 'from-yellow-400 to-yellow-600';
    return 'from-orange-400 to-orange-600';
  };

  const badge = getRankBadge(rank);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: rank * 0.1 }}
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl transition-all duration-300 hover:shadow-3xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Rank Badge - Responsive positioning */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: rank * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs sm:text-sm font-bold shadow-lg`}
          >
            <span className="text-sm sm:text-lg">{badge.emoji}</span>
            <span className="text-xs sm:text-sm">#{rank}</span>
          </motion.div>
        </div>

        {/* Favorite Button - Responsive sizing */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
          <motion.button
            onClick={() => onToggleFavorite?.(breed.id)}
            className={`p-2 sm:p-3 rounded-full transition-all duration-200 ${
              isFavorite
                ? 'bg-red-500 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={t('action.toggle_favorite', 'Toggle favorite')}
          >
            <SafeIcon icon={FiHeart} className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        {/* Header with Score - Mobile responsive */}
        <div className={`relative p-4 sm:p-6 bg-gradient-to-r ${getScoreGradient(score)}`}>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="text-4xl sm:text-6xl flex-shrink-0">{getBreedIllustration(breedName)}</div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-2xl font-bold mb-1 truncate">{breedName}</h3>
                <p className="text-white/80 text-xs sm:text-sm truncate">{breed.breed_group}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-3">
              <div className="text-xl sm:text-3xl font-bold">{score}%</div>
              <div className="text-white/80 text-xs sm:text-sm hidden sm:block">{badge.label}</div>
            </div>
          </div>

          {/* Achievement Badges - Responsive layout */}
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
            {(breed.good_with_children || breed.friendliness_kids || 0) >= 8 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-xs">
                <SafeIcon icon={FiUsers} className="w-2 h-2 sm:w-3 sm:h-3" />
                <span className="hidden xs:inline">{t('badge.kid_friendly', 'Kid-Friendly')}</span>
              </div>
            )}
            {breed.apartment_suitable >= 8 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-xs">
                <SafeIcon icon={FiHome} className="w-2 h-2 sm:w-3 sm:h-3" />
                <span className="hidden xs:inline">{t('badge.apartment_ok', 'Apartment OK')}</span>
              </div>
            )}
            {breed.trainability >= 8 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-xs">
                <SafeIcon icon={FiAward} className="w-2 h-2 sm:w-3 sm:h-3" />
                <span className="hidden xs:inline">{t('badge.easy_training', 'Easy Training')}</span>
              </div>
            )}
            {breed.energy_level >= 8 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-xs">
                <SafeIcon icon={FiActivity} className="w-2 h-2 sm:w-3 sm:h-3" />
                <span className="hidden xs:inline">{t('badge.high_energy', 'High Energy')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Breed Image - Responsive height */}
        <div className="relative h-32 sm:h-48 overflow-hidden">
          {breed.image_url && (
            <div className="relative w-full h-full">
              <img
                src={breed.image_url}
                alt={breedName}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.style.display = 'none';
                  setImageLoaded(true);
                }}
              />
              {!imageLoaded && (
                <div className={`absolute inset-0 flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="text-4xl sm:text-6xl">{getBreedIllustration(breedName)}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content - Mobile optimized spacing */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Description */}
          <div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {breedDescription}
            </p>
          </div>

          {/* Key Stats Grid - Responsive grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className={`p-2 sm:p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-xs font-medium text-gray-500 mb-1">
                {t('breed.size', 'Size')}
              </div>
              <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t(`size.${breed.size_category}`, breed.size_category)}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {breed.weight_range}
              </div>
            </div>
            <div className={`p-2 sm:p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-xs font-medium text-gray-500 mb-1">
                {t('breed.lifespan', 'Lifespan')}
              </div>
              <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {breed.lifespan_years || `${breed.lifespan_min}-${breed.lifespan_max} ${t('years', 'years')}`}
              </div>
            </div>
            <div className={`p-2 sm:p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-xs font-medium text-gray-500 mb-1">
                {t('breed.energy', 'Energy')}
              </div>
              <div className="flex items-center gap-1">
                <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {breed.energy_level}/10
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      icon={FiStar}
                      className={`w-2 h-2 sm:w-3 sm:h-3 ${
                        i < Math.floor(breed.energy_level / 2) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={`p-2 sm:p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-xs font-medium text-gray-500 mb-1">
                {t('breed.training', 'Training')}
              </div>
              <div className="flex items-center gap-1">
                <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {breed.trainability}/10
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      icon={FiStar}
                      className={`w-2 h-2 sm:w-3 sm:h-3 ${
                        i < Math.floor(breed.trainability / 2) ? 'text-blue-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Temperament Traits - Mobile responsive */}
          <div>
            <h4 className={`text-sm font-semibold mb-2 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {t('breed.personality_traits', 'Personality Traits')}
            </h4>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {breedTemperament.slice(0, 6).map((trait, index) => (
                <span
                  key={index}
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Health Warnings - Mobile responsive */}
          {healthConcerns.length > 0 && (
            <div className={`p-3 sm:p-4 rounded-lg border-l-4 border-orange-500 ${
              isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'
            }`}>
              <h5 className={`font-medium mb-2 flex items-center gap-2 text-sm ${
                isDarkMode ? 'text-orange-400' : 'text-orange-700'
              }`}>
                <SafeIcon icon={FiShield} className="w-3 h-3 sm:w-4 sm:h-4" />
                {t('breed.health_considerations', 'Health Considerations')}
              </h5>
              <div className="space-y-1">
                {healthConcerns.slice(0, 3).map((concern, index) => (
                  <p key={index} className={`text-xs sm:text-sm ${
                    isDarkMode ? 'text-orange-300' : 'text-orange-700'
                  }`}>
                    • {concern}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons - Mobile responsive */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <motion.button
              onClick={() => setShowComingSoon(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base min-h-[2.5rem] sm:min-h-[3rem]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiMapPin} className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t('action.find_breeders', 'Find Local Breeders')}</span>
            </motion.button>
            <motion.button
              onClick={() => setShowBreedDetails(true)}
              className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium border-2 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base min-h-[2.5rem] sm:min-h-[3rem] ${
                isDarkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiBookOpen} className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t('action.learn_more', 'Learn More')}</span>
            </motion.button>
          </div>

          {/* Expand Button - Mobile responsive */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-full py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base min-h-[2.5rem] sm:min-h-[3rem] ${
              isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <SafeIcon icon={FiInfo} className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{isExpanded ? t('action.show_less', 'Show Less') : t('action.show_more', 'Show More Details')}</span>
            </div>
          </motion.button>

          {/* Expanded Content - Mobile responsive */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {isExpanded && (
              <div className="pt-3 sm:pt-4 space-y-3 sm:space-y-4">
                {/* Special Needs */}
                {specialNeeds.length > 0 && (
                  <div>
                    <h6 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {t('breed.special_care_requirements', 'Special Care Requirements')}
                    </h6>
                    <div className="space-y-1">
                      {specialNeeds.map((need, index) => (
                        <p key={index} className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          • {need}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Climate Adaptation */}
                {breed.climate_adaptation && (
                  <div>
                    <h6 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {t('breed.climate_tolerance', 'Climate Tolerance')}
                    </h6>
                    <div className="grid grid-cols-3 gap-2">
                      <div className={`p-2 rounded text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="text-xs text-gray-500">{t('climate.hot', 'Hot')}</div>
                        <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {breed.climate_adaptation.hot}/10
                        </div>
                      </div>
                      <div className={`p-2 rounded text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="text-xs text-gray-500">{t('climate.cold', 'Cold')}</div>
                        <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {breed.climate_adaptation.cold}/10
                        </div>
                      </div>
                      <div className={`p-2 rounded text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="text-xs text-gray-500">{t('climate.humid', 'Humid')}</div>
                        <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {breed.climate_adaptation.humid}/10
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Popups */}
      <ComingSoonPopup
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        isDarkMode={isDarkMode}
      />
      <BreedDetailsPopup
        isOpen={showBreedDetails}
        onClose={() => setShowBreedDetails(false)}
        breed={breed}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default BreedCard;