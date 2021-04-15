const {
    CalendarDay,
    Integer,
    Text,
    Relationship,
} = require('@keystonejs/fields');

const { isAdmin, isAdminOrEmployeeOwner } = require('../helpers/access');

module.exports = {
    fields: {
        externalId: { type: Text, isRequired: true, isUnique: true },
        payPeriodStartDate: { type: CalendarDay },
        payPeriodEndDate: { type: CalendarDay },
        payDate: { type: CalendarDay },
        netPay: { type: Integer },
        grossPay: { type: Integer },
        earnings: { type: Integer },
        taxes: { type: Integer },
        deductions: { type: Integer },
        contributions: { type: Integer },
        employee: {
            type: Relationship,
            ref: 'Employee.payments',
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
