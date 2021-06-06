/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable func-names */
import React, { useEffect, useState, useCallback } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import {
    Box,
    BoxMobile,
    IconService,
    IconServiceDesktop,
    Image,
    Content,
    Title,
    Description,
    SearchWrapper,
    Container,
    Recommendation,
    RecommendationCard,
    RecommendationContent,
    ServiceCard,
} from './styles';

import imageUrl1 from '../../assets/HomeImgs/1.jpg';
import imageUrl2 from '../../assets/HomeImgs/2.jpg';
import imageUrl3 from '../../assets/HomeImgs/3.jpg';
import Search from '../../components/Search';
import api from '../../services/api';
import { Tattoo } from './IconsMobile/iconTattoo';
import { Barber } from './IconsMobile/iconBarber';
import { Piercing } from './IconsMobile/iconPiercing';
import Input from '../../components/FormComponents/Input/MainSearchInputMobile';
import Header from '../../components/Header';

const Index: React.FC = () => {
    const history = useHistory();
    const [valueSearchBox, setValueSearchBox] = useState('');
    const [loading, setLoading] = useState(true);
    const [popularRecommendations, setPopularRecommendations] = useState([]);
    const [img, setImg] = useState<any>(null);

    useEffect(() => {
        const getRandomImg = (): void => {
            const array = [1, 2, 3];
            const sortedArray = array.sort(() => 0.5 - Math.random());

            if (sortedArray[0] === 1) {
                setImg(imageUrl1);
            } else if (sortedArray[0] === 2) {
                setImg(imageUrl2);
            } else {
                setImg(imageUrl3);
            }
        };

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
                    setPopularRecommendations(response.data);
                    setLoading(false);
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        getRandomImg();
        getPopularRecommendations();
    }, []);

    const handleSubmit = useCallback(() => {
        history.push({
            pathname: `/allServicesProvider/`,
            state: valueSearchBox,
        });
    }, [history, valueSearchBox]);

    const handleOnChange = useCallback((e: any) => {
        e.preventDefault();
        setValueSearchBox(e.target.value);
    }, []);

    return (
        <>
            <Box display={['none', 'none', 'flex']}>
                <Image backgroundImage={`url(${img})`} />
                <Content>
                    <div
                        style={{
                            padding: 20,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Description
                            style={{
                                padding: 20,
                                background: 'rgba(0,0,0,.5)',
                                borderRadius: '12px',
                            }}
                        >
                            Agende online os serviços mais próximos de você..
                        </Description>
                    </div>
                    <SearchWrapper>
                        <Search
                            valueSearchBox={valueSearchBox}
                            setValueSearchBox={setValueSearchBox}
                            handleSubmit={handleSubmit}
                            className="banner-search"
                            shadow="0 21px 36px rgba(0,0,0,0.05)"
                        />
                    </SearchWrapper>
                    <ServiceCard>
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
                                <IconServiceDesktop>
                                    <Barber width="92px" height="92px" color="#fff" />
                                </IconServiceDesktop>
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
                                <IconServiceDesktop>
                                    <Tattoo width="92px" height="92px" color="#fff" />
                                </IconServiceDesktop>
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
                                <IconServiceDesktop>
                                    <Piercing width="92px" height="92px" color="#fff" />
                                </IconServiceDesktop>
                                <small>Piercing</small>
                            </div>
                        </div>
                    </ServiceCard>
                </Content>
            </Box>
            <BoxMobile>
                <Header />
                <div className="underHeader">
                    <span> Agende online os serviços mais próximos de você..</span>
                    <Input
                        icon={FaSearch}
                        placeholder="Pesquisar Serviço "
                        onChange={(e) => handleOnChange(e)}
                        onClick={handleSubmit}
                        value={valueSearchBox}
                    />
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
                                <Barber width="62px" height="62px" color="#fff" />
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
                                <Tattoo width="62px" height="62px" color="#fff" />
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
                                <Piercing width="62px" height="62px" color="#fff" />
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
                        {loading ? (
                            <>
                                <RecommendationCard>
                                    <SkeletonTheme color="#3A3A3A" highlightColor="#ff9000">
                                        <Skeleton height="200px" width="300px" />
                                    </SkeletonTheme>
                                </RecommendationCard>
                                <RecommendationCard
                                    style={{
                                        marginRight: '10px',
                                        marginLeft: '10px',
                                    }}
                                >
                                    <SkeletonTheme color="#3A3A3A" highlightColor="#ff9000">
                                        <Skeleton height="200px" width="300px" />
                                    </SkeletonTheme>
                                </RecommendationCard>
                                <RecommendationCard>
                                    <SkeletonTheme color="#3A3A3A" highlightColor="#ff9000">
                                        <Skeleton height="200px" width="300px" />
                                    </SkeletonTheme>
                                </RecommendationCard>
                            </>
                        ) : (
                            popularRecommendations.map((popularRecommendation: any) => (
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
                            ))
                        )}
                    </RecommendationContent>
                </Recommendation>
            </Container>
        </>
    );
};

export default Index;
