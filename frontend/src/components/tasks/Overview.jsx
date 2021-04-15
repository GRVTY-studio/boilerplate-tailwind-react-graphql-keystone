import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import TaskListItem from '../common/TaskListItem';
import { ReactComponent as PayrollIcon } from '../../img/svg/payroll-icon.svg';
import { ReactComponent as RndIcon } from '../../img/svg/rnd-icon.svg';
import { ReactComponent as LockIcon } from '../../img/svg/lock-icon.svg';
import { ReactComponent as QuoteIcon } from '../../img/svg/quote-icon.svg';
import { ReactComponent as BeakerIcon } from '../../img/svg/beaker-icon.svg';
import { ReactComponent as BusinessIcon } from '../../img/svg/business-icon.svg';
import { ReactComponent as ProjectIcon } from '../../img/svg/project-icon.svg';
import { ReactComponent as DustbinIcon } from '../../img/svg/dustbin-icon.svg';
import { ReactComponent as AccountingIcon } from '../../img/svg/accounting-icon.svg';
import { ReactComponent as EmployeeIcon } from '../../img/svg/employee-activity-icon.svg';
import SummaryListItem from '../common/SummaryListItem';
import {
    companyPropShape,
    integrationPropShape,
    profileNavItems,
    quotePropShape,
} from '../../tools/utilities/transforms';
import FinchConnect from '../common/FinchConnect';
import Button from '../common/Button';
import { updateProjectsThunk } from '../../tools/redux/thunks/quoteThunks';
import YearlyIncomeSummaryTable from './YearlyIncomeSummaryTable';

import ToolTip from '../common/ToolTip';

