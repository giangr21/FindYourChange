import React from 'react';

import { Container } from './styles';
import logo from '../../assets/logoPrincipalMobile.png';

interface LoadingProps {
    heightLoading?: string | undefined;
    style?: any;
}

const Loading: React.FC<LoadingProps> = ({ heightLoading, style }): any => (
    <Container style={style} heightLoading={heightLoading}>
        <img src={logo} alt="FYC" aria-label="FYC" title="FYC" />
    </Container>
);

export default Loading;
