/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import { useTable } from 'react-table';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import SortButton from './SortButton';
import { columnPropShape } from '../../tools/utilities/transforms';

const Table = ({
    columns = [],
    loading,
    error,
    getData,
    data = [],
    hasAnotherPage,
    refresh,
}) => {
    const tableInstance = useTable({ columns, data });
    const ref = useRef();
    const [loadAnotherPage, setLoadAnotherPage] = useState(true);
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

    const onScroll = () => {
        if (ref.current) {
            const { scrollTop, scrollHeight, clientHeight } = ref.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                setLoadAnotherPage(true);
            }
        }
    };

    useEffect(() => {
        if (!loading && loadAnotherPage && hasAnotherPage) {
            setLoadAnotherPage(false);
            getData();
        }
    }, [getData, loading, loadAnotherPage, hasAnotherPage]);
    useEffect(() => {
        if (refresh && !loading) getData({ clear: true });
    }, [refresh, getData, loading]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div className="w-full h-full relative" id="Table">
            {(error || loading) && (
                <div className="h-full w-full absolute bg-white bg-opacity-100 z-10 mt-20">
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
                <thead className="row-span-1 mb-1 rounded-3xl rounded-b-none bg-white shadow-l-t-r">
                    {headerGroups.map((headerGroup) => (
                        <tr
                            className={`h-20  font-medium text-sm text-blue-gray grid ${getCols()} justify-center items-center pl-10 pr-14`}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((header) => (
                                <td
                                    className="flex-shrink-0 flex-grow-0 flex items-center"
                                    {...header.getHeaderProps()}
                                >
                                    {header.render('Header')}
                                    {header.canSort && (
                                        <SortButton
                                            asc={header.isSortedAsc}
                                            desc={header.isSortedDesc}
                                            onClick={() => header.onSort()}
                                        />
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody
                    className="grid-flow-row overflow-y-scroll relative bg-white shadow-l-b-r rounded-3xl rounded-t-none px-10 pb-8"
                    {...getTableBodyProps()}
                    onScroll={onScroll}
                    ref={ref}
                    style={{ scrollbarWidth: 'thin', maxHeight: '500px' }}
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
            </table>
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.shape(columnPropShape)),
    ]).isRequired,
    renderRow: PropTypes.func,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    getData: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array.isRequired,
    hasAnotherPage: PropTypes.bool.isRequired,
    sort: PropTypes.string,
    refresh: PropTypes.bool.isRequired,
};

Table.defaultProps = {
    renderRow: null,
    error: false,
    sort: undefined,
};

export default Table;
