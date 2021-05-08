/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import api from '../../../services/api';

import ProductAction from '../ProductAction';
import SellerInfo from '../SellerInfo';

import { Container, Row, Panel, Column, Gallery, Section, Description } from './styles';
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

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                <Panel>
                    <Column>
                        <Gallery>
                            <img alt="imgProduct" src={`data:image/png;base64,${imgPhotoMin}`} />
                        </Gallery>

                        <Description>
                            <h2>Descrição Do Produto: </h2>
                            <p>
                                {product !== undefined
                                    ? product.description
                                    : 'Descrição não especificada pelo vendedor!'}
                            </p>
                        </Description>
                    </Column>

                    <Column>
                        <ProductAction productValues={product} />

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
                                    <p className="title">Garantia do vendedor</p>
                                </span>
                            </div>
                            {/* TODO: Se o MercadoPago tiver alguma página genérica sobre Garantia, linkar aqui  */}
                            {/* <a href="#">Saiba mais sobre garantia</a> */}
                        </Section>
                    </Column>
                </Panel>
            )}
        </Container>
    );
};

export default Product;
