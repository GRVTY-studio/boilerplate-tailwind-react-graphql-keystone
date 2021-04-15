import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'error',
    initialState: {
        hasError: false,
        message: '',
    },
    reducers: {
        setError(state, action) {
            return { ...state, message: action.payload, hasError: true };
        },
        clearError(state) {
            state.hasError = false;
            state.message = '';
        },
    },
});

const { reducer } = slice;
const {
    actions: { setError, clearError },
} = slice;

export { setError, clearError };
export default reducer;
