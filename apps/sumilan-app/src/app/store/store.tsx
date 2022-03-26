import { configureStore } from '@reduxjs/toolkit';

import activistReducer from "./activist/activistSlice";
import eventsReducer from "./events/eventsSlice";

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        activistRequest: activistReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch