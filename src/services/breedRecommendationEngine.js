import supabase from '../lib/supabase';

/**
 * Dog Breed Recommendation Engine with Localization Support
 * Analyzes user survey responses and matches them with dog breeds from Supabase
 */
class BreedRecommendationEngine {
  constructor() {
    this.breeds = [];
    this.translations = {};
    this.weightingCriteria = {
      // Core lifestyle factors
      living_situation: 2.5,
      experience_level: 2.0,
      activity_level: 2.5,
      time_availability: 2.0,
      // Family & social factors
      children_in_home: 2.0,
      other_pets: 1.5,
      social_needs: 1.5,
      // Practical considerations
      size_preference: 2.0,
      grooming_tolerance: 1.5,
      budget_range: 2.0,
      climate: 1.8,
      // Specific needs
      guard_dog_needs: 1.2,
      training_commitment: 1.8,
      noise_tolerance: 1.5,
      health_priorities: 1.5
    };
  }

  /**
   * Load translations for a specific language
   */
  async loadTranslations(languageCode = 'en') {
    try {
      const { data, error } = await supabase
        .from('locales_i18n_x7k9')
        .select('*')
        .eq('language_code', languageCode);

      if (error) throw error;

      // Transform to key-value map
      const translationMap = {};
      data.forEach(item => {
        translationMap[item.translation_key] = item.translation_value;
      });

      this.translations[languageCode] = translationMap;
      return translationMap;
    } catch (error) {
      console.error('Error loading translations:', error);
      return {};
    }
  }

  /**
   * Get localized text
   */
  getLocalizedText(key, languageCode = 'en', fallback = '') {
    const translations = this.translations[languageCode] || {};
    return translations[key] || fallback || key;
  }

  /**
   * Load all dog breeds from Supabase with localized content
   */
  async loadBreeds(languageCode = 'en') {
    try {
      // Load translations first
      if (!this.translations[languageCode]) {
        await this.loadTranslations(languageCode);
      }

      const { data, error } = await supabase
        .from('dog_breeds_rec8m3x1')
        .select('*');

      if (error) throw error;

      // Localize breed data
      this.breeds = data.map(breed => ({
        ...breed,
        localizedName: this.getLocalizedText(
          `breed.${breed.id}.name`, 
          languageCode, 
          breed.name
        ),
        localizedDescription: this.getLocalizedText(
          `breed.${breed.id}.description`, 
          languageCode, 
          breed.description
        ),
        localizedTemperament: breed.temperament?.map(trait => 
          this.getLocalizedText(
            `temperament.${trait.toLowerCase().replace(/\s+/g, '_')}`, 
            languageCode, 
            trait
          )
        ) || [],
        localizedHealthConcerns: breed.health_concerns?.map(concern => 
          this.getLocalizedText(
            `health.${concern.toLowerCase().replace(/\s+/g, '_')}`, 
            languageCode, 
            concern
          )
        ) || [],
        localizedSpecialNeeds: breed.special_needs?.map(need => 
          this.getLocalizedText(
            `special_need.${need.toLowerCase().replace(/\s+/g, '_')}`, 
            languageCode, 
            need
          )
        ) || []
      }));

      return this.breeds;
    } catch (error) {
      console.error('Error loading breeds:', error);
      throw new Error('Failed to load dog breeds data');
    }
  }

