import React, { useEffect, useMemo } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading } from '../../tools/redux/selectors/commonSelectors';
import {
    selectEmployeeRNDActivitySummary,
    selectYearlyIncomeFullyLoaded,
} from '../../tools/redux/selectors/employeeSelectors';
import { getYearlyIncomeThunk } from '../../tools/redux/thunks/employeeThunks';
import {
    loadingTransform,
    sliceTransform,
} from '../../tools/utilities/transforms';
import SummaryTable from '../common/SummaryTable';

const YearlyIncomeSummaryTable = () => {
    const dispatch = useDispatch();
    const loading =
        useSelector((state) =>
            selectLoading(state, sliceTransform.yearlyIncome),
        ) === loadingTransform.pending;
    const fullyLoaded = useSelector(selectYearlyIncomeFullyLoaded);
    const yearlyIncome = useSelector(selectEmployeeRNDActivitySummary);
    const yearlyIncomeData = useMemo(() => yearlyIncome, [yearlyIncome]);
    const yearlyIncomeHeaders = useMemo(() => {
        const renderIncomeAmount = (
            cellInfo,
            key,
            { prefix, suffix, textColour } = {},
        ) => {
            const amount = cellInfo?.row?.original?.[key];

            return (
                <NumberFormat
                    value={amount}
                    prefix={prefix}
                    suffix={suffix}
                    displayType="text"
                    thousandSeparator
                    decimalScale={0}
                    className={`${textColour || 'text-blue-gray'}`}
                />
            );
        };

        const renderRND = (cellInfo) => {
            const amount = cellInfo?.row?.original?.amount;
            const adjustedAmount = cellInfo?.row?.original?.adjustedAmount;

            return (
                <NumberFormat
                    value={(adjustedAmount / amount) * 100}
                    suffix="%"
                    displayType="text"
                    thousandSeparator
                    decimalScale={0}
                    className={`text-blue-gray `}
                />
            );
        };

        return [
            { accessor: 'fiscalYear', Header: 'Fiscal year' },
            { accessor: 'employees', Header: 'Employees' },
            {
                accessor: 'amount',
                Header: 'Amount',
                Cell: (cellInfo) =>
                    renderIncomeAmount(cellInfo, 'amount', { prefix: '$' }),
            },
            {
                accessor: 'timeSpentOnRND',
                Header: 'Time spent on R&D',
                Cell: renderRND,
            },
            {
                accessor: 'adjustedAmount',
                Header: 'Adjusted amount',
                Cell: (cellInfo) =>
                    renderIncomeAmount(cellInfo, 'adjustedAmount', {
                        prefix: '$',
                        textColour: 'text-gray-dark',
                    }),
            },
        ];
    }, []);

    useEffect(() => {
        if (!fullyLoaded && !loading) {
            dispatch(getYearlyIncomeThunk());
        }
    }, [fullyLoaded, dispatch, loading]);

    return (
        <SummaryTable data={yearlyIncomeData} columns={yearlyIncomeHeaders} />
    );
};

YearlyIncomeSummaryTable.propTypes = {};

YearlyIncomeSummaryTable.defaultProps = {};

export default YearlyIncomeSummaryTable;
