/* eslint-disable react/no-this-in-sfc */
import React, { useCallback, useState } from 'react';
import { DatePicker } from 'baseui/datepicker';
import { TimePicker } from 'baseui/timepicker';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import pt from 'date-fns/locale/pt-BR';
import { withStyle } from 'baseui';
import { toast } from 'react-toastify';
import moment from 'moment';

import { Modal, ModalHeader, ROLE } from 'baseui/modal';
import { ListItem, ListItemLabel, ARTWORK_SIZES } from 'baseui/list';
import { Check } from 'baseui/icon';
import { MdCheck, MdClose } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import api from '../../../services/api';
import { Row as Rows, Col as Column } from '../../../components/FlexBox';
import InfoModal from '../../../components/Modal/InfoModal';
import {
    Container,
    Header,
    Content,
    PreviewImage,
    Clerks,
    AppointmentInfo,
    AppointmentResume,
    Footer,
} from './styles';
import { useMedia } from '../../../util/use-media';
import { useAuth } from '../../../hooks/authentication';
import ClerkInfo from './ClerkInfo';
import IconButton from '../../../components/FormComponents/Button/IconButton';
import Loading from '../../../components/Loading';
import { getWeekDayName } from '../../../util/getWeekDayName';

export const Col = withStyle(Column, () => ({
    marginBottom: '20px',
    margin: 'auto 0',
    '@media only screen and (max-width: 767px)': {
        ':last-child': {
            marginBottom: 0,
        },
    },
}));

const Row = withStyle(Rows, () => ({
    paddingRight: '5px',
    '@media only screen and (min-width: 768px) and (max-width: 991px)': {
        alignItems: 'center',
    },
}));

interface ModalAppointmentProps {
    isOpen: boolean;
    setIsOpen: () => void;
    serviceInfo: any;
    providerId: string;
}

