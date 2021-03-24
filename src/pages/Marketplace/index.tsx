/* eslint-disable no-await-in-loop */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import IconButton from '../../components/Button/IconButton';
import Select from '../../components/Select/MainSearchSelect';
import {
    Container,
    Content,
    SearchContainer,
    ContentSearch,
    Results,
    ContentResults,
    HeaderResults,
    Product,
} from './styles';
import Radio from '../../components/Radio';
import Input from '../../components/Input/MainSearchInput';
import { useAuth } from '../../hooks/Auth';
import { ProductData } from '../ConfigProductsProvider';
import api from '../../services/api';
import Loading from '../../components/Loading';

const Index: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [filter, setFilter] = useState<any>({
        providerId: user.id,
    });
    const [showFilter, setShowFilter] = useState(false);
    const formRef = useRef<FormHandles>(null);
    const secondFormRef = useRef<FormHandles>(null);
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            formRef.current?.setFieldValue('neightborhoods', 'false');
            formRef.current?.setFieldValue('services', 'false');
        }, 500);
    }, []);

    const getProducts = useCallback(async (filterProduct: any) => {
        await api
            .post('/products/provider', filterProduct)
            .then(async (response) => {
                const { data } = response;
                const auxProducts: any = [];

                for (let index = 0; index < data.length; index++) {
                    const product = data[index];
                    if (product.productImage) {
                        const { data: imgBase64 } = await api.get(`storage/base64/min/${product.productImage}`);
                        auxProducts.push({ ...product, productImage: imgBase64 });
                    } else {
                        auxProducts.push({ ...product });
                    }
                }

                setProducts(auxProducts);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, []);

    useEffect(() => {
        getProducts(filter);
    }, []);

    const handleClickProduct = useCallback(
        (id: string) => {
            history.push({
                pathname: `/product/${id}`,
            });
        },
        [history],
    );

    return (
        <Container>
            <Content>
                <SearchContainer>
                    <ContentSearch ref={formRef} onSubmit={() => {}}>
                        <p>MarketPlace</p>
                        <Input name="email" icon={FaSearch} placeholder="Pesquisar Marketplace" />
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
                                    // alignItems: 'center',
                                    // justifyContent: 'center',
                                }}
                                name="neightborhoods"
                                options={[
                                    {
                                        id: 'false',
                                        label: 'Todas',
                                    },
                                    { id: 's', label: 'Curitiba' },
                                    { id: 'd', label: 'Sao Paulo' },
                                    { id: 'true', label: 'Santa Catarina' },
                                ]}
                                onChange={() => {}}
                            />
                        </div>
                        <div className="separator" />
                        <span>Categoria: </span>
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
                                        label: 'Todas',
                                    },
                                    { id: 'd', label: 'Tatuagem' },
                                    { id: 's', label: 'Piercing' },
                                    { id: 'a', label: 'Barbearia' },
                                ]}
                                onChange={() => {}}
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
                                    // alignItems: 'center',
                                    // justifyContent: 'center',
                                }}
                                name="services"
                                options={[
                                    {
                                        id: 'false',
                                        label: '$50 - $100',
                                    },
                                    { id: 'true', label: '$100 - $150' },
                                    { id: 'as', label: '$150 - $200' },
                                    { id: 'ds', label: '$200 - $250' },
                                    { id: 's', label: '$250 +' },
                                ]}
                                onChange={() => {}}
                            />
                        </div>
                    </ContentSearch>
                </SearchContainer>
                {!loading ? (
                    <Results ref={secondFormRef} onSubmit={() => {}}>
                        <HeaderResults>
                            <span>6 produtos encontados. Exibindo resultados de 1 a 6.</span>
                            <Select
                                name="Search"
                                placeholder="A"
                                options={[
                                    { value: 'a', label: 'Relevancia' },
                                    { value: 'b', label: 'Distancia' },
                                    { value: 'c', label: 'Menor Preco' },
                                    { value: 'd', label: 'Maior Preco' },
                                ]}
                                defaultValue={{ value: 'a', label: 'Relevancia' }}
                            />
                        </HeaderResults>
                        <ContentResults>
                            {products.map((product) => (
                                <Product key={product.id}>
                                    {product.productImage && (
                                        <img src={`data:image/png;base64,${product.productImage}`} alt="" />
                                    )}
                                    <div className="content">
                                        <span>{product.name}</span>
                                        <p>RS {product.value}</p>
                                        <IconButton
                                            icon={FaArrowRight}
                                            title="Informações"
                                            background="#ff9000"
                                            action={() => handleClickProduct(product.id)}
                                        />
                                    </div>
                                </Product>
                            ))}
                        </ContentResults>
                    </Results>
                ) : (
                    <Loading />
                )}
            </Content>
        </Container>
    );
};

export default Index;
