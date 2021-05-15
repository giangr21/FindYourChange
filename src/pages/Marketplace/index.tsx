/* eslint-disable no-await-in-loop */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaArrowRight, FaCheck, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { withStyle } from 'baseui';
import { MdDeleteForever } from 'react-icons/md';
import IconButton from '../../components/FormComponents/Button/IconButton';
import {
    Content,
    Results,
    ContentResults,
    HeaderResults,
    ProductCardWrapper,
    ProductImageWrapper,
    ProductInfo,
    Image,
    ProductTitle,
    ProductWeight,
    ProductMeta,
    ProductPriceWrapper,
    ProductPrice,
    SearchContainer,
    ContentSearch,
    FooterFilter,
} from './styles';
import Radio from '../../components/FormComponents/Radio';
import Input from '../../components/FormComponents/Input/MainSearchInput';
import { ProductData } from '../ConfigProductsProvider';
import api from '../../services/api';
import Loading from '../../components/Loading';
import { Row as Rows, Col as Column } from '../../components/FlexBox';
import FilterMobile from '../../components/Filter/MobileMarketPlace';
import { useMedia } from '../../util/use-media';

export const Col = withStyle(Column, () => ({
    marginBottom: '20px',

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
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [cities, setCities] = useState([]);
    const [showFilter, setShowFilter] = useState(!mobile);
    const [page, setPage] = useState(1);
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const formFilterSubmit = useCallback(
        async (filterT: any) => {
            setLoading(true);
            if (mobile) setShowFilter((prevState) => !prevState);

            try {
                await api.post('/products/provider/filter', filterT).then(async (response) => {
                    const { data } = response;
                    const auxProducts: any = [];

                    for (let index = 0; index < data.length; index++) {
                        const product = data[index];
                        if (product.productImage) {
                            const { data: imgBase64 } = await api.get(
                                `storage/base64/min/${product.productImage}`,
                            );
                            auxProducts.push({ ...product, productImage: imgBase64 });
                        } else {
                            auxProducts.push({ ...product });
                        }
                    }
                    setProducts(auxProducts);
                    setLoading(false);
                });
            } catch (err) {
                if (err) {
                    toast.error(`Houve uma falha ao filtrar`);
                    console.log(err);
                }
            }
        },
        [mobile],
    );

    const getProducts = useCallback(async () => {
        await api
            .get('/products/marketplace/all')
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

                formRef.current?.setFieldValue('category', 'Todas');
                formRef.current?.setFieldValue('cities', 'Todas');
                formRef.current?.setFieldValue('price', 'Todos');
                formRef.current?.setFieldValue('productState', 'Todos');

                setProducts(auxProducts);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, []);

    const clearFilter = useCallback(() => {
        formRef.current?.reset();

        setTimeout(() => {
            getProducts();
        }, 300);
        if (mobile) {
            setShowFilter((prevState) => !prevState);
        }
    }, [getProducts, mobile]);

    const getCities = useCallback(async () => {
        await api.get('/provider/cities/all').then((response) => {
            setCities(response.data);
        });
    }, []);

    useEffect(() => {
        getCities();
        getProducts();
    }, []);

    const handleClickProduct = useCallback(
        (id: string) => {
            history.push({
                pathname: `/product/${id}`,
            });
        },
        [history],
    );

    const handleFilter = useCallback(() => {
        if (mobile) {
            setTimeout(() => {
                formRef.current?.setFieldValue('cities', 'Todas');
                formRef.current?.setFieldValue('category', 'Todas');
                formRef.current?.setFieldValue('price', 'Todos');
                formRef.current?.setFieldValue('productState', 'Todos');
            }, 300);
        }
        setShowFilter((prevState) => !prevState);
    }, [mobile]);

    return (
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
                        <p>Filtro MarketPlace</p>
                        <Input name="name" icon={FaSearch} placeholder="Nome Produto" />
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
                                autoFocus
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
                                }}
                                name="category"
                                options={[
                                    {
                                        id: 'Todas',
                                        label: 'Todas',
                                    },
                                    { id: 'Tatuagem', label: 'Tatuagem' },
                                    { id: 'BodyPiercing', label: 'Piercing' },
                                    { id: 'Barbearia', label: 'Barbearia' },
                                ]}
                            />
                        </div>
                        <div className="separator" />
                        <span>Estado do Produto: </span>
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
                                name="productState"
                                options={[
                                    {
                                        id: 'Todos',
                                        label: 'Todos',
                                    },
                                    { id: 'Usado', label: 'Usado' },
                                    { id: 'Novo', label: 'Novo' },
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
                                    { id: '50-100', label: '$50 - $100' },
                                    { id: '100-150', label: '$100 - $150' },
                                    { id: '150-200', label: '$150 - $200' },
                                    { id: '200-250', label: '$200 - $250' },
                                    { id: '250+', label: '$250 +' },
                                ]}
                            />
                        </div>
                    </ContentSearch>
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
                </SearchContainer>
            )}

            {!loading ? (
                <Results>
                    <HeaderResults>
                        <span>{products.length} produtos encontrados. Exibindo todos os resultados.</span>
                        <IconButton icon={FaSearch} background="#777777" justIcon action={handleFilter} />
                    </HeaderResults>
                    <ContentResults>
                        <Row>
                            {products.map((product) => (
                                <Col key={product.id} xs={12} sm={6} md={4} lg={4}>
                                    <ProductCardWrapper
                                        onClick={() => handleClickProduct(product.id)}
                                        className="product-card"
                                        key={product.id}
                                    >
                                        <ProductImageWrapper>
                                            <Image url={product.productImage} className="product-image" />
                                        </ProductImageWrapper>
                                        <ProductInfo>
                                            <div
                                                style={{
                                                    height: '60px',
                                                    maxHeight: '60px',
                                                    overflowY: 'auto',
                                                    padding: '5px 0px',
                                                }}
                                            >
                                                <ProductTitle>{product.name}</ProductTitle>
                                            </div>

                                            <div
                                                style={{
                                                    height: '60px',
                                                    maxHeight: '60px',
                                                    overflowY: 'auto',
                                                    padding: '5px 0px',
                                                }}
                                            >
                                                <ProductWeight>{product.description}</ProductWeight>
                                            </div>
                                            <ProductMeta>
                                                <ProductPriceWrapper>
                                                    <ProductPrice>
                                                        {Intl.NumberFormat('pt-BR', {
                                                            style: 'currency',
                                                            currency: 'BRL',
                                                        }).format(Number(product.value))}
                                                    </ProductPrice>
                                                </ProductPriceWrapper>
                                                <IconButton
                                                    icon={FaArrowRight}
                                                    title="Informações"
                                                    background="#ff9000"
                                                    action={() => handleClickProduct(product.id)}
                                                />
                                            </ProductMeta>
                                        </ProductInfo>
                                    </ProductCardWrapper>
                                </Col>
                            ))}
                        </Row>
                    </ContentResults>
                </Results>
            ) : (
                <Loading
                    style={{
                        margin: '0 auto',
                    }}
                />
            )}
        </Content>
    );
};

export default Index;
