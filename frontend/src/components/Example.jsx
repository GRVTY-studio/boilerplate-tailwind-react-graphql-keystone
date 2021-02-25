import React from 'react';
import PropTypes from 'prop-types';

const Example = ({ prop }) => <div className='w-full h-screen bg-gray-500 flex items-center justify-center'>{prop}</div>;

Example.propTypes = {
    prop: PropTypes.string.isRequired,
};

Example.defaultProps = {};

export default Example;