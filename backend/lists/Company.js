const {
    Text,
    Select,
    Integer,
    Url,
    Relationship,
} = require('@keystonejs/fields');

const { isAdmin, isAdminOrOwner } = require('../helpers/access');
const { INDUSTRIES } = require('../helpers/constants');

module.exports = {
    fields: {
        legalName: { type: Text, isRequired: true },
        dba: { type: Text, isRequired: true },
        website: { type: Url, isRequired: true },
        industry: {
            type: Select,
            options: INDUSTRIES,
            dataType: 'string',
            isRequired: true,
        },
        yearOfIncorporation: { type: Integer, isRequired: true },
        businessType: {
            type: Select,
            options: [
                'Sole Proprietorship',
                'Partnership',
                'Corporation',
                'S Corporation',
                'Limited Liability Company (LLC)',
            ],
            dataType: 'string',
            isRequired: true,
        },
        user: {
            type: Relationship,
            ref: 'User.company',
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
