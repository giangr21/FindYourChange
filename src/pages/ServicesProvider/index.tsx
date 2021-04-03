/* eslint-disable no-await-in-loop */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaAngleDoubleRight, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { withStyle } from 'baseui';
import { BsDot } from 'react-icons/bs';
import { Row as Rows, Col as Column } from '../../components/FlexBox/FlexBox';
import IconButton from '../../components/Button/IconButton';
import IconButtonProvider from '../../components/Button/IconButtonProvider';
import {
    Container,
    Content,
    SearchContainer,
    ContentSearch,
    Results,
    ContentResults,
    Header,
    Provider,
    ProviderInfo,
    ProviderServiceContent,
    ProviderServices,
    ProductPrice,
    DiscountedPrice,
    Pagination,
} from './styles';
import DatePicker from '../../components/DatePicker';
import Radio from '../../components/Radio';

import api from '../../services/api';
import PaginationButton from '../../components/Button/PaginationButton';

export const Col = withStyle(Column, () => ({
    marginBottom: '3px',

    '@media only screen and (max-width: 767px)': {
        ':last-child': {
            marginBottom: 0,
        },
    },
}));

const Row = withStyle(Rows, () => ({
    paddingRight: '5px',
    '@media only screen and (min-width: 768px) and (max-width: 991px)': {
        alignItems: 'center',
    },
}));

