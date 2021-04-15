import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import Button from '../common/Button';
import RdActivityDetails from '../forms/RdActivityDetails';
import { ReactComponent as BackIcon } from '../../img/svg/back-icon.svg';
import { quotePropShape } from '../../tools/utilities/transforms';
import { updateQuoteThunk } from '../../tools/redux/thunks/quoteThunks';
import { getSavingsEstimate } from '../../tools/utilities/helpers';

const EditEstimate = ({ quote }) => {
    const dispatch = useDispatch();
    const [showQuote, setShowQuote] = useState();

    const update = (data) => {
        const quoteData = {
            ...data,
            id: quote?.id,
            minAmount: getSavingsEstimate(
                data.estimatedSupplies,
                data.estimatedPayroll,
            ),
            maxAmount: getSavingsEstimate(
                data.estimatedSupplies,
                data.estimatedPayroll,
            ),
        };

        dispatch(updateQuoteThunk(quoteData)).then(() => {
            setShowQuote(true);
        });
    };

    if (showQuote) {
        return <Redirect to="/overview/dashboard" />;
    }

    return (
        <div className="flex flex-col items-start justify-center">
            <div className="w-full flex flex-row justify-between items-center mb-16">
                <div className="grid grid-flow-col gap-5 items-center">
                    <NavLink to="/dashboard">
                        <BackIcon />
                    </NavLink>
                    <h1>Edit estimate</h1>
                </div>
                <Button primary content="Save" form="rd-detail-form" submit />
            </div>
            <div className="round-card-container p-16">
                <RdActivityDetails wide quote={quote} onSubmit={update} />
            </div>
        </div>
    );
};

EditEstimate.propTypes = {
    quote: PropTypes.shape(quotePropShape),
};

EditEstimate.defaultProps = { quote: undefined };

export default EditEstimate;
