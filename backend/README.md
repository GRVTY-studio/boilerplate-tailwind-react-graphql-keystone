# PROJECT_NAME.TOP_LEVEL_DOMAIN Backend

## Running the Project

-   To build the project, run `yarn docker-build`.
-   To run in dev mode, run `yarn docker-dev`.
-   To run in production mode, run `yarn docker-prod`.

Alternatively, to run the Keystone server in a more manual fashion:

-   Run `docker-compose up mongodb redis` to start Mongo and Redis.
-   Run `yarn dev` to start Keystone.

**Notes:**

-   Some environment vars are required to run, see `.env.sample` for the list. Using an `.env` file is supported.
-   To enable sending emails in local development, you'll need to run under AWS credentials that allow access to `ses:SendEmail`.
-   When running in production, make sure to set the `COOKIE_SECRET` environment variable.
-   On the initial run, an admin user will be generated and the credentials will be logged to the console. Note them, as they will be needed in order to access the admin panel.

## Working with the API

### Creating a new user

```graphql
mutation AddUser($email: String!, $password: String!) {
    createUser(data: { email: $email, password: $password }) {
        email
        id
    }
}
```

### Password auth

```graphql
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
```

This will save a `keystone.sid` authentication cookie. Subsequent requests will be authenticated - make sure to include cookies in requests.

### Google Auth

Navigate to `[BACKEND_URL]/auth/google` to start the process. Same auth cookie will be saved.

### Getting logged-in user data

```graphql
query {
    authenticatedUser {
        id
        email
        firstName
        lastName
    }
}
```

### Update logged-in user

```graphql
mutation uodateUser($password: String!) {
    updateAuthenticatedUser(data: { password: $password }) {
        id
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
    resetPassword(token: $token, password: $password) {
        success
    }
}
```