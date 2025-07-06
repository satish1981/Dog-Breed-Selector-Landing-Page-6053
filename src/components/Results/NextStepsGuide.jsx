import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiMapPin, FiPhone, FiDollarSign, FiCalendar, FiBookOpen, FiHeart } = FiIcons;

const NextStepsGuide = ({ isDarkMode = false, language = 'en' }) => {
  const steps = [
    {
      icon: FiMapPin,
      title: language === 'hi' ? 'स्थानीय ब्रीडर खोजें' : 'Find Local Breeders',
      description: language === 'hi' 
        ? 'प्रतिष्ठित ब्रीडर या स्थानीय आश्रयों की खोज करें'
        : 'Research reputable breeders or local shelters',
      color: 'from-blue-400 to-blue-600',
      tips: [
        language === 'hi' ? 'ऑनलाइन समीक्षाएं पढ़ें' : 'Read online reviews',
        language === 'hi' ? 'व्यक्तिगत रूप से मिलें' : 'Visit in person',
        language === 'hi' ? 'स्वास्थ्य प्रमाण पत्र मांगें' : 'Ask for health certificates'
      ]
    },
    {
      icon: FiPhone,
      title: language === 'hi' ? 'पशु चिकित्सक से सलाह लें' : 'Consult a Veterinarian',
      description: language === 'hi' 
        ? 'नस्ल-विशिष्ट देखभाल के बारे में जानकारी लें'
        : 'Learn about breed-specific care requirements',
      color: 'from-green-400 to-green-600',
      tips: [
        language === 'hi' ? 'स्वास्थ्य जांच की योजना बनाएं' : 'Plan health checkups',
        language === 'hi' ? 'टीकाकरण कार्यक्रम' : 'Vaccination schedule',
        language === 'hi' ? 'आहार सिफारिशें' : 'Diet recommendations'
      ]
    },
    {
      icon: FiDollarSign,
      title: language === 'hi' ? 'बजट की योजना बनाएं' : 'Budget Planning',
      description: language === 'hi' 
        ? 'कुत्ते की देखभाल की लागत का आकलन करें'
        : 'Estimate the ongoing costs of dog ownership',
      color: 'from-yellow-400 to-yellow-600',
      tips: [
        language === 'hi' ? 'प्रारंभिक लागत' : 'Initial costs',
        language === 'hi' ? 'मासिक खर्च' : 'Monthly expenses',
        language === 'hi' ? 'आपातकालीन फंड' : 'Emergency fund'
      ]
    },
    {
      icon: FiCalendar,
      title: language === 'hi' ? 'समय की योजना बनाएं' : 'Time Planning',
      description: language === 'hi' 
        ? 'दैनिक देखभाल और प्रशिक्षण के लिए समय निकालें'
        : 'Schedule time for daily care and training',
      color: 'from-purple-400 to-purple-600',
      tips: [
        language === 'hi' ? 'दैनिक व्यायाम' : 'Daily exercise',
        language === 'hi' ? 'प्रशिक्षण सत्र' : 'Training sessions',
        language === 'hi' ? 'सामाजिकरण' : 'Socialization'
      ]
    },
    {
      icon: FiBookOpen,
      title: language === 'hi' ? 'शिक्षा और प्रशिक्षण' : 'Education & Training',
      description: language === 'hi' 
        ? 'कुत्ते की देखभाल के बारे में जानकारी प्राप्त करें'
        : 'Learn about dog care and training methods',
      color: 'from-indigo-400 to-indigo-600',
      tips: [
        language === 'hi' ? 'ऑनलाइन कोर्स' : 'Online courses',
        language === 'hi' ? 'प्रशिक्षण कक्षाएं' : 'Training classes',
        language === 'hi' ? 'पुस्तकें और गाइड' : 'Books and guides'
      ]
    },
    {
      icon: FiHeart,
      title: language === 'hi' ? 'घर की तैयारी' : 'Prepare Your Home',
      description: language === 'hi' 
        ? 'अपने घर को कुत्ते के लिए सुरक्षित बनाएं'
        : 'Make your home safe and welcoming for your new pet',
      color: 'from-red-400 to-red-600',
      tips: [
        language === 'hi' ? 'सुरक्षा उपाय' : 'Safety measures',
        language === 'hi' ? 'आवश्यक सामान' : 'Essential supplies',
        language === 'hi' ? 'आरामदायक स्थान' : 'Comfortable space'
      ]
    }
  ];

  return (
    <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {language === 'hi' ? '🚀 अगले कदम' : '🚀 Next Steps'}
        </h3>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {language === 'hi' 
            ? 'अपने नए साथी को घर लाने के लिए तैयार हो जाइए'
            : 'Get ready to bring your new companion home'
          }
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
              isDarkMode 
                ? 'border-gray-700 bg-gray-700/50 hover:bg-gray-700' 
                : 'border-gray-200 bg-gray-50 hover:bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${step.color} text-white shrink-0`}>
                <SafeIcon icon={step.icon} className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {step.title}
                </h4>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {step.description}
                </p>
                <ul className="space-y-1">
                  {step.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className={`text-xs flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="w-1 h-1 bg-current rounded-full" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {language === 'hi' ? 'स्थानीय ब्रीडर खोजें' : 'Find Local Breeders'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-full font-semibold border-2 transition-all duration-300 ${
            isDarkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {language === 'hi' ? 'और जानकारी' : 'Learn More'}
        </motion.button>
      </div>
    </div>
  );
};

export default NextStepsGuide;