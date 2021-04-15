const {
    Text,
    Integer,
    CalendarDay,
    Relationship,
} = require('@keystonejs/fields');

const { isAdmin, isAdminOrOwner } = require('../helpers/access');

module.exports = {
    fields: {
        externalId: { type: Text, isRequired: true, isUnique: true },
        name: { type: Text, isRequired: true },
        startDate: { type: CalendarDay },
        endDate: { type: CalendarDay },
        incomeUnit: { type: Text },
        incomeAmount: { type: Integer },
        incomeCurrency: { type: Text },
        department: { type: Text },
        yearlyIncome: {
            type: Relationship,
            ref: 'YearlyIncome.employee',
            many: true,
        },
        payments: {
            type: Relationship,
            ref: 'Payment.employee',
            many: true,
        },
        user: {
            type: Relationship,
            ref: 'User.employees',
            many: false,
            isRequired: true,
        },
    },
    access: {
        read: isAdminOrOwner,
        update: isAdminOrOwner,
        delete: isAdmin,
    },
};
