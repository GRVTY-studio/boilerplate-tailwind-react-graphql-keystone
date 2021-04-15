const fetch = require('node-fetch');
const base64 = require('base-64');

const callAPI = async ({ endpoint, body, token = false, method = 'get' }) => {
    const response = await fetch(`https://api.tryfinch.com/${endpoint}`, {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Finch-API-Version': '2020-09-17',
            Authorization: token
                ? `Bearer ${token}`
                : `Basic ${base64.encode(
                      `${process.env.FINCH_CLIENT_ID}:${process.env.FINCH_CLIENT_SECRET}`,
                  )}`,
        },
    });

    return response.json();
};

module.exports = {
    exchangeCode: async (code) => {
        const data = await callAPI({
            endpoint: 'auth/token',
            body: { code },
            method: 'post',
        });
        const { access_token: accessToken, message } = data;

        if (message) {
            throw new Error(message);
        }

        return accessToken;
    },
    introspect: async (token) => {
        const data = await callAPI({
            endpoint: 'introspect',
            token,
        });
        const {
            message,
            client_id: clientId,
            username,
            products,
            payroll_provider_id: payrollProviderId,
        } = data;

        if (message) {
            throw new Error(message);
        }

        const providers = await callAPI({
            endpoint: 'providers',
        });

        const provider = providers.find((p) => p.id === payrollProviderId);

        return {
            clientId,
            username,
            products,
            providerId: payrollProviderId,
            providerName: provider.display_name,
            providerLogo: provider.logo,
            providerMfa: provider.mfa_required,
        };
    },
    getCompany: async (token) => {
        const data = await callAPI({
            endpoint: 'employer/company',
            token,
        });

        if (data.message) {
            throw new Error(data.message);
        }

        return data;
    },
    getDirectory: async (token) => {
        const data = await callAPI({
            endpoint: 'employer/directory',
            token,
        });

        if (data.message) {
            throw new Error(data.message);
        }

        return data.individuals;
    },
    getEmployment: async (token, ids) => {
        const data = await callAPI({
            endpoint: 'employer/employment',
            token,
            body: { requests: ids.map((id) => ({ individual_id: id })) },
            method: 'post',
        });

        if (data.message) {
            throw new Error(data.message);
        }

        return data.responses
            .filter((response) => response.code === 200)
            .map((response) => response.body)
            .reduce(
                (agg, response) => ({
                    ...agg,
                    [response.id]: response,
                }),
                {},
            );
    },
    getPayment: async (token, startDate) => {
        const formatDate = (date) => {
            const d = new Date(date);
            let month = `${d.getMonth() + 1}`;
            let day = `${d.getDate()}`;
            const year = d.getFullYear();

            if (month.length < 2) month = `0${month}`;
            if (day.length < 2) day = `0${day}`;

            return [year, month, day].join('-');
        };
        const data = await callAPI({
            endpoint: `employer/payment?start_date=${formatDate(
                startDate,
            )}&end_date=${formatDate(new Date())}`,
            token,
        });

        if (data.message) {
            throw new Error(data.message);
        }

        return data;
    },
    getPayStatements: async (token, payments) => {
        const data = await callAPI({
            endpoint: 'employer/pay-statement',
            token,
            body: {
                requests: payments.map((payment) => ({
                    payment_id: payment.id,
                })),
            },
            method: 'post',
        });

        if (data.message) {
            throw new Error(data.message);
        }

        return data.responses
            .filter((response) => response.code === 200)
            .map((response) =>
                response.body.pay_statements.map((statement) => ({
                    ...statement,
                    payment_id: response.payment_id,
                    pay_period: payments.find(
                        (p) => p.id === response.payment_id,
                    ).pay_period,
                    pay_date: payments.find((p) => p.id === response.payment_id)
                        .pay_date,
                })),
            )
            .reduce((agg, statements) => agg.concat(statements), []);
    },
};
