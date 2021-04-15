import React from 'react';
import queryString from 'querystring';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    locationPropShape,
    matchPropShape,
} from '../../tools/utilities/transforms';

const GoogleAuth = ({ location, match }) => {
    const { params: { response } = {} } = match;
    const { search } = location;
    const { '?msg': errorMessage } = queryString.parse(search);

    if (response === 'success') return <Redirect to="/login" />;
    return <div>{errorMessage}</div>;
};

GoogleAuth.propTypes = {
    location: PropTypes.shape(locationPropShape).isRequired,
    match: PropTypes.shape(matchPropShape).isRequired,
};

GoogleAuth.defaultProps = {};

export default withRouter(GoogleAuth);
