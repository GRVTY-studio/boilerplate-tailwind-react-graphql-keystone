import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import logo from './logo.svg';
import './App.css';
import { endpoint } from './config';
import Button from './components/common/Button';

const client = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="bg-blue-900">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <Button primary content="Test" />
                </header>
            </div>
        </ApolloProvider>
    );
}

export default App;
