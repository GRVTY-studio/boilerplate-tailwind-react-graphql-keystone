import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SpiralImage } from '../../img/svg/colour-spiral.svg';
import { ReactComponent as CrossIcon } from '../../img/svg/cross-icon.svg';
import Button from './Button';

export const WelcomeModal = ({ name, year }) => (
    <div className="fixed top-0 left-0 z-10 bg-transparent w-full h-full flex items-center justify-center bg-gray-light bg-opacity-30">
        <div
            className="shadow rounded-3xl z-10 bg-white relative"
            style={{ width: '841px', height: '478px' }}
        >
            <CrossIcon className="absolute z-20 top-5 right-5 cursor-pointer" />
            <div className="flex flex-row w-full h-full">
                <SpiralImage className="h-full w-1/3" />
                <div className="flex flex-col items-start justify-center w-2/3 p-10">
                    <h1>Welcome, {name}</h1>
                    <span className="inter font-normal text-xl my-10">
                        You’re in good hands, let’s get you those {year} R&D Tax
                        Credits.
                    </span>
                    <span className="inter font-normal text-base mb-10">
                        Our process has 4 steps:{' '}
                        <span className="font-bold">
                            Assesment, Qualification, Analysis & Savings.
                        </span>{' '}
                        Complete the <span className="font-bold">Tasks</span>{' '}
                        for each step to progress with your R&D tax credit
                        application.
                    </span>
                    <Button primary content="Let's go" />
                </div>
            </div>
        </div>
    </div>
);

WelcomeModal.propTypes = {
    name: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
};

WelcomeModal.defaultProps = {};

export const WelcomeModal2 = ({ onClose }) => (
    <div className="fixed top-0 left-0 z-10 bg-transparent w-full h-full flex items-center justify-center bg-gray-light bg-opacity-30">
        <div
            className="shadow rounded-3xl z-10 bg-white relative"
            style={{ width: '650px', height: '478px' }}
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute z-20 top-5 right-5"
            >
                <CrossIcon />
            </button>
            <div className="flex flex-row w-full h-full">
                <div className="flex flex-col items-start justify-center w-full p-20">
                    <h1>Thanks for the info!</h1>
                    <span className="inter font-normal text-xl my-10">
                        We`re assigning you an accountant who will be in touch
                        with you shortly.
                    </span>
                    <span className="inter font-normal text-base mb-10 text-blue-gray">
                        In the meantime, you can get ahead on the process by
                        linking your{' '}
                        <span className="font-bold">accounting software</span>{' '}
                        with PROJECT_NAME.
                    </span>
                    <div className="w-full justify-end flex">
                        <Button
                            secondary
                            content="Continue"
                            onClick={onClose}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
WelcomeModal2.propTypes = {
    onClose: PropTypes.func.isRequired,
};

const Modal = ({ children, transparent }) => (
    <div
        className={`fixed top-0 left-0 z-10 ${
            transparent ? 'bg-gray-light bg-opacity-30' : 'bg-white-pale'
        } w-full h-full flex items-center justify-center`}
    >
        <div
            className="shadow rounded-3xl z-10 bg-white relative"
            style={{ maxWidth: '450px' }}
        >
            {children}
        </div>
    </div>
);

Modal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    transparent: PropTypes.bool,
};

Modal.defaultProps = { transparent: false };

export default Modal;
