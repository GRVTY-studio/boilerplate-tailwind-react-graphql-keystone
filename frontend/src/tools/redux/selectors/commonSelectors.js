import { sliceTransform } from '../../utilities/transforms';

export const selectLoading = (state, slice) => state?.[slice]?.loading;
export const selectCreateLoading = (state, slice) => state?.[slice]?.creating;
export const selectError = (state, slice) => state?.[slice]?.error;
export const selectTotalEntities = (state, slice) => state?.[slice]?.count;
export const selectHasAnotherPage = (state, slice) =>
    state?.[slice]?.hasAnotherPage;
export const selectRefresh = (state, slice) => state?.[slice]?.refresh;
export const selectCount = (state, slice) => state?.[slice]?.count;
export const selectSort = (state, slice) => state?.[slice]?.sort;
export const selectSkip = (state, slice) => state?.[slice]?.skip;
export const selectFilters = (state, slice) => state?.[slice]?.filters;

export const selectToastError = (state) => state?.[sliceTransform.toast]?.error;
export const selectToastSuccess = (state) =>
    state?.[sliceTransform.toast]?.success;
