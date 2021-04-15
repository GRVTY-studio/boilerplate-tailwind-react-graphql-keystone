import { createSlice } from '@reduxjs/toolkit';
import idEntityAdapter from '../entityAdapters/idEntityAdapter';
import {
    addIntegrationThunk,
    getIntegrationsThunk,
    updateIntegrationThunk,
} from '../thunks/integrationThunks';

import {
    clearErrorsReducer,
    idAdapterClearReducer,
    initiateEntityCreationReducer,
    initiateLoadingReducer,
    resolveLoadingReducer,
    setEntityCreationErrorReducer,
} from '../reducers';
import { loadingTransform } from '../../utilities/transforms';
import { getUserConfigThunk, logoutThunk } from '../thunks/authThunks';

const addIntegrationsReducer = (state, action) => {
    if (action.payload.integrations) {
        idEntityAdapter.upsertMany(state, action.payload.integrations);
    }
    state.loading = loadingTransform.idle;
    state.creating = loadingTransform.idle;
    state.error = false;
};

export const integrationSlice = createSlice({
    name: 'quotes',
    initialState: idEntityAdapter.getInitialState({
        loading: loadingTransform.idle,
        showTaskCompleted: true,
    }),
    reducers: {
        clearErrors: clearErrorsReducer,
    },
    extraReducers: (builder) => {
        builder.addCase(getIntegrationsThunk.pending, initiateLoadingReducer);
        builder.addCase(getIntegrationsThunk.rejected, resolveLoadingReducer);
        builder.addCase(getIntegrationsThunk.fulfilled, addIntegrationsReducer);

        builder.addCase(
            addIntegrationThunk.pending,
            initiateEntityCreationReducer,
        );
        builder.addCase(
            addIntegrationThunk.rejected,
            setEntityCreationErrorReducer,
        );
        builder.addCase(addIntegrationThunk.fulfilled, addIntegrationsReducer);

        builder.addCase(
            updateIntegrationThunk.pending,
            initiateEntityCreationReducer,
        );
        builder.addCase(
            updateIntegrationThunk.rejected,
            setEntityCreationErrorReducer,
        );
        builder.addCase(
            updateIntegrationThunk.fulfilled,
            addIntegrationsReducer,
        );

        builder.addCase(getUserConfigThunk.pending, initiateLoadingReducer);
        builder.addCase(getUserConfigThunk.rejected, idAdapterClearReducer);
        builder.addCase(getUserConfigThunk.fulfilled, addIntegrationsReducer);

        builder.addCase(logoutThunk.fulfilled, idAdapterClearReducer);
    },
});

const { reducer: integrationReducer } = integrationSlice;
export default integrationReducer;
