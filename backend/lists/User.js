const {
    Text,
    Checkbox,
    Password,
    Relationship,
} = require('@keystonejs/fields');

const { isAdmin, isAdminOrUser } = require('../helpers/access');

module.exports = {
    fields: {
        firstName: {
            type: Text,
        },
        lastName: {
            type: Text,
        },
        email: {
            type: Text,
            isUnique: true,
        },
        googleId: { type: Text },
        isAdmin: {
            type: Checkbox,
            // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
            access: {
                update: isAdmin,
            },
        },
        password: {
            type: Password,
        },
        resetPassToken: {
            type: Text,
            access: () => false,
        },
        company: {
            type: Relationship,
            ref: 'Company.user',
            many: false,
        },
        integrations: {
            type: Relationship,
            ref: 'Integration.user',
            many: true,
        },
        quotes: {
            type: Relationship,
            ref: 'Quote.user',
            many: true,
        },
        employees: {
            type: Relationship,
            ref: 'Employee.user',
            many: true,
        },
    },
    access: {
        read: isAdminOrUser,
        update: isAdminOrUser,
        delete: isAdmin,
        auth: true,
    },
};
