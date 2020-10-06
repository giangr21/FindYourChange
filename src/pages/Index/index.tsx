import React, { useRef } from 'react';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';

import { useHistory } from 'react-router-dom';
import Input from '../../components/Input/MainSearchInput';
import Select from '../../components/Select/MainSearchSelect';
import IconButton from '../../components/Button/IconButton';
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
    const history = useHistory();

    return (
        <Container>
            <SearchContainer>
                <Title>Barbearia? Tatuagem? Piercing? Agende online os serviços mais próximos de você</Title>
                <Form ref={formRef} onSubmit={() => {}}>
                    <Input name="email" icon={FaSearch} placeholder="Pesquisar Serviço" />
                    <Select name="state" placeholder="Cidade" />
                    <IconButton
                        icon={FaArrowRight}
                        title="Buscar"
                        background="#3A3A3A"
                        action={() => {
                            history.push('/service');
                        }}
                    />
                </Form>
            </SearchContainer>
            <Recommendation>
                <span className="title">Serviços Recomendados</span>
                <div className="separator" />
                <RecommendationContent>
                    <RecommendationCard
                        onClick={() => {
                            history.push('/provider');
                        }}
                    >
                        <img src={card1} alt="" />
                        <span>De Angelo Barbearia</span>
                        <p>Centro, Curitiba - PR 81000-000</p>
                    </RecommendationCard>
                    <RecommendationCard
                        onClick={() => {
                            history.push('/provider');
                        }}
                    >
                        <img src={card2} alt="" />
                        <span>Los Santos Tatuagens</span>
                        <p>Centro, Itajaí - SC 82000-000</p>
                    </RecommendationCard>
                    <RecommendationCard
                        onClick={() => {
                            history.push('/provider');
                        }}
                    >
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
