import PropTypes from 'prop-types';

const navItems = {
    overview: 'overview',
    profile: 'profile',
};

// Matches to path name and returns title of page
const pageTitles = {
    '/signup': 'Create account',
    '/login': 'Log in',
    '/forgotpassword': 'Forgot password',
    '/resetpassword': 'Reset password',
};

const locationPropShape = {
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    key: PropTypes.string,
};

const matchPropShape = {
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({}),
};

const validationMessages = {
    required: 'required',
};

const loadingKey = {
    default: 'default',
    PROJECT_NAMELarge: 'PROJECT_NAMELarge',
    quote: 'quote',
};

const userPropShape = {
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
};

const tasks = {
    showWelcomeModal1: { key: 'showWelcomeModal1' },
    showWelcomeModal2: { key: 'showWelcomeModal2' },
    unsavedChanges: { key: 'unsavedChanges' },
};
const loadingTransform = {
    initial: 'initial',
    idle: 'idle',
    pending: 'pending',
};

const sliceTransform = {
    auth: 'auth',
    toast: 'toast',
    taskConfirmation: 'taskConfirmation',
};

const profileNavItems = {
    account: 'account',
};

const columnPropShape = {
    header: PropTypes.string,
    accessor: PropTypes.string,
    canSort: PropTypes.bool,
    isSortedAsc: PropTypes.bool,
    isSortedDesc: PropTypes.bool,
    onSort: PropTypes.func,
};

export {
    navItems,
    locationPropShape,
    matchPropShape,
    pageTitles,
    validationMessages,
    loadingKey,
    userPropShape,
    tasks,
    loadingTransform,
    sliceTransform,
    profileNavItems,
    columnPropShape,
};
