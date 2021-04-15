import React from 'react';
import { useSelector } from 'react-redux';
import { selectCreateLoading } from '../../tools/redux/selectors/commonSelectors';
import { loadingIconHelper } from '../../tools/utilities/iconHelper';
import {
    loadingTransform,
    sliceTransform,
} from '../../tools/utilities/transforms';
import LoadingModal from './LoadingModal';
import Modal from './Modal';
import ProgressBar from './ProgressBar';

const LoadingComponent = () => {
    const creatingCompany =
        useSelector((state) =>
            selectCreateLoading(state, sliceTransform.company),
        ) === loadingTransform.pending;
    const creatingQuote =
        useSelector((state) =>
            selectCreateLoading(state, sliceTransform.quotes),
        ) === loadingTransform.pending;
    const creatingUser =
        useSelector((state) =>
            selectCreateLoading(state, sliceTransform.auth),
        ) === loadingTransform.pending;
    const creatingIntegration =
        useSelector((state) =>
            selectCreateLoading(state, sliceTransform.integrations),
        ) === loadingTransform.pending;
    const creatingYearlyIncome =
        useSelector((state) =>
            selectCreateLoading(state, sliceTransform.yearlyIncome),
        ) === loadingTransform.pending;

    const loading =
        creatingCompany ||
        creatingQuote ||
        creatingUser ||
        creatingIntegration ||
        creatingYearlyIncome;

    if (!loading) return null;
    if (creatingQuote)
        return (
            <Modal>
                <div className="modal-container">
                    {loadingIconHelper.quote}
                    <h1 className="my-10">Generating quote</h1>
                    <ProgressBar />
                </div>
            </Modal>
        );

    return <LoadingModal />;
};

LoadingComponent.propTypes = {};

LoadingComponent.defaultProps = {};

export default LoadingComponent;
