/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { ProductData } from '../../ConfigProductsProvider';

import {
    Container,
    Condition,
    Row,
    HeartIcon,
    DispatchTag,
    PriceCard,
    PriceRow,
    InstallmentsInfo,
    StockStatus,
    MethodCard,
    CheckIcon,
    Actions,
    Button,
    Benefits,
    ShieldIcon,
} from './styles';

interface ProductActionProps {
    productValues: any;
    buyProduct: () => any;
}

const ProductAction: React.FC<ProductActionProps> = ({ productValues, buyProduct }) => {
    const decimalPrice = Number(productValues?.value);
    const centsPrice = productValues?.value.split('.')[1];
    const installmentsNumber = decimalPrice / 3;

    return (
        <Container>
            <Condition>Condição do produto: {productValues.productStatus}</Condition>

            <Row>
                <h1>{productValues?.name}</h1>
                {/* <HeartIcon /> */}
            </Row>

            <DispatchTag>Combine o envio com o vendedor</DispatchTag>

            <PriceCard>
                <PriceRow>
                    <span className="symbol">R$</span>
                    <span className="fraction">{Math.floor(decimalPrice)}</span>
                    <span className="cents">{centsPrice}</span>
                </PriceRow>

                <InstallmentsInfo>em 3x de R$ {installmentsNumber.toFixed(2)}</InstallmentsInfo>
            </PriceCard>

            <MethodCard>
                <CheckIcon />

                <div>
                    <span className="title">Frete grátis</span>
                    <span className="details">Combine com o vendedor</span>
                </div>
            </MethodCard>

            <Actions>
                {productValues.quantity >= 1 ? (
                    <Button onClick={buyProduct} solid>
                        Comprar agora
                    </Button>
                ) : (
                    <>
                        <span
                            style={{
                                margin: '10px auto',
                                color: '#c53030',
                                fontWeight: 500,
                            }}
                        >
                            Produto SEM ESTOQUE
                        </span>
                        <span
                            style={{
                                margin: '0 auto',
                            }}
                        >
                            Entre em contato com o vendedor!
                        </span>
                    </>
                )}
            </Actions>
            {productValues.quantity >= 1 && (
                <Benefits>
                    <li>
                        <ShieldIcon />
                        <p>Compra Garantida.</p>
                    </li>
                </Benefits>
            )}
        </Container>
    );
};

export default ProductAction;
