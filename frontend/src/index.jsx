import React from 'react';
import { Integrations } from '@sentry/tracing';
import * as Sentry from '@sentry/react';
import TagManager from 'react-gtm-module';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './tools/redux/store';
import SomethingWentWrong from './components/common/SomethingWentWrong';

if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        integrations: [new Integrations.BrowserTracing()],
        release: `${'my-project-name@'} + ${process.env.npm_package_version}`,
        tracesSampleRate: 0.5,
    });
}

if (process.env.REACT_APP_GTM_ID) {
    const tagManagerArgs = {
        gtmId: process.env.REACT_APP_GTM_ID,
    };

    TagManager.initialize(tagManagerArgs);
}

ReactDOM.render(
    <React.StrictMode>
        <Sentry.ErrorBoundary fallback={SomethingWentWrong} showDialog>
            <Provider store={store}>
                <App />
            </Provider>
        </Sentry.ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
