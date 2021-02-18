import React from 'react';

import { Container } from './styles';
import logo from '../../assets/logoPrincipalMobile.png';

interface LoadingProps {
    heightLoading?: string | undefined;
}

const Loading: React.FC<LoadingProps> = ({ heightLoading }): JSX.Element => (
    <Container heightLoading={heightLoading}>
        <img src={logo} alt="FYC" aria-label="FYC" title="FYC" />
    </Container>
);

export default Loading;
