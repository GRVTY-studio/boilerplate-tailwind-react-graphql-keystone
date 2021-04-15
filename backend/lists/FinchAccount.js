const { Text, Checkbox, Relationship } = require('@keystonejs/fields');

const {
    isAdmin,
    isAdminOrIntegrationOwner,
    ownsItemViaIntegration,
} = require('../helpers/access');

module.exports = {
    fields: {
        code: {
            type: Text,
            access: {
                read: false,
            },
        },
        accessToken: {
            type: Text,
            isRequired: true,
            access: {
                read: ownsItemViaIntegration,
            },
        },
        clientId: {
            type: Text,
        },
        username: {
            type: Text,
        },
        providerId: {
            type: Text,
        },
        providerName: {
            type: Text,
        },
        providerLogo: {
            type: Text,
        },
        providerMfa: {
            type: Checkbox,
        },
        data: {
            type: Text,
        },
        importErrors: {
            type: Text,
        },
        syncing: {
            type: Checkbox,
            defaultValue: false,
        },
        integration: {
            type: Relationship,
            ref: 'Integration.finchAccount',
            many: false,
            isRequired: true,
        },
    },
    access: {
        read: isAdminOrIntegrationOwner,
        update: isAdminOrIntegrationOwner,
        delete: isAdmin,
    },
};
