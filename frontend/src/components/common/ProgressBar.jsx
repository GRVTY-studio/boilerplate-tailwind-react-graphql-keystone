import React from 'react';
import PropTypes from 'prop-types';

const ShadowCircle = ({ children }) => (
    <div className="rounded-full w-24 h-24 icon-circle-shadow flex flex-col items-center justify-center">
        {children}
    </div>
);

ShadowCircle.propTypes = {
    children: PropTypes.element.isRequired,
};

export const loadingModes = {
    manual: 'manual',
    auto: 'auto',
};

const ProgressBar = ({ completedPercentage = 1, mode = loadingModes.auto }) => {
    const getCompleteBarWidth = (completed, isIncompleteBar) => {
        switch (completed) {
            case 1:
                return 'w-1/12';
            case 2:
                return 'w-2/12';
            case 3:
                return 'w-3/12';
            case 4:
                return 'w-4/12';
            case 5:
                return 'w-5/12';
            case 6:
                return 'w-6/12';
            case 7:
                return 'w-7/12';
            case 8:
                return 'w-8/12';
            case 9:
                return 'w-9/12';
            case 10:
                return 'w-10/12';
            case 11:
                return 'w-11/12';
            case 12:
                return 'w-full';
            default:
                if (
                    (isIncompleteBar && completedPercentage <= 0) ||
                    (!isIncompleteBar && completedPercentage > 12)
                )
                    return 'w-full';
                return 'w-0';
        }
    };

    return (
        <div className="w-40 rounded-xl bg-transparent relative">
            {mode === loadingModes.manual && (
                <div className="flex flex-row w-1/3 h-1">
                    <div
                        className={`bg-green-PROJECT_NAME ${getCompleteBarWidth(
                            completedPercentage,
                        )}`}
                    />
                    <div
                        className={`bg-blue-secondary ${getCompleteBarWidth(
                            12 - completedPercentage,
                            true,
                        )}`}
                    />
                </div>
            )}
            {mode === loadingModes.auto && (
                <div className="grid relative w-40 h-2 mt-5 bg-gray-light rounded-xl">
                    <div className="bg-green-bright w-5 h-2 rounded-xl animate-ping-pong absolute" />
                </div>
            )}
        </div>
    );
};

ProgressBar.propTypes = {
    completedPercentage: PropTypes.number,
    mode: PropTypes.string,
};

ProgressBar.defaultProps = {
    completedPercentage: 0,
    mode: loadingModes.auto,
};

export default ProgressBar;
