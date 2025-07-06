import { useState, useEffect, useContext, createContext } from 'react';
import supabase from '../lib/supabase';

// Create localization context
const LocalizationContext = createContext();

// Localization provider component
export const LocalizationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Supported languages configuration
  const supportedLanguages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' }
  ];

  // Load translations from Supabase
  const loadTranslations = async (language = currentLanguage) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('locales_i18n_x7k9')
        .select('*')
        .eq('language_code', language);

      if (fetchError) throw fetchError;

      // Transform array to key-value object for easy lookup
      const translationMap = {};
      data.forEach(item => {
        translationMap[item.translation_key] = item.translation_value;
      });

      setTranslations(prev => ({
        ...prev,
        [language]: translationMap
      }));

    } catch (err) {
      console.error('Error loading translations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initialize translations for default language
  useEffect(() => {
    loadTranslations(currentLanguage);
  }, []);

  // Change language function
  const changeLanguage = async (languageCode) => {
    if (languageCode === currentLanguage) return;

    // Load translations if not already cached
    if (!translations[languageCode]) {
      await loadTranslations(languageCode);
    }

    setCurrentLanguage(languageCode);
    
    // Store preference in localStorage
    localStorage.setItem('preferredLanguage', languageCode);
  };

  // Get translation function
  const t = (key, fallback = key) => {
    const currentTranslations = translations[currentLanguage] || {};
    return currentTranslations[key] || fallback;
  };

  // Get translation with interpolation support
  const translate = (key, params = {}, fallback = key) => {
    let translation = t(key, fallback);
    
    // Simple interpolation for parameters like {{name}}
    Object.keys(params).forEach(param => {
      const regex = new RegExp(`{{${param}}}`, 'g');
      translation = translation.replace(regex, params[param]);
    });

    return translation;
  };

  // Load user's preferred language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && supportedLanguages.some(lang => lang.code === savedLanguage)) {
      changeLanguage(savedLanguage);
    }
  }, []);

  const value = {
    currentLanguage,
    supportedLanguages,
    translations,
    loading,
    error,
    changeLanguage,
    t,
    translate,
    loadTranslations
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Custom hook to use localization
export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

// HOC for components that need translations
export const withLocalization = (Component) => {
  return function LocalizedComponent(props) {
    const localization = useLocalization();
    return <Component {...props} {...localization} />;
  };
};