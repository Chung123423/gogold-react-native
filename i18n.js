// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { AppState } from 'react-native'; // Add this for change detection

// Define available languages and fallback
const languages = ['en', 'fr', 'es']; // Add your supported languages
const fallback = { language: 'en' };

// Load translation resources (JSON files for each language)
const resources = {
  en: { 
    translation: { 
      fifteenMinsGold2Cash: 'Turn your gold into cash in just 15 minutes'
    } 
  },
  zh: {
    translation: {
      fifteenMinsGold2Cash: '只需15分鐘 讓你的黃金變現金'
    }
  },
  fr: { translation: { welcome: 'Bienvenue !', goodbye: 'Au revoir !' } },
  es: { translation: { welcome: '¡Bienvenido!', goodbye: '¡Adiós!' } },
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.getLocales()[0].languageCode, // Detect device language initially
    fallbackLng: 'en',
    interpolation: { escapeValue: false }, // React already escapes
  });

// Function to update language on locale change
const updateLanguage = () => {
  const newLang = Localization.getLocales()[0].languageCode;
  if (languages.includes(newLang)) {
    i18n.changeLanguage(newLang);
  }
};

// Set up AppState listener for runtime changes (Android-focused)
let subscription;
if (typeof AppState !== 'undefined') { // Safety for web/non-RN envs
  subscription = AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'active') {
      updateLanguage(); // Poll and update when app resumes
    }
  });
}

// Cleanup on app unmount (optional, but good practice)
const cleanup = () => {
  if (subscription) {
    subscription.remove();
  }
};

// Export i18n and cleanup
export { i18n, cleanup };
export default i18n;