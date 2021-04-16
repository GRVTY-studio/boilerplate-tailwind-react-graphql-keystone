import { gql } from 'graphql-request';

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
