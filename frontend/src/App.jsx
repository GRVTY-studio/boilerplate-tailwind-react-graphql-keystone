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
import CenterLayout from './layouts/CenterLayout';
import Overview from './components/tasks/Overview';
import Integrations from './components/integrations/Integrations';
import Profile from './components/profile/Profile';
import Login from './components/login/Login';
import CreateAccount from './components/signUp/CreateAccount';
import UnAuthenticatedLayout from './layouts/UnAuthenticatedLayout';
import InitialQuote from './components/tasks/InitialQuote';
import RequestInitialQuote from './components/signUp/RequestInitialQuote';
import EditEstimate from './components/tasks/EditEstimate';
import MarkRDActivity from './components/tasks/MarkRDActivity';
import LoadingModal from './components/common/LoadingModal';
import RequestPasswordReset from './components/login/RequestPasswordReset';
import {
    selectHasAddedIntegration,
    selectHasMarkedRNDActivity,
    selectHasProjects,
    selectHasQuote,
    selectIsAuthenticated,
    selectUser,
    selectHasCompany,
} from './tools/redux/selectors/authSelectors';
import { selectLoading } from './tools/redux/selectors/commonSelectors';
import {
    loadingTransform,
    sliceTransform,
    tasks,
} from './tools/utilities/transforms';
import {
    getUserConfigThunk,
    logoutThunk,
} from './tools/redux/thunks/authThunks';
import { selectLatestQuote } from './tools/redux/selectors/quoteSelectors';
import { selectCompany } from './tools/redux/selectors/companySelectors';
import {
    selectAllIntegrations,
    selectShowTaskCompleted,
} from './tools/redux/selectors/integrationSelectors';
import { getIndustriesThunk } from './tools/redux/thunks/companyThunks';
import LoadingComponent from './components/common/LoadingComponent';
import EditProjects from './components/tasks/EditProjects';
import GoogleAuth from './components/signUp/GoogleAuth';
import TaskConfirmationModal from './components/common/TaskConfirmationModal';
import PasswordReset from './components/signUp/PasswordReset';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
    const dispatch = useDispatch();
    // Entities
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const hasCompany = useSelector(selectHasCompany);
    const hasQuote = useSelector(selectHasQuote);
    const hasProjects = useSelector(selectHasProjects);
    const hasAddedIntegration = useSelector(selectHasAddedIntegration);
    const hasMarkedRNDActivity = useSelector(selectHasMarkedRNDActivity);
    const showIntegrationTaskCompleted = useSelector(selectShowTaskCompleted);

    const user = useSelector(selectUser);
    const quote = useSelector(selectLatestQuote);
    const company = useSelector(selectCompany);
    const integrations = useSelector(selectAllIntegrations);

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
        if (isAuthenticated) {
            dispatch(getIndustriesThunk());
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
                <TaskConfirmationModal quote={quote} company={company} />
                <Switch>
                    <Route
                        path={[
                            '/dashboard/:path/:taskCompleted',
                            '/dashboard/:path',
                            '/dashboard',
                        ]}
                    >
                        <AuthenticatedLayout
                            lastQuote={quote}
                            hasQuote={hasQuote}
                            hasAddedIntegration={hasAddedIntegration}
                            hasMarkedRNDActivity={hasMarkedRNDActivity}
                        >
                            <Switch>
                                {!isAuthenticated && <Redirect to="/login" />}
                                <Route
                                    path={['/dashboard/overview']}
                                    render={() => (
                                        <Overview
                                            company={company}
                                            quote={quote}
                                            userId={user?.id}
                                            integrations={integrations}
                                            hasCompany={hasCompany}
                                            hasQuote={hasQuote}
                                            hasProjects={hasProjects}
                                            hasAddedIntegration={
                                                hasAddedIntegration
                                            }
                                            hasMarkedRNDActivity={
                                                hasMarkedRNDActivity
                                            }
                                            showIntegrationTaskCompleted={
                                                showIntegrationTaskCompleted
                                                    ? tasks
                                                          .connectaccountingsoftware
                                                          .key
                                                    : undefined
                                            }
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    render={() => (
                                        <EditProjects quote={quote} />
                                    )}
                                    path="/dashboard/task/projects"
                                />
                                <Route
                                    exact
                                    render={() => (
                                        <Integrations
                                            integrations={integrations}
                                            userId={user?.id}
                                        />
                                    )}
                                    path="/dashboard/integrations"
                                />
                                <Route
                                    path="/dashboard/profile"
                                    render={() => (
                                        <Profile
                                            company={company}
                                            user={user}
                                            logOut={logOut}
                                        />
                                    )}
                                />
                                <Route
                                    path="/dashboard/task/editestimate"
                                    render={() => (
                                        <EditEstimate quote={quote} />
                                    )}
                                />
                                <Route
                                    exact
                                    render={() => (
                                        <MarkRDActivity
                                            projects={quote?.projects?.split(
                                                ',',
                                            )}
                                        />
                                    )}
                                    path="/dashboard/task/markrdactivity"
                                />
                                {!quote && (
                                    <Route
                                        path="/dashboard/task/getinitialquote"
                                        render={() => (
                                            <InitialQuote
                                                userId={user?.id}
                                                company={company}
                                                quote={quote}
                                                isSignUp={false}
                                            />
                                        )}
                                    />
                                )}
                                <Redirect
                                    from="/dashboard"
                                    to="/dashboard/overview"
                                />
                            </Switch>
                        </AuthenticatedLayout>
                    </Route>
                    <Route path={['/getinitialquote', '/requestquote']}>
                        <CenterLayout>
                            <Switch>
                                <Route
                                    exact
                                    render={() => (
                                        <InitialQuote
                                            userId={user?.id}
                                            company={company}
                                            quote={quote}
                                            isSignUp
                                        />
                                    )}
                                    path="/getinitialquote"
                                />
                                <Route
                                    exact
                                    render={() => <RequestInitialQuote />}
                                    path="/requestquote"
                                />
                            </Switch>
                        </CenterLayout>
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
                                    {isAuthenticated && hasQuote && (
                                        <Redirect to="/dashboard" />
                                    )}
                                    {isAuthenticated && (
                                        <Redirect to="/requestquote" />
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
