import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.REACT_APP_API_URL;

const graphQLClient = new GraphQLClient(endpoint, {
    credentials: 'include',
    mode: 'cors',
});

export default graphQLClient;
