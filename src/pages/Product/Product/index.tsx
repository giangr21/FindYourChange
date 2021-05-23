/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import api from '../../../services/api';

import ProductAction from '../ProductAction';
import SellerInfo from '../SellerInfo';

import {
    Container,
    Row,
    Panel,
    PanelMobile,
    Column,
    Gallery,
    Section,
    Description,
    HeaderMobile,
    ContentMobile,
} from './styles';
import {
    PriceRow,
    DispatchTag,
    InstallmentsInfo,
    MethodCard,
    CheckIcon,
    Actions,
    Button,
    Benefits,
    ShieldIcon,
} from '../ProductAction/styles';
import Loading from '../../../components/Loading';

interface ProductData {
    id: string;
    name: string;
    value: string;
    quantity: string;
    category: string;
    description: string;
    productImage: string;
    provider: any;
}

const Product: React.FC = () => {
    const [product, setProduct] = useState<any>(null);
    const [imgPhotoMin, setImgPhotoMin] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const splitedPathName = location.pathname.split('/');
    const idProduct = splitedPathName[splitedPathName.length - 1];

    const getProduct = useCallback(async () => {
        await api
            .get(`/products/${idProduct}`)
            .then(async (response) => {
                console.log(response.data);
                const imgNamePhotoData = await api.get(`storage/base64/${response.data.productImage}`);
                setImgPhotoMin(imgNamePhotoData.data);
                setProduct(response.data);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, [idProduct]);

    useEffect(() => {
        getProduct();
    }, []);

    const handleBuyProduct = useCallback(() => {
        (window as any).mp.checkout({
            tokenizer: {
                totalAmount: Number(product.value),
                backUrl: 'http://localhost:3333/products/checkout',
            },
            autoOpen: true,
            theme: {
                elementsColor: '#ff9000',
                headerColor: '#ff9000',
            },
        });
    }, [product]);

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* Desktop */}
                    <Panel>
                        <Column>
                            <Gallery>
                                <img alt="imgProduct" src={`data:image/png;base64,${imgPhotoMin}`} />
                            </Gallery>

                            <Description>
                                <h2>
                                    <BsInfoCircle
                                        style={{
                                            marginRight: '10px',
                                        }}
                                    />
                                    Descrição Do Produto:{' '}
                                </h2>
                                <p>
                                    {product !== undefined
                                        ? product.description
                                        : 'Descrição não especificada pelo vendedor!'}
                                </p>
                            </Description>
                        </Column>

                        <Column>
                            <ProductAction buyProduct={handleBuyProduct} productValues={product} />

                            <SellerInfo sellerInfo={product.provider} />

                            <Section>
                                <h4>Garantia</h4>
                                <div>
                                    <span>
                                        <p className="title">Compra Garantida com o Mercado Pago</p>
                                        <p className="description">
                                            Receba o produto que está esperando ou devolvemos seu dinheiro
                                        </p>
                                    </span>
                                    <span>
                                        <a
                                            href="https://www.mercadopago.com.br/ajuda/dinheiro-seguranca-compras_328"
                                            target="_blank"
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <p className="title">Clique aqui e saiba mais.</p>
                                        </a>
                                    </span>
                                </div>
                            </Section>
                        </Column>
                    </Panel>
                    {/* Mobile */}
                    <PanelMobile>
                        <HeaderMobile>
                            <span>Condição do produto: {product.productStatus}</span>
                            <h1>{product.name}</h1>
                        </HeaderMobile>
                        <ContentMobile>
                            <img alt="imgProduct" src={`data:image/png;base64,${imgPhotoMin}`} />
                            <PriceRow
                                style={{
                                    margin: '0 auto',
                                }}
                            >
                                <span className="symbol">R$</span>
                                <span className="fraction">{Math.floor(Number(product.value))}</span>
                                <span className="cents">{product.value.split('.')[1]}</span>
                            </PriceRow>

                            <InstallmentsInfo
                                style={{
                                    margin: '0 auto',
                                }}
                            >
                                em 3x de R$ {(Number(product.value) / 3).toFixed(2)}
                            </InstallmentsInfo>
                            <DispatchTag
                                style={{
                                    margin: '15px auto',
                                }}
                            >
                                Combine o envio com o vendedor
                            </DispatchTag>
                            <MethodCard
                                style={{
                                    margin: '0 auto',
                                }}
                            >
                                <CheckIcon />

                                <div>
                                    <span className="title">Frete grátis</span>
                                    <span className="details">Combine com o vendedor</span>
                                </div>
                            </MethodCard>
                            <Actions>
                                <Button onClick={handleBuyProduct} solid>
                                    Comprar agora
                                </Button>
                            </Actions>

                            <Benefits
                                style={{
                                    margin: '10px auto 0px',
                                }}
                            >
                                <li>
                                    <ShieldIcon />
                                    <p>Compra Garantida.</p>
                                </li>
                            </Benefits>
                            <div
                                style={{
                                    margin: '10px 0px',
                                }}
                            />
                            <SellerInfo sellerInfo={product.provider} />
                            <Description>
                                <h2>
                                    <BsInfoCircle
                                        style={{
                                            marginRight: '10px',
                                        }}
                                    />
                                    Descrição Do Produto:{' '}
                                </h2>
                                <p>
                                    {product !== undefined
                                        ? product.description
                                        : 'Descrição não especificada pelo vendedor!'}
                                </p>
                            </Description>
                            <Section>
                                <h4>
                                    <ShieldIcon
                                        style={{
                                            marginRight: '5px',
                                        }}
                                    />
                                    Garantia
                                </h4>
                                <div>
                                    <span>
                                        <p className="title">Compra Garantida com o Mercado Pago</p>
                                        <p className="description">
                                            Receba o produto que está esperando ou devolvemos seu dinheiro
                                        </p>
                                    </span>
                                    <span>
                                        <a
                                            href="https://www.mercadopago.com.br/ajuda/dinheiro-seguranca-compras_328"
                                            target="_blank"
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <p className="title">Clique aqui e saiba mais.</p>
                                        </a>
                                    </span>
                                </div>
                                {/* TODO: Se o MercadoPago tiver alguma página genérica sobre Garantia, linkar aqui  */}
                                {/* <a href="#">Saiba mais sobre garantia</a> */}
                            </Section>
                        </ContentMobile>
                    </PanelMobile>
                </>
            )}
        </Container>
    );
};

export default Product;
