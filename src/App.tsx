import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import { ToastContainer } from 'react-toastify';
import 'react-multi-carousel/lib/styles.css';
import './components/multi-carousel/styles.css';

import AppProvider from './hooks';

import Routes from './routes';
import GlobalStyle from './styles/global';
import { theme } from './theme';

const App: React.FC = () => {
    const engine = new Styletron();

    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={theme}>
                <Router>
                    <AppProvider>
                        <Routes />
                    </AppProvider>

                    <GlobalStyle />
                    <ToastContainer autoClose={3000} />
                </Router>
            </BaseProvider>
        </StyletronProvider>
    );
};

export default App;
