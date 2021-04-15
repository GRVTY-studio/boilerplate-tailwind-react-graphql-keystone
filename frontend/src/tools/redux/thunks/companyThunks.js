import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { CREATE_COMPANY, UPDATE_COMPANY } from '../../gql/mutations';
import { GET_ALL_INDUSTRIES, GET_COMPANY } from '../../gql/queries';
import client from '../../gql/client';
import { showToastError, showToastSuccess } from '../../utilities/toastHelpers';

export const getCompanyThunk = createAsyncThunk(
    'company/getCompany',
    async (args, { rejectWithValue }) => {
        try {
            const res = await client.request(GET_COMPANY);
            if (res.error) {
                showToastError('Something went wrong');
                return rejectWithValue();
            }
            return { company: res?.authenticatedUser?.company };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const getIndustriesThunk = createAsyncThunk(
    'industry/getIndustries',
    async (args, { rejectWithValue }) => {
        try {
            const res = await client.request(GET_ALL_INDUSTRIES);
            if (!res?.allIndustries?.industries) {
                showToastError('Something went wrong');
                return rejectWithValue();
            }

            const industries = res?.allIndustries?.industries.map((x) => ({
                id: x,
                text: x,
            }));
            return { industries };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const addCompanyThunk = createAsyncThunk(
    'company/addCompany',
    async (company, { rejectWithValue }) => {
        try {
            const res = await client.request(CREATE_COMPANY, {
                ...company,
                yearOfIncorporation: parseInt(company?.yearOfIncorporation, 10),
            });

            if (res?.error) {
                showToastError('Something went wrong');
                return rejectWithValue();
            }

            showToastSuccess('Company created');
            return { company: res?.createCompany };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const updateCompanyThunk = createAsyncThunk(
    'company/updateCompany',
    async (company, { rejectWithValue }) => {
        try {
            const res = await client.request(UPDATE_COMPANY, {
                ...company,
                yearOfIncorporation: parseInt(company?.yearOfIncorporation, 10),
            });

            if (res?.error) {
                showToastError('Something went wrong');
                return rejectWithValue();
            }

            showToastSuccess('Company updated');
            return { company: res?.updateCompany };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);
