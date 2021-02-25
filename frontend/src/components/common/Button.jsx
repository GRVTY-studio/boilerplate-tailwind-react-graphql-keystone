import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowIcon } from '../../img/svg/arrow-white.svg';

const Button = ({ onClick, content, disabled, submit, primary }) => {
    let style = 'btn';

    if (primary) {
        style = disabled ? 'btn-primary-disabled' : 'btn-primary';
    }
    return (
        <button
            type={submit ? 'submit' : 'button'}
            onClick={disabled ? null : onClick}
            tabIndex={disabled ? -1 : 0}
            className={`relative ${style}`}
        >
            <span className="justify-self-center">{content}</span>
            {primary && (
                <ArrowIcon className="absolute right-5 h-full flex items-center justify-center bottom-0 fill-current" />
            )}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    content: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    submit: PropTypes.bool,
    primary: PropTypes.bool,
};

Button.defaultProps = {
    onClick: () => {},
    disabled: false,
    submit: false,
    primary: false,
};

export default Button;
