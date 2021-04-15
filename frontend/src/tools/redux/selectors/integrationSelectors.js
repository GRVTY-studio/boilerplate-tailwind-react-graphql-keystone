import { sliceTransform } from '../../utilities/transforms';
import idEntityAdapter from '../entityAdapters/idEntityAdapter';
import { slice } from '../slices/authSlice';

export const {
    selectById: selectIntegrationById,
    selectIds: selectIntegrationIds,
    selectEntities: selectIntegrationEntities,
    selectAll: selectAllIntegrations,
    selectTotal: selectTotalIntegrations,
} = idEntityAdapter.getSelectors((state) => state[sliceTransform.integrations]);

export const selectShowTaskCompleted = (state) =>
    state[slice.integrations]?.showTaskCompleted;
