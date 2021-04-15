import { sliceTransform } from '../../utilities/transforms';
import idEntityAdapter from '../entityAdapters/idEntityAdapter';

const slice = sliceTransform.quotes;
export const {
    selectById: selectUserDataSourceById,
    selectIds: selectUserDataSourceIds,
    selectEntities: selectUserDataSourceEntities,
    selectAll: selectAllUserDataSources,
    selectTotal: selectTotalUserDataSources,
} = idEntityAdapter.getSelectors((state) => state?.[slice]);

export const selectLatestQuote = (state) => {
    const lastQuoteId = state?.[slice]?.ids?.[0];
    const lastQuote = state?.[slice]?.entities?.[lastQuoteId];

    return lastQuote;
};
