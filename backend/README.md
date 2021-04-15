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

### Create a quote

```graphql
mutation createQuote($userId: ID!, $fiscalYear: Int!) {
    createQuote(
        data: { fiscalYear: $fiscalYear, user: { connect: { id: $userId } } }
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
```

### Update a quote

```graphql
mutation updateQuote(
    $estimatedPayroll: Int!
    $estimatedSupplies: Int!
    $projects: String!
    $id: ID!
) {
    updateQuote(
        id: $id
        data: {
            estimatedPayroll: $estimatedPayroll
            estimatedSupplies: $estimatedSupplies
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
```

**Note:** Use the `projects` field as a comma-separated list of strings

### Get logged-in user quotes

```graphql
query {
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
```

**Note:** Use the `projects` field as a comma-separated list of strings

### List available company industries

```graphql
query {
    allIndustries {
        industries
    }
}
```

### Create a company

```graphql
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
```

**Note:** Use the `allIndustries` query to get a list of available industries. Valid business types are: 'Sole Proprietorship', 'Partnership', 'Corporation', 'S Corporation', and 'Limited Liability Company (LLC)'.

### Update a company

```graphql
mutation updateCompany(
    $website: String!
    $yearOfIncorporation: Int!
    $id: ID!
) {
    updateCompany(
        id: $id
        data: { website: $website, yearOfIncorporation: $yearOfIncorporation }
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
```

### Get logged-in user company details

```graphql
query {
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
```

### Create an integration

```graphql
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
            syncing
            providerName
            providerLogo
        }
    }
}
```

**Note:** The only provider currently available is "finch".

### Get logged-in user integration details

```graphql
query {
    authenticatedUser {
        integrations {
            id
            provider
            finchAccount {
                providerName
                providerLogo
            }
        }
    }
}
```

### Get logged-in user employees by date

```graphql
query employeesByYear($startDate: String!, $endDate: String!) {
    authenticatedUser {
        employees(
            where: {
                OR: [
                    { AND: [{ startDate: null }, { endDate: null }] }
                    {
                        AND: [
                            { startDate_lt: $endDate }
                            {
                                OR: [
                                    { endDate: null }
                                    { endDate_gt: $startDate }
                                ]
                            }
                        ]
                    }
                ]
            }
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
                fiscalYear
                amount
                timeSpentOnRND
                adjustedAmount
            }
        }
    }
}
```

### Query yearly incomes

```graphql
query incomeForYear($year: Int!) {
    allYearlyIncomes(where: { fiscalYear: $year }) {
        fiscalYear
        amount
        integrationAmount
        timeSpentOnRND
        adjustedAmount
        employee {
            id
        }
    }
}
```

**Note:** `integrationAmount` is the yearly income extracted from existing integrations (like Finch), and it shouldn't be overwritten - instead, to override it with a user-provided value, use the `amount` field.

### Create yearly income information

```graphql
mutation createIncome($employeeId: ID!, $fiscalYear: Int!, $amount: Int!) {
    createYearlyIncome(
        data: {
            employee: { connect: { id: $employeeId } }
            fiscalYear: $fiscalYear
            amount: $amount
        }
    ) {
        id
        fiscalYear
        amount
        timeSpentOnRND
        adjustedAmount
        employee {
            id
            name
            department
        }
    }
}
```

### Update yearly income information

```graphql
mutation updateIncome($amount: Int!, $timeSpentOnRND: Int!, $id: ID!) {
    updateYearlyIncome(
        id: $id
        data: { amount: $amount, timeSpentOnRND: $timeSpentOnRND }
    ) {
        id
        fiscalYear
        amount
        timeSpentOnRND
        adjustedAmount
    }
}
```

**Note:** `integrationAmount` is the yearly income extracted from existing integrations (like Finch), and it shouldn't be overwritten - instead, to override it with a user-provided value, use the `amount` field.
