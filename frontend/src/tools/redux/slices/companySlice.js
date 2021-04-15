import { createSlice } from '@reduxjs/toolkit';
import idEntityAdapter from '../entityAdapters/idEntityAdapter';

import {
    clearErrorsReducer,
    idAdapterClearReducer,
    initiateEntityCreationReducer,
    initiateLoadingReducer,
    resolveLoadingReducer,
} from '../reducers';
import { loadingTransform } from '../../utilities/transforms';
import {
    addCompanyThunk,
    getCompanyThunk,
    updateCompanyThunk,
} from '../thunks/companyThunks';
import { getUserConfigThunk, logoutThunk } from '../thunks/authThunks';

const addCompaniesReducer = (state, action) => {
    if (action.payload.company) {
        idEntityAdapter.upsertOne(state, action.payload.company);
    }
    state.loading = loadingTransform.idle;
    state.creating = loadingTransform.idle;
    state.error = false;
};

export const companiesSlice = createSlice({
    name: 'companies',
    initialState: idEntityAdapter.getInitialState({
        loading: loadingTransform.idle,
        creating: loadingTransform.idle,
    }),
    reducers: {
        clearErrors: clearErrorsReducer,
    },
    extraReducers: (builder) => {
        builder.addCase(getCompanyThunk.pending, initiateLoadingReducer);
        builder.addCase(getCompanyThunk.rejected, resolveLoadingReducer);
        builder.addCase(getCompanyThunk.fulfilled, addCompaniesReducer);

        builder.addCase(getUserConfigThunk.pending, initiateLoadingReducer);
        builder.addCase(getUserConfigThunk.rejected, idAdapterClearReducer);
        builder.addCase(getUserConfigThunk.fulfilled, addCompaniesReducer);

        builder.addCase(addCompanyThunk.pending, initiateEntityCreationReducer);
        builder.addCase(addCompanyThunk.rejected, (state, action) => {
            state.creating = loadingTransform.idle;
            state.error = action.payload;
        });
        builder.addCase(addCompanyThunk.fulfilled, addCompaniesReducer);

        builder.addCase(
            updateCompanyThunk.pending,
            initiateEntityCreationReducer,
        );
        builder.addCase(updateCompanyThunk.rejected, (state, action) => {
            state.creating = loadingTransform.idle;
            state.error = action.payload;
        });
        builder.addCase(updateCompanyThunk.fulfilled, addCompaniesReducer);

        builder.addCase(logoutThunk.fulfilled, idAdapterClearReducer);
    },
});

const { reducer: companiesReducer } = companiesSlice;
export default companiesReducer;
