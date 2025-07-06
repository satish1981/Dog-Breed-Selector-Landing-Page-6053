import supabase from '../lib/supabase';

/**
 * Dog Breed Recommendation Engine
 * Analyzes user survey responses and matches them with dog breeds
 */
class DogBreedRecommendationEngine {
  constructor() {
    this.breeds = [];
    this.matchingCriteria = [];
    this.weightings = {
      living_space: 0.9,
      activity_level: 0.9,
      experience_level: 0.7,
      children_in_home: 0.8,
      grooming_commitment: 0.6,
      size_preference: 0.7,
      climate: 0.6,
      budget: 0.5,
      time_commitment: 0.8,
      training_importance: 0.6
    };
  }

  /**
   * Initialize the engine by loading breed data from Supabase
   */
  async initialize() {
    try {
      // Load all dog breeds
      const { data: breeds, error: breedsError } = await supabase
        .from('dog_breeds_rec8k4x9')
        .select('*');

      if (breedsError) throw breedsError;

      // Load matching criteria
      const { data: criteria, error: criteriaError } = await supabase
        .from('breed_matching_criteria_rec8k4x9')
        .select('*, breed_id');

      if (criteriaError) throw criteriaError;

      this.breeds = breeds || [];
      this.matchingCriteria = criteria || [];
      
      return true;
    } catch (error) {
      console.error('Failed to initialize recommendation engine:', error);
      return false;
    }
  }

  /**
   * Calculate breed match score based on user responses
   */
  calculateBreedScore(breed, userResponses) {
    let totalScore = 0;
    let totalWeight = 0;
    const matchReasons = [];
    const concerns = [];

    // Base compatibility scoring
    const compatibility = this.calculateBaseCompatibility(breed, userResponses);
    totalScore += compatibility.score;
    totalWeight += 1;
    matchReasons.push(...compatibility.reasons);
    concerns.push(...compatibility.concerns);

    // Criteria-based scoring
    const criteriaMatches = this.matchingCriteria.filter(
      criteria => criteria.breed_id === breed.id
    );

    criteriaMatches.forEach(criteria => {
      const userAnswer = userResponses[criteria.question_id];
      const weight = this.weightings[criteria.question_id] || 0.5;

      if (userAnswer === criteria.answer_value) {
        const scoreContribution = criteria.score_impact * weight;
        totalScore += scoreContribution;
        totalWeight += weight;

        if (criteria.score_impact > 5) {
          matchReasons.push(this.getMatchReason(criteria.question_id, criteria.answer_value, breed));
        }
      }
    });

    // Normalize score to 0-100 range
    const normalizedScore = Math.max(0, Math.min(100, 
      totalWeight > 0 ? (totalScore / totalWeight) * 10 + 50 : 50
    ));

    return {
      score: Math.round(normalizedScore),
      reasons: matchReasons.slice(0, 3), // Top 3 reasons
      concerns: concerns.slice(0, 2), // Top 2 concerns
      breed: breed
    };
  }

  /**
   * Calculate base compatibility between breed and user preferences
   */
  calculateBaseCompatibility(breed, userResponses) {
    const reasons = [];
    const concerns = [];
    let score = 0;

    // Living space compatibility
    const livingSpace = userResponses.living_space;
    if (livingSpace === 'apartment' && breed.living_space.apartment >= 8) {
      score += 8;
      reasons.push(`Perfect for apartment living with ${breed.living_space.apartment}/10 apartment suitability`);
    } else if (livingSpace === 'house_with_yard' && breed.living_space.yard >= 8) {
      score += 8;
      reasons.push(`Thrives in homes with yards with ${breed.living_space.yard}/10 yard suitability`);
    }

    // Activity level matching
    const activityLevel = userResponses.activity_level;
    const energyMatch = this.getEnergyLevelMatch(activityLevel, breed.energy_level);
    score += energyMatch.score;
    if (energyMatch.reason) reasons.push(energyMatch.reason);
    if (energyMatch.concern) concerns.push(energyMatch.concern);

    // Children compatibility
    if (userResponses.children_in_home === 'yes' && breed.good_with_children >= 8) {
      score += 6;
      reasons.push(`Excellent with children (${breed.good_with_children}/10 child-friendliness)`);
    }

    // Size preference
    const sizePreference = userResponses.size_preference;
    if (sizePreference && sizePreference === breed.size_category) {
      score += 5;
      reasons.push(`Matches your ${breed.size_category} size preference`);
    }

    // Climate compatibility
    const climate = userResponses.climate;
    if (climate && breed.climate_adaptation[climate] >= 7) {
      score += 4;
      reasons.push(`Well-adapted to ${climate} climate (${breed.climate_adaptation[climate]}/10)`);
    } else if (climate && breed.climate_adaptation[climate] <= 3) {
      concerns.push(`May struggle in ${climate} climate (${breed.climate_adaptation[climate]}/10 adaptation)`);
    }

    // Grooming commitment
    const groomingCommitment = userResponses.grooming_commitment;
    if (groomingCommitment === 'low' && breed.grooming_needs <= 4) {
      score += 3;
      reasons.push(`Low grooming needs (${breed.grooming_needs}/10)`);
    } else if (groomingCommitment === 'high' && breed.grooming_needs >= 7) {
      score += 3;
      reasons.push(`Enjoys regular grooming (${breed.grooming_needs}/10)`);
    }

    // Training difficulty for first-time owners
    if (userResponses.experience_level === 'first_time' && breed.trainability >= 8) {
      score += 4;
      reasons.push(`Easy to train for beginners (${breed.trainability}/10 trainability)`);
    }

    return { score, reasons, concerns };
  }