const Index: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const secondFormRef = useRef<FormHandles>(null);
    const history = useHistory();
    const [providers, setProviders] = useState([]);
    const [showFilter, setShowFilter] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function getProviders(): Promise<void> {
            await api.post('/provider', {}).then(async (result) => {
                console.log(result);

                for (let index = 0; index < result.data.length; index++) {
                    const provider = result.data[index];

                    for (let i = 0; i < provider.services.length; i++) {
                        const service = provider.services[i];
                        const valueToDiscount = service.value * (service.disccount / 100);
                        service.totalValueWithDisccount = (service.value - valueToDiscount).toFixed(2);
                    }

                    if (provider.providerImages.length > 0) {
                        const { data: imgBase64 } = await api.get(
                            `storage/base64/min/${provider.providerImages[0].image}`,
                        );

                        provider.defaultImg = imgBase64;
                    }
                }

                setProviders(result.data);
            });
        }

        getProviders();

        setTimeout(() => {
            formRef.current?.setFieldValue('neightborhoods', 'false');
            formRef.current?.setFieldValue('services', 'false');
        }, 500);
    }, []);

    const handleFilter = useCallback(() => {
        setShowFilter((prevState) => !prevState);
    }, []);

    return (
        <Container>
            <Content>
                <SearchContainer>
                    <ContentSearch ref={formRef} onSubmit={() => {}}>
                        <p>Filtrar Resultado</p>
                        <span>Disponibilidade: </span>
                        <div
                            style={{
                                marginTop: '5px',
                            }}
                        >
                            <DatePicker name="dateReleaseEnd" placeholderText="Qualquer data" />
                        </div>
                        <div className="separator" />
                        <span>Localidade: </span>
                        <div
                            style={{
                                marginTop: '5px',
                            }}
                        >
                            <DatePicker name="dateReleaseEnd" placeholderText="Curitiba" />
                        </div>
                        <div className="separator" />
                        <span>Bairros: </span>
                        <div
                            style={{
                                marginTop: '5px',
                            }}
                        >
                            <Radio
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // alignItems: 'center',
                                    // justifyContent: 'center',
                                }}
                                name="neightborhoods"
                                options={[
                                    {
                                        id: 'false',
                                        label: 'Todos',
                                    },
                                    { id: 'true', label: 'Xaxim' },
                                    { id: 'true', label: 'Centro' },
                                    { id: 'true', label: 'Hauer' },
                                ]}
                                onChange={() => {}}
                            />
                        </div>
                        <div className="separator" />
                        <span>Tipos de serviços: </span>
                        <div
                            style={{
                                marginTop: '5px',
                            }}
                        >
                            <Radio
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // alignItems: 'center',
                                    // justifyContent: 'center',
                                }}
                                name="services"
                                options={[
                                    {
                                        id: 'false',
                                        label: 'Todos',
                                    },
                                    { id: 'true', label: 'Tatuagem' },
                                    { id: 'true', label: 'Piercing' },
                                    { id: 'true', label: 'Barbearia' },
                                ]}
                                onChange={() => {}}
                            />
                        </div>
                        <div className="separator" />
                    </ContentSearch>
                </SearchContainer>
                <Results ref={secondFormRef} onSubmit={() => {}}>
                    <Header>
                        <span>{providers.length} estabelecimentos encontrados. Exibindo resultados de 1 a 5.</span>
                        <IconButton icon={FaSearch} background="#777777" justIcon action={handleFilter} />
                    </Header>
                    <ContentResults>
                        <Row>
                            {providers.map((provider: any) => (
                                <Col key={provider.id} xs={12} sm={12} md={6} lg={6}>
                                    <Provider>
                                        <img src={`data:image/png;base64,${provider.defaultImg}`} alt="" />
                                        <ProviderInfo>
                                            <span>{provider.legalName}</span>
                                            <span className="city">
                                                {provider.addressCity} / {provider.addressArea}
                                            </span>
                                            <span className="servicesAvailable">
                                                {provider.isTattoo && 'Tatuagem'}
                                                {provider.isBarber && ' / Barbeiro'}
                                                {provider.isPiercing && ' / Piercing'}
                                            </span>
                                        </ProviderInfo>
                                        <ProviderServiceContent>
                                            <ProviderServices>
                                                {provider.services.map((service: any) => (
                                                    <div className="service">
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <BsDot size={21} />
                                                            {service.title}
                                                        </div>
                                                        <div className="price">
                                                            <ProductPrice>
                                                                {service.disccount !== '' &&
                                                                service.disccount !== '0'
                                                                    ? Intl.NumberFormat('pt-BR', {
                                                                          style: 'currency',
                                                                          currency: 'BRL',
                                                                      }).format(
                                                                          Number(service.totalValueWithDisccount),
                                                                      )
                                                                    : Intl.NumberFormat('pt-BR', {
                                                                          style: 'currency',
                                                                          currency: 'BRL',
                                                                      }).format(Number(service.value))}
                                                            </ProductPrice>
                                                            {service.disccount !== '' &&
                                                                service.disccount !== '0' && (
                                                                    <DiscountedPrice>
                                                                        {Intl.NumberFormat('pt-BR', {
                                                                            style: 'currency',
                                                                            currency: 'BRL',
                                                                        }).format(Number(service.value))}
                                                                    </DiscountedPrice>
                                                                )}
                                                        </div>
                                                    </div>
                                                ))}

                                                {provider.services.length === 0 && (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            textAlign: 'center',
                                                            height: '100%',
                                                        }}
                                                    >
                                                        <h3>
                                                            Nao existem serviços populares para este
                                                            estabelecimento.
                                                        </h3>
                                                    </div>
                                                )}
                                            </ProviderServices>

                                            <div
                                                style={{
                                                    marginTop: '3px',
                                                }}
                                            >
                                                <IconButtonProvider
                                                    icon={FaAngleDoubleRight}
                                                    title="Mais Informações"
                                                    background="#ff9000"
                                                    action={() => {
                                                        history.push('/provider');
                                                    }}
                                                />
                                            </div>
                                        </ProviderServiceContent>
                                    </Provider>
                                </Col>
                            ))}
                        </Row>
                    </ContentResults>
                    <Pagination>
                        <PaginationButton
                            disabled={page === 1}
                            icon={FaArrowLeft}
                            onClick={() => setPage(page - 1)}
                        />
                        <PaginationButton
                            disabled={providers.length < 15}
                            icon={FaArrowRight}
                            onClick={() => setPage(page + 1)}
                        />
                    </Pagination>
                </Results>
            </Content>
        </Container>
    );
};

export default Index;
