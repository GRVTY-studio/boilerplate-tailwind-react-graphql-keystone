import React, { useEffect } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import Overview from './components/tasks/Overview';
import Profile from './components/profile/Profile';
import Login from './components/login/Login';
import CreateAccount from './components/signUp/CreateAccount';
import UnAuthenticatedLayout from './layouts/UnAuthenticatedLayout';
import LoadingModal from './components/common/LoadingModal';
import RequestPasswordReset from './components/login/RequestPasswordReset';
import {
    selectIsAuthenticated,
    selectUser,
} from './tools/redux/selectors/authSelectors';
import { selectLoading } from './tools/redux/selectors/commonSelectors';
import { loadingTransform, sliceTransform } from './tools/utilities/transforms';
import {
    getUserConfigThunk,
    logoutThunk,
} from './tools/redux/thunks/authThunks';

import LoadingComponent from './components/common/LoadingComponent';
import GoogleAuth from './components/signUp/GoogleAuth';
import PasswordReset from './components/signUp/PasswordReset';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
    const dispatch = useDispatch();
    // Entities
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);

    // Loading selectors
    const loadingAuth = useSelector((state) =>
        selectLoading(state, sliceTransform.auth),
    );

    const logOut = () => {
        dispatch(logoutThunk());
    };

    // Always try and fetch the user on initial load
    // to determine if user is logged in
    useEffect(() => {
        if (loadingAuth === loadingTransform.initial && !user) {
            dispatch(getUserConfigThunk());
        }
    }, [loadingAuth, dispatch, user, isAuthenticated]);

    if (
        loadingAuth === loadingTransform.pending ||
        loadingAuth === loadingTransform.initial
    )
        return <LoadingModal />;

    const contextClass = {
        success: 'bg-green-bright text-white',
        error: 'bg-red-error text-white',
        info: 'bg-gray-light text-gray-dark',
        warning: 'bg-orange-400',
        default: 'bg-indigo-600',
        dark: 'bg-white-600 font-gray-300',
    };

    return (
        <>
            <ToastContainer
                toastClassName={({ type }) =>
                    `${
                        contextClass[type || 'default']
                    } h-12 min-w-min rounded-full mb-10 flex items-center justify-center`
                }
                bodyClassName={() => 'flex items-center justify-center w-full'}
                position="bottom-center"
                autoClose={4000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                transition={Slide}
                closeButton={false}
                enableMultiContainer={false}
            />
            <LoadingComponent />
            <Router>
                <Switch>
                    <Route
                        path={[
                            '/dashboard/:path/:taskCompleted',
                            '/dashboard/:path',
                            '/dashboard',
                        ]}
                    >
                        <AuthenticatedLayout>
                            <Switch>
                                {!isAuthenticated && <Redirect to="/login" />}
                                <Route
                                    path={['/dashboard/overview']}
                                    render={() => (
                                        <Overview userId={user?.id} />
                                    )}
                                />
                                <Route
                                    path="/dashboard/profile"
                                    render={() => (
                                        <Profile user={user} logOut={logOut} />
                                    )}
                                />
                                <Redirect
                                    from="/dashboard"
                                    to="/dashboard/overview"
                                />
                            </Switch>
                        </AuthenticatedLayout>
                    </Route>
                    <Route
                        path={[
                            '/signup',
                            '/login',
                            '/forgotpassword',
                            '/passwordreset',
                            '/auth/google/:response',
                        ]}
                    >
                        <Switch>
                            <UnAuthenticatedLayout>
                                <Switch>
                                    <Route
                                        render={() => <GoogleAuth />}
                                        path="/auth/google/:response"
                                    />
                                    <Route
                                        exact
                                        render={() => <RequestPasswordReset />}
                                        path="/forgotpassword"
                                    />
                                    <Route
                                        exact
                                        render={() => <PasswordReset />}
                                        path="/passwordreset"
                                    />
                                    {isAuthenticated && (
                                        <Redirect to="/dashboard" />
                                    )}
                                    <Route
                                        exact
                                        render={() => (
                                            <CreateAccount
                                                isLoggedIn={!!isAuthenticated}
                                            />
                                        )}
                                        path="/signup"
                                    />
                                    <Route
                                        exact
                                        render={() => <Login />}
                                        path="/login"
                                    />
                                </Switch>
                            </UnAuthenticatedLayout>
                        </Switch>
                    </Route>
                    {isAuthenticated ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Switch>
            </Router>
        </>
    );
}

export default App;
