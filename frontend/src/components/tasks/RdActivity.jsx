import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../img/svg/back-icon.svg';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import { ReactComponent as PencilIcon } from '../../img/svg/pencil-icon.svg';

const RdActivity = ({ projects }) => (
    <div className="flex flex-col items-start justify-center">
        <div className="w-full flex flex-row justify-between items-center mb-16">
            <div className="grid grid-flow-col gap-5 items-center">
                <NavLink to="/dashboard">
                    <BackIcon />
                </NavLink>
                <h1>R&amp;D activity</h1>
            </div>{' '}
            <div className="w-1/5 flex items-center justify-end">
                <Dropdown label="Fiscal year" labelPosition="left" fluid />
            </div>
        </div>
        <div className="flex flex-row items-center w-full mb-12 justify-between">
            <h3>PROJECTS ({projects?.length})</h3>
            <span>No R&amp;D expenses added yet</span>
            <Button primary content="Save" small />
        </div>
        <div className="grid grid-cols-2 w-full gap-10">
            {projects.map((x) => (
                <div className="rounded-2xl shadow p-10 grid gap-5">
                    <div className="w-full flex flex-row items-center justify-between">
                        <h1>{x}</h1>
                        <div className="flex flex-row items-center justify-center">
                            <PencilIcon />
                            Edit
                        </div>
                    </div>
                    <div className="container-grayed-out h-24">
                        No description yet
                    </div>
                    <div className="grid grid-cols-2 gap-10 items-center justify-between text-blue-gray w-full">
                        <div className="flex flex-row items-center justify-between">
                            <div>Wages</div>
                            <div>$0</div>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <div>Wages</div>
                            <div>$0</div>
                        </div>
                    </div>
                    <div className="divider-gray-light" />
                    <div className="grid grid-cols-2 gap-10 items-center justify-between text-blue-gray w-full">
                        <div className="flex flex-row items-center justify-between">
                            <div>Total</div>
                            <div className="divider-gray-light mx-16" />
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <Button content="Add expenses" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

RdActivity.propTypes = {
    projects: PropTypes.arrayOf([PropTypes.string]).isRequired,
};

RdActivity.defaultProps = {};

export default RdActivity;
