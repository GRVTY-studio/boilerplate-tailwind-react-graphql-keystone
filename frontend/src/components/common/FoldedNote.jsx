import React from 'react';
import PropTypes from 'prop-types';

const FoldedNote = ({ children, extraClassNames, cornerColourClass }) => (
    <div
        className={`w-full h-full ${
            extraClassNames || 'bg-blue-pale'
        } relative rounded-xl`}
    >
        <div className={`folded-corner-bottom ${cornerColourClass}`} />
        <div className="folded-corner-top" />
        <div className="w-full h-full flex">{children}</div>
    </div>
);

FoldedNote.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    extraClassNames: PropTypes.string,
    cornerColourClass: PropTypes.string,
};

FoldedNote.defaultProps = {
    extraClassNames: 'blue',
    cornerColourClass: 'blue',
};

export default FoldedNote;
