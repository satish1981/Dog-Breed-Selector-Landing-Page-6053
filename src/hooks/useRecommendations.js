import { useState, useEffect } from 'react';
import { getBreedRecommendations } from '../utils/recommendationEngine';

/**
 * React hook for managing breed recommendations
 */
export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async (userResponses, language = 'en') => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await getBreedRecommendations(userResponses, language);
      
      if (result.success) {
        setRecommendations(result.recommendations);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearRecommendations = () => {
    setRecommendations([]);
    setError(null);
  };

  return {
    recommendations,
    loading,
    error,
    fetchRecommendations,
    clearRecommendations
  };
};

export default useRecommendations;