import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import en from '../assets/i18n/en.json';
import it from '../assets/i18n/it.json';
import { getAppVersion } from './utils/version';
import { loadGA } from './libs/ga';
import Routes from './pages/Routes';
import { AuthProvider } from './contexts/Auth';

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      it: {
        translation: it,
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    detection: {
      order: ["navigator"],
    },
  });

console.log('VERSION:', getAppVersion());

loadGA(process.env['NX_GOOGLE_ANALYTICS_ID'] as string);

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
