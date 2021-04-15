export const getSavingsEstimate = (estimatedPayroll, estimatedSupplies) =>
    parseInt((((estimatedPayroll + estimatedSupplies) * 12) / 100) * 6, 10);

export const getYearlyIncomeAdjustedAmount = (timeSpentOnRND, incomeAmount) =>
    (timeSpentOnRND / 100) * incomeAmount || 0;

export const getFiscalYearOptions = () => [
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
];

export const sortByFiscalYear = ({ fiscalYear: a }, { fiscalYear: b }) => b - a;

export const hasEditedYearlyIncome = (updates = {}) =>
    Object.values(updates)?.length > 0;
