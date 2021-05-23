/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
                    for (let index = 0; index < response.data.length; index++) {
                        const recommendation = response.data[index];

                        if (recommendation.provider.providerImages.length > 0) {
                            const { data: imgBase64 } = await api.get(
                                `storage/base64/${recommendation.provider.providerImages[0].image}`,
                            );
                            recommendation.defaultImg = imgBase64;
                        }
                    }
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
                        <div
                            onClick={() => {
                                history.push({
                                    pathname: `/allServicesProvider/`,
                                    state: 'isBarber',
                                });
                            }}
                            className="service"
                        >
                            <IconService>
                                <Barber />
                            </IconService>
                            <small>Barbearia</small>
                        </div>
                        <div
                            onClick={() => {
                                history.push({
                                    pathname: `/allServicesProvider/`,
                                    state: 'isTattoo',
                                });
                            }}
                            className="service"
                        >
                            <IconService>
                                <Tattoo />
                            </IconService>
                            <small>Tatuagem</small>
                        </div>
                        <div
                            onClick={() => {
                                history.push({
                                    pathname: `/allServicesProvider/`,
                                    state: 'isPiercing',
                                });
                            }}
                            className="service"
                        >
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
                        {popularRecommendations.map((popularRecommendation: any) => (
                            <RecommendationCard
                                key={popularRecommendation.id}
                                onClick={() => {
                                    history.push(`/provider/${popularRecommendation.provider.id}`);
                                }}
                            >
                                {popularRecommendation.defaultImg && (
                                    <img
                                        src={`data:image/png;base64,${popularRecommendation.defaultImg}`}
                                        alt=""
                                    />
                                )}
                                <span>
                                    {popularRecommendation.provider.legalName.length > 20
                                        ? `${popularRecommendation.provider.legalName.substring(0, 20)}..`
                                        : popularRecommendation.provider.legalName}{' '}
                                </span>
                                <p>
                                    {popularRecommendation.provider.addressCity} -{' '}
                                    {popularRecommendation.provider.phone}
                                </p>
                            </RecommendationCard>
                        ))}
                    </RecommendationContent>
                </Recommendation>
            </Container>
        </>
    );
};

export default Index;
