import React from 'react';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import Dropdown from '../common/Dropdown';
import Input from '../common/Input';
import {
    companyPropShape,
    companyTypes,
} from '../../tools/utilities/transforms';
import { selectIndustryIds } from '../../tools/redux/selectors/companySelectors';

const CompanyDetails = ({
    wide,
    update,
    onSubmit,
    company,
    canEdit,
    yupSchema,
    disabled,
}) => {
    const {
        handleSubmit,
        register,
        control,
        errors: {
            legalName: { message: legalNameError } = {},
            dba: { message: dbaError } = {},
            industry: { message: industryError } = {},
            yearOfIncorporation: { message: yearOfIncorporationError } = {},
            businessType: { message: businessTypeError } = {},
            website: { message: websiteError } = {},
        },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(yupSchema),
        defaultValues: { legalName: company?.legalName },
    });

    const industries = useSelector(selectIndustryIds);

    return (
        <div className="w-full">
            <h2 className="mb-5">{update ? 'Update ' : null}COMPANY DETAILS</h2>
            <form
                className={`w-full grid grid-flow-row gap-5 ${
                    wide ? 'grid-cols-2' : 'grid-cols-1'
                }`}
                onSubmit={handleSubmit(onSubmit)}
                id="company-detail-form"
            >
                <div className="grid grid-cols-2 gap-5">
                    <Input
                        label="Legal name"
                        name="legalName"
                        register={register}
                        error={legalNameError}
                        disabled={disabled || !canEdit}
                    />
                    <Input
                        label="DBA"
                        placeholder="* if applicable"
                        register={register}
                        error={dbaError}
                        name="dba"
                        defaultValue={company?.dba}
                        disabled={disabled || !canEdit}
                    />
                </div>
                <Input
                    label="Website"
                    register={register}
                    name="website"
                    error={websiteError}
                    defaultValue={company?.website}
                    disabled={disabled || !canEdit}
                />
                <Controller
                    control={control}
                    name="industry"
                    defaultValue={company?.industry}
                    render={({ ref, onChange }) => (
                        <Dropdown
                            label="Industry"
                            name="industry"
                            inputRef={ref}
                            labelPosition="top"
                            error={industryError}
                            onChange={({ value: selected }) =>
                                onChange(selected)
                            }
                            options={industries?.map((x) => ({
                                label: x,
                                value: x,
                            }))}
                            fluid
                            selected={company?.industry}
                            disabled={disabled || !canEdit}
                        />
                    )}
                />
                <div className="flex w-full">
                    <div className="w-1/2 mr-2">
                        <Input
                            label="Year of incorporation"
                            register={register}
                            name="yearOfIncorporation"
                            error={yearOfIncorporationError}
                            defaultValue={company?.yearOfIncorporation}
                            disabled={disabled || !canEdit}
                        />
                    </div>
                    <div className="w-1/2 ml-2">
                        <Controller
                            control={control}
                            name="businessType"
                            defaultValue={company?.businessType}
                            render={({ ref, onChange }) => (
                                <Dropdown
                                    label="Business type"
                                    name="businessType"
                                    inputRef={ref}
                                    error={businessTypeError}
                                    onChange={({ value: selected }) =>
                                        onChange(selected)
                                    }
                                    options={companyTypes.map((x) => ({
                                        label: x,
                                        value: x,
                                    }))}
                                    fluid
                                    selected={company?.businessType}
                                    disabled={disabled || !canEdit}
                                />
                            )}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

CompanyDetails.propTypes = {
    wide: PropTypes.bool,
    update: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    company: PropTypes.shape(companyPropShape),
    canEdit: PropTypes.bool,
    yupSchema: PropTypes.shape({}).isRequired,
    disabled: PropTypes.bool,
};

CompanyDetails.defaultProps = {
    wide: false,
    update: false,
    company: null,
    canEdit: true,
    disabled: false,
};

export default CompanyDetails;
