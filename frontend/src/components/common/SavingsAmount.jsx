import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const SavingsAmount = ({ amount }) => (
    <span className="text-green-PROJECT_NAME font-bold text-2xl serif-pro mr-2">
        <NumberFormat
            value={amount}
            prefix="$"
            displayType="text"
            thousandSeparator
        />
    </span>
);

SavingsAmount.propTypes = {
    amount: PropTypes.number.isRequired,
};

SavingsAmount.defaultProps = {};

export default SavingsAmount;