const ModalHandleAppointment: React.FC<ModalAppointmentProps> = ({
    serviceInfo,
    providerId,
    isOpen,
    setIsOpen,
}): any => {
    const mobile = useMedia('(max-width: 760px)');
    const { user } = useAuth();
    const [dateAppointment, setDateAppointment] = useState<any>(null);
    const [hourAppointment, setHourAppointment] = useState<any>();
    const [selectedClerk, setSelectedClerk] = useState<null | string>(null);
    const [notes, setNotes] = useState('');
    const [resumeConfirmationModal, setResumeConfirmationModal] = useState(false);
    const [resumeInformation, setResumeInformation] = useState<any>({});
    const [workTimeClerk, setWorkTimeClerk] = useState({
        min: '',
        max: '',
    });
    const [loadingNewAppointment, setLoadingNewAppointment] = useState(false);

    const toggleResumeModal = useCallback(() => {
        setResumeConfirmationModal((prevState) => !prevState);
    }, []);

    const handleNewAppointment = useCallback(() => {
        if (!dateAppointment) {
            return toast.error('Selecione a data do agendamento !');
        }

        if (!hourAppointment) {
            return toast.error('Selecione a hora do agendamento !');
        }

        toggleResumeModal();
        let { value } = serviceInfo;
        if (serviceInfo.disccount !== '' && serviceInfo.disccount !== '0') {
            const valueToDiscount = serviceInfo.value * (serviceInfo.disccount / 100);
            value = (serviceInfo.value - valueToDiscount).toFixed(2);
        }

        setResumeInformation({
            clerk: {
                name: serviceInfo.clerks.find((clerk: any) => clerk.id === selectedClerk).name,
            },
            service: {
                title: serviceInfo.title,
                value,
                time: serviceInfo.time,
                dateAppointment: `${moment(dateAppointment).format('DD/MM/YYYY')} - ${moment(
                    hourAppointment,
                ).format('HH:mm')}`,
            },
        });
    }, [dateAppointment, hourAppointment, selectedClerk, serviceInfo, toggleResumeModal]);

    const handleConfirmationNewAppointment = useCallback(async () => {
        if (user.id) {
            setLoadingNewAppointment(true);
            await api
                .post('/appointment/add', {
                    provider: providerId,
                    user: user.id,
                    clerk: selectedClerk,
                    service: serviceInfo.id,
                    notes,
                    dateAppointment: `${moment(dateAppointment).format('DD-MM-YYYY')} ${moment(
                        hourAppointment,
                    ).format('HH:mm')}`,
                })
                .then(() => {
                    toast.success('Agendamento realizado com sucesso!!');
                    setIsOpen();
                })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.message) {
                        return toast.error(err.response.data.message.message, {
                            autoClose: 5000,
                        });
                    }
                    toast.error('Houve um erro ao realizar o agendamento, Tente novamente!!');
                })
                .finally(() => {
                    setLoadingNewAppointment(false);
                    toggleResumeModal();
                });
        }
    }, [
        dateAppointment,
        hourAppointment,
        notes,
        providerId,
        selectedClerk,
        serviceInfo,
        setIsOpen,
        toggleResumeModal,
        user.id,
    ]);

    const getWorkTimeByWeekDay = useCallback(
        async (weekDay: string, selectedDate: string, clerkId?: string) => {
            await api
                .get('clerk/getWorkTime/weekDay', {
                    params: {
                        weekDay,
                        selectedDate,
                        clerkId: clerkId || selectedClerk,
                    },
                })
                .then((response) => {
                    setWorkTimeClerk({
                        min: response.data.hourStart,
                        max: response.data.hourEnd,
                    });
                });
        },
        [selectedClerk],
    );

    const handleClickClerk = useCallback(
        async (clerkId: string) => {
            setSelectedClerk(clerkId);
            if (selectedClerk !== null) {
                await getWorkTimeByWeekDay(
                    getWeekDayName(moment(dateAppointment).day()),
                    moment(dateAppointment).format('YYYY-MM-DD'),
                    clerkId,
                );
            }
        },
        [dateAppointment, getWorkTimeByWeekDay, selectedClerk],
    );

    const handleSelectDate = useCallback(
        async (appointmentDate: any) => {
            await getWorkTimeByWeekDay(
                getWeekDayName(moment(appointmentDate).day()),
                moment(appointmentDate).format('YYYY-MM-DD'),
            );
            setDateAppointment(appointmentDate);
        },
        [getWorkTimeByWeekDay],
    );

    function disableWeekends(date: any): any {
        return date.getDay() !== 0;
    }

    return (
        <Modal
            onClose={setIsOpen}
            closeable
            isOpen={isOpen}
            animate
            role={ROLE.dialog}
            overrides={{
                Dialog: {
                    style: {
                        width: `${mobile ? '100%' : '650px'}`,
                        height: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '11px',
                    },
                },
            }}
        >
            <ModalHeader
                style={{
                    marginBottom: '0px',
                    marginTop: '10px',
                    height: '90px',
                }}
            >
                <Header>
                    <h1>Agendamento </h1>
                    <small>({serviceInfo ? serviceInfo.title : ''})</small>
                </Header>
            </ModalHeader>
            <Container>
                <Content>
                    {serviceInfo && serviceInfo.image && (
                        <PreviewImage>
                            <span>Preview Imagem Serviço: </span>
                            <img src={`data:image/png;base64,${serviceInfo.image}`} alt="" />
                        </PreviewImage>
                    )}

                    <Clerks>
                        <FormControl
                            label={() => 'Selecione um Atendente: '}
                            overrides={{
                                Label: {
                                    style: () => ({
                                        color: '#2a2a2a',
                                        marginBottom: '15px',
                                        marginTop: '0px',
                                    }),
                                },
                            }}
                        >
                            <Row>
                                {serviceInfo &&
                                    serviceInfo.clerks.map((clerk: any) => (
                                        <Col
                                            key={clerk.id}
                                            xs={12}
                                            sm={6}
                                            md={6}
                                            lg={6}
                                            onClick={() => handleClickClerk(clerk.id)}
                                        >
                                            <ClerkInfo
                                                clerk={clerk}
                                                isSelectedClerk={selectedClerk === clerk.id}
                                            />
                                        </Col>
                                    ))}
                            </Row>
                        </FormControl>
                    </Clerks>
                    <AppointmentInfo>
                        <FormControl
                            label={() => 'Selecione uma Data: '}
                            overrides={{
                                Label: {
                                    style: () => ({
                                        color: '#2a2a2a',
                                        marginBottom: '15px',
                                    }),
                                },
                            }}
                        >
                            <DatePicker
                                locale={pt}
                                value={dateAppointment}
                                onChange={({ date }) => handleSelectDate(date)}
                                formatString="dd '/' MMMM '/' yyyy"
                                placeholder=" "
                                filterDate={(date) => disableWeekends(date)}
                                disabled={selectedClerk === null}
                                mask={null}
                                minDate={new Date()}
                                overrides={{
                                    Input: {
                                        props: {
                                            overrides: {
                                                Root: {
                                                    style: () => ({
                                                        borderRadius: '7px',
                                                    }),
                                                },
                                            },
                                        },
                                    },
                                }}
                            />
                        </FormControl>
                        <FormControl
                            label={() => 'Selecione um Horário:'}
                            overrides={{
                                Label: {
                                    style: () => ({
                                        color: '#2a2a2a',
                                        marginBottom: '15px',
                                    }),
                                },
                            }}
                        >
                            <TimePicker
                                value={hourAppointment}
                                onChange={(date) => setHourAppointment(date)}
                                disabled={dateAppointment === null}
                                step={1800}
                                minTime={new Date(`2021-05-22 ${workTimeClerk.min}`)}
                                maxTime={new Date(`2021-05-22 ${workTimeClerk.max}`)}
                                format="24"
                                placeholder=" "
                                overrides={{
                                    Select: {
                                        props: {
                                            overrides: {
                                                ControlContainer: {
                                                    style: () => ({
                                                        borderRadius: '7px',
                                                    }),
                                                },
                                            },
                                        },
                                    },
                                }}
                            />
                        </FormControl>
                        <FormControl
                            label={() => 'Comentários Adicionais:'}
                            overrides={{
                                Label: {
                                    style: () => ({
                                        color: '#2a2a2a',
                                        marginBottom: '15px',
                                    }),
                                },
                            }}
                        >
                            <Input
                                value={notes}
                                onChange={(e: any) => setNotes(e.target.value)}
                                clearable
                                disabled={selectedClerk === null}
                            />
                        </FormControl>
                    </AppointmentInfo>
                    <Footer>
                        <div />
                        <div className="buttons">
                            <IconButton
                                style={{
                                    color: '#2a2a2a',
                                    fontWeight: 'bold',
                                }}
                                icon={MdCheck}
                                title="Confirmar"
                                background="#ff9000"
                                colorIcon="#2a2a2a"
                                action={handleNewAppointment}
                                disabled={selectedClerk === null}
                            />
                        </div>
                    </Footer>
                </Content>
            </Container>

            {resumeConfirmationModal && (
                <InfoModal
                    isOpen={resumeConfirmationModal}
                    setIsOpen={toggleResumeModal}
                    width={mobile ? '100%' : '425px'}
                    height="390px"
                >
                    <AppointmentResume>
                        {loadingNewAppointment ? (
                            <Loading heightLoading="34vh" />
                        ) : (
                            <>
                                <Header>
                                    <h1>Resumo Agendamento</h1>
                                </Header>
                                <div className="content">
                                    <ul>
                                        <ListItem
                                            artwork={(props: any) => <Check {...props} />}
                                            artworkSize={ARTWORK_SIZES.MEDIUM}
                                            overrides={{
                                                Content: {
                                                    style: () => ({
                                                        minHeight: '50px',
                                                    }),
                                                },

                                                ArtworkContainer: {
                                                    style: () => ({
                                                        width: '50px',
                                                        color: '#00A57C ',
                                                    }),
                                                },
                                            }}
                                        >
                                            <ListItemLabel>
                                                Atendente:
                                                <span> {resumeInformation.clerk.name}</span>
                                            </ListItemLabel>
                                        </ListItem>
                                        <ListItem
                                            artwork={(props: any) => <Check {...props} />}
                                            artworkSize={ARTWORK_SIZES.MEDIUM}
                                            overrides={{
                                                Content: {
                                                    style: () => ({
                                                        minHeight: '50px',
                                                    }),
                                                },
                                                ArtworkContainer: {
                                                    style: () => ({
                                                        width: '50px',
                                                        color: '#00A57C ',
                                                    }),
                                                },
                                            }}
                                        >
                                            <ListItemLabel>
                                                Agendamento:
                                                <span>
                                                    {' '}
                                                    {resumeInformation.service.dateAppointment}
                                                </span>
                                            </ListItemLabel>
                                        </ListItem>
                                        <ListItem
                                            artwork={(props: any) => <Check {...props} />}
                                            artworkSize={ARTWORK_SIZES.MEDIUM}
                                            overrides={{
                                                Content: {
                                                    style: () => ({
                                                        minHeight: '50px',
                                                    }),
                                                },
                                                ArtworkContainer: {
                                                    style: () => ({
                                                        width: '50px',
                                                        color: '#00A57C ',
                                                    }),
                                                },
                                            }}
                                        >
                                            <ListItemLabel>
                                                Serviço:{' '}
                                                <span>{resumeInformation.service.title}</span>
                                            </ListItemLabel>
                                        </ListItem>
                                        <ListItem
                                            artwork={(props: any) => <Check {...props} />}
                                            artworkSize={ARTWORK_SIZES.MEDIUM}
                                            overrides={{
                                                Content: {
                                                    style: () => ({
                                                        minHeight: '50px',
                                                    }),
                                                },
                                                ArtworkContainer: {
                                                    style: () => ({
                                                        width: '50px',
                                                        color: '#00A57C ',
                                                    }),
                                                },
                                            }}
                                        >
                                            <ListItemLabel>
                                                Tempo de duração:{' '}
                                                <span>{resumeInformation.service.time}</span>
                                            </ListItemLabel>
                                        </ListItem>
                                        <ListItem
                                            artwork={(props: any) => <Check {...props} />}
                                            artworkSize={ARTWORK_SIZES.MEDIUM}
                                            overrides={{
                                                Content: {
                                                    style: () => ({
                                                        minHeight: '50px',
                                                    }),
                                                },
                                                ArtworkContainer: {
                                                    style: () => ({
                                                        width: '50px',
                                                        color: '#00A57C ',
                                                    }),
                                                },
                                            }}
                                        >
                                            <ListItemLabel>
                                                Valores:{' '}
                                                <span>
                                                    {Intl.NumberFormat('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    }).format(
                                                        Number(resumeInformation.service.value),
                                                    )}
                                                </span>
                                            </ListItemLabel>
                                        </ListItem>
                                    </ul>
                                </div>
                                <div className="buttons">
                                    <IconButton
                                        icon={MdClose}
                                        title="Cancelar"
                                        background="#DE3B3B"
                                        action={toggleResumeModal}
                                    />
                                    <IconButton
                                        icon={FaCheck}
                                        title="Confirmar"
                                        background="#00A57C"
                                        action={handleConfirmationNewAppointment}
                                    />
                                </div>
                            </>
                        )}
                    </AppointmentResume>
                </InfoModal>
            )}
        </Modal>
    );
};

export default ModalHandleAppointment;
