import React from 'react';
import Header from '../../../components/Header/ProviderAuthenticate';

import { Wrapper } from './styles';

const AuthLayout: React.FC = ({ children }) => {
    return (
        <Wrapper>
            <Header />
            {children}
        </Wrapper>
    );
};

export default AuthLayout;
