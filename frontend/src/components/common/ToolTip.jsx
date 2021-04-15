import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as InfoIcon } from '../../img/svg/info-icon.svg';

const ToolTip = ({ children }) => (
    <div className="tooltip-container inter">
        <InfoIcon className="tooltip-icon" />
        <div className="tooltip-content">{children}</div>
    </div>
);

ToolTip.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

ToolTip.defaultProps = {};

export default ToolTip;
