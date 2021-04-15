import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { ADD_INTEGRATION, UPDATE_FINCH_ACCOUNT } from '../../gql/mutations';
import { GET_INTEGRATIONS } from '../../gql/queries';
import client from '../../gql/client';
import { sliceTransform } from '../../utilities/transforms';
import { mapIntegrations } from '../../utilities/entityMapping';
import { showToastError, showToastSuccess } from '../../utilities/toastHelpers';

export const getIntegrationsThunk = createAsyncThunk(
    'integrations/getIntegrations',
    async (args, { rejectWithValue }) => {
        try {
            const res = await client.request(GET_INTEGRATIONS);
            if (res.error) {
                showToastError('Error fetching integrations');
                return rejectWithValue();
            }

            const integrations = res?.authenticatedUser?.integrations.map(
                mapIntegrations,
            );
            return { integrations };
        } catch (err) {
            showToastError('Error fetching integrations');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);
export const updateIntegrationThunk = createAsyncThunk(
    'integrations/updateIntegration',
    async ({ code, finchAccountId }, { rejectWithValue, getState }) => {
        try {
            const {
                ids: [first],
                entities,
            } = getState()[sliceTransform.integrations];
            let integration = entities[first];
            const res = await client.request(UPDATE_FINCH_ACCOUNT, {
                code,
                id: finchAccountId,
            });

            if (res?.error) {
                showToastError('Update failed');
                return rejectWithValue();
            }

            integration = {
                ...integration,
                finchAccount: res.updateFinchAccount,
            };

            showToastSuccess('Update successful');
            return { integrations: [integration] };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);

export const addIntegrationThunk = createAsyncThunk(
    'integrations/addIntegration',
    async ({ code, provider }, { rejectWithValue, getState }) => {
        try {
            const {
                user: { id },
            } = getState()[sliceTransform.auth];

            const res = await client.request(ADD_INTEGRATION, {
                code,
                userId: id,
                provider,
            });

            if (res?.error) {
                showToastError('Update failed');
                return rejectWithValue();
            }
            return { integrations: [res?.createIntegration] };
        } catch (err) {
            showToastError('Something went wrong');

            Sentry.captureException(err);
            return rejectWithValue();
        }
    },
);