const Overview = ({
    company,
    quote,
    userId,
    integrations,
    hasCompany,
    hasQuote,
    hasProjects,
    hasAddedIntegration,
    hasMarkedRNDActivity,
}) => {
    const dispatch = useDispatch();

    const noTasks = () => hasMarkedRNDActivity && quote && hasAddedIntegration;
    const noSummaryAvailable = () =>
        !hasMarkedRNDActivity &&
        !quote &&
        !hasAddedIntegration &&
        !hasCompany &&
        !hasProjects;

    const deleteProject = (project) => {
        const projects = quote?.projects?.split(',');
        const newProjects = projects.filter((x) => x !== project).join(',');
        const newQuote = { ...quote, projects: newProjects };
        dispatch(updateProjectsThunk(newQuote));
    };

    return (
        <div className="grid grid-flow-row gap-10 mb-20">
            <Helmet>
                <script
                    type="text/javascript"
                    id="hs-script-loader"
                    async
                    defer
                    src="//js-na1.hs-scripts.com/9156486.jsjs-na1.hs-scripts.com/9156486.js"
                />
            </Helmet>
            <h1>Tasks</h1>
            {noTasks() && (
                <div className="container-grayed-out">
                    <span>No tasks available yet.</span>
                </div>
            )}
            {!quote && (
                <TaskListItem
                    title="Get initial quote"
                    mainIcon={QuoteIcon}
                    button={
                        <NavLink to="/getinitialquote">
                            <Button content="Add your info" primary />
                        </NavLink>
                    }
                    toolTip={
                        <ToolTip>
                            <div className="w-full h-full">
                                <p>
                                    Add in your information, and we’ll give you
                                    a quote for how much we think you can save —
                                    at no cost or obligation.
                                </p>
                            </div>
                        </ToolTip>
                    }
                />
            )}
            {!hasAddedIntegration && (
                <TaskListItem
                    title="Connect payroll / HR software"
                    mainIcon={PayrollIcon}
                    button={
                        <FinchConnect userId={userId} isNew content="Connect" />
                    }
                    toolTip={
                        <ToolTip>
                            <div className="w-full h-full">
                                <p>
                                    Find your payroll and/or HR software
                                    providers here, and connect them to make
                                    things easy.
                                </p>
                            </div>
                        </ToolTip>
                    }
                />
            )}
            {!hasMarkedRNDActivity && (
                <div
                    className={`container-white ${
                        !hasAddedIntegration ? 'disabled' : ''
                    }`}
                >
                    <div className="grid grid-flow-col items-center gap-10">
                        <RndIcon
                            className={`${
                                hasAddedIntegration
                                    ? 'text-green-bright'
                                    : 'text-gray-light'
                            } fill-current stroke-current`}
                        />
                        Mark R&amp;D Activity
                        {!hasAddedIntegration && <LockIcon />}
                    </div>
                    <div className="grid grid-flow-col items-center gap-10">
                        {hasAddedIntegration ? (
                            <NavLink
                                to={{
                                    pathname: '/dashboard/task/markrdactivity',
                                    initialMarking: true,
                                }}
                            >
                                <Button
                                    content="Add your info"
                                    primary
                                    disabled={!hasAddedIntegration}
                                />
                            </NavLink>
                        ) : (
                            <Button
                                content="Add your info"
                                primary
                                disabled={!hasAddedIntegration}
                            />
                        )}
                        <ToolTip>
                            <div className="w-full h-full">
                                <p>
                                    Log any activity that falls under Research
                                    and Development, including work that:
                                    <div className="ml-5 grid gap-5 mt-5">
                                        <div className="list-div">
                                            Enhances existing products or
                                            processes
                                        </div>
                                        <div className="list-div">
                                            Develops or designs new products or
                                            processes
                                        </div>
                                        <div className="list-div">
                                            Develops or improves upon existing
                                            prototypes and software
                                        </div>
                                    </div>
                                </p>
                            </div>
                        </ToolTip>
                    </div>
                </div>
            )}
            <h1>Summary</h1>
            {noSummaryAvailable() && (
                <div className="container-grayed-out">
                    <span>No summary available yet.</span>
                </div>
            )}
            {hasCompany && (
                <SummaryListItem
                    title="COMPANY DETAILS"
                    icon={BusinessIcon}
                    data={[
                        { label: 'Company name', value: company?.legalName },
                        {
                            label: 'Industry',
                            value: company?.industry,
                        },
                        {
                            label: 'Business Type',
                            value: company?.businessType,
                        },
                        {
                            label: 'Year of incorporation',
                            value: company?.yearOfIncorporation,
                        },
                    ]}
                    to={{
                        pathname: '/dashboard/profile',
                        defaultTab: profileNavItems.company,
                    }}
                />
            )}
            {hasQuote && (
                <SummaryListItem
                    title="R&D ACTIVITY ESTIMATION"
                    icon={BeakerIcon}
                    data={[
                        {
                            label: 'Estimated US wages last month',
                            value: (
                                <NumberFormat
                                    value={quote?.estimatedPayroll}
                                    prefix="$"
                                    displayType="text"
                                    thousandSeparator
                                />
                            ),
                        },
                        {
                            label: 'Estimated US supplies last month',
                            value: (
                                <NumberFormat
                                    value={quote?.estimatedSupplies}
                                    prefix="$"
                                    displayType="text"
                                    thousandSeparator
                                />
                            ),
                        },
                    ]}
                    to="/dashboard/task/editestimate"
                />
            )}
            {hasQuote && (
                <SummaryListItem
                    title="PROJECTS"
                    icon={ProjectIcon}
                    data={
                        hasProjects
                            ? quote?.projects
                                  ?.split(',')
                                  .map((projectName) => ({
                                      label: (
                                          <span className="font-bold text-gray-dark">
                                              {projectName}
                                          </span>
                                      ),
                                      value: (
                                          <DustbinIcon
                                              className="cursor-pointer"
                                              onClick={() =>
                                                  deleteProject(projectName)
                                              }
                                          />
                                      ),
                                  }))
                            : [
                                  {
                                      label: (
                                          <div className="italic">
                                              {' '}
                                              No projects added yet
                                          </div>
                                      ),
                                  },
                              ]
                    }
                    to="/dashboard/task/projects"
                />
            )}
            {hasAddedIntegration &&
                integrations.map(
                    ({ finchAccount: { providerLogo, providerName } }) => (
                        <SummaryListItem
                            title="PAYROLL / HR SOFTWARE"
                            icon={AccountingIcon}
                            secondaryIcon={
                                <img
                                    src={providerLogo}
                                    alt={`Logo${providerName}`}
                                    style={{ maxWidth: '200px' }}
                                />
                            }
                            to="/dashboard/integrations"
                        />
                    ),
                )}
            {hasMarkedRNDActivity && (
                <SummaryListItem
                    title="EMPLOYEE R&D ACTIVITY"
                    icon={EmployeeIcon}
                    to="/dashboard/task/markrdactivity"
                >
                    <YearlyIncomeSummaryTable />
                </SummaryListItem>
            )}
        </div>
    );
};

Overview.propTypes = {
    company: PropTypes.shape(companyPropShape),
    quote: PropTypes.shape(quotePropShape),
    userId: PropTypes.string.isRequired,
    integrations: PropTypes.shape(integrationPropShape).isRequired,
    hasCompany: PropTypes.bool.isRequired,
    hasQuote: PropTypes.bool.isRequired,
    hasProjects: PropTypes.bool.isRequired,
    hasAddedIntegration: PropTypes.bool.isRequired,
    hasMarkedRNDActivity: PropTypes.bool.isRequired,
};

Overview.defaultProps = {
    company: undefined,
    quote: undefined,
};

export default withRouter(Overview);
