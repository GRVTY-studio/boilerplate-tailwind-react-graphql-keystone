import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import {
    ADDUSER_MUTATION,
    LOGOUT_MUTATION,
    REQUEST_PASSWORD_RESET,
    RESET_PASSWORD,
    SIGNIN_MUTATION,
    UPDATE_USER,
} from '../../gql/mutations';
import { GET_USER, GET_USER_CONFIG } from '../../gql/queries';
import client from '../../gql/client';
import { mapIntegrations } from '../../utilities/entityMapping';
import { showToastError, showToastSuccess } from '../../utilities/toastHelpers';

export const getUserThunk = createAsyncThunk(
    'auth/getUser',
    async (args, { rejectWithValue }) => {
        try {
            const res = await client.request(GET_USER);
            if (!res?.authenticatedUser)
                return rejectWithValue('Unauthenticated');

            return { user: res?.authenticatedUser };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const getUserConfigThunk = createAsyncThunk(
    'auth/config',
    async (args, { rejectWithValue }) => {
        try {
            const res = await client.request(GET_USER_CONFIG);
            if (!res?.authenticatedUser || res.error)
                return rejectWithValue(res.error || 'Unauthenticated');

            const {
                authenticatedUser: {
                    firstName,
                    email,
                    id,
                    lastName,
                    quotes,
                    company,
                    integrations,
                    employees,
                    _employeesMeta: { count: employeeCount },
                },
            } = res;

            const hasCompany = !!company;
            const hasQuote = quotes?.length > 0;

            const [{ projects } = {}] = quotes || [];
            const hasProjects = !!projects;
            const hasAddedIntegration = integrations?.length > 0;
            const hasMarkedRNDActivity = employees?.length > 0;

            const transformedIntegrations = integrations.map(mapIntegrations);

            return {
                quotes,
                user: { firstName, email, id, lastName },
                company,
                integrations: transformedIntegrations,
                employees,
                employeeCount,
                partialLoad: true,
                hasCompany,
                hasQuote,
                hasProjects,
                hasAddedIntegration,
                hasMarkedRNDActivity,
            };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            await client.request(SIGNIN_MUTATION, {
                email,
                password,
            });

            dispatch(getUserConfigThunk());

            return { success: true };
        } catch (err) {
            try {
                const {
                    response: {
                        errors: [{ message }],
                    },
                } = err;

                if (message.includes('passwordAuth')) {
                    showToastError('Invalid credentials.');
                    return rejectWithValue();
                }

                showToastError('Something went wrong');
                Sentry.captureException(err);
                return rejectWithValue('Error');
            } catch (error) {
                showToastError('Something went wrong');
                Sentry.captureException(err);
                return rejectWithValue('Error');
            }
        }
    },
);

export const signUpThunk = createAsyncThunk(
    'auth/signUp',
    async (account, { rejectWithValue, dispatch }) => {
        try {
            await client.request(ADDUSER_MUTATION, account);
            await dispatch(loginThunk(account));

            showToastSuccess('Account created');
            return { success: true };
        } catch (err) {
            try {
                const {
                    response: {
                        errors: [{ message }],
                    },
                } = err;

                if (message.includes('E11000')) {
                    showToastError(
                        'This email is already in use, please login.',
                    );
                    return rejectWithValue();
                }

                showToastError('Something went wrong');
                return rejectWithValue('Error');
            } catch (error) {
                showToastError('Something went wrong');

                Sentry.captureException(err);
                return rejectWithValue('Error');
            }
        }
    },
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (args, { rejectWithValue }) => {
        try {
            await client.request(LOGOUT_MUTATION);

            return { success: true };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const updateUserThunk = createAsyncThunk(
    'auth/updateUser',
    async (user, { rejectWithValue }) => {
        try {
            const update = await client.request(UPDATE_USER, user);
            if (update?.error) {
                showToastError('Something went wrong');
                return rejectWithValue(update?.error);
            }

            showToastSuccess('Account updated');
            return { user };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const requestPasswordResetThunk = createAsyncThunk(
    'auth/requestPasswordReset',
    async ({ email }, { rejectWithValue }) => {
        try {
            const update = await client.request(REQUEST_PASSWORD_RESET, {
                email,
            });
            if (update?.errors) {
                showToastError('Something went wrong');
                return rejectWithValue(update?.errors?.[0]?.message);
            }

            showToastSuccess('Password reset link sent');
            return { success: true };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const resetPasswordThunk = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const update = await client.request(RESET_PASSWORD, {
                token,
                password,
            });
            if (update?.errors) {
                showToastError('Reset token has expired');
                return rejectWithValue(update?.errors?.[0]?.message);
            }

            if (!update?.resetPassword?.success) {
                showToastError('Reset token has expired');
                return rejectWithValue('Reset token has expired');
            }

            showToastSuccess('Password changed');
            return { success: true };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue('Reset token has expired');
        }
    },
);