  /**
   * Calculate match score for a single breed based on user responses
   */
  calculateBreedScore(breed, userResponses, languageCode = 'en') {
    let totalScore = 0;
    let maxPossibleScore = 0;
    const scoringDetails = [];

    // Living situation scoring
    if (userResponses.living_situation) {
      const weight = this.weightingCriteria.living_situation;
      maxPossibleScore += weight * 10;
      let score = 0;

      if (userResponses.living_situation === 'apartment') {
        score = breed.apartment_suitable ? 10 : 2;
      } else if (userResponses.living_situation === 'house_small_yard') {
        score = breed.yard_required ? 8 : 10;
      } else if (userResponses.living_situation === 'house_large_yard') {
        score = 10;
      }

      totalScore += score * weight;
      scoringDetails.push({
        category: this.getLocalizedText('scoring.living_situation', languageCode, 'Living Situation'),
        score: score,
        weight: weight,
        explanation: breed.apartment_suitable 
          ? this.getLocalizedText('scoring.apartment_suitable', languageCode, 'Apartment suitable')
          : this.getLocalizedText('scoring.needs_space', languageCode, 'Needs space')
      });
    }

    // Activity level matching
    if (userResponses.activity_level) {
      const weight = this.weightingCriteria.activity_level;
      maxPossibleScore += weight * 10;
      const userActivity = this.mapActivityLevel(userResponses.activity_level);
      const breedActivity = breed.energy_level;
      const difference = Math.abs(userActivity - breedActivity);
      const score = Math.max(0, 10 - difference * 2);

      totalScore += score * weight;
      scoringDetails.push({
        category: this.getLocalizedText('scoring.activity_level', languageCode, 'Activity Level'),
        score: score,
        weight: weight,
        explanation: this.getLocalizedText(
          'scoring.energy_level_explanation', 
          languageCode, 
          `Energy level ${breedActivity}/10`
        ).replace('{{level}}', breedActivity)
      });
    }

    // Size preference
    if (userResponses.size_preference) {
      const weight = this.weightingCriteria.size_preference;
      maxPossibleScore += weight * 10;
      let score = 0;

      if (userResponses.size_preference === breed.size_category) {
        score = 10;
      } else if (this.isSizeCompatible(userResponses.size_preference, breed.size_category)) {
        score = 6;
      } else {
        score = 2;
      }

      totalScore += score * weight;
      scoringDetails.push({
        category: this.getLocalizedText('scoring.size_preference', languageCode, 'Size Preference'),
        score: score,
        weight: weight,
        explanation: this.getLocalizedText(
          `size.${breed.size_category}`, 
          languageCode, 
          breed.size_category
        ) + ` (${breed.weight_range})`
      });
    }

    // Experience level
    if (userResponses.experience_level) {
      const weight = this.weightingCriteria.experience_level;
      maxPossibleScore += weight * 10;
      const userExperience = this.mapExperienceLevel(userResponses.experience_level);
      const breedDifficulty = breed.training_difficulty;
      let score = 0;

      if (userExperience >= breedDifficulty) {
        score = 10;
      } else {
        const gap = breedDifficulty - userExperience;
        score = Math.max(2, 10 - gap * 2);
      }

      totalScore += score * weight;
      scoringDetails.push({
        category: this.getLocalizedText('scoring.experience_match', languageCode, 'Experience Match'),
        score: score,
        weight: weight,
        explanation: this.getLocalizedText(
          'scoring.training_difficulty_explanation',
          languageCode,
          `Training difficulty ${breedDifficulty}/10`
        ).replace('{{difficulty}}', breedDifficulty)
      });
    }

    // Children in home
    if (userResponses.children_in_home) {
      const weight = this.weightingCriteria.children_in_home;
      maxPossibleScore += weight * 10;
      let score = 0;

      if (userResponses.children_in_home === 'yes') {
        score = breed.friendliness_kids || breed.good_with_children || 5;
      } else {
        score = 8; // Less critical if no children
      }

      totalScore += score * weight;
      scoringDetails.push({
        category: this.getLocalizedText('scoring.child_friendliness', languageCode, 'Child Friendliness'),
        score: score,
        weight: weight,
        explanation: this.getLocalizedText(
          'scoring.kid_friendly_rating',
          languageCode,
          `Kid-friendly rating ${score}/10`
        ).replace('{{rating}}', score)
      });
    }

    // Calculate final percentage score
    const finalScore = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

    return {
      score: Math.round(finalScore),
      details: scoringDetails,
      breakdown: {
        totalScore: Math.round(totalScore),
        maxScore: Math.round(maxPossibleScore),
        percentage: Math.round(finalScore)
      }
    };
  }

  /**
   * Helper methods for scoring calculations
   */
  mapActivityLevel(level) {
    const mapping = {
      'low': 2,
      'moderate': 5,
      'high': 8,
      'very_high': 10
    };
    return mapping[level] || 5;
  }

  mapExperienceLevel(level) {
    const mapping = {
      'first_time': 2,
      'some_experience': 5,
      'experienced': 8,
      'expert': 10
    };
    return mapping[level] || 5;
  }

  isSizeCompatible(preferred, actual) {
    const sizeOrder = ['small', 'medium', 'large', 'giant'];
    const prefIndex = sizeOrder.indexOf(preferred);
    const actualIndex = sizeOrder.indexOf(actual);
    return Math.abs(prefIndex - actualIndex) <= 1;
  }

