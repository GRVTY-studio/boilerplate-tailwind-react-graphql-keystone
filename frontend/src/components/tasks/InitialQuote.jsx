import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import FoldedNote from '../common/FoldedNote';
import Button from '../common/Button';
import CompanyDetails from '../forms/CompanyDetails';
import RdActivityDetails from '../forms/RdActivityDetails';
import EstimatedTaxCredit from './EstimatedTaxCredit';
import { ReactComponent as BackIcon } from '../../img/svg/back-icon.svg';
import { ReactComponent as PROJECT_NAMELogo } from '../../img/svg/PROJECT_NAME-logo-large.svg';
import Modal from '../common/Modal';
import {
    companyPropShape,
    quotePropShape,
} from '../../tools/utilities/transforms';
import { newCompanySchema } from '../../tools/utilities/yupSchemas';
import AddProjects from './AddProjects';
import { addCompanyThunk } from '../../tools/redux/thunks/companyThunks';
import { addQuoteThunk } from '../../tools/redux/thunks/quoteThunks';
import { getSavingsEstimate } from '../../tools/utilities/helpers';

const InitialQuote = ({ userId, company, quote, isSignUp }) => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(company ? 2 : 1);
    const [projects, setProjects] = useState([]);

    const addProject = (project) => setProjects([project, ...projects]);
    const deleteProject = (project) =>
        setProjects(projects.filter((x) => x !== project));

    const addCompany = (data) => {
        if (company) return setStep(2);

        const companyData = {
            ...data,
            userId,
        };
        return dispatch(addCompanyThunk(companyData)).then((res) => {
            if (!res?.error) setStep(2);
        });
    };

    const addQuote = (data) => {
        const quoteData = {
            ...data,
            userId,
            fiscalYear: new Date().getFullYear(),
            minAmount: getSavingsEstimate(
                data.estimatedSupplies,
                data.estimatedPayroll,
            ),
            maxAmount: getSavingsEstimate(
                data.estimatedSupplies,
                data.estimatedPayroll,
            ),
            projects: projects.join(','),
        };
        dispatch(addQuoteThunk(quoteData));
    };

    const back = () => {
        if (step <= 1) return false;

        return setStep(step - 1);
    };

    if (quote) {
        return (
            <Modal>
                <div className="w-full h-full flex">
                    <EstimatedTaxCredit
                        quote={quote || {}}
                        companyAge={
                            new Date().getFullYear() -
                            company?.yearOfIncorporation
                        }
                        isNew
                    />
                </div>
            </Modal>
        );
    }

    return (
        <div className="w-full flex flex-row items-start justify-start">
            <div className="w-2/3 mr-16">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center">
                        {step > 1 && (
                            <BackIcon
                                className="mr-5 cursor-pointer"
                                onClick={back}
                            />
                        )}{' '}
                        <h1>Get initial quote</h1>
                    </div>
                    {isSignUp && (
                        <div className="text-blue-gray text-base font-semibold">
                            STEP {step} / 3
                        </div>
                    )}
                </div>
                {[1, 3].includes(step) && (
                    <div className="rounded-2xl w-full shadow p-10 mt-10 grid gap-5">
                        {step === 1 && (
                            <CompanyDetails
                                onSubmit={addCompany}
                                company={company}
                                yupSchema={newCompanySchema}
                                disabled={!!company}
                            />
                        )}
                        {step === 3 && (
                            <RdActivityDetails onSubmit={addQuote} />
                        )}
                    </div>
                )}
                {step === 2 && (
                    <AddProjects
                        projects={projects}
                        addProject={addProject}
                        deleteProject={deleteProject}
                    />
                )}
            </div>
            <div className="w-1/3 flex flex-col items-center">
                <div className="w-full flex items-center justify-end mb-12">
                    {isSignUp ? (
                        <PROJECT_NAMELogo className="justify-self-end" />
                    ) : (
                        <div className="text-blue-gray text-base font-semibold">
                            STEP {step} / 3
                        </div>
                    )}
                </div>
                {step === 1 && !company && (
                    <Button
                        content="Continue"
                        primary
                        arrow
                        fluid
                        form="company-detail-form"
                        submit
                    />
                )}
                {step === 1 && !!company && (
                    <Button
                        content="Continue"
                        primary
                        arrow
                        fluid
                        onClick={() => setStep(2)}
                    />
                )}
                {step === 2 && (
                    <Button
                        content="Continue"
                        primary
                        arrow
                        fluid
                        onClick={() => setStep(3)}
                    />
                )}
                {step === 3 && (
                    <Button
                        content="Get Quote"
                        primary
                        arrow
                        fluid
                        form="rd-detail-form"
                        submit
                    />
                )}
                <NavLink
                    to="/dashboard"
                    className="text-blue-gray-medium font-semibold mt-10"
                >
                    SKIP FOR NOW
                </NavLink>
                <div className="w-full mt-10">
                    <FoldedNote
                        cornerColourClass="blue"
                        extraClassNames="bg-blue-pale"
                    >
                        <div className="w-full h-full flex flex-col items-start justify-start p-10">
                            {step === 1 && (
                                <>
                                    <p className="mb-5">
                                        The US government provides a tax credit
                                        for companies that engage in qualified
                                        Research and Development (R&D)
                                        activities.
                                    </p>
                                    <p>
                                        This R&D Tax Credit, when filed
                                        properly, can save your start-up
                                        thousands. For more information, read:{' '}
                                        <a
                                            className="link-green"
                                            href="https://medium.com/PROJECT_NAME-company/what-is-the-r-d-tax-credit-c87e7b233389"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            What Is The R&D Tax Credit?
                                        </a>
                                    </p>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <p className="mb-5">
                                        Add any projects you think might qualify
                                        for R&D Tax Credits.
                                    </p>
                                    <p>
                                        <a
                                            className="link-green"
                                            href="https://medium.com/PROJECT_NAME-company/why-tech-companies-often-miss-out-on-the-r-d-tax-credit-40aae414ae0e"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Read why most tech companies qualify
                                        </a>
                                        , and know that many other industries,
                                        too - including Food & Beverage, Apparel
                                        & Fashion, Computer Software,
                                        Manufacturing, and more.
                                    </p>
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <p className="mb-5">
                                        This is the last step, and it’ll help us
                                        get you a rough estimate for how much
                                        you can save.
                                    </p>
                                    <p>
                                        Once you get your quote, you’ll be able
                                        to decide if you want to work with us
                                        (we hope it’s a yes).
                                    </p>
                                </>
                            )}
                        </div>
                    </FoldedNote>
                </div>
            </div>
        </div>
    );
};

InitialQuote.propTypes = {
    userId: PropTypes.string.isRequired,
    company: PropTypes.shape(companyPropShape).isRequired,
    quote: PropTypes.shape(quotePropShape).isRequired,
    isSignUp: PropTypes.bool.isRequired,
};

InitialQuote.defaultProps = {};

export default withRouter(InitialQuote);
