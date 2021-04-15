import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ReactComponent as PencilIcon } from '../../img/svg/pencil-icon.svg';

const SummaryListItem = ({
    title,
    data,
    icon: Icon,
    to,
    secondaryIcon,
    children,
}) => (
    <div className="shadow rounded-xl w-full">
        <div className="flex flex-row justify-between items-center px-10 py-8">
            <div className="flex flex-row items-center justify-center">
                <Icon className="mr-10" />
                <h2>{title}</h2>
            </div>
            <div className="flex flex-row">
                {secondaryIcon}
                <NavLink
                    to={to}
                    className="flex flex-row items-center justify-center ml-10"
                >
                    <PencilIcon />
                    Edit
                </NavLink>
            </div>
        </div>
        {data && (
            <>
                <div className="divider-gray-light w-full mt-0" />
                <div className="grid gap-10 px-10 pb-10 grid-cols-2">
                    {data.map(({ label, value }) => (
                        <div className="flex justify-between" key={`${label}`}>
                            <div className="text-blue-gray inter">{label}</div>
                            <div className="text-gray-dark font-medium inter">
                                {value}
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}
        {children && (
            <>
                <div className="divider-gray-light w-full m-0" />
                {children}
            </>
        )}
    </div>
);

SummaryListItem.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.node,
            ]).isRequired,
        }),
    ),
    icon: PropTypes.shape({ render: PropTypes.func }).isRequired,
    to: PropTypes.string.isRequired,
    secondaryIcon: PropTypes.shape({ render: PropTypes.func }),
    children: PropTypes.shape({ render: PropTypes.func }),
};

SummaryListItem.defaultProps = {
    data: undefined,
    secondaryIcon: undefined,
    children: undefined,
};

export default SummaryListItem;
