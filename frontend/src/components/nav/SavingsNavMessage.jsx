import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as QuestionIcon } from '../../img/svg/question-icon.svg';
import SavingsAmount from '../common/SavingsAmount';
import { tasks } from '../../tools/utilities/transforms';
import { updateTaskConfirmation } from '../../tools/redux/slices/taskConfirmationSlice';

const SavingsNavMessage = ({ amount = 0 }) => {
    const dispatch = useDispatch();
    const showQuote = () =>
        dispatch(updateTaskConfirmation({ key: tasks.showQuote.key }));

    return (
        <div className="font-normal text-blue-gray inter flex flex-row items-center">
            <SavingsAmount amount={amount} /> estimated eligible savings
            <button type="button" onClick={showQuote}>
                <QuestionIcon className="ml-2" />
            </button>
        </div>
    );
};

SavingsNavMessage.propTypes = {
    amount: PropTypes.number.isRequired,
};

SavingsNavMessage.defaultProps = {};

export default SavingsNavMessage;
