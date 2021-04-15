const { Select, Relationship } = require('@keystonejs/fields');

const { isAdmin, isAdminOrOwner } = require('../helpers/access');

module.exports = {
    fields: {
        provider: {
            type: Select,
            options: ['finch'],
            isRequired: true,
        },
        finchAccount: {
            type: Relationship,
            ref: 'FinchAccount.integration',
            many: false,
        },
        user: {
            type: Relationship,
            ref: 'User.integrations',
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
