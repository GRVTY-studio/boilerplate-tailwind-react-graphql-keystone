import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { matchPropShape, pageTitles } from '../tools/utilities/transforms';

const UnAuthenticatedLayout = ({ children, match }) => {
    const { path } = match || {};

    return (
        <div className="w-full h-screen grid xl:flex xl:flex-col items-center justify-center">
            <div className="w-full flex flex-row items-center justify-between xl:fixed xl:top-0 xl:h-20 px-10">
                <h1>{pageTitles[path]}</h1>
            </div>
            <div
                className="w-full flex flex-col items-center justify-center"
                style={{ maxWidth: '1440px' }}
            >
                <div className="w-4/5 mb-20 flex items-center justify-center">
                    {children}
                </div>
            </div>
            <div className="text-blue-gray-medium font-normal text-sm flex items-center justify-center xl:fixed xl:bottom-10 xl:left-10 py-10 xl:py-0">
                &copy;{` ${new Date().getFullYear()} PROJECT_NAME inc.`}
            </div>
        </div>
    );
};

UnAuthenticatedLayout.propTypes = {
    children: PropTypes.element,
    match: PropTypes.shape(matchPropShape).isRequired,
};
UnAuthenticatedLayout.defaultProps = {
    children: null,
};

export default withRouter(UnAuthenticatedLayout);
