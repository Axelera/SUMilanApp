import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOADING } from "../../actions/login/loginActions";

const initialState = {
    isLoading: true,
    isLoggedIn: false,
};

const loginReducer = (
    state = initialState,
    action: { type: string, payload: { isLoggedIn: boolean } }
) => {
    switch (action.type) {
        case LOADING:
            return {
                isLoading: true,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn: true,
            };
        case LOGIN_FAIL:
            return {
                isLoading: false,
                isLoggedIn: false,
            };
        case LOGOUT:
            return {
                isLoading: false,
                isLoggedIn: false,
            };
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
};

export default loginReducer;