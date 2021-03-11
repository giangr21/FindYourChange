import React from 'react';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { Content } from './styles';

const DefaultLayout: React.FC = ({ children }) => {
    // const { isAuthenticated } = useAuth();

    return (
        <Content>
            <Header />
            {children}
            <Footer />
        </Content>
    );
};

export default DefaultLayout;
