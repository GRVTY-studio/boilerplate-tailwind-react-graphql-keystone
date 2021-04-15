import { createSlice } from '@reduxjs/toolkit';
import idEntityAdapter from '../entityAdapters/idEntityAdapter';
import {
    clearErrorsReducer,
    idAdapterClearReducer,
    initiateLoadingReducer,
    resolveLoadingReducer,
} from '../reducers';
import { loadingTransform } from '../../utilities/transforms';
import {
    getEmployeesThunk,
    updateEmployeeSortThunk,
} from '../thunks/employeeThunks';
import { getUserConfigThunk, logoutThunk } from '../thunks/authThunks';

const addEmployeeReducer = (state, action) => {
    const {
        payload: {
            employees = [],
            employees: { length = 0 } = [],
            employeeCount = 0,
            clear,
            partialLoad,
        } = {},
    } = action;

    if (clear) {
        idEntityAdapter.removeAll(state);
    }
    if (partialLoad) {
        state.hasAnotherPage = true;
        state.skip = 0;
    } else {
        state.hasAnotherPage = length === state.first;
        state.skip += state.first;
    }

    if (length > 0) {
        idEntityAdapter.addMany(state, employees);
    }

    state.count = employeeCount;
    state.loading = loadingTransform.idle;
    state.error = false;
    state.creating = loadingTransform.idle;
};

const updateSortByReducer = (state, action) => {
    state.sort = action.payload;
    state.skip = 0;
    state.refresh = true;
};

const updateFiltersReducer = (state, action) => {
    state.filters = action.payload;
    state.skip = 0;
    state.refresh = true;
};

export const employeesSlice = createSlice({
    name: 'employees',
    initialState: idEntityAdapter.getInitialState({
        loading: loadingTransform.initial,
        creating: loadingTransform.idle,
        count: 0,
        skip: 0,
        first: 10,
        hasAnotherPage: true,
        refresh: false,
    }),
    reducers: {
        clearErrors: clearErrorsReducer,
        updateSortBy: updateSortByReducer,
        updateFilters: updateFiltersReducer,
    },
    extraReducers: (builder) => {
        builder.addCase(getEmployeesThunk.pending, initiateLoadingReducer);
        builder.addCase(getEmployeesThunk.rejected, resolveLoadingReducer);
        builder.addCase(getEmployeesThunk.fulfilled, (state, action) => {
            addEmployeeReducer(state, action);
            state.refresh = false;
        });

        builder.addCase(getUserConfigThunk.pending, initiateLoadingReducer);
        builder.addCase(getUserConfigThunk.rejected, idAdapterClearReducer);
        builder.addCase(getUserConfigThunk.fulfilled, (state, action) => {
            addEmployeeReducer(state, action);
        });

        builder.addCase(logoutThunk.fulfilled, idAdapterClearReducer);
        builder.addCase(updateEmployeeSortThunk.fulfilled, updateSortByReducer);
    },
});

const {
    reducer: employeesReducer,
    actions: {
        updateSortBy: updateEmployeeSortBy,
        updateFilters: updateEmployeeFilters,
    },
} = employeesSlice;
export { updateEmployeeSortBy, updateEmployeeFilters };
export default employeesReducer;
