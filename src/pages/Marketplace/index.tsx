import React, { useEffect, useRef } from 'react';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';

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

const Index: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const secondFormRef = useRef<FormHandles>(null);
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            formRef.current?.setFieldValue('neightborhoods', 'false');
            formRef.current?.setFieldValue('services', 'false');
        }, 500);
    }, []);

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
                                    { id: 'true', label: 'Curitiba' },
                                    { id: 'true', label: 'Sao Paulo' },
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
                                    { id: 'true', label: 'Tatuagem' },
                                    { id: 'true', label: 'Piercing' },
                                    { id: 'true', label: 'Barbearia' },
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
                                    { id: 'true', label: '$150 - $200' },
                                    { id: 'true', label: '$200 - $250' },
                                    { id: 'true', label: '$250 +' },
                                ]}
                                onChange={() => {}}
                            />
                        </div>
                    </ContentSearch>
                </SearchContainer>
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
                        <Product>
                            <img
                                src="https://i5.walmartimages.com/asr/9650a728-117b-4284-897f-dd5da584025d.91b0730564580778cfedd02ae8074d33.jpeg?odnHeight=200&odnWidth=200&odnBg=ffffff"
                                alt=""
                            />
                            <div className="content">
                                <span>Maquina de cortar cabelo</span>
                                <p>RS 100,00</p>
                                <IconButton
                                    icon={FaArrowRight}
                                    title="Informações"
                                    background="#ff9000"
                                    action={() => {
                                        history.push('/product');
                                    }}
                                />
                            </div>
                        </Product>
                        <Product>
                            <img
                                src="https://i5.walmartimages.com/asr/233fdac6-b334-4437-bc6f-394c4d43ceb7_1.65cf4aeab9e90eb6ace5da655ff834a6.jpeg?odnHeight=200&odnWidth=200&odnBg=ffffff"
                                alt=""
                            />
                            <div className="content">
                                <span>Navalha Profissional</span>
                                <p>RS 200,00</p>
                                <IconButton
                                    icon={FaArrowRight}
                                    title="Informações"
                                    background="#ff9000"
                                    action={() => {
                                        history.push('/product');
                                    }}
                                />
                            </div>
                        </Product>
                        <Product>
                            <img
                                src="https://i5.walmartimages.com/asr/fcf5365c-8e75-4b1f-9227-a43769c9ea25_1.9b72de87da47ac00436c57d62c177944.jpeg?odnHeight=200&odnWidth=200&odnBg=ffffff"
                                alt=""
                            />
                            <div className="content">
                                <span>Tesoura Profissional</span>
                                <p>RS 150,00</p>
                                <IconButton
                                    icon={FaArrowRight}
                                    title="Informações"
                                    background="#ff9000"
                                    action={() => {
                                        history.push('/product');
                                    }}
                                />
                            </div>
                        </Product>
                    </ContentResults>
                    <ContentResults>
                        <Product>
                            <img
                                src="https://i5.walmartimages.com/asr/46fefe2c-d05a-452e-b42a-6bf104ac1879_1.039b3f6b4c5fd6f95dacac714795fbfb.jpeg?odnHeight=200&odnWidth=200&odnBg=ffffff"
                                alt=""
                            />
                            <div className="content">
                                <span>Tinta de tatuagem</span>
                                <p>RS 100,00</p>
                                <IconButton
                                    icon={FaArrowRight}
                                    title="Informações"
                                    background="#ff9000"
                                    action={() => {
                                        history.push('/product');
                                    }}
                                />
                            </div>
                        </Product>
                        <Product>
                            <img
                                src="https://i5.walmartimages.com/asr/08e317bc-aaac-4c3a-870e-3bfb9ba7ff74_1.fc2fe3afcdfbdff4b52e63acaadd0bbc.jpeg?odnHeight=200&odnWidth=200&odnBg=ffffff"
                                alt=""
                            />
                            <div className="content">
                                <span>Maquina tatuagem</span>
                                <p>RS 200,00</p>
                                <IconButton
                                    icon={FaArrowRight}
                                    title="Informações"
                                    background="#ff9000"
                                    action={() => {
                                        history.push('/product');
                                    }}
                                />
                            </div>
                        </Product>
                        <Product>
                            <img
                                src="https://i5.walmartimages.com/asr/123679ac-4218-42f4-949e-40347a130010_1.211af7c19623454c8612434026f7d205.png?odnHeight=200&odnWidth=200&odnBg=ffffff"
                                alt=""
                            />
                            <div className="content">
                                <span>Pomada Cicatrizante</span>
                                <p>RS 150,00</p>
                                <IconButton
                                    icon={FaArrowRight}
                                    title="Informações"
                                    background="#ff9000"
                                    action={() => {
                                        history.push('/product');
                                    }}
                                />
                            </div>
                        </Product>
                    </ContentResults>
                </Results>
            </Content>
        </Container>
    );
};

export default Index;
