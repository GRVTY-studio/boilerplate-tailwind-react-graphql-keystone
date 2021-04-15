// Access control functions
const isAdmin = ({ authentication: { item: user } }) =>
    Boolean(user && user.isAdmin);

const isUser = ({ authentication: { item: user } }) => {
    if (!user) {
        return false;
    }

    return { id: user.id };
};

const ownsItemViaUser = async ({ authentication: { item: user } }) => {
    if (!user) {
        return false;
    }

    return { user: { id: user.id } };
};

const ownsItemViaIntegration = async ({ authentication: { item: user } }) => {
    if (!user) {
        return false;
    }

    return { integration: { user: { id: user.id } } };
};

const ownsItemViaEmployee = async ({ authentication: { item: user } }) => {
    if (!user) {
        return false;
    }

    return { employee: { user: { id: user.id } } };
};

const isAdminOrUser = (auth) => isAdmin(auth) || isUser(auth);

const isAdminOrOwner = async (auth) => isAdmin(auth) || ownsItemViaUser(auth);

const isAdminOrIntegrationOwner = async (auth) =>
    isAdmin(auth) || ownsItemViaIntegration(auth);

const isAdminOrEmployeeOwner = async (auth) =>
    isAdmin(auth) || ownsItemViaEmployee(auth);

module.exports = {
    isUser,
    isAdmin,
    ownsItemViaUser,
    ownsItemViaIntegration,
    ownsItemViaEmployee,
    isAdminOrOwner,
    isAdminOrIntegrationOwner,
    isAdminOrEmployeeOwner,
    isAdminOrUser,
};
