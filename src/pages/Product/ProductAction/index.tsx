/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

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

const ProductAction: React.FC = () => {
    return (
        <Container>
            <Condition>Novo</Condition>

            <Row>
                <h1>Maquina de cortar cabelo</h1>
                {/* <HeartIcon /> */}
            </Row>

            <DispatchTag>Combine o envio com o vendedor</DispatchTag>

            <PriceCard>
                <PriceRow>
                    <span className="symbol">R$</span>
                    <span className="fraction">34</span>
                    <span className="cents">99</span>
                </PriceRow>

                <InstallmentsInfo>em 3x de R$ 11,67</InstallmentsInfo>
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
