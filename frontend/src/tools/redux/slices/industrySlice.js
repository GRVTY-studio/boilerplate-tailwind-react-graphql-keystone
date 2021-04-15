import { createSlice } from '@reduxjs/toolkit';
import idEntityAdapter from '../entityAdapters/idEntityAdapter';

import {
    clearErrorsReducer,
    initiateLoadingReducer,
    resolveLoadingReducer,
} from '../reducers';
import { loadingTransform } from '../../utilities/transforms';
import { getIndustriesThunk } from '../thunks/companyThunks';

const addIndustryReducer = (state, action) => {
    if (action.payload.industries) {
        idEntityAdapter.upsertMany(state, action.payload.industries);
    }
    state.loading = loadingTransform.idle;
    state.error = false;
};

export const industrySlice = createSlice({
    name: 'industries',
    initialState: idEntityAdapter.getInitialState({
        loading: loadingTransform.idle,
    }),
    reducers: {
        clearErrors: clearErrorsReducer,
    },
    extraReducers: (builder) => {
        builder.addCase(getIndustriesThunk.pending, initiateLoadingReducer);
        builder.addCase(getIndustriesThunk.rejected, resolveLoadingReducer);
        builder.addCase(getIndustriesThunk.fulfilled, addIndustryReducer);
    },
});

const { reducer: industryReducer } = industrySlice;
export default industryReducer;
