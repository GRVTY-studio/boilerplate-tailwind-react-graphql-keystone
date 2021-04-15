import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { CREATE_QUOTE, UPDATE_QUOTE } from '../../gql/mutations';
import { GET_QUOTES } from '../../gql/queries';
import client from '../../gql/client';
import { showToastError, showToastSuccess } from '../../utilities/toastHelpers';

export const getQuotesThunk = createAsyncThunk(
    'quotes/getQuotes',
    async (args, { rejectWithValue }) => {
        try {
            const res = await client.request(GET_QUOTES);
            if (res?.error) {
                showToastError('Something went wrong');
                return rejectWithValue();
            }
            return { quotes: res?.authenticatedUser?.quotes };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const addQuoteThunk = createAsyncThunk(
    'quotes/addQuote',
    async (quote, { rejectWithValue }) => {
        try {
            const res = await client.request(CREATE_QUOTE, quote);
            if (res?.error) {
                showToastError('Something went wrong');
                return rejectWithValue();
            }
            return { quotes: [res?.createQuote] };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const updateQuoteThunk = createAsyncThunk(
    'quotes/updateQuote',
    async (quote, { rejectWithValue }) => {
        try {
            const res = await client.request(UPDATE_QUOTE, quote);
            if (res?.error) {
                showToastError('Something went wrong');
                return rejectWithValue();
            }

            return { quotes: [res?.updateQuote] };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const updateProjectsThunk = createAsyncThunk(
    'quotes/updateProjects',
    async (quote, { rejectWithValue }) => {
        try {
            const res = await client.request(UPDATE_QUOTE, quote);
            if (res?.error) {
                showToastError('Something went wrong');
                return rejectWithValue();
            }

            showToastSuccess('Projects updated');
            return { quotes: [res?.updateQuote] };
        } catch (err) {
            showToastError('Something went wrong');
            return rejectWithValue();
        }
    },
);
