import React, { useEffect, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { MdCheck, MdEdit } from 'react-icons/md';
import IconButton from '../../components/Button/IconButton';
import Select from '../../components/Select/MainSearchSelect';
import { Container, Content, InfoContainer, ScheduleInfo, ProviderInfo, ProviderService, Header } from './styles';
import background from '../../assets/background-provider.png';

const Index: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const secondFormRef = useRef<FormHandles>(null);

    useEffect(() => {
        setTimeout(() => {
            formRef.current?.setFieldValue('neightborhoods', 'false');
            formRef.current?.setFieldValue('services', 'false');
        }, 500);
    }, []);

    return (
        <Container>
            <Header>
                <img src={background} alt="" />
            </Header>
            <Content>
                <ProviderInfo>
                    <Tabs>
                        <TabList>
                            <Tab>AGENDAR SERVIÇO</Tab>
                            <Tab>GALERIA DE FOTOS</Tab>
                            <Tab>RECOMENDAÇÕES</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="service">
                                <span>Serviços</span>
                                <div className="separator" />
                                <p>Populares</p>
                            </div>
                            <ProviderService>
                                <div>
                                    <span>Corte Detalhado</span>
                                    <p>Corte detalhada com navalha</p>
                                </div>
                                <div
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: '10px',
                                    }}
                                >
                                    <span>R$ 30,00</span>
                                    <p>1h</p>
                                </div>
                                <div>
                                    <IconButton
                                        icon={MdCheck}
                                        title="Agendar"
                                        background="#ff9000"
                                        action={() => {}}
                                    />
                                </div>
                            </ProviderService>
                            <ProviderService>
                                <div>
                                    <span>Bigode</span>
                                    <p>Corte do bigode com tesoura</p>
                                </div>
                                <div
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: '10px',
                                    }}
                                >
                                    <span>R$ 20,00</span>
                                    <p>1h</p>
                                </div>
                                <div>
                                    <IconButton
                                        icon={MdCheck}
                                        title="Agendar"
                                        background="#ff9000"
                                        action={() => {}}
                                    />
                                </div>
                            </ProviderService>
                            <ProviderService>
                                <div>
                                    <span>Barba Completa</span>
                                    <p>Corte barba completa</p>
                                </div>
                                <div
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: '10px',
                                    }}
                                >
                                    <span>R$ 40,00</span>
                                    <p>1h</p>
                                </div>
                                <div>
                                    <IconButton
                                        icon={MdCheck}
                                        title="Agendar"
                                        background="#ff9000"
                                        action={() => {}}
                                    />
                                </div>
                            </ProviderService>
                            <span>Outros Serviços</span>
                            <ProviderService>
                                <div>
                                    <span>Corte Detalhado</span>
                                    <p>Corte detalhada com navalha</p>
                                </div>
                                <div
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: '10px',
                                    }}
                                >
                                    <span>R$ 30,00</span>
                                    <p>1h</p>
                                </div>
                                <div>
                                    <IconButton
                                        icon={MdCheck}
                                        title="Agendar"
                                        background="#ff9000"
                                        action={() => {}}
                                    />
                                </div>
                            </ProviderService>
                            <ProviderService>
                                <div>
                                    <span>Bigode</span>
                                    <p>Corte do bigode com tesoura</p>
                                </div>
                                <div
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: '10px',
                                    }}
                                >
                                    <span>R$ 20,00</span>
                                    <p>1h</p>
                                </div>
                                <div>
                                    <IconButton
                                        icon={MdCheck}
                                        title="Agendar"
                                        background="#ff9000"
                                        action={() => {}}
                                    />
                                </div>
                            </ProviderService>
                            <ProviderService>
                                <div>
                                    <span>Barba Completa</span>
                                    <p>Corte barba completa</p>
                                </div>
                                <div
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: '10px',
                                    }}
                                >
                                    <span>R$ 40,00</span>
                                    <p>1h</p>
                                </div>
                                <div>
                                    <IconButton
                                        icon={MdCheck}
                                        title="Agendar"
                                        background="#ff9000"
                                        action={() => {}}
                                    />
                                </div>
                            </ProviderService>
                            <ProviderService>
                                <div>
                                    <span>Corte Detalhado</span>
                                    <p>Corte detalhada com navalha</p>
                                </div>
                                <div
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: '10px',
                                    }}
                                >
                                    <span>R$ 30,00</span>
                                    <p>1h</p>
                                </div>
                                <div>
                                    <IconButton
                                        icon={MdCheck}
                                        title="Agendar"
                                        background="#ff9000"
                                        action={() => {}}
                                    />
                                </div>
                            </ProviderService>
                            <ProviderService>
                                <div>
                                    <span>Bigode</span>
                                    <p>Corte do bigode com tesoura</p>
                                </div>
                                <div
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: '10px',
                                    }}
                                >
                                    <span>R$ 20,00</span>
                                    <p>1h</p>
                                </div>
                                <div>
                                    <IconButton
                                        icon={MdCheck}
                                        title="Agendar"
                                        background="#ff9000"
                                        action={() => {}}
                                    />
                                </div>
                            </ProviderService>
                            <ProviderService>
                                <div>
                                    <span>Barba Completa</span>
                                    <p>Corte barba completa</p>
                                </div>
                                <div
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: '10px',
                                    }}
                                >
                                    <span>R$ 40,00</span>
                                    <p>1h</p>
                                </div>
                                <div>
                                    <IconButton
                                        icon={MdCheck}
                                        title="Agendar"
                                        background="#ff9000"
                                        action={() => {}}
                                    />
                                </div>
                            </ProviderService>
                        </TabPanel>
                    </Tabs>
                </ProviderInfo>
                <InfoContainer>
                    <img
                        src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/03/Simple-Location-Picker.png?fit=561%2C421&ssl=1"
                        alt=""
                    />
                    <p>Aberto hoje 08:00 - 18:00</p>
                    <div className="separator" />
                    <span>Rua Alberto Folloni, Juvevê, 90, Loja 01 </span>
                    <span>Curitiba, PR</span>
                    <p>(41) 99288-7960</p>
                    <div className="separator" />
                    <p>Sobre Nós: </p>
                    <span>Barba, cabelo e bigode de qualidade!</span>
                    <ScheduleInfo>
                        <div className="schedule">
                            <div className="day">Domingo</div>
                            <div className="time">Fechado</div>
                        </div>
                        <div className="schedule">
                            <div className="day">Segunda</div>
                            <div className="time">08:00 - 18:00</div>
                        </div>
                        <div className="schedule">
                            <div className="day">terça</div>
                            <div className="time">08:00 - 18:00</div>
                        </div>
                        <div className="schedule">
                            <div className="day">Quarta</div>
                            <div className="time">08:00 - 18:00</div>
                        </div>
                        <div className="schedule">
                            <div className="day">Quinta</div>
                            <div className="time">08:00 - 18:00</div>
                        </div>
                        <div className="schedule">
                            <div className="day">Sexta</div>
                            <div className="time">08:00 - 18:00</div>
                        </div>
                        <div className="schedule">
                            <div className="day">Sabado</div>
                            <div className="time">08:00 - 18:00</div>
                        </div>
                    </ScheduleInfo>
                    <div
                        style={{
                            margin: '5px auto',
                        }}
                    >
                        <IconButton
                            icon={MdEdit}
                            title="Nova recomendaçao"
                            background="#ff9000"
                            action={() => {}}
                        />
                    </div>
                </InfoContainer>
            </Content>
        </Container>
    );
};

export default Index;
