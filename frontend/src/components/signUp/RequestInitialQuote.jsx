import React from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../common/Modal';
import { ReactComponent as PROJECT_NAMELogo } from '../../img/svg/PROJECT_NAME-logo-large.svg';
import Button from '../common/Button';

const RequestInitialQuote = () => (
    <Modal>
        <div className="modal-content">
            <div className="w-full h-full grid grid-flow-row place-items-center gap-5 justify-center text-center py-6">
                <PROJECT_NAMELogo />
                <h1>Get an initial quote</h1>
                <p>
                    Provide some basic information in less than 2 minutes and
                    get a quick estimate of how much of a PROJECT_NAME you are
                    eligible for.
                </p>
                <NavLink to="/getinitialquote">
                    <Button content="Get Quote" arrow primary />
                </NavLink>
                <NavLink
                    to="/dashboard"
                    className="text-blue-gray-medium font-semibold"
                >
                    SKIP FOR NOW
                </NavLink>
            </div>
        </div>
    </Modal>
);

RequestInitialQuote.propTypes = {};

RequestInitialQuote.defaultProps = {};

export default RequestInitialQuote;
