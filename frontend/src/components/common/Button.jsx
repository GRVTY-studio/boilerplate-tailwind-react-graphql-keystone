import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowIcon } from '../../img/svg/arrow-icon.svg';
import { ReactComponent as GoogleIcon } from '../../img/svg/google-icon.svg';

export const GoogleButton = ({ onClick, disabled, content }) => (
    <button
        type="button"
        onClick={disabled ? null : onClick}
        tabIndex={disabled ? -1 : 0}
        className="btn google"
    >
        <GoogleIcon className="fill-current" />
        <span className="justify-self-center">{content} with Google</span>
        <ArrowIcon className="fill-current" />
    </button>
);

GoogleButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    content: PropTypes.string.isRequired,
};

GoogleButton.defaultProps = {
    onClick: () => {},
    disabled: false,
};

/**
 * Button component.
 *
 * @param {func} onClick - OnClick callback
 * @param {string} content - Button text
 * @param {string} disabled - Disables button
 * @param {bool} submit - Controls whether or not button submits form
 * @param {bool} primary - Primary styling
 * @param {bool} secondary - Secondary styling
 * @param {bool} arrow - Show arrow in button
 * @param {bool} small - Fixed width and height
 * @param {bool} fluid - Button will take up full width of container
 */
const Button = ({
    onClick,
    content,
    disabled,
    submit,
    primary,
    secondary,
    arrow,
    small,
    fluid,
    form,
    styleOverides,
}) => {
    let style = 'btn';

    if (fluid) {
        style = `${style} fluid`;
    }
    if (primary) {
        style = `${style} primary`;
    }
    if (small) {
        style = `${style} small`;
    }
    if (!small && !fluid) {
        style = `${style} base`;
    }
    if (disabled) {
        style = `${style} disabled`;
    }
    if (secondary) {
        style = `${style} secondary`;
    }

    return (
        <button
            type={submit ? 'submit' : 'button'}
            onClick={disabled ? null : onClick}
            tabIndex={disabled ? -1 : 0}
            className={`relative ${style}`}
            styles={{ outline: 'none' }}
            form={form}
            style={styleOverides}
        >
            <span className="justify-self-center">{content}</span>
            {arrow && (
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
    arrow: PropTypes.bool,
    small: PropTypes.bool,
    secondary: PropTypes.bool,
    fluid: PropTypes.bool,
    form: PropTypes.string,
    styleOverides: PropTypes.shape({}),
};

Button.defaultProps = {
    onClick: () => {},
    disabled: false,
    submit: false,
    primary: false,
    secondary: false,
    arrow: false,
    small: false,
    fluid: false,
    form: undefined,
    styleOverides: undefined,
};

export default Button;
