import { IonSplitPane, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, useLocation, useRouteMatch } from 'react-router-dom';

import Menu from "../components/Menu";
import Activist from "./Activist/Activits";
import Certificates from "./Certificates/Certificates";
import Chapter from "./Chapter/Chapter";
import Home from "./Home/Home";
import Event from "./Event/Event";
import Admin from "./Admin/Admin";
import AdminMenu from "../components/Admin/AdminMenu";
import { ADMIN_DASHBOARD_BASE_PATH } from "../constants";
import { useAuth } from "../contexts/Auth";
import { AuthContextModel } from "../models/auth.model";
import AdminLogin from "./Admin/AdminLogin";
import PrivateRoute from "./Admin/PrivateRoute";

const AdminRouter = () => {
    const match = useRouteMatch();

    return (
        <IonRouterOutlet>
            <Route path={`${match.path}/login`} exact component={AdminLogin} />
            <PrivateRoute path={`${match.path}/dashboard`} exact>
                <Admin />
            </PrivateRoute>
            <Route render={() => <Redirect to={`${match.path}/dashboard`} />} />
        </IonRouterOutlet>
    );
};

const Routes = () => {
    const location = useLocation();
    const { user } = useAuth() as AuthContextModel;

    return (
        <IonSplitPane contentId="main">
            {location.pathname.startsWith(ADMIN_DASHBOARD_BASE_PATH)
                ? (user ? <AdminMenu /> : null)
                : <Menu />
            }
            <IonRouterOutlet id="main">
                <Route exact path="/home" component={Home} />
                <Route exact path="/chapter" component={Chapter} />
                <Route exact path="/activist" component={Activist} />
                <Route exact path="/certificates" component={Certificates} />
                {/* redirect to home if going only to /event path */}
                <Route exact path="/event" render={() => <Redirect to="/home" />} />
                {/* handle event tabs */}
                <Route path="/event/:id" render={(props) => <Event {...props} />} />
                {/* fallback route */}
                <Route path={ADMIN_DASHBOARD_BASE_PATH} component={AdminRouter} />
                <Route render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
        </IonSplitPane>
    );
};

export default Routes;