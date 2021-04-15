import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, withRouter, Prompt } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../img/svg/back-icon.svg';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import {
    selectLoading,
    selectCount,
    selectFilters,
} from '../../tools/redux/selectors/commonSelectors';
import {
    loadingTransform,
    locationPropShape,
    sliceTransform,
    tasks,
} from '../../tools/utilities/transforms';
import {
    selectAllDepartments,
    selectTotalYearlyIncomeUpdateErrors,
    selectYearlyIncomeHasBeenEdited,
} from '../../tools/redux/selectors/employeeSelectors';

import { bulkUpdateYearlyIncomeThunk } from '../../tools/redux/thunks/employeeThunks';
import { getFiscalYearOptions } from '../../tools/utilities/helpers';
import EmployeeRNDActivityTable from './EmployeeRNDActivityTable';
import { updateEmployeeFilters } from '../../tools/redux/slices/employeeSlice';
import {
    clearTaskConfirmation,
    updateTaskConfirmation,
} from '../../tools/redux/slices/taskConfirmationSlice';
import { clearYearlyIncomeUpdates } from '../../tools/redux/slices/yearlyIncomeSlice';

const MarkRDActivity = ({ location }) => {
    const dispatch = useDispatch();
    const { initialMarking } = location;
    const [redirect, setRedirect] = useState(false);
    const employeeFilters = useSelector((state) =>
        selectFilters(state, sliceTransform.employees),
    );

    const { department: departmentFilter } = employeeFilters || {};
    const [filteredFiscalYear, setFilteredFiscalYear] = useState(2021);
    const hasEdited = useSelector(selectYearlyIncomeHasBeenEdited);

    const hasErrors = useSelector(selectTotalYearlyIncomeUpdateErrors) > 0;
    const loadingDepartments =
        useSelector((state) =>
            selectLoading(state, sliceTransform.department),
        ) === loadingTransform.pending;

    const employeeTotal = useSelector((state) =>
        selectCount(state, sliceTransform.employees),
    );

    const departments = useSelector(selectAllDepartments);

    const changeDepartment = ({ value }) => {
        const update = () => {
            if (value !== 'All') {
                return dispatch(updateEmployeeFilters({ department: value }));
            }

            return dispatch(updateEmployeeFilters());
        };

        if (hasEdited) {
            return dispatch(
                updateTaskConfirmation({
                    key: tasks.unsavedChanges.key,
                    extraOptions: {
                        onYes: () => {
                            update();
                            dispatch(clearTaskConfirmation());
                            dispatch(clearYearlyIncomeUpdates());
                        },
                        onNo: () => dispatch(clearTaskConfirmation()),
                    },
                }),
            );
        }

        return update();
    };

    const changeYear = ({ value }) => {
        setFilteredFiscalYear(parseInt(value, 10));
    };

    const initiateUpdate = () => {
        if (initialMarking) {
            dispatch(bulkUpdateYearlyIncomeThunk()).then(() => {
                setRedirect(true);
            });
        } else {
            dispatch(bulkUpdateYearlyIncomeThunk());
        }
    };

    useEffect(() => {
        if (hasEdited) {
            window.onbeforeunload = () => false;
        } else {
            window.onbeforeunload = undefined;
        }

        return function cleanup() {
            window.onbeforeunload = undefined;
            return false;
        };
    }, [hasEdited]);

    useEffect(() => () => dispatch(clearYearlyIncomeUpdates()), [dispatch]);

    if (redirect)
        return (
            <Redirect
                to={{
                    pathname: '/dashboard/overview',
                }}
            />
        );

    return (
        <div className="flex flex-col items-start justify-center">
            <Prompt
                when={hasEdited}
                message="Changes you made may not be saved."
            />

            <div className="w-full flex flex-row justify-between items-center mb-16">
                <div className="grid grid-flow-col gap-5 items-center">
                    <NavLink to="/dashboard">
                        <BackIcon />
                    </NavLink>
                    <h1>R&amp;D activity</h1>
                </div>
                <Button
                    primary
                    content="Save"
                    small
                    disabled={!hasEdited || hasErrors}
                    onClick={initiateUpdate}
                />
            </div>
            <div className="grid grid-cols-3 items-center w-full mb-12 gap-5">
                <h3>EMPLOYEES ({employeeTotal})</h3>
                <Dropdown
                    label="Fiscal year"
                    name="FiscalYear"
                    labelPosition="left"
                    options={[...getFiscalYearOptions()]}
                    selected="2021"
                    onChange={changeYear}
                />
                <Dropdown
                    label="Department"
                    name="Department"
                    labelPosition="left"
                    disabled={loadingDepartments}
                    options={[{ value: 'All', label: 'All' }, ...departments]}
                    selected={departmentFilter || 'All'}
                    onChange={changeDepartment}
                />
            </div>
            <EmployeeRNDActivityTable
                filteredFiscalYear={filteredFiscalYear}
                departmentFilter={departmentFilter}
            />
        </div>
    );
};

MarkRDActivity.propTypes = {
    location: PropTypes.shape(locationPropShape).isRequired,
};

MarkRDActivity.defaultProps = {};

export default withRouter(MarkRDActivity);
