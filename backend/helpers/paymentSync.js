const {
    getItems,
    createItem,
    updateItem,
} = require('@keystonejs/server-side-graphql-client');
const eachLimit = require('async/eachLimit');

const { getPayStatements } = require('./finch');
const logger = require('./logger')('Payment Sync');

const dayOfYear = (date) =>
    Math.floor(
        (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24,
    );

module.exports = async (payments, token, keystone) => {
    const payStatements = await getPayStatements(token, payments);

    await eachLimit(payStatements, 3, async (payStatement) => {
        const externalId = `${payStatement.payment_id}#${payStatement.individual_id}`;

        const existingPayment = await getItems({
            keystone,
            listKey: 'Payment',
            returnFields: 'id',
            where: { externalId },
        });

        if (existingPayment.length > 0) {
            return;
        }

        const employee = await getItems({
            keystone,
            listKey: 'Employee',
            returnFields: 'id',
            where: { externalId: payStatement.individual_id },
        });

        if (employee.length > 0) {
            await createItem({
                keystone,
                listKey: 'Payment',
                item: {
                    externalId,
                    payPeriodStartDate: payStatement.pay_period.start_date,
                    payPeriodEndDate: payStatement.pay_period.end_date,
                    payDate: payStatement.pay_date,
                    netPay: payStatement.net_pay.amount,
                    grossPay: payStatement.gross_pay.amount,
                    earnings: (payStatement.earnings || []).reduce(
                        (sum, earning) => sum + earning.amount,
                        0,
                    ),
                    taxes: (payStatement.taxes || []).reduce(
                        (sum, tax) => sum + tax.amount,
                        0,
                    ),
                    deductions: (payStatement.employee_deductions || []).reduce(
                        (sum, deduction) => sum + deduction.amount,
                        0,
                    ),
                    contributions: (
                        payStatement.employer_contributions || []
                    ).reduce(
                        (sum, contribution) => sum + contribution.amount,
                        0,
                    ),
                    employee: {
                        connect: {
                            id: employee[0].id,
                        },
                    },
                },
                returnFields: `id`,
            });
        } else {
            logger.error(
                `Payment import: could not find employee id ${payStatement.individual_id}`,
            );
        }
    });

    const employees = await getItems({
        keystone,
        listKey: 'Employee',
        returnFields: 'id',
        where: { externalId_in: payStatements.map((s) => s.individual_id) },
    });

    await eachLimit(employees, 3, async (employee) => {
        try {
            const statements = await getItems({
                keystone,
                listKey: 'Payment',
                returnFields:
                    'id, payPeriodStartDate, payPeriodEndDate, grossPay',
                where: { employee: { id: employee.id } },
            });

            const yearlyPayments = statements.reduce((agg, statement) => {
                const payPeriodStart = new Date(statement.payPeriodStartDate);
                const payPeriodEnd = new Date(statement.payPeriodEndDate);
                const payPeriodStartYear = payPeriodStart.getFullYear();
                const payPeriodEndYear = payPeriodEnd.getFullYear();

                if (payPeriodStartYear === payPeriodEndYear) {
                    const paymentSum =
                        (agg[payPeriodStartYear] || 0) + statement.grossPay;

                    return {
                        ...agg,
                        [payPeriodStartYear]: paymentSum,
                    };
                }

                // Payment spans across multiple years
                // Split up the amount proportionally
                const startYearDays = Math.max(
                    365 - dayOfYear(payPeriodStart),
                    0,
                );
                const endYearDays = dayOfYear(payPeriodEnd);
                const totalDays = startYearDays + endYearDays;
                const paymentSumStartYear =
                    (agg[payPeriodStartYear] || 0) +
                    Math.floor(
                        (statement.grossPay * startYearDays) / totalDays,
                    );
                const paymentSumEndYear =
                    (agg[payPeriodEndYear] || 0) +
                    Math.floor((statement.grossPay * endYearDays) / totalDays);

                return {
                    ...agg,
                    [payPeriodStartYear]: paymentSumStartYear,
                    [payPeriodEndYear]: paymentSumEndYear,
                };
            }, {});

            eachLimit(Object.keys(yearlyPayments), 3, async (year) => {
                const yearlySum = yearlyPayments[year];
                const existingYearlyIncome = await getItems({
                    keystone,
                    listKey: 'YearlyIncome',
                    returnFields: 'id',
                    where: {
                        employee: { id: employee.id },
                        fiscalYear: parseInt(year, 10),
                    },
                });

                if (existingYearlyIncome.length > 0) {
                    await updateItem({
                        keystone,
                        listKey: 'YearlyIncome',
                        item: {
                            id: existingYearlyIncome[0].id,
                            data: {
                                integrationAmount: yearlySum,
                            },
                        },
                        returnFields: 'id',
                    });

                    return;
                }

                await createItem({
                    keystone,
                    listKey: 'YearlyIncome',
                    item: {
                        fiscalYear: parseInt(year, 10),
                        integrationAmount: yearlySum,
                        employee: {
                            connect: {
                                id: employee.id,
                            },
                        },
                    },
                    returnFields: `id`,
                });
            });
        } catch (error) {
            logger.error(error);
        }
    });
};
