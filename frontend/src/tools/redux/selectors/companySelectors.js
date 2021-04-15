import { sliceTransform } from '../../utilities/transforms';
import idEntityAdapter from '../entityAdapters/idEntityAdapter';

const slice = sliceTransform.company;

export const selectCompany = (state) => {
    const companyId = state?.[slice]?.ids?.[0];
    const company = state?.[slice]?.entities?.[companyId];

    return company;
};

export const {
    selectById: selectIndustryById,
    selectIds: selectIndustryIds,
    selectEntities: selectIndustryEntities,
    selectAll: selectAllIndustries,
    selectTotal: selectTotalIndustries,
} = idEntityAdapter.getSelectors((state) => state[sliceTransform.industries]);

export const selectCreatingCompany = (state) => state?.[slice]?.creating;
