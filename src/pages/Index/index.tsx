/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import {
    Box,
    BoxMobile,
    IconService,
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
import { Tattoo } from './IconsMobile/iconTattoo';
import { Barber } from './IconsMobile/iconBarber';
import { Piercing } from './IconsMobile/iconPiercing';
import Input from '../../components/FormComponents/Input/MainSearchInputMobile';
import Header from '../../components/Header';

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
            <BoxMobile>
                <Header />
                <div className="underHeader">
                    <span> Agende online os serviços mais próximos de você..</span>
                    <Input icon={FaSearch} placeholder="Pesquisar Serviço " />
                    <div className="services">
                        <div className="service">
                            <IconService>
                                <Barber />
                            </IconService>
                            <small>Barbearia</small>
                        </div>
                        <div className="service">
                            <IconService>
                                <Tattoo />
                            </IconService>
                            <small>Tatuagem</small>
                        </div>
                        <div className="service">
                            <IconService>
                                <Piercing />
                            </IconService>
                            <small>Piercing</small>
                        </div>
                    </div>
                </div>
            </BoxMobile>
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
