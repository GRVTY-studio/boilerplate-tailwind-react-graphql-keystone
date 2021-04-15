import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskConfirmation } from '../../tools/redux/selectors/taskConfirmationSelectors';
import Modal, { WelcomeModal2 } from './Modal';
import {
    companyPropShape,
    quotePropShape,
    tasks,
} from '../../tools/utilities/transforms';
import { clearTaskConfirmation } from '../../tools/redux/slices/taskConfirmationSlice';
import EstimatedTaxCredit from '../tasks/EstimatedTaxCredit';
import { taskIconHelper } from '../../tools/utilities/iconHelper';
import Button from './Button';
import { ReactComponent as CrossIcon } from '../../img/svg/x-icon.svg';
import { ReactComponent as CheckIcon } from '../../img/svg/check-icon.svg';
import { updateEmployeeSortBy } from '../../tools/redux/slices/employeeSlice';
import { clearYearlyIncomeUpdates } from '../../tools/redux/slices/yearlyIncomeSlice';

const TaskConfirmationModal = ({ quote, company }) => {
    const dispatch = useDispatch();
    const { key, extraOptions } = useSelector(selectTaskConfirmation);

    const clearTask = () => dispatch(clearTaskConfirmation());

    if (key === tasks.unsavedChanges.key)
        return (
            <Modal transparent>
                <div className="modal-container">
                    <div className="grid gap-5 place-content-center place-items-center">
                        {taskIconHelper.markactivity}
                        <h1>Continue?</h1>
                        <p className="text-center">
                            Sorting or filtering will cause you to lose any
                            unsaved changes.
                        </p>
                        <div className="w-full flex justify-between">
                            <Button
                                onClick={() =>
                                    dispatch(clearTaskConfirmation())
                                }
                                content="No"
                                small
                                primary
                                styleOverides={{ width: '120px' }}
                            />
                            <Button
                                content="Yes"
                                onClick={() => {
                                    dispatch(
                                        updateEmployeeSortBy(
                                            extraOptions.sortBy,
                                        ),
                                    );
                                    dispatch(clearTaskConfirmation());
                                    dispatch(clearYearlyIncomeUpdates());
                                }}
                                small
                                primary
                                styleOverides={{ width: '120px' }}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        );
    if (key === tasks.showWelcomeModal2.key)
        return <WelcomeModal2 onClose={clearTask} />;
    if (key === tasks.showQuote.key)
        return (
            <Modal transparent>
                <div className="w-full h-full flex">
                    <EstimatedTaxCredit
                        quote={quote || {}}
                        companyAge={
                            new Date().getFullYear() -
                            company?.yearOfIncorporation
                        }
                        isNew={false}
                    />
                </div>
            </Modal>
        );

    if (
        key &&
        ![tasks.showWelcomeModal2.key, tasks.showQuote.key].includes(key)
    ) {
        return (
            <Modal transparent>
                <CrossIcon className="absolute top-3 right-5" />
                <div className="modal-container">
                    {taskIconHelper[key]}

                    <div className="w-full grid place-items-center grid-flow-row gap-8 grid-cols-1">
                        <h1 className="text-2xl whitespace-nowrap">
                            {tasks[key]?.name}
                        </h1>
                        <div className="text-sm text-blue-gray font-semibold">
                            TASK COMPLETE <CheckIcon className="inline" />
                        </div>
                        <Button
                            secondary
                            small
                            onClick={clearTask}
                            content="Continue"
                        />
                    </div>
                </div>
            </Modal>
        );
    }

    return null;
};

TaskConfirmationModal.propTypes = {
    company: PropTypes.shape(companyPropShape),
    quote: PropTypes.shape(quotePropShape),
};

TaskConfirmationModal.defaultProps = {
    company: undefined,
    quote: undefined,
};

export default TaskConfirmationModal;
