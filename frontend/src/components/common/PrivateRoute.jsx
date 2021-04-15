import React from 'react';
import { useQuery } from '@apollo/client';
import { Redirect, Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { IS_LOGGED_IN } from '../../tools/apollo/queries';

const PrivateRoute = ({
    component: Component,
    setLoading,
    setError,
    requireAuth,
}) => {
    const {
        data: { isLoggedIn },
    } = useQuery(IS_LOGGED_IN);

    return (
        <Route
            render={() =>
                isLoggedIn === true || !requireAuth ? (
                    <Component
                        setLoading={setLoading}
                        setError={setError}
                        isLoggedIn={isLoggedIn}
                    />
                ) : (
                    <Redirect
                        push
                        to={{
                            pathname: '/login',
                            referrer: window.location.pathname,
                        }}
                    />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    setLoading: PropTypes.func,
    setError: PropTypes.func,
    requireAuth: PropTypes.bool,
};

PrivateRoute.defaultProps = {
    setLoading: null,
    setError: null,
    requireAuth: false,
};

export default PrivateRoute;
