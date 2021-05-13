import { EventModel } from "../../../models/event.model";

function getEvents() {
    return fetch("https://api.npoint.io/20b69ad2dc9f39ef4c37")
        .then(handleErrors)
        .then(res => res.json());
}

export function fetchEvents() {
    return (dispatch: any) => {
        dispatch(fetchEventsBegin());
        return getEvents()
            .then(json => {
                dispatch(fetchEventsSuccess(json.events));
                return json.events;
            })
            .catch(error =>
                dispatch(fetchEventsFailure(error))
            );
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response: any) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const FETCH_EVENTS_BEGIN = "FETCH_EVENTS_BEGIN";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE";

export const fetchEventsBegin = () => ({
    type: FETCH_EVENTS_BEGIN
});

export const fetchEventsSuccess = (events: EventModel[]) => ({
    type: FETCH_EVENTS_SUCCESS,
    payload: { events }
});

export const fetchEventsFailure = (error: any) => ({
    type: FETCH_EVENTS_FAILURE,
    payload: { error }
});
