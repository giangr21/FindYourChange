import React, { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
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
    Header,
    Provider,
    ProviderContent,
} from './styles';
import DatePicker from '../../components/DatePicker';
import Radio from '../../components/Radio';

import provider1 from '../../assets/provider1.png';
import provider2 from '../../assets/provider2.png';
import provider3 from '../../assets/provider3.png';
import provider4 from '../../assets/provider4.png';
import provider5 from '../../assets/provider5.png';

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
                        <p>Filtrar Resultado</p>
                        <span>Disponibilidade: </span>
                        <div
                            style={{
                                marginTop: '5px',
                            }}
                        >
                            <DatePicker name="dateReleaseEnd" placeholderText="Qualquer data" />
                        </div>
                        <div className="separator" />
                        <span>Localidade: </span>
                        <div
                            style={{
                                marginTop: '5px',
                            }}
                        >
                            <DatePicker name="dateReleaseEnd" placeholderText="Curitiba" />
                        </div>
                        <div className="separator" />
                        <span>Bairros: </span>
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
                                        label: 'Todos',
                                    },
                                    { id: 'true', label: 'Xaxim' },
                                    { id: 'true', label: 'Centro' },
                                    { id: 'true', label: 'Hauer' },
                                ]}
                                onChange={() => {}}
                            />
                        </div>
                        <div className="separator" />
                        <span>Tipos de serviços: </span>
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
                                        label: 'Todos',
                                    },
                                    { id: 'true', label: 'Tatuagem' },
                                    { id: 'true', label: 'Piercing' },
                                    { id: 'true', label: 'Barbearia' },
                                ]}
                                onChange={() => {}}
                            />
                        </div>
                        <div className="separator" />
                    </ContentSearch>
                </SearchContainer>
                <Results ref={secondFormRef} onSubmit={() => {}}>
                    <Header>
                        <span>5 estabelecimentos encontados. Exibindo resultados de 1 a 5.</span>
                        <Select
                            name="Search"
                            placeholder="Cidade"
                            options={[
                                { value: 'a', label: 'Relevancia' },
                                { value: 'b', label: 'Distancia' },
                                { value: 'c', label: 'Menor Preco' },
                                { value: 'd', label: 'Maior Preco' },
                            ]}
                            defaultValue={{ value: 'a', label: 'Relevancia' }}
                        />
                    </Header>
                    <ContentResults>
                        <Provider>
                            <img src={provider1} alt="" />
                            <ProviderContent>
                                <div className="service">
                                    <div className="job">Barba</div>
                                    <div className="price">R$ 30,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Barba Completa</div>
                                    <div className="price">R$ 40,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Corte Masculino</div>
                                    <div className="price">R$ 50,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Corte degrade</div>
                                    <div className="price">R$ 60,00</div>
                                </div>
                                <IconButton
                                    icon={FaArrowRight}
                                    title="Ver mais serviços"
                                    background="#3A3A3A"
                                    action={() => {
                                        history.push('/provider');
                                    }}
                                />
                            </ProviderContent>
                        </Provider>
                        <Provider>
                            <img src={provider2} alt="" />
                            <ProviderContent>
                                <div className="service">
                                    <div className="job">Barba</div>
                                    <div className="price">R$ 30,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Barba Completa</div>
                                    <div className="price">R$ 40,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Corte Masculino</div>
                                    <div className="price">R$ 50,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Corte degrade</div>
                                    <div className="price">R$ 60,00</div>
                                </div>
                                <IconButton
                                    icon={FaArrowRight}
                                    title="Ver mais serviços"
                                    background="#3A3A3A"
                                    action={() => {
                                        history.push('/provider');
                                    }}
                                />
                            </ProviderContent>
                        </Provider>
                        <Provider>
                            <img src={provider3} alt="" />
                            <ProviderContent>
                                <div className="service">
                                    <div className="job">Barba</div>
                                    <div className="price">R$ 30,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Barba Completa</div>
                                    <div className="price">R$ 40,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Corte Masculino</div>
                                    <div className="price">R$ 50,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Corte degrade</div>
                                    <div className="price">R$ 60,00</div>
                                </div>
                                <IconButton
                                    icon={FaArrowRight}
                                    title="Ver mais serviços"
                                    background="#3A3A3A"
                                    action={() => {
                                        history.push('/provider');
                                    }}
                                />
                            </ProviderContent>
                        </Provider>
                        <Provider>
                            <img src={provider4} alt="" />
                            <ProviderContent>
                                <div className="service">
                                    <div className="job">Barba</div>
                                    <div className="price">R$ 30,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Barba Completa</div>
                                    <div className="price">R$ 40,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Corte Masculino</div>
                                    <div className="price">R$ 50,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Corte degrade</div>
                                    <div className="price">R$ 60,00</div>
                                </div>
                                <IconButton
                                    icon={FaArrowRight}
                                    title="Ver mais serviços"
                                    background="#3A3A3A"
                                    action={() => {
                                        history.push('/provider');
                                    }}
                                />
                            </ProviderContent>
                        </Provider>
                        <Provider>
                            <img src={provider5} alt="" />
                            <ProviderContent>
                                <div className="service">
                                    <div className="job">Barba</div>
                                    <div className="price">R$ 30,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Barba Completa</div>
                                    <div className="price">R$ 40,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Corte Masculino</div>
                                    <div className="price">R$ 50,00</div>
                                </div>
                                <div className="service">
                                    <div className="job">Corte degrade</div>
                                    <div className="price">R$ 60,00</div>
                                </div>
                                <IconButton
                                    icon={FaArrowRight}
                                    title="Ver mais serviços"
                                    background="#3A3A3A"
                                    action={() => {
                                        history.push('/provider');
                                    }}
                                />
                            </ProviderContent>
                        </Provider>
                    </ContentResults>
                </Results>
            </Content>
        </Container>
    );
};

export default Index;
