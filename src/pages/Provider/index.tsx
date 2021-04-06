import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { toast } from 'react-toastify';

import { MdCheck, MdEdit } from 'react-icons/md';
import IconButton from '../../components/Button/IconButton';
import Select from '../../components/Select/MainSearchSelect';
import { Container, Content, InfoContainer, ScheduleInfo, ProviderInfo, ProviderService, Header } from './styles';
import background from '../../assets/background-provider.png';
import api from '../../services/api';
import ModalLogin from '../../components/Modal/LoginModal';

export interface ProviderData {
    id: string;
    name: string;
    lastname: string;
    legalName: string;
    email: string;
    phone: string;
    addressStreet: string;
    addressNumber: number;
    addressComplement: string;
    addressArea: string;
    addressCity: string;
    addressState: string;
    addressCountry: string;
}

const Index: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [provider, setProvider] = useState<any>({});
    const formRef = useRef<FormHandles>(null);
    const secondFormRef = useRef<FormHandles>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalLoginOpen, setModalLoginOpen] = useState(false);

    const getProvider = useCallback(async () => {
        await api
            .get('/provider/specificProvider/272ca498-7cff-4c98-90fb-a4c6a545a441')
            .then(async (response) => {
                const isPopular = [];
                const isNotPopular = [];
                for (let index = 0; index < response.data.services.length; index++) {
                    const service = response.data.services[index];
                    if(service.isPopularService){
                        isPopular.push(service);
                    }
                    else{
                        isNotPopular.push(service);
                    }
                }
                response.data.isPopular = isPopular;
                response.data.isNotPopular = isNotPopular;
                setProvider(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, []);

    useEffect(() => {
        getProvider();
        setTimeout(() => {
            formRef.current?.setFieldValue('neightborhoods', 'false');
            formRef.current?.setFieldValue('services', 'false');
        }, 500);
    }, []);

    const toggleModalLogin = useCallback((id?: string): void => {
        setModalLoginOpen((prevState) => !prevState);
    }, []);

    const handleLogin = useCallback(async (): Promise<void> => {
        try {

        } catch (err) {
            toast.error('Erro!');
        }
    }, []);


    return (
        <Container>
            {loading?(<div>Carregando...</div>):(
                <>
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
                                {provider.isPopular.map((serviceIsPopular: any) => (
                                    <ProviderService>
                                        <div>
                                            <span>{serviceIsPopular.title}</span>
                                            <p>{serviceIsPopular.description}</p>
                                        </div>
                                        <div
                                            style={{
                                                marginLeft: 'auto',
                                                marginRight: '10px',
                                            }}
                                        >
                                            <span>R$ {serviceIsPopular.value}</span>
                                            <p>{serviceIsPopular.time}</p>
                                        </div>
                                        <div>
                                            <IconButton
                                                icon={MdCheck}
                                                title="Agendar"
                                                background="#ff9000"
                                                action={toggleModalLogin}
                                            />
                                        </div>
                                    </ProviderService>
                                ))}
                                <span>Outros Serviços</span>
                                {provider.isNotPopular.map((serviceIsNotPopular: any) => (
                                    <ProviderService>
                                        <div>
                                            <span>{serviceIsNotPopular.title}</span>
                                            <p>{serviceIsNotPopular.description}</p>
                                        </div>
                                        <div
                                            style={{
                                                marginLeft: 'auto',
                                                marginRight: '10px',
                                            }}
                                        >
                                            <span>R$ {serviceIsNotPopular.value}</span>
                                            <p>{serviceIsNotPopular.time}</p>
                                        </div>
                                        <div>
                                            <IconButton
                                                icon={MdCheck}
                                                title="Agendar"
                                                background="#ff9000"
                                                action={toggleModalLogin}
                                            />
                                        </div>
                                    </ProviderService>
                                ))}
                            </TabPanel>
                            {modalLoginOpen && (
                            <ModalLogin
                                isOpen={modalLoginOpen}
                                setIsOpen={toggleModalLogin}
                                handleConfirm={handleLogin}
                            />
                        )}
                        </Tabs>
                    </ProviderInfo>
                    <InfoContainer>
                        <img
                            src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/03/Simple-Location-Picker.png?fit=561%2C421&ssl=1"
                            alt=""
                        />
                        <p>Aberto hoje 08:00 - 18:00</p>
                        <div className="separator" />
                        <span>{provider.addressStreet}, {provider.addressNumber}</span>
                        <span>{provider.addressCity}, {provider.addressState}</span>
                        <p>{provider.phone}</p>
                        <div className="separator" />
                        {/* <p>Sobre Nós: </p>
                        <span>Barba, cabelo e bigode de qualidade!</span> */}
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
                                <div className="day">Terça</div>
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
                                <div className="day">Sábado</div>
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
                </>
            )}
        </Container>
    );
};

export default Index;
