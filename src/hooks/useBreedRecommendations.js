import { useState, useCallback } from 'react';
import { breedRecommendationEngine } from '../services/breedRecommendationEngine';

/**
 * React hook for breed recommendations
 */
export const useBreedRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const generateRecommendations = useCallback(async (userResponses) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await breedRecommendationEngine.getRecommendations(userResponses);
      
      if (result.success) {
        setRecommendations(result.recommendations);
        setMetadata(result.metadata);
      } else {
        setError(result.error);
        setRecommendations([]);
      }
      
    } catch (err) {
      setError(err.message);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearRecommendations = useCallback(() => {
    setRecommendations([]);
    setError(null);
    setMetadata(null);
  }, []);

  return {
    recommendations,
    loading,
    error,
    metadata,
    generateRecommendations,
    clearRecommendations
  };
};