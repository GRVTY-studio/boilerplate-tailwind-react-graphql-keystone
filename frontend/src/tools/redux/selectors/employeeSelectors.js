import {
    hasEditedYearlyIncome,
    sortByFiscalYear,
} from '../../utilities/helpers';
import { sliceTransform } from '../../utilities/transforms';
import idEntityAdapter from '../entityAdapters/idEntityAdapter';

const slice = sliceTransform.employees;

export const {
    selectById: selectEmployeeById,
    selectIds: selectEmployeeIds,
    selectEntities: selectEmployeeEntities,
    selectAll: selectAllEmployees,
    selectTotal: selectTotalEmployees,
} = idEntityAdapter.getSelectors((state) => state[slice]);

export const {
    selectById: selectDepartmentsById,
    selectIds: selectDepartmentsIds,
    selectEntities: selectDepartmentsEntities,
    selectAll: selectAllDepartments,
    selectTotal: selectTotalDepartments,
} = idEntityAdapter.getSelectors((state) => state[sliceTransform.departments]);

export const {
    selectById: selectYearlyIncomeById,
    selectIds: selectYearlyIncomeIds,
    selectEntities: selectYearlyIncomeEntities,
    selectAll: selectAllYearlyIncome,
    selectTotal: selectTotalYearlyIncome,
} = idEntityAdapter.getSelectors((state) => state[sliceTransform.yearlyIncome]);

export const selectEmployeesInformationByFiscalYear = (
    state,
    fiscalYearFilter,
) => {
    const employees = state?.[slice]?.entities;

    if (!employees) return [];
    const yearlyIncome = state?.[sliceTransform.yearlyIncome]?.entities;
    const yearlyIncomeUpdates = state?.[sliceTransform.yearlyIncome]?.updates;
    const employeeIds = state?.[slice]?.ids;

    const filtered = employeeIds?.reduce((acc, cur) => {
        const {
            id: employeeId,
            name,
            startDate,
            endDate,
            incomeUnit,
            incomeCurrency,
            department,
        } = employees[cur];

        const filteredIncome =
            yearlyIncome[`${employeeId}-${fiscalYearFilter}`] || {};
        const updatedIncome =
            yearlyIncomeUpdates[`${employeeId}-${fiscalYearFilter}`];

        const {
            fiscalYear,
            amount,
            integrationAmount,
            timeSpentOnRND,
            adjustedAmount,
            edited,
            isNew,
            id,
            yearlyIncomeId,
            error,
        } = updatedIncome || filteredIncome;

        return [
            ...acc,
            {
                id,
                name,
                startDate,
                endDate,
                incomeUnit,
                incomeAmount: amount || integrationAmount,
                incomeCurrency,
                department,
                fiscalYear,
                timeSpentOnRND,
                adjustedAmount,
                edited,
                isNew,
                yearlyIncomeId,
                error,
                employeeId,
            },
        ];
    }, []);

    return filtered;
};

export const selectIsYearlyIncomeUpdating = (state) =>
    state?.[sliceTransform.yearlyIncome]?.pendingRequests?.length > 0;

export const selectEmployeeRNDActivitySummary = (state) => {
    const incomeEntities = state?.[sliceTransform.yearlyIncome]?.entities;
    const filteredIncome = Object.values(incomeEntities).filter(
        ({ timeSpentOnRND }) => timeSpentOnRND,
    );

    const summaryData = filteredIncome.reduce((acc, cur) => {
        const {
            fiscalYear,
            amount: newAmount,
            adjustedAmount: newAdjustedAmount,
        } = cur;
        let { amount = 0, adjustedAmount = 0, employees = 0 } =
            acc[fiscalYear] || {};

        amount += newAmount;
        adjustedAmount += newAdjustedAmount;
        employees += 1;

        return {
            ...acc,
            [fiscalYear]: {
                amount,
                adjustedAmount,
                employees,
                fiscalYear,
            },
        };
    }, {});

    return Object.values(summaryData).sort(sortByFiscalYear);
};

export const selectYearlyIncomeFullyLoaded = (state) =>
    state?.[sliceTransform.yearlyIncome]?.fullyLoaded;

export const selectYearlyIncomeHasBeenEdited = (state) => {
    const { updates } = state?.[sliceTransform.yearlyIncome];
    return hasEditedYearlyIncome(updates);
};

export const selectTotalYearlyIncomeUpdateErrors = (state) => {
    const { updates = {} } = state?.[sliceTransform.yearlyIncome];
    const errors = Object.values(updates)?.filter(({ error }) => error) || [];

    return errors?.length;
};
