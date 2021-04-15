/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTable } from 'react-table';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const SummaryTable = ({ columns = [], loading, error, data = [] }) => {
    const tableInstance = useTable({ columns, data });
    const getCols = () => {
        switch (columns.length) {
            case 1:
                return 'grid-cols-5';
            case 2:
                return 'grid-cols-2';
            case 3:
                return 'grid-cols-3';
            case 4:
                return 'grid-cols-4';
            case 5:
                return 'grid-cols-5';
            case 6:
                return 'grid-cols-6';
            case 7:
                return 'grid-cols-7';
            case 8:
                return 'grid-cols-8';
            case 9:
                return 'grid-cols-9';
            default:
                return '';
        }
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div className="w-full h-full relative">
            {(error || loading) && (
                <div className="h-full w-full absolute bg-white bg-opacity-100 z-10 mt-28">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        {loading && (
                            <div className="w-full flex flex-col items-center">
                                <span className="font-bold mb-5 flex-row justify-center items-center mt-10">
                                    Loading
                                </span>
                                <ProgressBar />
                            </div>
                        )}
                        {error && (
                            <h2 className="font-bold mb-5 flex-row justify-center items-center mt-10">
                                {error}
                            </h2>
                        )}
                    </div>
                </div>
            )}
            <table className="w-full h-full flex flex-col" {...getTableProps()}>
                <thead className="row-span-1 bg-white ">
                    {headerGroups.map((headerGroup) => (
                        <tr
                            className={`h-20  font-medium text-sm text-blue-gray grid ${getCols()} justify-center items-center px-10`}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((header) => (
                                <td
                                    className="flex-shrink-0 flex-grow-0"
                                    {...header.getHeaderProps()}
                                >
                                    {header.render('Header')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </thead>
                {!loading && (
                    <tbody
                        className="grid-flow-row overflow-y-auto relative bg-white px-10 border-t-2 border-gray-light-outline rounded-b-xl"
                        {...getTableBodyProps()}
                    >
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className={`h-16 grid ${getCols()} justify-center items-center`}
                                >
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                )}
            </table>
        </div>
    );
};

SummaryTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    renderRow: PropTypes.func,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    getData: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array.isRequired,
};

SummaryTable.defaultProps = {
    renderRow: null,
    error: false,
};

export default SummaryTable;
