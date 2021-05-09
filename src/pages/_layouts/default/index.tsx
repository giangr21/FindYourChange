import React from 'react';

import { useLocation } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { Content } from './styles';
import { useMedia } from '../../../util/use-media';

const DefaultLayout: React.FC = ({ children }) => {
    const mobile = useMedia('(max-width: 990px)');
    const location = useLocation();

    const showHeader = (): boolean => {
        if (location.pathname === '/' && mobile) return false;
        return true;
    };

    return (
        <Content>
            {showHeader() && <Header />}
            {children}
            <Footer />
        </Content>
    );
};

export default DefaultLayout;
