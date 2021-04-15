import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { ReactComponent as CheckIcon } from '../../img/svg/task-check-icon.svg';

const TaskListItem = ({
    mainIcon: MainIcon,
    title,
    isNew,
    complete,
    canEdit,
    button: CustomButton,
    toolTip,
}) => {
    const getButtonContent = () => {
        if (!complete) return 'Add info';
        if (canEdit) return 'Edit info';

        return 'Review';
    };

    return (
        <div className="flex flex-row w-full h-36 shadow rounded-3xl items-center p-16">
            <div className="w-1/2 flex flex-row items-center serif-pro font-semibold text-2xl">
                {MainIcon && (
                    <MainIcon
                        className={`mr-10 ${
                            !complete
                                ? 'text-green-bright'
                                : 'text-blue-gray-medium'
                        } stroke-current fill-current`}
                    />
                )}
                {title}
                {isNew && (
                    <div className="w-2 h-2 bg-green-light rounded-full ml-5" />
                )}
            </div>
            <div className="w-1/2 grid grid-flow-col gap-10 items-center justify-end">
                {CustomButton || (
                    <Button
                        content={getButtonContent()}
                        primary={!complete}
                        secondary={complete}
                    />
                )}
                {complete ? (
                    <CheckIcon className="text-green-light fill-current" />
                ) : (
                    toolTip
                )}
            </div>
        </div>
    );
};

TaskListItem.propTypes = {
    title: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    mainIcon: PropTypes.shape({ render: PropTypes.func }),
    complete: PropTypes.bool,
    canEdit: PropTypes.bool,
    button: PropTypes.element,
    toolTip: PropTypes.element.isRequired,
};

TaskListItem.defaultProps = {
    isNew: false,
    mainIcon: null,
    complete: false,
    canEdit: false,
    button: null,
};

export default TaskListItem;
