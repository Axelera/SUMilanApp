import { isLoggedIn, login } from "../../../services/login/login";

export const getLoginState = () => {
    return async (dispatch: any) => {
        dispatch(setLoading());
        const isLogged = await isLoggedIn();
        if (isLogged) {
            dispatch(setLogin());
        } else {
            dispatch(setLogout());
        }
    }
};

export const performLogin = () => {
    return async (dispatch: any) => {
        const isLogged = await login();
        if (isLogged) {
            dispatch(setLogin());
        } else {
            dispatch(setLogout());
        }
    }
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const LOADING = "LOADING";

export const setLoading = () => {
    return {type: LOADING};
};

export const setLogin = () => {
    return {type: LOGIN_SUCCESS};
};

export const setLogout = () => {
    return {type: LOGOUT};
};
