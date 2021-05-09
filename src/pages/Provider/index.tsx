import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { Tabs, Tab, FILL } from 'baseui/tabs-motion';
import { MdCheck, MdEdit } from 'react-icons/md';
import { useLocation, useHistory } from 'react-router-dom';

import IconButton from '../../components/FormComponents/Button/IconButton';
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
import ModalHandleAppointment from './ModalAppointment';
import { useAuth } from '../../hooks/authentication';
import Loading from '../../components/Loading';
import ReviewProvider from '../../components/ReviewProvider';
import GalleryProvider from '../../components/GalleryProvider';

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
    const history = useHistory();
    const tabRef2 = useRef<any>();
    const formRef = useRef<FormHandles>(null);

    const [loading, setLoading] = useState(true);
    const [provider, setProvider] = useState<any>({});
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const [modalAppointmentOpen, setModalAppointmentOpen] = useState(false);
    const [activeKy, setActiveKy] = useState<any>('0');
    const [newRecommendation, setNewRecommendation] = useState(false);
    const [specificServiceInfo, setSpecificServiceInfo] = useState({});

    const getProvider = useCallback(async () => {
        const splitedPathName = location.pathname.split('/');
        const idProvider = splitedPathName[splitedPathName.length - 1];
        await api
            .get(`/provider/specificProvider/${idProvider}`)
            .then(async (response) => {
                setProvider(response.data);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                history.push('/allServicesProvider');
                console.log(e);
            });
    }, [location.pathname, history]);

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

    const toggleModalAppointment = useCallback(
        (serviceId?: string): any => {
            setSpecificServiceInfo(provider.services.filter((service: any) => service.id === serviceId)[0]);
            setModalAppointmentOpen((prevState) => !prevState);
        },
        [provider.services],
    );

    const handleNewReview = useCallback(() => {
        tabRef2.current.click();
        setNewRecommendation(true);
    }, [tabRef2]);

    const handleRemoveRecommendation = useCallback(
        (recommendationId: string) => {
            setProvider({
                ...provider,
                providerRecommendations: provider.providerRecommendations.filter(
                    (recommendation: any) => recommendation.id !== recommendationId,
                ),
            });
        },
        [provider],
    );

    const handleAppointment = useCallback(
        (serviceId: string) => {
            if (!isAuthenticated) return toggleModalLogin();
            if (user.isProvider) return toast.error('Agendamento disponíveis somente para usuarios!');
            toggleModalAppointment(serviceId);
        },
        [isAuthenticated, toggleModalAppointment, toggleModalLogin, user],
    );

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
                                {provider.isTattoo &&
                                    `Tatuagem ${provider.isBarber || provider.isPiercing ? '/ ' : ''}`}
                                {provider.isBarber && `Barbeiro ${provider.isPiercing ? '/ ' : ''}`}
                                {provider.isPiercing && 'Piercing'}
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
                                        style: () => ({
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
                                            <div className="valueAndPrice">
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
                                                    action={() => handleAppointment(serviceIsPopular.id)}
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
                                                    action={() => handleAppointment(serviceIsNotPopular.id)}
                                                />
                                            </div>
                                        </ProviderService>
                                    ))}
                                </Tab>
                                <Tab tabRef={tabRef2} title="RECOMENDAÇÕES">
                                    <ReviewProvider
                                        providerRecommendations={provider.providerRecommendations}
                                        newRecommendation={newRecommendation}
                                        providerId={provider.id}
                                        setNewRecommendationToFalse={() => setNewRecommendation(false)}
                                        removeRecommendation={(id) => handleRemoveRecommendation(id)}
                                        infosToCreateNewRecommendation={
                                            user
                                                ? {
                                                      userId: user.id,
                                                      providerId: provider.id,
                                                      userName: user.name,
                                                      userLastName: user.lastName,
                                                  }
                                                : {}
                                        }
                                    />
                                </Tab>
                                <Tab title="GALERIA DE FOTOS">
                                    <GalleryProvider providerImages={provider.providerImages} />
                                </Tab>
                            </Tabs>
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
                            {user && !newRecommendation && !user.isProvider && (
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
                        {modalLoginOpen && <ModalLogin isOpen={modalLoginOpen} setIsOpen={toggleModalLogin} />}
                        {modalAppointmentOpen && (
                            <ModalHandleAppointment
                                serviceInfo={specificServiceInfo}
                                providerId={provider.id}
                                isOpen={modalAppointmentOpen}
                                setIsOpen={toggleModalAppointment}
                            />
                        )}
                    </Content>
                </>
            )}
        </Container>
    );
};

export default Index;
