import { EventModel, EventStateModel } from "../../../models/event.model";
import {
    FETCH_EVENTS_BEGIN,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_FAILURE,
} from "../../actions/events/eventsActions";

const initialState: EventStateModel = {
    items: [],
    loading: false,
    error: null
};

const eventsReducer = (
    state = initialState,
    action: { type: string; payload: { events: EventModel[], error: any } }
) => {
    switch (action.type) {
        case FETCH_EVENTS_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_EVENTS_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            return {
                ...state,
                loading: false,
                items: action.payload.events
            };

        case FETCH_EVENTS_FAILURE:
            // The request failed, but it did stop, so set loading to "false".
            // Save the error, and we can display it somewhere
            // Since it failed, we don't have items to display anymore, so set it empty.
            // This is up to you and your app though: maybe you want to keep the items
            // around! Do whatever seems right.
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
};

export default eventsReducer;