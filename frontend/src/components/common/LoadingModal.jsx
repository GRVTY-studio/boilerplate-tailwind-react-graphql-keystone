import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import ProgressBar from './ProgressBar';
import { loadingIconHelper } from '../../tools/utilities/iconHelper';
import { loadingKey } from '../../tools/utilities/transforms';

const LoadingModal = ({ content, iconKey }) => (
    <Modal>
        <div className="modal-container">
            {loadingIconHelper[iconKey]}
            {content && <h1 className="my-10">{content}</h1>}
            <ProgressBar />
        </div>
    </Modal>
);

LoadingModal.propTypes = {
    content: PropTypes.string,
    iconKey: PropTypes.string,
};

LoadingModal.defaultProps = {
    content: null,
    iconKey: loadingKey.default,
};

export default LoadingModal;
