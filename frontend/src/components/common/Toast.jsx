import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CheckIcon } from '../../img/svg/task-check-icon.svg';
import { ReactComponent as ErrorIcon } from '../../img/svg/error-icon.svg';

const Toast = ({ content, success, error }) => (
    <div className="w-full h-screen z-50 flex items-end justify-center fixed animate-slide-up-fade-out">
        <div
            className={`${success ? 'bg-green-bright' : ''} ${
                error ? 'bg-red-error' : ''
            }
        
         w-56 h-12 text-white relative rounded-full mb-20 flex`}
        >
            <div className="w-full flex items-center justify-center text-sm mr-2">
                {content}
            </div>
            {success && (
                <CheckIcon className="fill-current text-yellow-goldenrod absolute right-2 top-3" />
            )}
            {error && <ErrorIcon className="absolute right-2 top-3" />}
        </div>
    </div>
);

Toast.propTypes = {
    content: PropTypes.string.isRequired,
    success: PropTypes.bool,
    error: PropTypes.bool,
};

Toast.defaultProps = {
    success: false,
    error: false,
};

export default Toast;
