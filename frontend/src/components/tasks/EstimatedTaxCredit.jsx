import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { NavLink } from 'react-router-dom';
import Button from '../common/Button';
import Modal from '../common/Modal';
import FoldedNote from '../common/FoldedNote';
import { quotePropShape } from '../../tools/utilities/transforms';
import { ReactComponent as CrossIcon } from '../../img/svg/cross-icon.svg';
import { clearTaskConfirmation } from '../../tools/redux/slices/taskConfirmationSlice';
import { getSavingsEstimate } from '../../tools/utilities/helpers';

const EstimatedTaxCredit = ({
    quote: { estimatedPayroll, estimatedSupplies, hasUSABasedEmployees },
    companyAge,
    isNew,
} = {}) => {
    const dispatch = useDispatch();
    const close = () => dispatch(clearTaskConfirmation());

    return (
        <Modal className="modal-content" transparent>
            <div className="modal-container p-10">
                {!isNew && (
                    <button type="button" onClick={close}>
                        <CrossIcon className="absolute z-20 top-5 right-5 cursor-pointer" />
                    </button>
                )}
                <h1>Estimated R&D Tax Credit</h1>
                <div className="w-full grid gap-2 items-center mt-5 text-lg">
                    <div className="w-full flex flex-row justify-between">
                        <div className="text-blue-gray">Wages</div>
                        <NumberFormat
                            className="text-gray-dark"
                            prefix="$"
                            displayType="text"
                            thousandSeparator
                            value={estimatedPayroll * 12}
                        />
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <div className="text-blue-gray"> Supplies</div>
                        <NumberFormat
                            className="text-gray-dark"
                            prefix="$"
                            displayType="text"
                            thousandSeparator
                            value={estimatedSupplies * 12}
                        />
                    </div>
                </div>
                <div className="border-b-2 border-gray-light-outline w-full my-5" />
                <div className="w-full flex flex-row justify-between">
                    <div className="text-blue-gray">Total</div>
                    <NumberFormat
                        className="text-black font-bold"
                        prefix="$"
                        displayType="text"
                        thousandSeparator
                        value={(estimatedPayroll + estimatedSupplies) * 12}
                    />
                </div>
                {companyAge < 6 && hasUSABasedEmployees && (
                    <div className="w-full text-sm font-semibold text-blue-gray-medium capitalize text-center mt-5">
                        ELIGIBLE SAVINGS
                    </div>
                )}
                <div className="my-10 w-full h-32">
                    <FoldedNote
                        extraClassNames={
                            companyAge < 6 && hasUSABasedEmployees
                                ? 'bg-green-pale'
                                : 'bg-blue-pale'
                        }
                        cornerColourClass={
                            companyAge < 6 && hasUSABasedEmployees
                                ? 'green'
                                : 'blue'
                        }
                    >
                        <div className="w-full h-full flex items-center justify-center px-5">
                            {companyAge > 5 || !hasUSABasedEmployees ? (
                                <div className="text-center leading-6 text-blue-dark ">
                                    <h2>More info needed</h2>
                                    <p>
                                        We`re assigning you an accountant who
                                        will be in touch with you shortly.
                                    </p>
                                </div>
                            ) : (
                                <div className="text-green-PROJECT_NAME text-4xl font-bold serif-pro">
                                    <NumberFormat
                                        prefix="$"
                                        displayType="text"
                                        thousandSeparator
                                        decimalScale={0}
                                        value={getSavingsEstimate(
                                            estimatedPayroll,
                                            estimatedSupplies,
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    </FoldedNote>
                </div>
                {isNew && (
                    <NavLink
                        to={{
                            pathname: '/dashboard/overview',
                        }}
                    >
                        <Button secondary content="View dashboard" />
                    </NavLink>
                )}
                {!isNew && (
                    <NavLink
                        to={{
                            pathname: '/dashboard/task/editestimate',
                        }}
                    >
                        <Button
                            secondary
                            content="Edit estimate"
                            onClick={close}
                        />
                    </NavLink>
                )}
            </div>
        </Modal>
    );
};

EstimatedTaxCredit.propTypes = {
    quote: PropTypes.shape(quotePropShape).isRequired,
    companyAge: PropTypes.number.isRequired,
    isNew: PropTypes.bool.isRequired,
};

EstimatedTaxCredit.defaultProps = {};

export default EstimatedTaxCredit;
