import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import { useFinchConnect } from 'react-finch-connect';

function App() {
    const [code, setCode] = useState(null);

    const onSuccess = ({ code }) => {
        setCode(code);
        console.log(code);
    };
    const onError = ({ errorMessage }) => console.error(errorMessage);
    const onClose = () => console.log('User exited Finch Connect');

    const { open } = useFinchConnect({
        clientId: '6d072379-4b03-45b1-9e26-0d11879dbde6',
        // payrollProvider: '<payroll-provider-id>',
        products: [
            'company',
            'directory',
            'employment',
            'payment',
            'pay_statement',
        ],
        onSuccess,
        onError,
        onClose,
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <button type="button" onClick={() => open()}>
                    Open Finch Connect
                </button>
            </header>
        </div>
    );
}

export default App;
