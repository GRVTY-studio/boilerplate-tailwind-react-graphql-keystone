const {
    getItems,
    createItem,
    updateItem,
} = require('@keystonejs/server-side-graphql-client');
const eachLimit = require('async/eachLimit');

module.exports = async (employees, userId, keystone) => {
    eachLimit(
        Object.values(employees),
        3,
        async (employee) => {
            const data = {
                externalId: employee.id,
                name: `${employee.first_name} ${employee.middle_name || ''} ${
                    employee.last_name
                }`,
                startDate: employee.start_date,
                endDate: employee.end_date,
                incomeUnit: employee.income && employee.income.unit,
                incomeAmount: employee.income && employee.income.amount,
                incomeCurrency: employee.income && employee.income.currency,
                department: employee.department && employee.department.name,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            };
            const existingEmployee = await getItems({
                keystone,
                listKey: 'Employee',
                returnFields: 'id',
                where: { externalId: employee.id },
            });

            if (existingEmployee.length > 0) {
                return updateItem({
                    keystone,
                    listKey: 'Employee',
                    item: {
                        id: existingEmployee[0].id,
                        data,
                    },
                    returnFields: 'id',
                });
            }

            return createItem({
                keystone,
                listKey: 'Employee',
                item: data,
                returnFields: `id`,
            });
        },
        (err) => {
            if (err) {
                throw err;
            }
        },
    );
};
