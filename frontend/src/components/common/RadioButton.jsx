import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({ defaultChecked, label, name, id, register, value }) => (
    <label htmlFor={id} className="radio-button inline-flex mr-20">
        <input
            type="radio"
            name={name}
            id={id}
            defaultChecked={defaultChecked}
            ref={register}
            value={value}
        />
        <span className="radio-control">
            <span />
        </span>
        <span className="ml-5">{label}</span>
    </label>
);

RadioButton.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultChecked: PropTypes.bool,
    id: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

RadioButton.defaultProps = { defaultChecked: false };

export default RadioButton;
