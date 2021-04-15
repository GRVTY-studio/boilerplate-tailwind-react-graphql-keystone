import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CalculatorPaperIcon } from '../../img/svg/calculator-paper-icon.svg';
import { integrationPropShape } from '../../tools/utilities/transforms';
import FinchConnect from '../common/FinchConnect';

const Integrations = ({ integrations, userId }) => (
    <div className="w-full flex flex-col">
        <h1 className="mb-10">Integrations</h1>
        {integrations?.length === 0 && (
            <div className="container-grayed-out">
                <span>No integrations available yet.</span>
            </div>
        )}
        {integrations?.length > 0 && (
            <div className="grid gap-10">
                {integrations.map(
                    ({
                        finchAccount: {
                            providerLogo,
                            providerName,
                            id: finchAccountId,
                        },
                        id,
                    }) => (
                        <div className={`container-white `} key={id}>
                            <div className="grid grid-flow-col items-center gap-10">
                                <CalculatorPaperIcon
                                    className={`text-green-bright fill-current stroke-current `}
                                />
                                Payroll / HR
                            </div>
                            <img
                                src={providerLogo}
                                alt={`Logo${providerName}`}
                                style={{ maxWidth: '200px' }}
                            />
                            <div className="grid grid-flow-col items-center gap-10">
                                <FinchConnect
                                    integrationId={id}
                                    finchAccountId={finchAccountId}
                                    userId={userId}
                                    isNew={false}
                                    content="Edit"
                                />
                            </div>
                        </div>
                    ),
                )}
            </div>
        )}
    </div>
);

Integrations.propTypes = {
    integrations: PropTypes.shape(integrationPropShape).isRequired,
    userId: PropTypes.string.isRequired,
};

Integrations.defaultProps = {};

export default Integrations;
