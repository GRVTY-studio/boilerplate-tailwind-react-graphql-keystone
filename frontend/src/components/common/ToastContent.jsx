import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CheckIcon } from '../../img/svg/task-check-icon.svg';
import { ReactComponent as ErrorIcon } from '../../img/svg/error-icon.svg';

const ToastContent = ({ message, toastProps }) => {
    const {
        toastProps: { type },
    } = toastProps;
    if (type === 'error')
        return (
            <div className="w-full flex flex-row whitespace-nowrap px-2 items-center justify-center">
                {message} <ErrorIcon className="ml-2" />
            </div>
        );

    return (
        <div className="w-full flex flex-row whitespace-nowrap px-2 items-center justify-center">
            {message}
            <CheckIcon className="fill-current text-yellow-goldenrod ml-2" />
        </div>
    );
};

ToastContent.propTypes = {
    message: PropTypes.string.isRequired,
    toastProps: PropTypes.shape({
        toastProps: PropTypes.shape({ type: PropTypes.string }),
    }).isRequired,
};

ToastContent.defaultProps = {};

export default ToastContent;
