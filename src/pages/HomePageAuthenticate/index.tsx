import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';

import { Container } from './styles';
import { useAuth } from '../../hooks/Auth';

const Index: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signOut } = useAuth();

    return (
        <Container>
            <h1>Logged</h1>
            <button type="button" onClick={signOut}>
                Sair
            </button>
        </Container>
    );
};

export default Index;
