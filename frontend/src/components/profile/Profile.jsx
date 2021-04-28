import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileAccountDetails from '../forms/ProfileAccountDetails';
import Button from '../common/Button';
import {
    locationPropShape,
    userPropShape,
    profileNavItems,
} from '../../tools/utilities/transforms';
import { ReactComponent as LogOutIcon } from '../../img/svg/log-out-icon.svg';

const Profile = ({ user, logOut, location }) => {
    const { defaultTab } = location;
    const [current, setCurrent] = useState(
        defaultTab || profileNavItems.account,
    );

    return (
        <div className="grid">
            <div className="flex w-full flex-row justify-between items-center">
                <h1>Profile</h1>
                <div>
                    <button
                        className={`${
                            current === profileNavItems.account
                                ? 'nav-item-current'
                                : 'nav-item'
                        } mr-10`}
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrent(profileNavItems.account);
                        }}
                    >
                        Account info
                    </button>
                    <button
                        className={`${
                            current === profileNavItems.company
                                ? 'nav-item-current'
                                : 'nav-item'
                        }`}
                        type="button"
                        onClick={() => setCurrent(profileNavItems.company)}
                    >
                        Company info
                    </button>
                </div>
            </div>
            <div className="flex w-full flex-col justify-center items-end shadow rounded-xl mt-10 p-12">
                {current === profileNavItems.account && (
                    <ProfileAccountDetails user={user} />
                )}
                {current === profileNavItems.account && (
                    <div className="flex mt-10 justify-between items-center w-full">
                        <LogOutIcon
                            className="text-white hover:text-gray-pale fill-current cursor-pointer"
                            onClick={logOut}
                        />
                        <Button
                            content="Save"
                            primary
                            form="update-user-account"
                            submit
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

Profile.propTypes = {
    user: PropTypes.shape(userPropShape).isRequired,
    logOut: PropTypes.func.isRequired,
    location: PropTypes.shape(locationPropShape).isRequired,
};

Profile.defaultProps = {};

export default withRouter(Profile);
