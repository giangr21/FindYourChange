import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import { ToastContainer } from 'react-toastify';
import 'react-multi-carousel/lib/styles.css';
import './components/MultiCarousel/styles.css';

import Routes from './routes';
import GlobalStyle from './styles/global';
import { theme } from './theme';
import { AuthProvider } from './hooks/authentication';

const App: React.FC = () => {
    const engine = new Styletron();

    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={theme}>
                <AuthProvider>
                    <Routes />
                </AuthProvider>

                <GlobalStyle />
                <ToastContainer autoClose={3000} />
            </BaseProvider>
        </StyletronProvider>
    );
};

export default App;
