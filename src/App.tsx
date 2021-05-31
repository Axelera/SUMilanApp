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
import Start from './pages/Start/Start';
import { useAuth } from './contexts/Auth';
import Activist from './pages/Activist/Activits';

const App: React.FC = () => {

  const { user } = useAuth();

  const startRouter = (
    <>
      <Route path="/*">
        <Redirect to="/start" />
      </Route>
      <Route path="/start" exact={true} component={Start} />
    </>
  );

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
        {user ? homeRouter : startRouter}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
