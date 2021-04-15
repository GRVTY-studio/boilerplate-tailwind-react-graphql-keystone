import { loadingTransform } from '../utilities/transforms';
import idEntityAdapter from './entityAdapters/idEntityAdapter';

export const initiateLoadingReducer = (state) => {
    state.loading = loadingTransform.pending;
};
export const resolveLoadingReducer = (state) => {
    state.loading = loadingTransform.idle;
};

export const setErrorReducer = (state, action) => {
    state.error = action.payload || action.error;
    state.loading = loadingTransform.idle;
    state.creating = loadingTransform.idle;
};
export const clearErrorsReducer = (state) => {
    state.error = false;
};

export const initiateEntityCreationReducer = (state) => {
    state.creating = loadingTransform.pending;
};
export const setEntityCreationErrorReducer = (state, action) => {
    state.error = action.payload;
    state.creating = loadingTransform.idle;
    state.loading = loadingTransform.idle;
};

export const idAdapterClearReducer = (state) => {
    idEntityAdapter.removeAll(state);
    state.loading = loadingTransform.idle;
    state.creating = loadingTransform.idle;
    state.error = false;
};
