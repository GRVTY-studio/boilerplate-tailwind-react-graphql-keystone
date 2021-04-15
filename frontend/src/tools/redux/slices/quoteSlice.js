import { createSlice } from '@reduxjs/toolkit';
import idEntityAdapter from '../entityAdapters/idEntityAdapter';
import {
    addQuoteThunk,
    getQuotesThunk,
    updateProjectsThunk,
    updateQuoteThunk,
} from '../thunks/quoteThunks';

import {
    clearErrorsReducer,
    initiateEntityCreationReducer,
    initiateLoadingReducer,
    setErrorReducer,
    setEntityCreationErrorReducer,
    idAdapterClearReducer,
} from '../reducers';
import { loadingTransform } from '../../utilities/transforms';
import { getUserConfigThunk, logoutThunk } from '../thunks/authThunks';

const addQuotesReducer = (state, action) => {
    if (action.payload.quotes) {
        idEntityAdapter.upsertMany(state, action.payload.quotes);
    }
    state.loading = loadingTransform.idle;
    state.error = false;
    state.creating = loadingTransform.idle;
};

export const quotesSlice = createSlice({
    name: 'quotes',
    initialState: idEntityAdapter.getInitialState({
        loading: loadingTransform.idle,
        creating: loadingTransform.idle,
    }),
    reducers: {
        clearErrors: clearErrorsReducer,
    },
    extraReducers: (builder) => {
        builder.addCase(getQuotesThunk.pending, initiateLoadingReducer);
        builder.addCase(getQuotesThunk.rejected, setErrorReducer);
        builder.addCase(getQuotesThunk.fulfilled, addQuotesReducer);

        builder.addCase(addQuoteThunk.pending, initiateEntityCreationReducer);
        builder.addCase(addQuoteThunk.rejected, setEntityCreationErrorReducer);
        builder.addCase(addQuoteThunk.fulfilled, addQuotesReducer);

        builder.addCase(
            updateQuoteThunk.pending,
            initiateEntityCreationReducer,
        );
        builder.addCase(
            updateQuoteThunk.rejected,
            setEntityCreationErrorReducer,
        );
        builder.addCase(updateQuoteThunk.fulfilled, addQuotesReducer);

        builder.addCase(
            updateProjectsThunk.pending,
            initiateEntityCreationReducer,
        );
        builder.addCase(
            updateProjectsThunk.rejected,
            setEntityCreationErrorReducer,
        );
        builder.addCase(updateProjectsThunk.fulfilled, addQuotesReducer);

        builder.addCase(getUserConfigThunk.pending, initiateLoadingReducer);
        builder.addCase(getUserConfigThunk.rejected, idAdapterClearReducer);
        builder.addCase(getUserConfigThunk.fulfilled, addQuotesReducer);

        builder.addCase(logoutThunk.fulfilled, idAdapterClearReducer);
    },
});

const { reducer: quotesReducer } = quotesSlice;
export default quotesReducer;
