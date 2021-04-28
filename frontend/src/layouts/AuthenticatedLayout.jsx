import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { matchPropShape, navItems } from '../tools/utilities/transforms';
import Navbar from '../components/nav/Navbar';

const AuthenticatedLayout = ({ children, match }) => {
    const { params: { path: defaultNavItem } = {} } = match || {};
    const [current, setCurrent] = useState(navItems.overview);

    return (
        <div className="w-full h-screen flex flex-row justify-center items-start bg-white-pale">
            <Navbar
                current={defaultNavItem || current}
                setCurrent={setCurrent}
                additionalMessage={null}
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
};
AuthenticatedLayout.defaultProps = {
    children: null,
};

export default withRouter(AuthenticatedLayout);
