import { Redirect, Route, RouteProps, useRouteMatch } from "react-router-dom";

import { useAuth } from "../../contexts/Auth";
import { AuthContextModel } from "../../models/auth.model";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const { user } = useAuth() as AuthContextModel;
    const match = useRouteMatch();

    return (
        <Route
            {...rest}
            render={() =>
                user
                    ? children
                    : (
                        <Redirect
                            to={`${match.url}/login`}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;