import React from 'react';
import { PropTypes } from 'prop-types';
import Select, { components } from 'react-select';
import { ReactComponent as DropDownArrow } from '../../img/svg/dropdown-arrow-icon.svg';
import Input from './Input';

const getBorderStyle = (error, focus) => {
    if (error) return '#FF613F';
    if (focus) return '#55AA17';

    return '#DFE4E6';
};

const getOptionColour = (selected, focus) => {
    if (selected) return '#55AA17';
    if (focus) return '#F4FBF6';

    return '#ffffff';
};

const Dropdown = ({
    selected,
    options,
    onChange,
    name,
    error,
    label,
    labelPosition,
    inputRef,
    disabled,
}) => (
    <div
        className={`flex ${
            labelPosition === 'top'
                ? 'flex-col'
                : 'flex-row items-center justify-center'
        } w-full`}
    >
        <div
            className={`flex flex-row ${
                labelPosition === 'top'
                    ? 'justify-between mb-2'
                    : 'justify-center items-center w-full'
            } inter-14 `}
        >
            <label htmlFor={name}>{label}</label>
            {error && (
                <label className="text-red-error" htmlFor={name}>
                    {error}
                </label>
            )}
        </div>
        <div className={`w-full `}>
            {disabled ? (
                <Input
                    disabled
                    value={selected}
                    register={inputRef}
                    name={name}
                />
            ) : (
                <Select
                    inputRef={inputRef}
                    name={name}
                    className="relative"
                    options={options}
                    defaultValue={{ value: selected, label: selected }}
                    onChange={onChange}
                    styles={{
                        control: (styles, { isFocused }) => ({
                            ...styles,
                            borderWidth: 2,
                            borderColor: getBorderStyle(error, isFocused),
                            width: '100%',
                            cursor: 'pointer',
                            borderRadius: '0.5rem',
                            boxShadow: null,
                            '&:hover': {
                                // Overwrittes the different states of border
                                borderColor: null,
                            },
                        }),
                        input: (styles) => ({
                            ...styles,
                            width: '100%',
                        }),
                        option: (styles, { isFocused, isSelected }) => ({
                            ...styles,
                            backgroundColor: getOptionColour(
                                isSelected,
                                isFocused,
                            ),
                            ':active': {
                                ...styles[':active'],
                                backgroundColor: '#A1C4AB',
                            },
                        }),
                    }}
                    components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator: (props) => (
                            <components.DropdownIndicator
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...props}
                            >
                                <DropDownArrow className="w-3 h-2 text-blue-gray fill-current" />
                            </components.DropdownIndicator>
                        ),
                    }}
                />
            )}
        </div>
    </div>
);

Dropdown.propTypes = {
    selected: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.number,
    ]),
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    label: PropTypes.string.isRequired,
    labelPosition: PropTypes.string,
    inputRef: PropTypes.shape(),
    disabled: PropTypes.bool,
};

Dropdown.defaultProps = {
    error: false,
    labelPosition: 'top',
    disabled: false,
    selected: undefined,
    inputRef: undefined,
};

export default Dropdown;
