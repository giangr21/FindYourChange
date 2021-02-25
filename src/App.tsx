import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppProvider from './hooks';
import './components/Scrollbar/scrollbar.css';

import Routes from './routes';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
    <Router>
        <AppProvider>
            <Routes />
        </AppProvider>

        <GlobalStyle />
        <ToastContainer autoClose={3000} />
    </Router>
);

export default App;
