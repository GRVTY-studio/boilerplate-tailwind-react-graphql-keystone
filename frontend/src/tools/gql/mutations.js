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
