import { createSlice } from '@reduxjs/toolkit';
import idEntityAdapter from '../entityAdapters/idEntityAdapter';

import {
    clearErrorsReducer,
    initiateLoadingReducer,
    resolveLoadingReducer,
} from '../reducers';
import { loadingTransform } from '../../utilities/transforms';
import { getEmployeesThunk } from '../thunks/employeeThunks';

const addDepartments = (state, action) => {
    if (action?.payload?.employees) {
        const { employees } = action.payload;

        const departments = employees.map(({ department }) => department);
        const uniqueDepartments = [...new Set(departments)];

        const newDepartments = uniqueDepartments.map((x) => ({
            id: x,
            label: x,
            value: x,
        }));
        idEntityAdapter.upsertMany(state, newDepartments);
        state.loading = loadingTransform.idle;
    }
    state.loading = loadingTransform.idle;
};

export const departmentSlice = createSlice({
    name: 'departments',
    initialState: idEntityAdapter.getInitialState({
        loading: loadingTransform.idle,
    }),
    reducers: {
        clearErrors: clearErrorsReducer,
    },
    extraReducers: (builder) => {
        builder.addCase(getEmployeesThunk.pending, initiateLoadingReducer);
        builder.addCase(getEmployeesThunk.rejected, resolveLoadingReducer);
        builder.addCase(getEmployeesThunk.fulfilled, addDepartments);
    },
});

const { reducer: departmentReducer } = departmentSlice;
export default departmentReducer;
