/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { PropTypes } from 'prop-types';

const AddInput = ({
    onChange,
    error,
    placeholder,
    label,
    name,
    type,
    register,
    defaultValue,
    disabled,
    value,
    key,
}) => {
    let style = 'input primary rounded-r-lg';
    if (disabled) {
        style = `${style} disabled`;
    }
    if (error) {
        style = `${style} error`;
    }
    if (type === 'currency') {
        style = `${style} currency`;
    }

    return (
        <div className="flex flex-col w-full" key={key}>
            {(label || error) && (
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
                <div className="relative input-button-container">
                    <input
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
                    <button type="submit" className="input-button">
                        <span
                            className="w-full h-full"
                            style={{ marginRight: '1px' }}
                        >
                            +
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

AddInput.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    icon: PropTypes.shape({ render: PropTypes.func }),
    register: PropTypes.func,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    key: PropTypes.string,
};

AddInput.defaultProps = {
    error: false,
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
};

export default AddInput;
