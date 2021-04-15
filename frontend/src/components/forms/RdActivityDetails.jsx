import React from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Input from '../common/Input';
import RadioButton from '../common/RadioButton';
import {
    validationMessages,
    quotePropShape,
} from '../../tools/utilities/transforms';

const schema = yup.object().shape({
    estimatedPayroll: yup
        .number()
        .required(validationMessages.required)
        .typeError('Must be numeric'),
    estimatedSupplies: yup
        .number()
        .required(validationMessages.required)
        .typeError('Must be numeric'),
    hasUSABasedEmployees: yup
        .bool('REquired')
        .required(validationMessages.required),
});

const RdActivityDetails = ({ wide, onSubmit, quote }) => {
    const {
        handleSubmit,
        register,
        errors: {
            estimatedPayroll: { message: estimatedPayrollError } = {},
            estimatedSupplies: { message: estimatedSuppliesError } = {},
            hasUSABasedEmployees: { message: hasUSABasedEmployeesError } = {},
        },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    return (
        <form
            className="grid gap-5"
            onSubmit={handleSubmit(onSubmit)}
            id="rd-detail-form"
        >
            <h2>R&amp;D ACTIVITY DETAILS </h2>
            <div className="grid gap-7">
                <div className="flex flex-row">
                    <div className="mr-7">1.</div>
                    <div>
                        Do you employ or contract US-based employees or any
                        other function that helps develop a new product,
                        software, formula, process or other innovation?
                        {hasUSABasedEmployeesError && (
                            <div className="text-red-error">Required</div>
                        )}
                        <div className="w-full mt-5 -ml-2">
                            <RadioButton
                                id="Yes"
                                name="hasUSABasedEmployees"
                                label="Yes"
                                value
                                defaultChecked={
                                    quote?.hasUSABasedEmployees === true
                                }
                                register={register}
                            />
                            <RadioButton
                                id="No"
                                name="hasUSABasedEmployees"
                                label="No"
                                value={false}
                                register={register}
                                defaultChecked={
                                    quote?.hasUSABasedEmployees === false
                                }
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={`grid gap-7 ${
                        wide ? 'grid-cols-2' : 'grid-cols-1'
                    }`}
                >
                    <div className="flex flex-row">
                        <div className="mr-7">2.</div>
                        <div>
                            Estimated US-based payroll and contractor last
                            month?{' '}
                            <div className="text-red-error">
                                {estimatedPayrollError}
                            </div>
                            <div className="grid grid-flow-col grid-cols-2 justify-center items-center gap-5">
                                <Input
                                    type="currency"
                                    name="estimatedPayroll"
                                    register={register}
                                    error={estimatedPayrollError}
                                    defaultValue={quote?.estimatedPayroll}
                                />
                                <span className="text-gray italic">
                                    $ / month
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="mr-7">3.</div>
                        <div>
                            Estimated US-based supplies purchased last month?
                            <div className="text-red-error">
                                {estimatedSuppliesError}
                            </div>
                            <div className="grid grid-flow-col grid-cols-2 justify-center items-center gap-5">
                                <Input
                                    type="currency"
                                    name="estimatedSupplies"
                                    register={register}
                                    error={estimatedSuppliesError}
                                    defaultValue={quote?.estimatedSupplies}
                                />
                                <span className="text-gray italic">
                                    $ / month
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

RdActivityDetails.propTypes = {
    wide: PropTypes.bool,
    onSubmit: PropTypes.bool.isRequired,
    quote: PropTypes.shape(quotePropShape),
};

RdActivityDetails.defaultProps = {
    wide: false,
    quote: undefined,
};

export default RdActivityDetails;