  /**
   * Generate health warnings for a breed with localized text
   */
  generateHealthWarnings(breed, languageCode = 'en') {
    const warnings = [];

    if (breed.localizedHealthConcerns && breed.localizedHealthConcerns.length > 0) {
      warnings.push({
        type: 'health_conditions',
        severity: 'moderate',
        message: this.getLocalizedText(
          'warning.common_health_concerns',
          languageCode,
          `Common health concerns include: ${breed.localizedHealthConcerns.join(', ')}`
        ),
        recommendation: this.getLocalizedText(
          'warning.regular_checkups',
          languageCode,
          'Regular veterinary checkups and health screening are recommended.'
        )
      });
    }

    if (breed.lifespan_max && breed.lifespan_max < 10) {
      warnings.push({
        type: 'lifespan',
        severity: 'high',
        message: this.getLocalizedText(
          'warning.shorter_lifespan',
          languageCode,
          `This breed has a shorter lifespan (${breed.lifespan_min}-${breed.lifespan_max} years)`
        ),
        recommendation: this.getLocalizedText(
          'warning.health_commitment',
          languageCode,
          'Consider the emotional and financial commitment of potential health issues.'
        )
      });
    }

    return warnings;
  }

  /**
   * Generate detailed explanation for why a breed matches with localized text
   */
  generateMatchExplanation(breed, userResponses, scoreDetails, languageCode = 'en') {
    const strengths = scoreDetails.details
      .filter(detail => detail.score >= 7)
      .map(detail => detail.explanation);

    const considerations = scoreDetails.details
      .filter(detail => detail.score < 7 && detail.score >= 4)
      .map(detail => `${detail.category}: ${detail.explanation}`);

    const challenges = scoreDetails.details
      .filter(detail => detail.score < 4)
      .map(detail => `${detail.category}: ${detail.explanation}`);

    return {
      strengths,
      considerations,
      challenges,
      summary: this.generateSummary(breed, scoreDetails.score, languageCode)
    };
  }

  generateSummary(breed, score, languageCode = 'en') {
    const breedName = breed.localizedName || breed.name;
    
    if (score >= 80) {
      return this.getLocalizedText(
        'summary.excellent_match',
        languageCode,
        `${breedName} is an excellent match for your lifestyle! This breed aligns well with most of your preferences and requirements.`
      ).replace('{{breedName}}', breedName);
    } else if (score >= 60) {
      return this.getLocalizedText(
        'summary.good_match',
        languageCode,
        `${breedName} is a good match with some considerations. This breed meets many of your needs but may require some adjustments.`
      ).replace('{{breedName}}', breedName);
    } else if (score >= 40) {
      return this.getLocalizedText(
        'summary.moderate_match',
        languageCode,
        `${breedName} is a moderate match. While this breed has some appealing qualities, there are several factors to carefully consider.`
      ).replace('{{breedName}}', breedName);
    } else {
      return this.getLocalizedText(
        'summary.challenging_match',
        languageCode,
        `${breedName} presents some challenges for your situation. This breed may require significant lifestyle adjustments.`
      ).replace('{{breedName}}', breedName);
    }
  }

  /**
   * Main recommendation function with localization support
   */
  async getRecommendations(userResponses, languageCode = 'en') {
    try {
      // Load breeds if not already loaded or if language changed
      if (this.breeds.length === 0) {
        await this.loadBreeds(languageCode);
      }

      if (this.breeds.length === 0) {
        throw new Error('No dog breeds available in database');
      }

      // Calculate scores for all breeds
      const breedScores = this.breeds.map(breed => {
        const scoreData = this.calculateBreedScore(breed, userResponses, languageCode);
        return {
          breed,
          score: scoreData.score,
          scoreDetails: scoreData,
          healthWarnings: this.generateHealthWarnings(breed, languageCode),
          matchExplanation: this.generateMatchExplanation(breed, userResponses, scoreData, languageCode)
        };
      });

      // Sort by score descending
      breedScores.sort((a, b) => b.score - a.score);

      // Return top 3 recommendations
      const topRecommendations = breedScores.slice(0, 3);

      return {
        success: true,
        recommendations: topRecommendations,
        metadata: {
          totalBreeds: this.breeds.length,
          averageScore: Math.round(
            breedScores.reduce((sum, item) => sum + item.score, 0) / breedScores.length
          ),
          processingTime: Date.now(),
          userResponses: Object.keys(userResponses).length,
          language: languageCode
        }
      };
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return {
        success: false,
        error: error.message,
        recommendations: []
      };
    }
  }

  /**
   * Refresh breeds data for new language
   */
  async refreshForLanguage(languageCode) {
    this.breeds = [];
    await this.loadBreeds(languageCode);
  }
}

// Export singleton instance
export const breedRecommendationEngine = new BreedRecommendationEngine();

// Export the class for testing
export default BreedRecommendationEngine;