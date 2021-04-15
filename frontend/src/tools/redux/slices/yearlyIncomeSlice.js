import { createSlice } from '@reduxjs/toolkit';
import yearlyIncomeAdapter from '../entityAdapters/yearlyIncomeAdapter';
import {
    clearErrorsReducer,
    initiateEntityCreationReducer,
    initiateLoadingReducer,
    resolveLoadingReducer,
    setErrorReducer,
} from '../reducers';
import { loadingTransform } from '../../utilities/transforms';
import {
    bulkUpdateYearlyIncomeThunk,
    getEmployeesThunk,
    getYearlyIncomeThunk,
} from '../thunks/employeeThunks';
import { getUserConfigThunk, logoutThunk } from '../thunks/authThunks';
import {
    mapYearlyIncomeFromEmployee,
    mapYearlyIncomeFromYearlyIncomeUpdate,
} from '../../utilities/entityMapping';

const addYearlyIncomeReducer = (state, action) => {
    const { payload: { employees, clear } = {} } = action;
    if (clear) {
        yearlyIncomeAdapter.removeAll(state);
        state.updates = {};
    }
    if (employees) {
        const income = employees.reduce(
            (acc, cur) => [...acc, ...mapYearlyIncomeFromEmployee(cur)],
            [],
        );

        yearlyIncomeAdapter.addMany(state, income);
    }
    state.loading = loadingTransform.idle;
    state.error = false;
    state.creating = loadingTransform.idle;
};

const updateYearlyIncomeReducer = (state, action) => {
    if (action.payload) {
        state.updates = {
            ...state.updates,
            [action.payload.id]: { ...action.payload },
        };
    }
    state.loading = loadingTransform.idle;
    state.error = false;
    state.creating = loadingTransform.idle;
};

const updateYearlyIncomesReducer = (state, action) => {
    const updates = action?.payload?.yearlyIncome;
    if (updates.length > 0) {
        const yearlyIncome = updates.map(mapYearlyIncomeFromYearlyIncomeUpdate);
        yearlyIncomeAdapter.upsertMany(state, yearlyIncome);
    }
    state.loading = loadingTransform.idle;
    state.error = false;
    state.creating = loadingTransform.idle;
};

const clearUpdatesReducer = (state) => {
    state.updates = {};
};

export const clearAllData = (state) => {
    yearlyIncomeAdapter.removeAll(state);
    state.updates = {};
    state.loading = loadingTransform.idle;
    state.creating = loadingTransform.idle;
    state.error = false;
};

export const yearlyIncomeSlice = createSlice({
    name: 'yearlyIncome',
    initialState: yearlyIncomeAdapter.getInitialState({
        loading: loadingTransform.idle,
        creating: loadingTransform.idle,
        updates: {},
        fullyLoaded: false,
    }),
    reducers: {
        clearErrors: clearErrorsReducer,
        updateYearlyIncome: updateYearlyIncomeReducer,
        clearUpdates: clearUpdatesReducer,
    },
    extraReducers: (builder) => {
        builder.addCase(getEmployeesThunk.pending, initiateLoadingReducer);
        builder.addCase(getEmployeesThunk.rejected, resolveLoadingReducer);
        builder.addCase(getEmployeesThunk.fulfilled, addYearlyIncomeReducer);

        builder.addCase(getUserConfigThunk.pending, initiateLoadingReducer);
        builder.addCase(getUserConfigThunk.rejected, clearAllData);
        builder.addCase(getUserConfigThunk.fulfilled, addYearlyIncomeReducer);

        builder.addCase(getYearlyIncomeThunk.pending, initiateLoadingReducer);
        builder.addCase(getYearlyIncomeThunk.rejected, resolveLoadingReducer);
        builder.addCase(getYearlyIncomeThunk.fulfilled, (state, action) => {
            addYearlyIncomeReducer(state, action);
            state.fullyLoaded = true;
        });

        builder.addCase(
            bulkUpdateYearlyIncomeThunk.pending,
            initiateEntityCreationReducer,
        );
        builder.addCase(bulkUpdateYearlyIncomeThunk.rejected, setErrorReducer);
        builder.addCase(
            bulkUpdateYearlyIncomeThunk.fulfilled,
            (state, action) => {
                updateYearlyIncomesReducer(state, action);
                state.fullyLoaded = false;
                state.updates = {};
            },
        );

        builder.addCase(logoutThunk.fulfilled, clearAllData);
    },
});

const {
    reducer: yearlyIncomeReducer,
    actions: { updateYearlyIncome, clearUpdates: clearYearlyIncomeUpdates },
} = yearlyIncomeSlice;
export { updateYearlyIncome, clearYearlyIncomeUpdates };
export default yearlyIncomeReducer;