  /**
   * Get energy level match assessment
   */
  getEnergyLevelMatch(userActivity, breedEnergy) {
    const userEnergyMap = {
      'low': 2,
      'moderate': 5,
      'high': 8,
      'very_high': 10
    };

    const userEnergyLevel = userEnergyMap[userActivity] || 5;
    const difference = Math.abs(userEnergyLevel - breedEnergy);

    if (difference <= 1) {
      return {
        score: 8,
        reason: `Perfect energy match - both ${userActivity} activity level`
      };
    } else if (difference <= 2) {
      return {
        score: 5,
        reason: `Good energy compatibility`
      };
    } else if (difference >= 4) {
      return {
        score: -3,
        concern: `Energy mismatch - breed needs ${breedEnergy}/10 activity, you prefer ${userActivity}`
      };
    }

    return { score: 2 };
  }

  /**
   * Get human-readable match reason
   */
  getMatchReason(questionId, answer, breed) {
    const reasons = {
      living_space: {
        apartment: `Ideal for apartment living`,
        house_with_yard: `Perfect for homes with yards`
      },
      activity_level: {
        high: `Matches your active lifestyle`,
        low: `Perfect for a relaxed lifestyle`
      },
      experience_level: {
        first_time: `Great for first-time dog owners`,
        experienced: `Suitable for experienced handlers`
      },
      children_in_home: {
        yes: `Excellent family dog, great with children`
      },
      grooming_commitment: {
        low: `Minimal grooming requirements`,
        high: `Enjoys regular grooming sessions`
      }
    };

    return reasons[questionId]?.[answer] || `Good match for ${questionId}: ${answer}`;
  }

  /**
   * Get breed-specific health warnings
   */
  getHealthWarnings(breed) {
    const warnings = [];
    
    if (breed.health_concerns && Array.isArray(breed.health_concerns)) {
      breed.health_concerns.forEach(concern => {
        warnings.push({
          type: 'health',
          message: `Prone to ${concern} - regular vet checkups recommended`,
          severity: 'medium'
        });
      });
    }

    // Climate-specific warnings
    Object.entries(breed.climate_adaptation).forEach(([climate, rating]) => {
      if (rating <= 3) {
        warnings.push({
          type: 'climate',
          message: `Not suitable for ${climate} climates - may require special care`,
          severity: 'high'
        });
      }
    });

    // Exercise warnings
    if (breed.exercise_needs >= 8) {
      warnings.push({
        type: 'exercise',
        message: `High exercise needs - requires daily vigorous activity`,
        severity: 'medium'
      });
    }

    // Special needs warnings
    if (breed.special_needs && Array.isArray(breed.special_needs)) {
      breed.special_needs.forEach(need => {
        warnings.push({
          type: 'special_care',
          message: `Requires ${need}`,
          severity: 'medium'
        });
      });
    }

    return warnings;
  }

  /**
   * Generate detailed breed explanation
   */
  generateBreedExplanation(matchResult, language = 'en') {
    const { breed, score, reasons, concerns } = matchResult;
    
    const explanation = {
      matchScore: score,
      summary: language === 'hi' ? breed.description_hi : breed.description,
      whyGoodMatch: reasons,
      potentialConcerns: concerns,
      keyTraits: {
        energy: `${breed.energy_level}/10`,
        trainability: `${breed.trainability}/10`,
        childFriendly: `${breed.good_with_children}/10`,
        groomingNeeds: `${breed.grooming_needs}/10`,
        size: breed.size_category,
        lifespan: breed.lifespan_years,
        weight: breed.weight_range
      },
      healthWarnings: this.getHealthWarnings(breed),
      careRequirements: breed.special_needs || [],
      temperament: breed.temperament || []
    };

    return explanation;
  }

  /**
   * Main recommendation function
   */
  async getRecommendations(userResponses, language = 'en') {
    try {
      // Initialize if not already done
      if (this.breeds.length === 0) {
        const initialized = await this.initialize();
        if (!initialized) {
          throw new Error('Failed to initialize recommendation engine');
        }
      }

      // Calculate scores for all breeds
      const breedScores = this.breeds.map(breed => 
        this.calculateBreedScore(breed, userResponses)
      );

      // Sort by score and get top 3
      const topBreeds = breedScores
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      // Generate detailed explanations
      const recommendations = topBreeds.map(matchResult => ({
        breed: matchResult.breed,
        explanation: this.generateBreedExplanation(matchResult, language),
        matchScore: matchResult.score,
        image: matchResult.breed.image_url
      }));

      return {
        success: true,
        recommendations,
        totalBreedsEvaluated: this.breeds.length,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Recommendation engine error:', error);
      return {
        success: false,
        error: error.message,
        recommendations: []
      };
    }
  }

  /**
   * Get breed details by ID
   */
  async getBreedDetails(breedId, language = 'en') {
    try {
      const { data: breed, error } = await supabase
        .from('dog_breeds_rec8k4x9')
        .select('*')
        .eq('id', breedId)
        .single();

      if (error) throw error;

      return {
        success: true,
        breed: {
          ...breed,
          healthWarnings: this.getHealthWarnings(breed),
          displayName: language === 'hi' ? breed.name_hi : breed.name,
          description: language === 'hi' ? breed.description_hi : breed.description
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export singleton instance
export const recommendationEngine = new DogBreedRecommendationEngine();

// Export convenience function for React components
export const getBreedRecommendations = async (userResponses, language = 'en') => {
  return await recommendationEngine.getRecommendations(userResponses, language);
};

export const getBreedDetails = async (breedId, language = 'en') => {
  return await recommendationEngine.getBreedDetails(breedId, language);
};

export default recommendationEngine;