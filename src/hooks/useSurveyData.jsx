import { useState, useEffect } from 'react';
import { useLocalization } from './useLocalization';
import supabase from '../lib/supabase';

export const useSurveyData = () => {
  const { currentLanguage, t } = useLocalization();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [currentLanguage]); // Refetch when language changes

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch questions with localized content
      const { data: questionsData, error: questionsError } = await supabase
        .from('survey_questions_db7x9k2m')
        .select('*')
        .order('order_index');

      if (questionsError) throw questionsError;

      // Process questions to include localized text
      const localizedQuestions = await Promise.all(
        questionsData.map(async (question) => {
          // Get localized question text
          const questionTextKey = `survey.question.${question.question_id}.text`;
          const questionText = t(questionTextKey, question.question_text_en);

          // Get localized options if they exist
          let localizedOptions = question.options;
          if (question.options?.options) {
            localizedOptions = {
              ...question.options,
              options: question.options.options.map(option => {
                const optionTextKey = `survey.option.${option.value}.text`;
                return {
                  ...option,
                  label: t(optionTextKey, option.label_en || option.label)
                };
              })
            };
          }

          return {
            ...question,
            question_text: questionText,
            options: localizedOptions
          };
        })
      );

      setQuestions(localizedQuestions || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveResponse = async (sessionId, questionId, response) => {
    try {
      const { error } = await supabase
        .from('survey_responses_db7x9k2m')
        .insert([{
          session_id: sessionId,
          question_id: questionId,
          response: response
        }]);

      if (error) throw error;
    } catch (err) {
      console.error('Error saving response:', err);
      throw err;
    }
  };

  return {
    questions,
    loading,
    error,
    saveResponse,
    refetch: fetchQuestions
  };
};