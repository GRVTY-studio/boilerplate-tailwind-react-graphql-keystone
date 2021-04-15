const { Text, Integer, Checkbox, Relationship } = require('@keystonejs/fields');

const { isAdmin, isAdminOrOwner } = require('../helpers/access');

module.exports = {
    fields: {
        fiscalYear: { type: Integer, isRequired: true },
        hasUSABasedEmployees: { type: Checkbox },
        estimatedPayroll: { type: Integer },
        estimatedSupplies: { type: Integer },
        minAmount: { type: Integer },
        maxAmount: { type: Integer },
        projects: { type: Text },
        user: {
            type: Relationship,
            ref: 'User.quotes',
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
