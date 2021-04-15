import { sliceTransform } from '../../utilities/transforms';

const slice = sliceTransform.auth;

export const selectIsAuthenticated = (state) => state?.[slice]?.isAuthenticated;
export const selectUser = (state) => state?.[slice]?.user;

export const selectHasCompany = (state) => state?.[slice]?.hasCompany;
export const selectHasQuote = (state) => state?.[slice]?.hasQuote;
export const selectHasProjects = (state) => state?.[slice]?.hasProjects;
export const selectHasAddedIntegration = (state) =>
    state?.[slice]?.hasAddedIntegration;
export const selectHasMarkedRNDActivity = (state) =>
    state?.[slice]?.hasMarkedRNDActivity;
