import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
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
import Certificates from './pages/Certificates/Certificates';

import en from '../assets/i18n/en.json';
import it from '../assets/i18n/it.json';
import { getAppVersion } from './utils/version';
import { loadGA } from './libs/ga';

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
        {/* <Route path="/young" exact={true} component={Young} /> */}
        <Route path="/chapter" exact={true} component={Chapter} />
        <Route path="/activist" exact={true} component={Activist} />
        <Route path="/certificates" exact={true} component={Certificates} />
        <Route path="/event/:id/" render={(props) => <Event {...props} />} />
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
