import { combineReducers } from "redux";
import eventsReducer from "./events/eventsReducer";
import loginReducer from "./login/loginReducer";

export default combineReducers({
    events: eventsReducer,
    login: loginReducer,
});
