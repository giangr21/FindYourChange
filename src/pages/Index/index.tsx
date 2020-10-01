import React, { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input/MainSearchInput';
import Select from '../../components/Select/MainSearchSelect';
import {
    Container,
    SearchContainer,
    Title,
    Form,
    Recommendation,
    RecommendationCard,
    RecommendationContent,
} from './styles';
import card1 from '../../assets/reco1.png';
import card2 from '../../assets/reco2.png';
import card3 from '../../assets/reco3.png';

const Index: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    return (
        <Container>
            <SearchContainer>
                <Title>Agende online os serviços de beleza mais próximos de você</Title>
                <Form ref={formRef} onSubmit={() => {}}>
                    <Input name="email" icon={FaSearch} placeholder="Pesquisar Serviço" />
                    <Select name="state" placeholder="Cidade" />
                </Form>
            </SearchContainer>
            <Recommendation>
                <span className="title">Serviços Recomendados</span>
                <div className="separator" />
                <RecommendationContent>
                    <RecommendationCard>
                        <img src={card1} alt="" />
                        <span>De Angelo Barbearia</span>
                        <p>Centro, Curitiba - PR 81000-000</p>
                    </RecommendationCard>
                    <RecommendationCard>
                        <img src={card2} alt="" />
                        <span>Los Santos Tatuagens</span>
                        <p>Centro, Itajaí - SC 82000-000</p>
                    </RecommendationCard>
                    <RecommendationCard>
                        <img src={card3} alt="" />
                        <span>Retro Body Piercing</span>
                        <p>Centro, Curitiba - PR 83000-000</p>
                    </RecommendationCard>
                </RecommendationContent>
            </Recommendation>
        </Container>
    );
};

export default Index;
