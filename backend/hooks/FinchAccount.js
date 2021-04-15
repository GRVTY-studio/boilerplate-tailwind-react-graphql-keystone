const { exchangeCode, introspect } = require('../helpers/finch');

module.exports = (keystone, scheduleTask) => ({
    list: {
        resolveInput: async ({ resolvedData }) => {
            if (resolvedData.code) {
                const accessToken = await exchangeCode(resolvedData.code);
                const account = await introspect(accessToken);
                delete account.products;

                return {
                    accessToken,
                    syncing: true,
                    ...account,
                    ...(resolvedData.integration
                        ? { integration: resolvedData.integration }
                        : {}),
                };
            }

            return resolvedData;
        },
    },
    field: {
        accessToken: {
            afterChange: async ({ context, updatedItem }) => {
                if (!context.req) {
                    return;
                }
                scheduleTask({
                    type: 'finch-import',
                    userId: context.req.user.id,
                    finchAccountId: updatedItem.id,
                });
            },
        },
    },
});
