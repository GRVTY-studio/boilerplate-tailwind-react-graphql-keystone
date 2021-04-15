import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ReactComponent as PROJECT_NAMELogo } from '../../img/svg/PROJECT_NAME-logo-navbar.svg';
import { ReactComponent as ProfileIcon } from '../../img/svg/profile-icon.svg';
import { navItems } from '../../tools/utilities/transforms';

const Navbar = ({ tasks = 0, additionalMessage, current, setCurrent }) => (
    <div className="bg-white fixed top-0 w-full h-20 flex flex-row items-center justify-center shadow z-10">
        <NavLink to="/overview/dashboard" className="absolute left-10">
            <PROJECT_NAMELogo />
        </NavLink>
        <div
            className="w-full flex flex-row items-center justify-center"
            style={{ maxWidth: '1440px' }}
        >
            <div className="w-4/6 grid grid-flow-col">
                {additionalMessage && (
                    <div className="hidden md-plus:flex self-center">
                        {additionalMessage}
                    </div>
                )}
                <div className={`flex flex-row self-center justify-self-end `}>
                    <NavLink
                        to="/dashboard/overview"
                        className={`grid grid-flow-col gap-5 justify-center items-center mr-10 ${
                            current === navItems.overview
                                ? 'nav-item-current'
                                : 'nav-item'
                        }`}
                        onClick={() => setCurrent(navItems.overview)}
                    >
                        Overview{' '}
                        <div
                            className={`rounded-full w-5 h-5 flex items-center justify-center text-center text-xs text-white ${
                                tasks > 0 ? 'bg-green-light' : 'bg-gray-light '
                            }`}
                        >
                            {tasks}
                        </div>
                    </NavLink>
                    <NavLink
                        to="/dashboard/integrations"
                        className={`${
                            current === navItems.integrations
                                ? 'nav-item-current'
                                : 'nav-item'
                        }`}
                        onClick={() => setCurrent(navItems.integrations)}
                    >
                        Integrations
                    </NavLink>
                </div>
            </div>
        </div>

        <NavLink
            to="/dashboard/profile"
            className={`absolute right-10 ${
                current === navItems.profile ? 'nav-item-current' : 'nav-item'
            }`}
            onClick={() => setCurrent(navItems.profile)}
        >
            <ProfileIcon
                className={`${
                    current === navItems.profile
                        ? 'nav-item-current'
                        : 'nav-item'
                } fill-current`}
            />
        </NavLink>
    </div>
);

Navbar.propTypes = {
    tasks: PropTypes.number.isRequired,
    additionalMessage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    current: PropTypes.string.isRequired,
    setCurrent: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
    additionalMessage: null,
};

export default Navbar;
