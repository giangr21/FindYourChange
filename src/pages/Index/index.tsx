import React, { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input/MainSearchInput';
import Select from '../../components/Select/MainSearchSelect';
import { Container, SearchContainer, Title, Form, Recommendation } from './styles';

const Index: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    return (
        <Container>
            <SearchContainer>
                <Title>Descubra profissionais perto de voce</Title>
                <Form ref={formRef} onSubmit={() => {}}>
                    <Input name="email" icon={FaSearch} placeholder="search" />
                    <Select name="state" placeholder="teste" />
                </Form>
            </SearchContainer>
            <Recommendation>recomendacao</Recommendation>
        </Container>
    );
};

export default Index;
