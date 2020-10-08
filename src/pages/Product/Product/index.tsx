/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import ProductAction from '../ProductAction';
import SellerInfo from '../SellerInfo';
import Header from '../../../components/Header/ProviderAuthenticate';

import { Container, Row, Panel, Column, Gallery, Section, Description } from './styles';

const Product: React.FC = () => {
    return (
        <Container>
            <Header />
            <Panel>
                <Column>
                    <Gallery>
                        <img
                            alt="T-Shirt"
                            src="https://i5.walmartimages.com/asr/9650a728-117b-4284-897f-dd5da584025d.91b0730564580778cfedd02ae8074d33.jpeg?odnHeight=200&odnWidth=200&odnBg=ffffff"
                        />
                    </Gallery>

                    <Info />
                </Column>

                <Column>
                    <ProductAction />
                    <SellerInfo />

                    <WarrantySection />
                </Column>
            </Panel>
        </Container>
    );
};

const WarrantySection = () => (
    <Section>
        <h4>Garantia</h4>
        <div>
            <span>
                <p className="title">Compra Garantida com o Lorem Ipsum</p>
                <p className="description">Receba o produto que está esperando ou devolvemos seu dinheiro</p>
            </span>
            <span>
                <p className="title">Garantia do vendedor</p>
                <p className="description">sem garantia</p>
            </span>
        </div>
        <a href="#">Saiba mais sobre garantia</a>
    </Section>
);

const Info = () => (
    <Description>
        <h2>Descrição</h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et dolor bibendum diam ullamcorper
            bibendum vitae a ex. Ut in ipsum lacus. Nullam dictum nisi sem, sed sagittis arcu ultricies ut. Mauris
            sodales nisl velit. Mauris quis velit at urna bibendum viverra. Pellentesque sodales laoreet nunc, et
            blandit libero lobortis eget. Pellentesque pellentesque sed mauris dictum porttitor.
            <br />
            <br />
            Itens inclusos: <br />
            - 1x Maquina <br />
            - 1x Maquina <br />
            - 1x Maquina <br />
            - 1x Maquina <br />
            - 1x Maquina <br />
        </p>
    </Description>
);

export default Product;
