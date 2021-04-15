import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ prop }) => <div>{prop}</div>;

Checkbox.propTypes = {
    prop: PropTypes.string.isRequired,
};

Checkbox.defaultProps = {};

export default Checkbox;
