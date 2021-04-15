import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { ReactComponent as ShowPasswordIcon } from '../../img/svg/password-show-icon.svg';
import { ReactComponent as HidePasswordIcon } from '../../img/svg/password-hide-icon.svg';

const PasswordInput = ({
    onChange,
    error,
    placeholder,
    label,
    name,
    register,
    defaultValue,
    disabled,
    allowShowPassword,
    autoComplete,
}) => {
    const [passwordToggle, setPasswordToggle] = useState(true);
    const getIcon = () => {
        if (!allowShowPassword) return null;

        if (passwordToggle) return ShowPasswordIcon;
        return HidePasswordIcon;
    };
    return (
        <Input
            icon={getIcon()}
            type={passwordToggle ? 'password' : 'text'}
            onIconClick={() => setPasswordToggle(!passwordToggle)}
            onChange={onChange}
            error={error}
            placeholder={placeholder}
            label={label}
            name={name}
            register={register}
            defaultValue={defaultValue}
            disabled={disabled}
            autoComplete={autoComplete}
        />
    );
};

PasswordInput.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    register: PropTypes.func,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    allowShowPassword: PropTypes.bool.isRequired,
    autoComplete: PropTypes.string,
};

PasswordInput.defaultProps = {
    error: false,
    placeholder: '',
    label: '',
    register: () => {},
    onChange: () => {},
    defaultValue: '',
    disabled: false,
    autoComplete: undefined,
};

export default PasswordInput;
