import { combineReducers } from "redux";
import eventsReducer from "./events/eventsReducer";

export default combineReducers({
    events: eventsReducer
});
