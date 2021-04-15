import React, { useCallback, useMemo } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadingTransform,
    sliceTransform,
} from '../../tools/utilities/transforms';
import {
    selectError,
    selectHasAnotherPage,
    selectLoading,
    selectRefresh,
    selectSkip,
    selectSort,
} from '../../tools/redux/selectors/commonSelectors';
import { selectEmployeesInformationByFiscalYear } from '../../tools/redux/selectors/employeeSelectors';
import {
    getEmployeesThunk,
    updateEmployeeSortThunk,
} from '../../tools/redux/thunks/employeeThunks';
import { getYearlyIncomeAdjustedAmount } from '../../tools/utilities/helpers';
import { updateYearlyIncome } from '../../tools/redux/slices/yearlyIncomeSlice';
import Table from '../common/Table';
import { integerRegex } from '../../tools/utilities/regex';

const EmployeeRNDActivityTable = ({ filteredFiscalYear }) => {
    const dispatch = useDispatch();
    const hasAnotherPage = useSelector((state) =>
        selectHasAnotherPage(state, sliceTransform.employees),
    );
    const loading =
        useSelector((state) =>
            selectLoading(state, sliceTransform.employees),
        ) === loadingTransform.pending;
    const employees = useSelector((state) =>
        selectEmployeesInformationByFiscalYear(state, filteredFiscalYear),
    );
    const data = useMemo(() => employees, [employees]);
    const error = useSelector((state) =>
        selectError(state, sliceTransform.companies),
    );
    const employeeSort = useSelector((state) =>
        selectSort(state, sliceTransform.employees),
    );
    const skip = useSelector((state) =>
        selectSkip(state, sliceTransform.employees),
    );

    const getData = ({ clear } = {}) => {
        dispatch(getEmployeesThunk({ clear }));
    };

    const sortEmployees = useCallback(
        (sortBy) => dispatch(updateEmployeeSortThunk(sortBy)),
        [dispatch],
    );

    const columns = useMemo(() => {
        const timeSpentHasError = (value) => {
            if (!integerRegex.test(value)) return true;
            const newValue = parseInt(value, 10);
            if (newValue < 0 || newValue > 100) return true;
            return false;
        };

        const incomeAmountHasError = (value) => {
            if (!integerRegex.test(value)) return true;
            const newValue = parseInt(value, 10);
            if (newValue < 0) return true;
            return false;
        };

        const sort = (newSortField) => {
            const { field, asc } = employeeSort || {};

            const sortBy = {
                field: newSortField,
                asc: newSortField !== field ? true : !asc,
            };

            sortEmployees(sortBy);
        };

        const renderTimeSpent = (cellInfo) => {
            const originalValue = cellInfo?.row?.original;

            const {
                timeSpentOnRND = 0,
                incomeAmount,
                id,
                employeeId,
                yearlyIncomeId,
                error: validationError,
            } = originalValue;

            const updateIncome = (value) => {
                let newValue = value;
                if (timeSpentOnRND === 0 || timeSpentOnRND === '0') {
                    newValue = newValue.replace('0', '');
                }

                const yearlyIncome = {
                    adjustedAmount: getYearlyIncomeAdjustedAmount(
                        newValue,
                        incomeAmount,
                    ),
                    amount: incomeAmount,
                    timeSpentOnRND: newValue,
                    fiscalYear: filteredFiscalYear,
                    employeeId,
                    id: id || `${employeeId}-${filteredFiscalYear}`,
                    edited: !!yearlyIncomeId,
                    isNew: !yearlyIncomeId,
                    yearlyIncomeId,
                    error:
                        timeSpentHasError(newValue) ||
                        incomeAmountHasError(incomeAmount || 0),
                };
                dispatch(updateYearlyIncome(yearlyIncome));
            };

            return (
                <span
                    className={`input primary input-icon-container small ${
                        validationError ? 'error' : null
                    }`}
                >
                    <input
                        autoComplete="off"
                        className="w-full"
                        name={`${employeeId}-time-input`}
                        key={`${employeeId}-time-input`}
                        type="number"
                        value={timeSpentOnRND}
                        onChange={(e) => updateIncome(e.target.value)}
                    />
                    %
                </span>
            );
        };

        const renderIncomeAmount = (cellInfo) => {
            const originalValue = cellInfo?.row?.original;

            const {
                incomeAmount = 0,
                id,
                timeSpentOnRND,
                employeeId,
                yearlyIncomeId,
                error: validationError,
            } = originalValue;

            const updateIncome = (value) => {
                let newValue = value;
                if (incomeAmount === 0 || incomeAmount === '0') {
                    newValue = newValue.replace('0', '');
                }

                const yearlyIncome = {
                    adjustedAmount: getYearlyIncomeAdjustedAmount(
                        timeSpentOnRND,
                        newValue,
                    ),
                    amount: newValue,
                    timeSpentOnRND,
                    fiscalYear: filteredFiscalYear,
                    employeeId,
                    id: id || `${employeeId}-${filteredFiscalYear}`,
                    edited: !!yearlyIncomeId,
                    isNew: !yearlyIncomeId,
                    yearlyIncomeId,
                    error:
                        incomeAmountHasError(newValue) ||
                        timeSpentHasError(timeSpentOnRND || 0),
                };
                dispatch(updateYearlyIncome(yearlyIncome));
            };

            return (
                <span
                    className={`input primary input-icon-container w-2/3 ${
                        validationError ? 'error' : null
                    }`}
                >
                    $
                    <input
                        autoComplete="off"
                        className="w-full text-right"
                        name={`${employeeId}amount-input`}
                        key={`${employeeId}amount-input`}
                        type="number"
                        value={incomeAmount}
                        onChange={(e) => updateIncome(e.target.value)}
                    />
                </span>
            );
        };

        const renderAdjustedAmount = (cellInfo) => {
            const { adjustedAmount } = cellInfo?.row?.original;

            return (
                <NumberFormat
                    className={` ${
                        adjustedAmount === 0 || !adjustedAmount
                            ? 'text-blue-gray-medium'
                            : 'text-gray-dark'
                    }`}
                    value={adjustedAmount || 0}
                    prefix="$ "
                    displayType="text"
                    thousandSeparator
                    decimalScale={0}
                />
            );
        };

        return [
            {
                accessor: 'name',
                Header: 'Name',
                canSort: true,
                onSort: () => sort('name'),
                isSortedDesc:
                    employeeSort?.field === 'name' &&
                    employeeSort?.asc === false,
                isSortedAsc:
                    employeeSort?.field === 'name' &&
                    employeeSort?.asc === true,
            },
            {
                accessor: 'incomeAmount',
                Header: 'Amount',
                Cell: renderIncomeAmount,
                // canSort: true,
                onSort: () => sort('incomeAmount'),
                isSortedDesc:
                    employeeSort?.field === 'incomeAmount' &&
                    employeeSort?.asc === false,
                isSortedAsc:
                    employeeSort?.field === 'incomeAmount' &&
                    employeeSort?.asc === true,
            },
            { accessor: 'department', Header: 'Department' },
            {
                accessor: 'timeSpentOnRND',
                Header: 'Time spent on R&D',
                Cell: renderTimeSpent,
            },
            {
                accessor: 'adjustedAmount',
                Header: 'Adjusted amount',
                Cell: renderAdjustedAmount,
            },
        ];
    }, [sortEmployees, filteredFiscalYear, employeeSort, dispatch]);

    const refresh = useSelector((state) =>
        selectRefresh(state, sliceTransform.employees),
    );

    return (
        <Table
            error={error}
            loading={loading}
            columns={columns}
            getData={getData}
            data={data}
            hasAnotherPage={hasAnotherPage}
            skip={skip}
            refresh={refresh}
        />
    );
};

EmployeeRNDActivityTable.propTypes = {
    filteredFiscalYear: PropTypes.number.isRequired,
};

EmployeeRNDActivityTable.defaultProps = {};

export default EmployeeRNDActivityTable;
