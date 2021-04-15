import { gql } from 'graphql-request';

export const GET_ALL_INDUSTRIES = gql`
    query {
        allIndustries {
            industries
        }
    }
`;

export const GET_COMPANY = gql`
    query GetCompany {
        authenticatedUser {
            company {
                id
                legalName
                dba
                industry
                website
                yearOfIncorporation
                businessType
            }
        }
    }
`;

export const GET_QUOTES = gql`
    query GetQuotes {
        authenticatedUser {
            quotes {
                id
                fiscalYear
                hasUSABasedEmployees
                estimatedPayroll
                estimatedSupplies
                minAmount
                maxAmount
                projects
            }
        }
    }
`;

export const GET_USER = gql`
    query GetUser {
        authenticatedUser {
            id
            email
            firstName
            lastName
        }
    }
`;

export const GET_USER_CONFIG = gql`
    query GetUserConfig {
        allIndustries {
            industries
        }
        authenticatedUser {
            _employeesMeta {
                count
            }
            id
            email
            firstName
            lastName
            integrations {
                id
                provider
                finchAccount {
                    id
                    providerName
                    providerLogo
                }
            }
            quotes {
                id
                fiscalYear
                hasUSABasedEmployees
                estimatedPayroll
                estimatedSupplies
                minAmount
                maxAmount
                projects
            }
            employees(
                first: 1
                where: { yearlyIncome_some: { adjustedAmount_not: null } }
            ) {
                id
                name
                startDate
                endDate
                incomeUnit
                incomeAmount
                incomeCurrency
                department
                yearlyIncome {
                    id
                    fiscalYear
                    amount
                    timeSpentOnRND
                    adjustedAmount
                }
            }
            company {
                id
                legalName
                dba
                industry
                website
                yearOfIncorporation
                businessType
            }
        }
    }
`;

export const GET_INTEGRATIONS = gql`
    query GetIntegrations {
        authenticatedUser {
            integrations {
                id
                provider
                finchAccount {
                    id
                    providerName
                    providerLogo
                }
            }
        }
    }
`;

export const GET_EMPLOYEES = gql`
    query getEmployees(
        $department: String
        $sortBy: [SortEmployeesBy!]
        $first: Int!
        $skip: Int!
    ) {
        authenticatedUser {
            _employeesMeta {
                count
            }
            employees(
                first: $first
                skip: $skip
                where: { department: $department }
                sortBy: $sortBy
            ) {
                id
                name
                startDate
                endDate
                incomeUnit
                incomeAmount
                incomeCurrency
                department
                yearlyIncome {
                    id
                    fiscalYear
                    amount
                    timeSpentOnRND
                    adjustedAmount
                }
            }
        }
    }
`;

export const GET_YEARLY_INCOME = gql`
    query GetFirstYearlyIncome {
        authenticatedUser {
            employees(
                where: { yearlyIncome_some: { adjustedAmount_not: null } }
            ) {
                id
                name
                startDate
                endDate
                incomeUnit
                incomeAmount
                incomeCurrency
                department
                yearlyIncome {
                    id
                    fiscalYear
                    amount
                    timeSpentOnRND
                    adjustedAmount
                }
            }
        }
    }
`;
