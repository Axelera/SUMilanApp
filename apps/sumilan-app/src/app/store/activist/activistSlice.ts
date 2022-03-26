import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DateTime } from 'luxon';

import { ActivistRequestState, AskedActivistRequest } from "../../models/activist-request.model";
import * as storage from '../../services/storage/storage';

const initialState: ActivistRequestState = {
    askedRequest: null,
    status: 'loading',
};

export const loadActivistRequest = createAsyncThunk('activist/loadActivistRequest', async () => {
    const request = await storage.getObject<AskedActivistRequest>('enroll-activist-asked');
    return request;
});

export const storeActivistRequest = createAsyncThunk('activist/storeActivistRequest', async (accepted: boolean) => {
    const saveAskedRequest: AskedActivistRequest = {
        askedAt: DateTime.now().toISO(),
        accepted
    };
    await storage.setObject('enroll-activist-asked', saveAskedRequest);
    return saveAskedRequest;
});

const activistSlice = createSlice({
    name: 'activist',
    initialState,
    reducers: {
        setAskedRequest(state, action) {
            state.askedRequest = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadActivistRequest.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(loadActivistRequest.fulfilled, (state, action) => {
                state.askedRequest = action.payload;
                state.status = 'idle';
            })
            .addCase(storeActivistRequest.fulfilled, (state, action) => {
                state.askedRequest = action.payload;
            })
    }
});

export const {setAskedRequest} = activistSlice.actions;
export default activistSlice.reducer;