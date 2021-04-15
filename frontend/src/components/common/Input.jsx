import React from 'react';
import { PropTypes } from 'prop-types';

const Input = ({
    onChange,
    error,
    placeholder,
    label,
    name,
    type,
    icon: Icon,
    onIconClick,
    register,
    defaultValue,
    disabled,
    value,
    key,
    autoComplete,
    small,
}) => {
    let style = 'input primary';
    if (disabled) {
        style = `${style} disabled`;
    }
    if (error) {
        style = `${style} error`;
    }
    if (small) {
        style = `${style} small`;
    }
    if (type === 'currency') {
        style = `${style} currency`;
    }

    return (
        <div className="flex flex-col w-full" key={key}>
            {label && (
                <div className="flex flex-row justify-between inter-14 mb-2">
                    <label className="text-blue-gray" htmlFor={name}>
                        {label}
                    </label>
                    {error && (
                        <label className="text-red-error" htmlFor={name}>
                            {error}
                        </label>
                    )}
                </div>
            )}
            <div className="w-full">
                <div className="relative">
                    <input
                        autoComplete={autoComplete}
                        disabled={disabled}
                        tabIndex={disabled ? -1 : 0}
                        style={{ outline: 'none', caretColor: '#8EC665' }}
                        defaultValue={defaultValue}
                        ref={register}
                        name={name}
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        className={style}
                        onChange={(e) => {
                            onChange(e.target.value);
                        }}
                        value={value}
                    />
                    {Icon && (
                        <span className="absolute inset-y-0 right-2 flex items-center pl-2">
                            <button
                                type="button"
                                onClick={onIconClick}
                                className="p-1"
                                tabIndex={disabled ? -1 : 0}
                            >
                                {Icon && <Icon />}
                            </button>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

Input.propTypes = {
    onChange: PropTypes.func,
    onIconClick: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    icon: PropTypes.shape({ render: PropTypes.func }),
    register: PropTypes.func,
    defaultValue: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.number,
    ]),
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.number,
    ]),
    key: PropTypes.string,
    autoComplete: PropTypes.string,
    small: PropTypes.bool,
};

Input.defaultProps = {
    error: false,
    onIconClick: () => {},
    placeholder: '',
    label: '',
    type: 'text',
    icon: null,
    register: () => {},
    onChange: () => {},
    defaultValue: '',
    value: undefined,
    key: undefined,
    disabled: false,
    autoComplete: undefined,
    small: false,
};

export default Input;
