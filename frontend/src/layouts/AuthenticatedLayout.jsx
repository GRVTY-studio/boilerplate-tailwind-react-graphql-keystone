import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
    matchPropShape,
    navItems,
    quotePropShape,
} from '../tools/utilities/transforms';
import Navbar from '../components/nav/Navbar';
import SavingsNavMessage from '../components/nav/SavingsNavMessage';
import { getSavingsEstimate } from '../tools/utilities/helpers';

const AuthenticatedLayout = ({
    children,
    match,
    lastQuote,
    hasAddedIntegration,
    hasMarkedRNDActivity,
    hasQuote,
}) => {
    const { params: { path: defaultNavItem } = {} } = match || {};
    const [current, setCurrent] = useState(navItems.overview);

    const getTaskCount = () => {
        let tasks = 0;

        if (!hasQuote) tasks += 1;
        if (!hasAddedIntegration) tasks += 1;
        if (!hasMarkedRNDActivity) tasks += 1;

        return tasks;
    };
    const tasks = getTaskCount();
    const amount = getSavingsEstimate(
        lastQuote?.estimatedPayroll,
        lastQuote?.estimatedSupplies,
    );

    return (
        <div className="w-full h-screen flex flex-row justify-center items-start bg-white-pale">
            <Navbar
                current={defaultNavItem || current}
                setCurrent={setCurrent}
                tasks={tasks}
                additionalMessage={
                    lastQuote ? <SavingsNavMessage amount={amount} /> : null
                }
            />
            <div
                className="w-full flex flex-col mt-32 items-center justify-center"
                style={{ maxWidth: '1440px' }}
            >
                <div className="w-4/6 mb-20">{children}</div>
            </div>
        </div>
    );
};

AuthenticatedLayout.propTypes = {
    children: PropTypes.element,
    match: PropTypes.shape(matchPropShape).isRequired,
    lastQuote: PropTypes.shape(quotePropShape),
    hasAddedIntegration: PropTypes.bool.isRequired,
    hasMarkedRNDActivity: PropTypes.bool.isRequired,
    hasQuote: PropTypes.bool.isRequired,
};
AuthenticatedLayout.defaultProps = {
    children: null,
    lastQuote: null,
};

export default withRouter(AuthenticatedLayout);
