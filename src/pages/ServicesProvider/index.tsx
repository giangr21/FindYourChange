/* eslint-disable no-await-in-loop */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaAngleDoubleRight, FaArrowLeft, FaArrowRight, FaCheck, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import { withStyle } from 'baseui';
import { BsDot } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';
import { Row as Rows, Col as Column } from '../../components/FlexBox/FlexBox';
import IconButton from '../../components/FormComponents/Button/IconButton';
import IconButtonProvider from '../../components/FormComponents/Button/IconButtonProvider';
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
import DatePicker from '../../components/FormComponents/DatePicker';
import Radio from '../../components/FormComponents/Radio';

import api from '../../services/api';
import PaginationButton from '../../components/FormComponents/Button/PaginationButton';
import { FooterFilter } from '../../components/Filter/styles';
import Input from '../../components/FormComponents/Input/MainSearchInput';
import Loading from '../../components/Loading';
import { useMedia } from '../../util/use-media';
import FilterMobile from '../../components/Filter/MobileServiceProvider';

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
    const mobile = useMedia('(max-width: 990px)');
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [providers, setProviders] = useState([]);
    const [showFilter, setShowFilter] = useState(true);
    const [page, setPage] = useState(1);
    const [cities, setCities] = useState([]);

    const renderEstablishmentsList = useCallback(async (establishmentsList: any) => {
        for (let index = 0; index < establishmentsList.data.length; index++) {
            const provider = establishmentsList.data[index];

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

        setLoading(false);
        setProviders(establishmentsList.data);
    }, []);

    const formFilterSubmit = useCallback(
        async (filter: any) => {
            setLoading(true);
            try {
                await api.post('/provider', { ...filter, page }).then(async (response) => {
                    await renderEstablishmentsList(response);
                });
            } catch (err) {
                if (err) {
                    toast.error(`Houve uma falha ao filtrar`);
                    console.log(err);
                }
            }
        },
        [page, renderEstablishmentsList],
    );

    const clearFilter = useCallback(async () => {
        formRef.current?.reset();
        formRef.current?.setFieldValue('cities', 'Todas');
        formRef.current?.setFieldValue('category', 'Todos');
        formRef.current?.setFieldValue('price', 'Todos');

        await api.post('/provider', { page: 1 }).then(async (result) => {
            await renderEstablishmentsList(result);
        });

        if (mobile) {
            setShowFilter((prevState) => !prevState);
        }
    }, [mobile, renderEstablishmentsList]);

    useEffect(() => {
        async function getCities(): Promise<void> {
            await api.get('/provider/cities/all').then((response) => {
                const { data } = response;
                setCities(data);
            });
        }

        getCities();

        setTimeout(() => {
            formRef.current?.setFieldValue('cities', 'Todas');
            formRef.current?.setFieldValue('category', 'Todos');
            formRef.current?.setFieldValue('price', 'Todos');
        }, 500);
    }, []);

    async function getProviders(): Promise<void> {
        await api.post('/provider', { page }).then(async (result) => {
            await renderEstablishmentsList(result);
        });
    }

    async function getProviderByServiceName(locationState: any): Promise<void> {
        await api.get(`/provider/serviceType/${locationState}`).then(async (result) => {
            if (result.data.length !== 0) {
                console.log('oi');
                await renderEstablishmentsList(result);
                return;
            }
            toast.error(
                'Nenhum estabelecimento está oferecendo o serviço pesquisado. Listando todos os estabelecimentos...',
            );
            await getProviders();
        });
    }

    useEffect(() => {
        if (location.state) {
            getProviderByServiceName(location.state);
        } else {
            getProviders();
        }
    }, [page]);

    const handleFilter = useCallback(() => {
        setShowFilter((prevState) => !prevState);
    }, []);

    const handleClickProvider = useCallback(
        (id: string) => {
            history.push({
                pathname: `/provider/${id}`,
            });
        },
        [history],
    );

    return (
        <Container>
            <Content>
                {mobile ? (
                    <FilterMobile
                        isDrawerOpen={showFilter}
                        toggleFilter={handleFilter}
                        cities={cities}
                        formRef={formRef}
                        clearFilter={clearFilter}
                        formFilterSubmit={formFilterSubmit}
                    />
                ) : (
                    <SearchContainer showFilter={showFilter}>
                        <ContentSearch ref={formRef} onSubmit={formFilterSubmit}>
                            <p>Filtrar Resultado</p>
                            <span>Disponibilidade: </span>
                            <div
                                style={{
                                    marginTop: '5px',
                                }}
                            >
                                <DatePicker name="availability" placeholderText="Qualquer data" />
                            </div>
                            <div className="separator" />
                            <div
                                style={{
                                    marginTop: '5px',
                                }}
                            >
                                <Input name="name" icon={FaSearch} placeholder="Nome do Estabelecimento" />
                            </div>
                            <div className="separator" />
                            <span>Cidades: </span>
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
                                    }}
                                    name="cities"
                                    options={cities}
                                />
                            </div>
                            <div className="separator" />
                            <span>Tipo de estabelecimento: </span>
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
                                    }}
                                    name="category"
                                    options={[
                                        {
                                            id: 'Todos',
                                            label: 'Todos',
                                        },
                                        { id: 'Tatuagem', label: 'Tatuagem' },
                                        { id: 'BodyPiercing', label: 'Piercing' },
                                        { id: 'Barbearia', label: 'Barbearia' },
                                    ]}
                                />
                            </div>
                            <div className="separator" />
                            <span>Preço: </span>
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
                                    }}
                                    name="price"
                                    options={[
                                        {
                                            id: 'Todos',
                                            label: 'Todos',
                                        },
                                        { id: '0-100', label: 'Até R$100' },
                                        { id: '100-150', label: 'R$100 - R$150' },
                                        { id: '150-200', label: 'R$150 - R$200' },
                                        { id: '200-250', label: 'R$200 - R$250' },
                                        { id: '250+', label: '$250 +' },
                                    ]}
                                />
                            </div>
                            <div className="separator" />
                            <FooterFilter>
                                <IconButton
                                    icon={MdDeleteForever}
                                    title="Limpar"
                                    background="#777777"
                                    action={clearFilter}
                                />
                                <IconButton
                                    icon={FaCheck}
                                    title="Aplicar"
                                    background="#00A57C"
                                    action={() => formRef.current?.submitForm()}
                                />
                            </FooterFilter>
                        </ContentSearch>
                    </SearchContainer>
                )}
                <Results>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <Header>
                                <span>
                                    {providers.length} estabelecimentos encontrados. Exibindo resultados de 1 a{' '}
                                    {providers.length}.
                                </span>
                                <IconButton icon={FaSearch} background="#777777" justIcon action={handleFilter} />
                            </Header>
                            <ContentResults>
                                <Row>
                                    {providers.map((provider: any) => (
                                        <Col key={provider.id} xs={12} sm={12} md={6} lg={6}>
                                            <Provider>
                                                <img
                                                    style={{
                                                        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(${`data:image/png;base64,${provider.defaultImg}`})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center center',
                                                        backgroundRepeat: 'no-repeat',
                                                    }}
                                                    alt=""
                                                />
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
                                                            <div className="service" key={service.id}>
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
                                                                                  Number(
                                                                                      service.totalValueWithDisccount,
                                                                                  ),
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
                                                            action={() => handleClickProvider(provider.id)}
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
                                    disabled={providers.length < 10}
                                    icon={FaArrowRight}
                                    onClick={() => setPage(page + 1)}
                                />
                            </Pagination>
                        </>
                    )}
                </Results>
            </Content>
        </Container>
    );
};

export default Index;
