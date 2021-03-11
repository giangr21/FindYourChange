import React from 'react';
import Header from '../../../components/Header/ProviderAuthenticate';
import HeaderMobile from '../../../components/Header/ProviderAuthenticate/mobile';

import { Wrapper } from './styles';

const AuthLayout: React.FC = ({ children }) => {
    return (
        <Wrapper>
            <div className="header">
                <Header />
            </div>
            <div className="headerMobile">
                <HeaderMobile />
            </div>
            <div className="content">{children}</div>
        </Wrapper>
    );
};

export default AuthLayout;
