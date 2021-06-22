import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

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

import Home from './pages/Home/Home';
import Event from './pages/Event/Event';
import Young from './pages/Young/Young';
import Chapter from './pages/Chapter/Chapter';
import Activist from './pages/Activist/Activits';
import OneSignal, { useOneSignalSetup } from 'react-onesignal';

const oneSignalAppId = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'afa55ec4-2681-41d4-8927-1caf2aabd5d7' : '0207a79f-f4d6-4593-8f30-969b8719e41b';
const safariWebId = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? undefined : 'web.onesignal.auto.35f9fdf2-e602-4832-95b7-1c199bdb2bd7';
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

OneSignal.initialize(oneSignalAppId, {
  allowLocalhostAsSecureOrigin: allowLocalhost,
  notifyButton: {
    enable: false,
  },
  safari_web_id: safariWebId,
});

const App: React.FC = () => {

  useOneSignalSetup(async () => {
    if (OneSignal.isPushNotificationsSupported()) {
      const isPushEnabled = await OneSignal.isPushNotificationsEnabled()
      if (!isPushEnabled) {
        await OneSignal.registerForPushNotifications();
      }
    }
  });

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
