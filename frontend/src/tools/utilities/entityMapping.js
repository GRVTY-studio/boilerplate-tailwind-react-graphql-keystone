export const mapIntegrations = (integration) => {
    let { finchAccount } = integration;
    if (finchAccount === null) finchAccount = {};

    return { ...integration, finchAccount };
};

export const mapYearlyIncomeFromYearlyIncomeUpdate = (yearlyIncome = {}) => {
    const {
        fiscalYear,
        amount,
        timeSpentOnRND,
        adjustedAmount,
        id: yearlyIncomeId,
        employee: { id: employeeId },
        integrationAmount,
    } = yearlyIncome;

    return {
        employeeId,
        fiscalYear,
        amount,
        timeSpentOnRND,
        adjustedAmount,
        isNew: false,
        edited: false,
        yearlyIncomeId,
        integrationAmount,
    };
};

/**
 *
 * @param {*} employee
 * @returns array
 */
export const mapYearlyIncomeFromEmployee = (employee) => {
    if (!employee) return [];
    const { yearlyIncome, id: employeeId } = employee;

    const employeeYearlyIncome = yearlyIncome.map((income) => {
        const {
            fiscalYear,
            amount,
            timeSpentOnRND,
            adjustedAmount,
            id: yearlyIncomeId,
            integrationAmount,
        } = income;

        return {
            fiscalYear,
            amount,
            timeSpentOnRND,
            adjustedAmount,
            yearlyIncomeId,
            employeeId,
            integrationAmount,
        };
    });

    return employeeYearlyIncome;
};
