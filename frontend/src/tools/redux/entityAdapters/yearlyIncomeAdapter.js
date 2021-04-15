import { createEntityAdapter } from '@reduxjs/toolkit';

const idEntityAdapter = createEntityAdapter({
    selectId: (yearlyIncome) =>
        `${yearlyIncome.employeeId}-${yearlyIncome.fiscalYear}`,
});

export default idEntityAdapter;
