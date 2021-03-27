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
    productValues: ProductData | undefined;
}

const ProductAction: React.FC<ProductActionProps> = ({ productValues }) => {
    const decimalPrice = Number(productValues?.value);
    const centsPrice = productValues?.value.split('.')[1];
    const installmentsNumber = decimalPrice / 3;

    return (
        <Container>
            <Condition>Novo</Condition>

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

            {/* <StockStatus>Estoque disponível</StockStatus> */}

            <MethodCard>
                <CheckIcon />

                <div>
                    <span className="title">Frete grátis</span>
                    <span className="details">Combine com o vendedor</span>
                    <a href="#" className="more">
                        Ver mais opções
                    </a>
                </div>
            </MethodCard>

            <Actions>
                <Button solid>Comprar agora</Button>
                {/* <Button>Adicionar ao carrinho</Button> */}
            </Actions>

            <Benefits>
                <li>
                    <ShieldIcon />
                    {/* <p>Compra Garantida, receba o produto que está esperando ou devolvemos seu dinheiro.</p> */}
                    <p>Compra Garantida.</p>
                </li>
            </Benefits>
        </Container>
    );
};

export default ProductAction;
