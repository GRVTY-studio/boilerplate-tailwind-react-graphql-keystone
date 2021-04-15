const {
    getItem,
    updateItem,
} = require('@keystonejs/server-side-graphql-client');

const {
    introspect,
    getCompany,
    getDirectory,
    getEmployment,
    getPayment,
} = require('../helpers/finch');
const employeeSync = require('../helpers/employeeSync');
const paymentSync = require('../helpers/paymentSync');

module.exports = async ({ userId, finchAccountId }, keystone, logger, done) => {
    logger.info(`Running Finch import for account id ${finchAccountId}`);

    const finchAccount = await getItem({
        keystone,
        listKey: 'FinchAccount',
        itemId: finchAccountId,
        returnFields: 'accessToken',
    });

    if (!finchAccount) {
        throw new Error('Finch account not found.');
    }

    const { accessToken } = finchAccount;

    await updateItem({
        keystone,
        listKey: 'FinchAccount',
        item: {
            id: finchAccountId,
            data: {
                syncing: true,
            },
        },
        returnFields: 'id',
    });

    logger.info('Introspecting access token...');
    const account = await introspect(accessToken);
    const { products } = account;
    delete account.products;

    const data = {};
    const errors = [];

    if (products.includes('company')) {
        logger.info('Getting company info...');
        try {
            data.company = await getCompany(accessToken);
        } catch (error) {
            logger.error(error);
            errors.push(error.message);
        }
    }

    if (products.includes('directory')) {
        logger.info('Getting directory info...');
        try {
            data.directory = await getDirectory(accessToken);
        } catch (error) {
            logger.error(error);
            errors.push(error.message);
        }
    }

    if (products.includes('employment') && data.directory) {
        logger.info('Getting employee info...');
        try {
            data.employment = await getEmployment(
                accessToken,
                data.directory.map((individual) => individual.id),
            );

            logger.info('syncing employees...');
            await employeeSync(data.employment, userId, keystone);
        } catch (error) {
            logger.error(error);
            errors.push(error.message);
        }
    }

    if (products.includes('payment')) {
        logger.info('Getting payment info...');
        try {
            data.payments = await getPayment(accessToken, new Date(2015, 1, 1));

            if (products.includes('pay_statement')) {
                logger.info('Syncing payments...');
                await paymentSync(data.payments, accessToken, keystone);
            }
        } catch (error) {
            logger.error(error);
            errors.push(error.message);
        }
    }

    logger.info('Updating finch account...');
    await updateItem({
        keystone,
        listKey: 'FinchAccount',
        item: {
            id: finchAccountId,
            data: {
                ...account,
                data: JSON.stringify(data),
                importErrors: JSON.stringify(errors),
                syncing: false,
            },
        },
        returnFields: 'id',
    });

    logger.info(`Done for account id ${finchAccountId}`);
    return done(null, true);
};
