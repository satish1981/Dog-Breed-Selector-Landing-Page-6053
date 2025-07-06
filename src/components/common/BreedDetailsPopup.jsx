import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalization } from '../../hooks/useLocalization';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './SafeIcon';
import Modal from './Modal';

const { 
  FiStar, FiHeart, FiActivity, FiHome, FiUsers, FiShield, 
  FiAward, FiClock, FiTrendingUp, FiInfo, FiZap 
} = FiIcons;

const BreedDetailsPopup = ({ isOpen, onClose, breed, isDarkMode = false }) => {
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState('overview');

  if (!breed) return null;

  const breedName = breed.localizedName || breed.name;
  const breedDescription = breed.localizedDescription || breed.description;

  // Generate interesting facts about the breed
  const getInterestingFacts = () => {
    const facts = [
      t('fact.origin', `Originally bred in ${breed.origin || 'various regions'} for specific working purposes.`),
      t('fact.temperament', `Known for being ${(breed.temperament || []).slice(0, 3).join(', ').toLowerCase()}.`),
      t('fact.intelligence', `Ranks ${breed.trainability || 'moderately'}/10 in trainability and intelligence.`),
      t('fact.energy', `Has ${breed.energy_level || 'moderate'}/10 energy level, perfect for ${breed.energy_level >= 7 ? 'active' : 'relaxed'} lifestyles.`),
      t('fact.lifespan', `Typically lives ${breed.lifespan_min || 10}-${breed.lifespan_max || 15} years with proper care.`),
      t('fact.size', `${breed.size_category || 'Medium'} sized breed weighing ${breed.weight_range || '20-30kg'}.`)
    ];

    // Add breed-specific facts based on characteristics
    if (breed.good_with_children >= 8) {
      facts.push(t('fact.family', 'Excellent family companion, especially great with children.'));
    }
    
    if (breed.apartment_suitable >= 8) {
      facts.push(t('fact.apartment', 'Well-suited for apartment living with proper exercise.'));
    }

    if (breed.grooming_needs >= 7) {
      facts.push(t('fact.grooming', 'Requires regular grooming to maintain their beautiful coat.'));
    }

    return facts.slice(0, 6); // Return top 6 facts
  };

  const tabs = [
    { id: 'overview', label: t('tab.overview', 'Overview'), icon: FiInfo },
    { id: 'characteristics', label: t('tab.characteristics', 'Characteristics'), icon: FiStar },
    { id: 'facts', label: t('tab.facts', 'Fun Facts'), icon: FiZap }
  ];

  const characteristics = [
    { 
      label: t('char.energy_level', 'Energy Level'), 
      value: breed.energy_level || 5, 
      icon: FiActivity,
      color: 'from-red-400 to-red-600'
    },
    { 
      label: t('char.trainability', 'Trainability'), 
      value: breed.trainability || 5, 
      icon: FiAward,
      color: 'from-blue-400 to-blue-600'
    },
    { 
      label: t('char.friendliness', 'Friendliness'), 
      value: breed.friendliness || breed.good_with_children || 5, 
      icon: FiHeart,
      color: 'from-pink-400 to-pink-600'
    },
    { 
      label: t('char.apartment_suitable', 'Apartment Suitable'), 
      value: breed.apartment_suitable || 5, 
      icon: FiHome,
      color: 'from-green-400 to-green-600'
    },
    { 
      label: t('char.grooming_needs', 'Grooming Needs'), 
      value: breed.grooming_needs || 5, 
      icon: FiShield,
      color: 'from-purple-400 to-purple-600'
    },
    { 
      label: t('char.health', 'Overall Health'), 
      value: breed.health_score || 7, 
      icon: FiTrendingUp,
      color: 'from-yellow-400 to-yellow-600'
    }
  ];

  const ProgressBar = ({ value, color }) => (
    <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / 10) * 100}%` }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`h-full bg-gradient-to-r ${color} rounded-full`}
      />
    </div>
  );

  const TabButton = ({ tab, isActive, onClick }) => (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
          : isDarkMode
            ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <SafeIcon icon={tab.icon} className="w-4 h-4" />
      {tab.label}
    </motion.button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${breedName} ${t('popup.breed_details', 'Details')}`}
      isDarkMode={isDarkMode}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Breed Image and Basic Info */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="md:w-1/3">
            {breed.image_url ? (
              <img
                src={breed.image_url}
                alt={breedName}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className={`w-full h-64 rounded-lg flex items-center justify-center text-8xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                🐕
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="md:w-2/3 space-y-4">
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {breedName}
              </h3>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {breed.breed_group}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-sm text-gray-500 mb-1">{t('stat.size', 'Size')}</div>
                <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {breed.size_category}
                </div>
                <div className="text-xs text-gray-500">{breed.weight_range}</div>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-sm text-gray-500 mb-1">{t('stat.lifespan', 'Lifespan')}</div>
                <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {breed.lifespan_min}-{breed.lifespan_max} {t('years', 'years')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[300px]"
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {t('overview.description', 'Description')}
                </h4>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {breedDescription}
                </p>
              </div>

              {/* Temperament */}
              {breed.temperament && breed.temperament.length > 0 && (
                <div>
                  <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {t('overview.temperament', 'Temperament')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {breed.temperament.map((trait, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isDarkMode
                            ? 'bg-blue-900/30 text-blue-300'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Health Considerations */}
              {breed.health_concerns && breed.health_concerns.length > 0 && (
                <div>
                  <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {t('overview.health', 'Health Considerations')}
                  </h4>
                  <div className="space-y-2">
                    {breed.health_concerns.slice(0, 3).map((concern, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <SafeIcon icon={FiShield} className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {concern}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'characteristics' && (
            <div className="space-y-6">
              <h4 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t('characteristics.title', 'Breed Characteristics')}
              </h4>
              <div className="grid gap-6">
                {characteristics.map((char, index) => (
                  <motion.div
                    key={char.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${char.color} flex items-center justify-center`}>
                          <SafeIcon icon={char.icon} className="w-4 h-4 text-white" />
                        </div>
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {char.label}
                        </span>
                      </div>
                      <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {char.value}/10
                      </span>
                    </div>
                    <ProgressBar value={char.value} color={char.color} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'facts' && (
            <div className="space-y-6">
              <h4 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t('facts.title', 'Interesting Facts')}
              </h4>
              <div className="grid gap-4">
                {getInterestingFacts().map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-l-4 border-blue-500 ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {fact}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Modal>
  );
};

export default BreedDetailsPopup;