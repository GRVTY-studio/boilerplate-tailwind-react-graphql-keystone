import { createSlice } from '@reduxjs/toolkit';
import { tasks } from '../../utilities/transforms';
import {
    bulkUpdateYearlyIncomeThunk,
    updateEmployeeSortThunk,
} from '../thunks/employeeThunks';
import { addIntegrationThunk } from '../thunks/integrationThunks';
import { addQuoteThunk, updateQuoteThunk } from '../thunks/quoteThunks';

export const taskConfirmationSlice = createSlice({
    name: 'taskConfirmation',
    initialState: {},
    reducers: {
        clearTaskConfirmation: (state) => {
            state.key = false;
        },
        updateTaskConfirmation: (state, action) => {
            state.key = action.payload.key;
            state.extraOptions = action.payload.extraOptions;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addQuoteThunk.fulfilled, (state) => {
            state.key = tasks.showWelcomeModal2.key;
        });
        builder.addCase(updateQuoteThunk.fulfilled, (state) => {
            state.key = tasks.showQuote.key;
        });
        builder.addCase(addIntegrationThunk.fulfilled, (state) => {
            state.key = tasks.connectaccountingsoftware.key;
        });
        builder.addCase(
            bulkUpdateYearlyIncomeThunk.fulfilled,
            (state, action) => {
                if (action.payload.showConfirmation)
                    state.key = tasks.markactivity.key;
            },
        );

        builder.addCase(updateEmployeeSortThunk.rejected, (state, action) => {
            state.key = action.payload.key;
            state.extraOptions = action.payload.extraOptions;
        });
    },
});

const {
    reducer: taskConfirmationReducer,
    actions: { clearTaskConfirmation, updateTaskConfirmation },
} = taskConfirmationSlice;

export { clearTaskConfirmation, updateTaskConfirmation };
export default taskConfirmationReducer;
