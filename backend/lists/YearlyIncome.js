const { Integer, Relationship } = require('@keystonejs/fields');

const { isAdmin, isAdminOrEmployeeOwner } = require('../helpers/access');

module.exports = {
    fields: {
        fiscalYear: { type: Integer, isRequired: true },
        amount: { type: Integer },
        integrationAmount: {
            type: Integer,
            access: {
                update: () => false,
                delete: () => false,
            },
        },
        timeSpentOnRND: { type: Integer },
        adjustedAmount: { type: Integer },
        employee: {
            type: Relationship,
            ref: 'Employee.yearlyIncome',
            many: false,
            isRequired: true,
        },
    },
    access: {
        read: isAdminOrEmployeeOwner,
        update: isAdminOrEmployeeOwner,
        delete: isAdmin,
    },
};
