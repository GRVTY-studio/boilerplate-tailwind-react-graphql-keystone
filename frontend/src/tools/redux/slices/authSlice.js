import { createSlice } from '@reduxjs/toolkit';
import { loadingTransform } from '../../utilities/transforms';
import {
    initiateEntityCreationReducer,
    initiateLoadingReducer,
    resolveLoadingReducer,
    setEntityCreationErrorReducer,
    setErrorReducer,
} from '../reducers';
import {
    getUserConfigThunk,
    getUserThunk,
    loginThunk,
    logoutThunk,
    requestPasswordResetThunk,
    resetPasswordThunk,
    signUpThunk,
    updateUserThunk,
} from '../thunks/authThunks';
import { addCompanyThunk } from '../thunks/companyThunks';
import { bulkUpdateYearlyIncomeThunk } from '../thunks/employeeThunks';
import { addIntegrationThunk } from '../thunks/integrationThunks';
import { addQuoteThunk, updateProjectsThunk } from '../thunks/quoteThunks';

const authFulfilled = (state, action, delayLoadCompletion) => {
    state.isAuthenticated = true;
    if (!delayLoadCompletion) state.loading = loadingTransform.idle;
    state.user = action?.payload?.user;

    state.hasCompany = action?.payload?.hasCompany;
    state.hasQuote = action?.payload?.hasQuote;
    state.hasProjects = action?.payload?.hasProjects;
    state.hasAddedIntegration = action?.payload?.hasAddedIntegration;
    state.hasMarkedRNDActivity = action?.payload?.hasMarkedRNDActivity;
};

const authRejected = (state, action) => {
    state.error = action.payload || action.error;
    state.loading = loadingTransform.idle;
    state.isAuthenticated = false;
};

export const slice = createSlice({
    name: 'authentication',
    initialState: {
        loading: loadingTransform.initial,
        creating: loadingTransform.initial,
        isAuthenticated: false,
        hasCompany: false,
        hasQuote: false,
        hasProjects: false,
        hasAddedIntegration: false,
        hasMarkedRNDActivity: false,
    },
    reducers: {
        updateAccount(state, action) {
            return { ...state, account: action.payload };
        },
        updateToken(action) {
            return {
                token: action.payload,
                isAuthenticated: true,
            };
        },
        clearErrors(state) {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserConfigThunk.pending, initiateLoadingReducer);
        builder.addCase(getUserConfigThunk.rejected, authRejected);
        builder.addCase(getUserConfigThunk.fulfilled, authFulfilled);

        builder.addCase(signUpThunk.pending, initiateLoadingReducer);
        builder.addCase(signUpThunk.rejected, authRejected);

        builder.addCase(loginThunk.pending, initiateLoadingReducer);
        builder.addCase(loginThunk.rejected, authRejected);
        builder.addCase(loginThunk.fulfilled, (state, action) =>
            authFulfilled(state, action, true),
        );

        builder.addCase(logoutThunk.pending, initiateLoadingReducer);
        builder.addCase(logoutThunk.rejected, authRejected);
        builder.addCase(logoutThunk.fulfilled, authRejected);

        builder.addCase(getUserThunk.pending, initiateLoadingReducer);
        builder.addCase(getUserThunk.rejected, authRejected);
        builder.addCase(getUserThunk.fulfilled, authFulfilled);

        builder.addCase(updateUserThunk.pending, initiateEntityCreationReducer);
        builder.addCase(
            updateUserThunk.rejected,
            setEntityCreationErrorReducer,
        );
        builder.addCase(updateUserThunk.fulfilled, (state, action) => {
            state.user = action?.payload?.user;
            state.creating = loadingTransform.idle;
        });

        builder.addCase(addCompanyThunk.fulfilled, (state) => {
            state.hasCompany = true;
        });

        builder.addCase(addIntegrationThunk.fulfilled, (state) => {
            state.hasAddedIntegration = true;
        });
        builder.addCase(addQuoteThunk.fulfilled, (state, action) => {
            const [{ projects } = {}] = action.payload.quotes;
            state.hasQuote = true;
            state.hasProjects = !!projects && projects !== '';
        });
        builder.addCase(updateProjectsThunk.fulfilled, (state, action) => {
            const [{ projects } = {}] = action.payload.quotes;
            state.hasProjects = !!projects && projects !== '';
        });
        builder.addCase(bulkUpdateYearlyIncomeThunk.fulfilled, (state) => {
            state.hasMarkedRNDActivity = true;
        });

        builder.addCase(
            requestPasswordResetThunk.pending,
            initiateLoadingReducer,
        );
        builder.addCase(requestPasswordResetThunk.rejected, setErrorReducer);
        builder.addCase(
            requestPasswordResetThunk.fulfilled,
            resolveLoadingReducer,
        );

        builder.addCase(resetPasswordThunk.pending, initiateLoadingReducer);
        builder.addCase(resetPasswordThunk.rejected, setErrorReducer);
        builder.addCase(resetPasswordThunk.fulfilled, resolveLoadingReducer);
    },
});

const { reducer } = slice;
const {
    actions: { updateAccount, updateToken, clearErrors: clearAuthErrors },
} = slice;

export { updateAccount, updateToken, clearAuthErrors };
export default reducer;
