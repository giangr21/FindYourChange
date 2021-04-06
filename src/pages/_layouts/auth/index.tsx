import React from 'react';
import Header from '../../../components/Header/ProviderAuthenticate';
import HeaderMobile from '../../../components/Header/ProviderAuthenticate/mobile';
import { useMedia } from '../../../util/use-media';

import { Wrapper } from './styles';

const AuthLayout: React.FC = ({ children }) => {
    const mobile = useMedia('(max-width: 990px)');

    return (
        <Wrapper mobile={mobile}>
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
