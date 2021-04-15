import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SortIcon } from '../../img/svg/sort-icon.svg';

const SortButton = ({ asc, desc, onClick }) => (
    <button onClick={onClick} type="button" className="grid w-2 h-4 ml-3 gap-1">
        <SortIcon
            className={`transform rotate-180 fill-current ${
                asc ? 'text-gray' : 'text-gray-light-outline'
            }  `}
        />
        <SortIcon
            className={`fill-current ${
                desc ? 'text-gray' : 'text-gray-light-outline'
            } `}
        />
    </button>
);
SortButton.propTypes = {
    asc: PropTypes.bool,
    desc: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

SortButton.defaultProps = {
    asc: undefined,
    desc: undefined,
};

export default SortButton;
