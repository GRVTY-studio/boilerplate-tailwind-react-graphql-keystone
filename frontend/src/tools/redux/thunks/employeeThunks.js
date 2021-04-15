import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { ADD_YEARLY_INCOME, UPDATE_YEARLY_INCOME } from '../../gql/mutations';
import { GET_EMPLOYEES, GET_YEARLY_INCOME } from '../../gql/queries';
import client from '../../gql/client';
import { sliceTransform, tasks } from '../../utilities/transforms';
import { showToastError, showToastSuccess } from '../../utilities/toastHelpers';
import { hasEditedYearlyIncome } from '../../utilities/helpers';

export const getYearlyIncomeThunk = createAsyncThunk(
    'employees/getYearlyIncome',
    async (arg, { rejectWithValue }) => {
        try {
            const res = await client.request(GET_YEARLY_INCOME);
            if (res?.error) {
                showToastError('Something went wrong');
                return rejectWithValue();
            }

            return { employees: res?.authenticatedUser?.employees };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const getEmployeesThunk = createAsyncThunk(
    'employees/getEmployees',
    async ({ clear } = {}, { rejectWithValue, getState }) => {
        try {
            const { first, skip, sort, filters } = getState()[
                sliceTransform.employees
            ];
            let sortBy;
            if (sort) {
                const { field, asc } = sort;
                sortBy = `${field}_${asc ? 'ASC' : 'DESC'}`;
            }
            const res = await client.request(GET_EMPLOYEES, {
                ...(filters || {}),
                sortBy,
                first,
                skip,
            });
            if (res?.error) {
                showToastError('Something went wrong');
                return rejectWithValue();
            }

            const {
                authenticatedUser: {
                    employees = [],
                    _employeesMeta: { count: employeeCount = 0 } = {},
                } = {},
            } = res;

            const filtered = !!filters;

            return {
                employees,
                employeeCount,
                filtered,
                clear,
            };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const bulkUpdateYearlyIncomeThunk = createAsyncThunk(
    'yearlyIncome/bulkUpdateYearlyIncome',
    async (args, { rejectWithValue, getState }) => {
        try {
            const { hasMarkedRNDActivity } = getState()[sliceTransform.auth];
            const { updates } = getState()[sliceTransform.yearlyIncome];
            const yearlyIncome = Object.values(updates);

            const edits = yearlyIncome
                .filter(({ edited }) => edited)
                .map(
                    ({
                        adjustedAmount,
                        yearlyIncomeId,
                        timeSpentOnRND = 0,
                        amount = 0,
                    }) => ({
                        id: yearlyIncomeId,
                        data: {
                            amount: parseInt(amount, 10),
                            adjustedAmount: parseInt(adjustedAmount, 10),
                            timeSpentOnRND: parseInt(timeSpentOnRND, 10),
                        },
                    }),
                );

            const creates = yearlyIncome
                .filter(({ isNew }) => isNew)
                .map(
                    ({
                        adjustedAmount,
                        yearlyIncomeId,
                        timeSpentOnRND = 0,
                        employeeId,
                        fiscalYear,
                        amount = 0,
                    }) => ({
                        id: yearlyIncomeId,
                        data: {
                            employee: { connect: { id: employeeId } },
                            adjustedAmount: parseInt(adjustedAmount, 10),
                            amount: parseInt(amount, 10),
                            fiscalYear: parseInt(fiscalYear, 10),
                            timeSpentOnRND: parseInt(timeSpentOnRND, 10),
                        },
                    }),
                );

            let payload = [];
            let editHasErrors = false;
            let createHasErrors = false;

            if (edits?.length > 0) {
                const update = await client.request(UPDATE_YEARLY_INCOME, {
                    data: edits,
                });
                if (!update?.error) {
                    payload = update.updateYearlyIncomes;
                } else {
                    editHasErrors = true;
                }
            }
            if (creates?.length > 0) {
                const create = await client.request(ADD_YEARLY_INCOME, {
                    data: creates,
                });
                if (!create?.error) {
                    payload = [...payload, ...create.createYearlyIncomes];
                } else {
                    createHasErrors = true;
                }
            }

            if (editHasErrors && createHasErrors) {
                showToastError('Updates failed');
            }
            if (editHasErrors || createHasErrors) {
                showToastError('Some updates failed');
            }
            if (
                !editHasErrors &&
                !createHasErrors &&
                (edits?.length > 0 || creates?.length > 0)
            ) {
                showToastSuccess('Updates successful');
            }

            return {
                yearlyIncome: payload,
                showConfirmation: !hasMarkedRNDActivity,
            };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const updateEmployeeSortThunk = createAsyncThunk(
    'employees/updateEmployeeSort',
    async (sortBy, { rejectWithValue, getState }) => {
        try {
            const { updates } = getState()?.[sliceTransform.yearlyIncome];
            const hasEdited = hasEditedYearlyIncome(updates);
            if (hasEdited) {
                return rejectWithValue({
                    key: tasks.unsavedChanges.key,
                    extraOptions: { sortBy },
                });
            }

            return sortBy;
        } catch (err) {
            showToastError('Something went wrong');
            return rejectWithValue();
        }
    },
);
