import PropTypes from 'prop-types';

const navItems = {
    overview: 'overview',
    integrations: 'integrations',
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

const companyTypes = [
    'Sole Proprietorship',
    'Partnership',
    'Corporation',
    'S Corporation',
    'Limited Liability Company (LLC)',
];

const companyPropShape = {
    id: PropTypes.string,
    name: PropTypes.string,
    dba: PropTypes.string,
    industry: PropTypes.string,
    businessType: PropTypes.string,
    website: PropTypes.string,
    yearOfIncorporation: PropTypes.number,
};

const quotePropShape = {
    estimatedPayroll: PropTypes.number.isRequired,
    estimatedSupplies: PropTypes.number.isRequired,
    hasUSABasedEmployees: PropTypes.bool.isRequired,
    maxAmount: PropTypes.number,
    minAmount: PropTypes.number,
    id: PropTypes.number.isRequired,
};

const userPropShape = {
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
};

const finchAccountPropShape = {
    providerName: PropTypes.string.isRequired,
    providerLogo: PropTypes.string.isRequired,
};

const integrationPropShape = {
    id: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    finchAccount: PropTypes.shape(finchAccountPropShape).isRequired,
};

const tasks = {
    initialquote: { key: 'initialquote', name: 'Get initial quote' },
    markactivity: { key: 'markactivity', name: 'Mark R&D Activity' },
    connectaccountingsoftware: {
        key: 'connectaccountingsoftware',
        name: 'Connect payroll / HR software',
    },
    showQuote: { key: 'showQuote' },
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
    quotes: 'quotes',
    company: 'company',
    integrations: 'integrations',
    industries: 'industries',
    employees: 'employees',
    departments: 'departments',
    yearlyIncome: 'yearlyIncome',
    toast: 'toast',
    taskConfirmation: 'taskConfirmation',
};

const profileNavItems = {
    account: 'account',
    company: 'company',
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
    companyTypes,
    companyPropShape,
    quotePropShape,
    userPropShape,
    integrationPropShape,
    tasks,
    loadingTransform,
    sliceTransform,
    profileNavItems,
    columnPropShape,
};
