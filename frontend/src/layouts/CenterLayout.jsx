import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const CenterLayout = ({ children }) => (
    <div className="w-full h-screen flex flex-col items-center mt-28">
        <div
            className="w-full flex flex-col items-center"
            style={{ maxWidth: '1440px' }}
        >
            <div className="w-4/5 items-center">{children}</div>
        </div>
        <div className="text-blue-gray-medium font-normal text-sm fixed bottom-10 left-10">
            &copy;{` ${new Date().getFullYear()} PROJECT_NAME inc.`}
        </div>
    </div>
);

CenterLayout.propTypes = {
    children: PropTypes.element,
};
CenterLayout.defaultProps = {
    children: null,
};

export default withRouter(CenterLayout);
