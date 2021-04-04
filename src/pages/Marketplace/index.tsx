/* eslint-disable no-await-in-loop */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { withStyle } from 'baseui';
import { MdDeleteForever } from 'react-icons/md';
import IconButton from '../../components/Button/IconButton';
import {
    Content,
    SearchContainer,
    FooterFilter,
    ContentSearch,
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
    Pagination,
} from './styles';
import Radio from '../../components/Radio';
import Input from '../../components/Input/MainSearchInput';
import { useAuth } from '../../hooks/Auth';
import { ProductData } from '../ConfigProductsProvider';
import api from '../../services/api';
import Loading from '../../components/Loading';
import { Row as Rows, Col as Column } from '../../components/FlexBox/FlexBox';
import PaginationButton from '../../components/Button/PaginationButton';

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
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [cities, setCities] = useState([]);
    const [showFilter, setShowFilter] = useState(true);
    const [page, setPage] = useState(1);
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const formFilterSubmit = useCallback(async (filterT: any) => {
        try {
            await api.post('/products/provider/filter', filterT).then(async (response) => {
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
            });
        } catch (err) {
            if (err) {
                toast.error(`Houve uma falha ao filtrar`);
                console.log(err);
            }
        }
    }, []);

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
    }, []);

    const getCities = useCallback(async () => {
        await api.get('/provider/cities/all').then((response) => {
            setCities(response.data);
        });
    }, []);

    useEffect(() => {
        getProducts();
        getCities();
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
        setShowFilter((prevState) => !prevState);
    }, []);

    return (
        <Content>
            <SearchContainer showFilter={showFilter}>
                <ContentSearch ref={formRef} onSubmit={formFilterSubmit}>
                    <p>Filtro MarketPlace</p>
                    <Input name="name" icon={FaSearch} placeholder="Pesquisar Marketplace" />
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
                            name="cities"
                            options={cities}
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
                    <IconButton icon={MdDeleteForever} title="Limpar" background="#777777" action={clearFilter} />
                    <IconButton
                        icon={FaCheck}
                        title="Aplicar"
                        background="#00A57C"
                        action={() => formRef.current?.submitForm()}
                    />
                </FooterFilter>
            </SearchContainer>

            {!loading ? (
                <Results>
                    <HeaderResults>
                        <span>{products.length} produtos encontados. Exibindo todos os resultados.</span>
                        <IconButton icon={FaSearch} background="#777777" justIcon action={handleFilter} />
                    </HeaderResults>
                    <ContentResults>
                        <Row>
                            {products.map((product) => (
                                <Col xs={12} sm={6} md={4} lg={4}>
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
                    <Pagination>
                        <PaginationButton
                            disabled={page === 1}
                            icon={FaArrowLeft}
                            onClick={() => setPage(page - 1)}
                        />
                        <PaginationButton
                            disabled={products.length < 15}
                            icon={FaArrowRight}
                            onClick={() => setPage(page + 1)}
                        />
                    </Pagination>
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
