import { useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import OneSignal from 'react-onesignal';
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

import Menu from './components/Menu';
import Home from './pages/Home/Home';
import Event from './pages/Event/Event';
import Young from './pages/Young/Young';
import Chapter from './pages/Chapter/Chapter';
import Activist from './pages/Activist/Activits';

import en from './assets/i18n/en.json';
import it from './assets/i18n/it.json';

const oneSignalAppId = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?
  process.env.REACT_APP_ONESIGNAL_DEVELOPMENT_KEY as string
  :
  process.env.REACT_APP_ONESIGNAL_PRODUCTION_KEY as string;
const safariWebId = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?
  undefined
  :
  process.env.REACT_APP_ONESIGNAL_SAFARI_WEB_ID as string;
const allowLocalhost = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

/* RESET OneSignal */
const oneSignalDbReset = window.localStorage.getItem('ONESIGNAL_DB_RESET');
const isDbReset = oneSignalDbReset ? JSON.parse(oneSignalDbReset).value : false;
if (!isDbReset) {
  const res = window.indexedDB.deleteDatabase("ONE_SIGNAL_SDK_DB");
  res.onsuccess = ev => {
    console.log('DELETED ONE_SIGNAL_SDK_DB indexedDB', ev);
    window.localStorage.setItem('ONESIGNAL_DB_RESET', JSON.stringify({ timestamp: new Date().getTime(), value: true }));
  };
  res.onerror = ev => {
    console.log('Error deleting ONE_SIGNAL_SDK_DB indexedDB', ev);
    window.localStorage.setItem('ONESIGNAL_DB_RESET', JSON.stringify({ timestamp: new Date().getTime(), value: false }));
  };
  res.onblocked = ev => {
    console.log('Blocked when deleting ONE_SIGNAL_SDK_DB indexedDB', ev);
    window.localStorage.setItem('ONESIGNAL_DB_RESET', JSON.stringify({ timestamp: new Date().getTime(), value: false }));
  };
}
/* */

const oneSignalConfigurtion = {
  allowLocalhostAsSecureOrigin: allowLocalhost,
  notifyButton: {
    enable: false,
  },
  persistNotification: true,
  autoResubscribe: true,
  autoRegister: true,
  safari_web_id: safariWebId,
};

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

const App: React.FC = () => {

  useEffect(() => {
    OneSignal.initialize(oneSignalAppId, oneSignalConfigurtion);
  }, []);

  const homeRouter = (
    <IonSplitPane contentId="main">
      <Menu />
      <IonRouterOutlet id="main">
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/start" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact={true} component={Home} />
        <Route path="/young" exact={true} component={Young} />
        <Route path="/chapter" exact={true} component={Chapter} />
        <Route path="/activist" exact={true} component={Activist} />
        <Route path="/event/:id/" component={Event} />
      </IonRouterOutlet>
    </IonSplitPane>
  );

  return (
    <IonApp>
      <IonReactRouter>
        {homeRouter}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
