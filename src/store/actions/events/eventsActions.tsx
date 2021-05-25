import { EventModel } from "../../../models/event.model";
import { supabase } from '../../../supabase';
import { PostgrestResponse } from '@supabase/postgrest-js/src/lib/types';

const getEvents = async () => {
    return supabase.from<EventModel>('events').select('*').order('date', { ascending: true })
        .then(handleErrors)
        .then(data => data);
}

export function fetchEvents() {
    return (dispatch: any) => {
        dispatch(fetchEventsBegin());
        return getEvents()
            .then(response => {
                dispatch(fetchEventsSuccess(response.data as EventModel[]));
                return response.data;
            })
            .catch(error =>
                dispatch(fetchEventsFailure(error))
            );
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response: PostgrestResponse<EventModel>) {
    if (response.status !== 200) {
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
