import { gql } from 'graphql-request';

export const ADDUSER_MUTATION = gql`
    mutation AddUser(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String!
    ) {
        createUser(
            data: {
                email: $email
                password: $password
                firstName: $firstName
                lastName: $lastName
            }
        ) {
            email
            id
        }
    }
`;

export const SIGNIN_MUTATION = gql`
    mutation signin($email: String, $password: String) {
        authenticate: authenticateUserWithPassword(
            email: $email
            password: $password
        ) {
            item {
                id
            }
        }
    }
`;

export const LOGOUT_MUTATION = gql`
    mutation {
        unauthenticate: unauthenticateUser {
            success
        }
    }
`;

export const CREATE_COMPANY = gql`
    mutation createCompany(
        $legalName: String!
        $dba: String!
        $industry: String!
        $website: String!
        $yearOfIncorporation: Int!
        $businessType: String!
        $userId: ID!
    ) {
        createCompany(
            data: {
                legalName: $legalName
                dba: $dba
                industry: $industry
                website: $website
                yearOfIncorporation: $yearOfIncorporation
                businessType: $businessType
                user: { connect: { id: $userId } }
            }
        ) {
            id
            legalName
            dba
            industry
            website
            yearOfIncorporation
            businessType
        }
    }
`;

export const CREATE_QUOTE = gql`
    mutation createQuote(
        $userId: ID!
        $fiscalYear: Int!
        $estimatedPayroll: Int!
        $estimatedSupplies: Int!
        $hasUSABasedEmployees: Boolean!
        $minAmount: Int!
        $maxAmount: Int!
        $projects: String
    ) {
        createQuote(
            data: {
                fiscalYear: $fiscalYear
                user: { connect: { id: $userId } }
                estimatedPayroll: $estimatedPayroll
                estimatedSupplies: $estimatedSupplies
                hasUSABasedEmployees: $hasUSABasedEmployees
                minAmount: $minAmount
                maxAmount: $maxAmount
                projects: $projects
            }
        ) {
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
`;

export const UPDATE_USER = gql`
    mutation updateUser(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String!
    ) {
        updateAuthenticatedUser(
            data: {
                email: $email
                password: $password
                firstName: $firstName
                lastName: $lastName
            }
        ) {
            id
        }
    }
`;

export const UPDATE_COMPANY = gql`
    mutation updateCompany(
        $website: String
        $yearOfIncorporation: Int
        $id: ID!
        $legalName: String
        $industry: String
        $dba: String
        $businessType: String
    ) {
        updateCompany(
            id: $id
            data: {
                website: $website
                yearOfIncorporation: $yearOfIncorporation
                legalName: $legalName
                industry: $industry
                dba: $dba
                businessType: $businessType
            }
        ) {
            id
            legalName
            dba
            industry
            website
            yearOfIncorporation
            businessType
        }
    }
`;

export const UPDATE_QUOTE = gql`
    mutation updateQuote(
        $estimatedPayroll: Int!
        $estimatedSupplies: Int!
        $hasUSABasedEmployees: Boolean!
        $id: ID!
        $minAmount: Int!
        $maxAmount: Int!
        $projects: String
    ) {
        updateQuote(
            id: $id
            data: {
                estimatedPayroll: $estimatedPayroll
                estimatedSupplies: $estimatedSupplies
                hasUSABasedEmployees: $hasUSABasedEmployees
                minAmount: $minAmount
                maxAmount: $maxAmount
                projects: $projects
            }
        ) {
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
`;

export const LOG_OUT = gql`
    mutation {
        unauthenticate: unauthenticateUser {
            success
        }
    }
`;

export const REQUEST_PASSWORD_RESET = gql`
    mutation requestResetPassword($email: String!) {
        requestResetPassword(email: $email) {
            success
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation resetPassword($token: String!, $password: String!) {
        resetPassword(token: $token, password: $password) {
            success
        }
    }
`;

export const ADD_INTEGRATION = gql`
    mutation createIntegration(
        $provider: IntegrationProviderType!
        $code: String!
        $userId: ID!
    ) {
        createIntegration(
            data: {
                provider: $provider
                finchAccount: { create: { code: $code } }
                user: { connect: { id: $userId } }
            }
        ) {
            id
            provider
            finchAccount {
                id
                providerName
                providerLogo
            }
        }
    }
`;

export const UPDATE_FINCH_ACCOUNT = gql`
    mutation updateFinch($code: String!, $id: ID!) {
        updateFinchAccount(id: $id, data: { code: $code }) {
            id
            providerName
            providerLogo
        }
    }
`;

export const ADD_YEARLY_INCOME = gql`
    mutation createIncome($data: [YearlyIncomesCreateInput]!) {
        createYearlyIncomes(data: $data) {
            id
            fiscalYear
            amount
            timeSpentOnRND
            adjustedAmount
            employee {
                id
            }
        }
    }
`;

export const UPDATE_YEARLY_INCOME = gql`
    mutation updateIncome($data: [YearlyIncomesUpdateInput]!) {
        updateYearlyIncomes(data: $data) {
            id
            fiscalYear
            amount
            timeSpentOnRND
            adjustedAmount
            employee {
                id
            }
        }
    }
`;
