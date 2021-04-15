import React from 'react';
import PropTypes from 'prop-types';
import {
    companyPropShape,
    quotePropShape,
} from '../../tools/utilities/transforms';
import Modal from '../common/Modal';
import EstimatedTaxCredit from './EstimatedTaxCredit';

const SavingsEstimate = ({ quote = {}, company }) => (
    <Modal>
        <div className="w-full h-full flex">
            <EstimatedTaxCredit
                quote={quote}
                companyAge={
                    new Date().getFullYear() - company?.yearOfIncorporation
                }
            />
        </div>
    </Modal>
);

SavingsEstimate.propTypes = {
    quote: PropTypes.shape(quotePropShape).isRequired,
    company: PropTypes.shape(companyPropShape).isRequired,
};

SavingsEstimate.defaultProps = {};

export default SavingsEstimate;
