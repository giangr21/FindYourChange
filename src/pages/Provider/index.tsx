/* eslint-disable no-await-in-loop */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { Tabs, Tab, FILL } from 'baseui/tabs-motion';

import { MdCheck, MdEdit } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import IconButton from '../../components/Button/IconButton';
import {
    Container,
    Content,
    InfoContainer,
    ScheduleInfo,
    ProviderInfo,
    ProviderService,
    Header,
    ProviderInfoHeader,
} from './styles';
import api from '../../services/api';
import ModalLogin from '../../components/Modal/LoginModal';
import ModalAgendar from './ModalAppointment';
import { useAuth } from '../../hooks/Auth';
import Loading from '../../components/Loading';
import ReviewProvider from '../../components/ReviewProvider';

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
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(true);
    const [provider, setProvider] = useState<any>({});
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const [modalAgendarOpen, setModalAgendarOpen] = useState(false);
    const [activeKy, setActiveKy] = useState<any>('0');
    const tabRef2 = useRef<any>();
    const [newRecommendation, setNewRecommendation] = useState(false);

    const getProvider = useCallback(async () => {
        const splitedPathName = location.pathname.split('/');
        const idProvider = splitedPathName[splitedPathName.length - 1];
        await api
            .get(`/provider/specificProvider/${idProvider}`)
            .then(async (response) => {
                const isPopular = [];
                const isNotPopular = [];

                for (let index = 0; index < response.data.services.length; index++) {
                    const service = response.data.services[index];

                    if (service.isPopularService) {
                        isPopular.push(service);
                    } else {
                        isNotPopular.push(service);
                    }
                }

                for (let index = 0; index < response.data.providerRecommendations.length; index++) {
                    const providerRecommendation = response.data.providerRecommendations[index];

                    const { data: imgBase64 } = await api.get(
                        `storage/base64/min/${providerRecommendation.user.avatar}`,
                    );
                    providerRecommendation.user.avatar = imgBase64;

                    providerRecommendation.createdAt = moment(providerRecommendation.createdAt).format(
                        'DD/MM/YYYY - HH:mm',
                    );
                }

                for (let index = 0; index < response.data.providerImages.length; index++) {
                    const providerImage = response.data.providerImages[index];
                    const { data: imgBase64 } = await api.get(`storage/base64/min/${providerImage.image}`);

                    if (providerImage.defaultImage) {
                        response.data.providerDefaultImg = imgBase64;
                    }

                    providerImage.image = imgBase64;
                }

                response.data.isPopular = isPopular;
                response.data.isNotPopular = isNotPopular;

                setProvider(response.data);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, [location.pathname]);

    useEffect(() => {
        getProvider();
        setTimeout(() => {
            formRef.current?.setFieldValue('neightborhoods', 'false');
            formRef.current?.setFieldValue('services', 'false');
        }, 500);
    }, []);

    const toggleModalLogin = useCallback((): void => {
        setModalLoginOpen((prevState) => !prevState);
    }, []);

    const toggleModalAgendar = useCallback((): void => {
        setModalAgendarOpen((prevState) => !prevState);
    }, []);

    const handleAgendar = useCallback(async (): Promise<void> => {
        try {
            console.log();
        } catch (err) {
            toast.error('Erro!');
        }
    }, []);

    const handleNewReview = useCallback(() => {
        tabRef2.current.click();
        setNewRecommendation(true);
    }, [tabRef2]);

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Header>
                        <img
                            style={{
                                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(${`data:image/png;base64,${provider.providerDefaultImg}`})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                            }}
                            alt=""
                        />
                        <ProviderInfoHeader>
                            <span className="legalName">{provider.legalName}</span>
                            <span className="city">
                                {provider.addressCity} / {provider.addressArea}
                            </span>
                            <span className="servicesAvailable">
                                {provider.isTattoo && 'Tatuagem'}
                                {provider.isBarber && ' / Barbeiro'}
                                {provider.isPiercing && ' / Piercing'}
                            </span>
                        </ProviderInfoHeader>
                    </Header>
                    <Content>
                        <ProviderInfo>
                            <Tabs
                                activeKey={activeKy}
                                onChange={({ activeKey }) => {
                                    setActiveKy(activeKey);
                                }}
                                activateOnFocus
                                overrides={{
                                    TabHighlight: {
                                        style: ({ $theme }) => ({
                                            outline: `#ff9000 solid`,
                                            backgroundColor: '#ff9000',
                                        }),
                                    },
                                }}
                                fill={FILL.fixed}
                            >
                                <Tab title="AGENDAR SERVIÇO">
                                    <div className="service">
                                        <span>Serviços</span>
                                        <div className="separator" />
                                        <p>Populares</p>
                                    </div>
                                    {provider.isPopular.map((serviceIsPopular: any) => (
                                        <ProviderService key={serviceIsPopular.id}>
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
                                                <span>
                                                    {Intl.NumberFormat('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    }).format(Number(serviceIsPopular.value))}
                                                </span>
                                                <p>{serviceIsPopular.time} minutos</p>
                                            </div>
                                            <div>
                                                <IconButton
                                                    icon={MdCheck}
                                                    title="Agendar"
                                                    background="#ff9000"
                                                    action={
                                                        isAuthenticated ? toggleModalAgendar : toggleModalLogin
                                                    }
                                                />
                                            </div>
                                        </ProviderService>
                                    ))}
                                    <span>Outros Serviços</span>
                                    {provider.isNotPopular.map((serviceIsNotPopular: any) => (
                                        <ProviderService key={serviceIsNotPopular.id}>
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
                                                <span>
                                                    {Intl.NumberFormat('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    }).format(Number(serviceIsNotPopular.value))}
                                                </span>
                                                <p>{serviceIsNotPopular.time} minutos</p>
                                            </div>
                                            <div>
                                                <IconButton
                                                    icon={MdCheck}
                                                    title="Agendar"
                                                    background="#ff9000"
                                                    action={
                                                        isAuthenticated ? toggleModalAgendar : toggleModalLogin
                                                    }
                                                />
                                            </div>
                                        </ProviderService>
                                    ))}
                                </Tab>
                                <Tab tabRef={tabRef2} title="RECOMENDAÇÕES">
                                    <ReviewProvider
                                        providerRecommendations={provider.providerRecommendations}
                                        newRecommendation={newRecommendation}
                                        setNewRecommendationToFalse={() => setNewRecommendation(false)}
                                        infosToCreateNewRecommendation={{
                                            userId: user.id,
                                            providerId: provider.id,
                                            userName: user.name,
                                            userLastName: user.lastName,
                                        }}
                                    />
                                </Tab>
                                <Tab title="GALERIA DE FOTOS">Content 3</Tab>
                            </Tabs>
                            {modalLoginOpen && <ModalLogin isOpen={modalLoginOpen} setIsOpen={toggleModalLogin} />}
                            {modalAgendarOpen && (
                                <ModalAgendar
                                    isOpen={modalAgendarOpen}
                                    setIsOpen={toggleModalAgendar}
                                    handleConfirm={handleAgendar}
                                />
                            )}
                        </ProviderInfo>
                        <InfoContainer>
                            <img
                                src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/03/Simple-Location-Picker.png?fit=561%2C421&ssl=1"
                                alt=""
                            />
                            <p>Aberto hoje 08:00 - 18:00</p>
                            <div className="separator" />
                            <span>
                                {provider.addressStreet}, {provider.addressNumber}
                            </span>
                            <span>
                                {provider.addressCity}, {provider.addressState}
                            </span>
                            <p>{provider.phone}</p>
                            <div className="separator" />
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
                            {!newRecommendation && !user.isProvider && (
                                <div
                                    style={{
                                        margin: '5px auto',
                                    }}
                                >
                                    <IconButton
                                        icon={MdEdit}
                                        title="Nova recomendaçao"
                                        background="#ff9000"
                                        action={handleNewReview}
                                    />
                                </div>
                            )}
                        </InfoContainer>
                    </Content>
                </>
            )}
        </Container>
    );
};

export default Index;
