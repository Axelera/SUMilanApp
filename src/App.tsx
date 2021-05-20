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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getLoginState } from './store/actions/login/loginActions';

const App: React.FC = () => {

  const { isLoggedIn, isLoading } = useSelector<{ login: { isLoggedIn: boolean, isLoading: boolean } }, { isLoggedIn: boolean, isLoading: boolean }>((state) => state.login);
  const dispatch = useDispatch();

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
        <Route path="/home" exact={true} component={Home} />
        <Route path="/young" exact={true} component={Young} />
        <Route path="/chapter" exact={true} component={Chapter} />
        <Route path="/event/:id/" component={Event} />
      </IonRouterOutlet>
    </IonSplitPane>
  );

  useEffect(() => {
    dispatch(getLoginState());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  return (
    <IonApp>
      <IonReactRouter>
        {isLoggedIn ? homeRouter : startRouter}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
