import { EventModel, EventStateModel } from "../../models/event.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { supabase } from '../../supabase';

const initialState: EventStateModel = {
    items: [],
    status: 'idle',
    error: null
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const response = await supabase.from<EventModel>('events').select('*').eq('show', true).order('date', { ascending: true });
    return response.data as EventModel[];
});

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchEvents.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.items = [];
                state.error = action.error;
                state.status = 'idle';
            })
    }
});

export default eventsSlice.reducer;