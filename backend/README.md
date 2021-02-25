# boilerplate-tailwind-react-graphql-keystone Backend

## Running the Project

- To build the project, run `yarn docker-build`.
- To run in dev mode, run `yarn docker-dev`.
- To run in production mode, run `yarn docker-prod`.

**Note:** When running in production, make sure to set the `COOKIE_SECRET` environment variable.

## Working with the API

### Creating a new user

```graphql
mutation AddUser($email: String!, $password: String!) {
  createUser(data: { email: $email, password: $password }) {
    email,
    id
  }
}
```

### Password auth

```graphql
mutation signin($email: String, $password: String) {
  authenticate: authenticateUserWithPassword(email: $email, password: $password) {
    item {
      id
    }
  }
}
```

This will save a `keystone.sid` authentication cookie. Subsequent requests will be authenticated - make sure to include cookies in requests.

### Google Auth

Navigate to `[BACKEND_URL]/auth/google` to start the process. Same auth cookie will be saved.

### Getting logged-in user data

```graphql
query {
  authenticatedUser {
    id,
    email
  }
}
```

### Logging out

```graphql
mutation {
  unauthenticate: unauthenticateUser {
    success
  }
}
```

### Requesting a password reset

```graphql
mutation resetpass($email: String!) {
  requestResetPassword(email: $email) {
    success
  }
}
```

### Resetting the password

```graphql
mutation resetpass($token: String!, $password: String!) {
  resetPassword(token: $token, password:$password) {
    success
  }
}
```