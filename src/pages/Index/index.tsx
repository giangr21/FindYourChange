/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import {
    Box,
    Image,
    Content,
    Title,
    Description,
    SearchWrapper,
    Container,
    Recommendation,
    RecommendationCard,
    RecommendationContent,
} from './styles';

import card1 from '../../assets/reco1.png';
import card2 from '../../assets/reco2.png';
import card3 from '../../assets/reco3.png';
import imageUrl from '../../assets/background.jpg';
import Search from '../../components/Search';
import api from '../../services/api';

const Index: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [popularRecommendations, setPopularRecommendations] = useState([]);

    useEffect(() => {
        const getPopularRecommendations = async function (): Promise<void> {
            await api
                .get(`/providerRecommendation/populars/`)
                .then(async (response) => {
                    console.log(response);
                    setPopularRecommendations(response.data);
                    setLoading(false);
                })
                .catch((e) => {
                    // toast.error('Houve um erro ao buscar dados!');
                    console.log(e);
                });
        };
        getPopularRecommendations();
    }, []);

    return (
        <>
            <Box display={['none', 'none', 'flex']}>
                <Image backgroundImage={`url(${imageUrl})`} />
                <Content>
                    <Title>Barbearia ? Tatuagem ? Piercing ?</Title>
                    <Description>Agende online os serviços mais próximos de você</Description>
                    <SearchWrapper>
                        <Search className="banner-search" shadow="0 21px 36px rgba(0,0,0,0.05)" />
                    </SearchWrapper>
                </Content>
            </Box>
            <Container>
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
        </>
    );
};

export default Index;
