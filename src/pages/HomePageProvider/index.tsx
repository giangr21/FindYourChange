/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { withStyle } from 'baseui';
import { useStyletron } from 'styletron-react';
import { Row as Rows, Col as Column } from '../../components/FlexBox/FlexBox';

import { Container, InfoHeader, Content, Schedule, Section, Calendar } from './styles';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';
import Loading from '../../components/Loading';
import StickerCard from '../../components/StickerCard/StickerCard';
import { CoinIcon } from '../../components/StickerCard/Icons/CoinIcon';
import { CartIconBig } from '../../components/StickerCard/Icons/CartIconBig';
import { UserIcon } from '../../components/StickerCard/Icons/UserIcon';
import { DeliveryIcon } from '../../components/StickerCard/Icons/DeliveryIcon';
import NextAppointment from '../../components/DashboardAppointment/NextAppointment';
import Appointment from '../../components/DashboardAppointment/Appointment';

interface MonthAvailability {
    day: number;
    available: boolean;
}

interface Appointment {
    id: string;
    notes: string;
    rating: string;
    serviceType: string;
    value: string;
    dateRelease: string;
    hourFormatted: string;
    user: {
        id: string;
        name: string;
        lastName: string;
        avatar: string;
        email: string;
        phone: string;
    };
}

export const Col = withStyle(Column, () => ({
    marginBottom: '20px',

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

const HomePageProvider: React.FC = () => {
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [dashboardInfo, setDashboardInfo] = useState({
        services: 'Carregando..',
        products: 'Carregando..',
        providerRecommendations: 'Carregando..',
        appointments: 'Carregando..',
    });
    const [loading, setLoading] = useState(true);

    const [css] = useStyletron();
    const mb30 = css({
        '@media only screen and (max-width: 990px)': {
            marginBottom: '16px',
        },
    });

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available && !modifiers.disabled) {
            setSelectedDate(day);
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    useEffect(() => {
        async function getAppointments(): Promise<void> {
            await api
                .get('provider/appointments/me', {
                    params: {
                        year: selectedDate.getFullYear(),
                        month: selectedDate.getMonth() + 1,
                        day: selectedDate.getDate(),
                        providerId: user.id,
                    },
                })
                .then(async (response) => {
                    const appointmentsFormatted = [];
                    for (let index = 0; index < response.data.length; index++) {
                        const appointment = response.data[index];

                        const { data: imgBase64 } = await api.get(`storage/base64/min/${appointment.user.avatar}`);
                        appointment.user.avatar = imgBase64;

                        appointmentsFormatted.push({
                            ...appointment,
                            hourFormatted: format(parseISO(appointment.dateRelease), 'HH:mm'),
                        });
                    }
                    setAppointments(appointmentsFormatted);
                    setLoading(false);
                });
        }

        async function getDashboardInfo(): Promise<void> {
            await api.get(`/provider/dashboardInfo/${user.id}`).then((response) => {
                console.log(response.data);
                setDashboardInfo(response.data);
            });
        }

        getAppointments();
        getDashboardInfo();
    }, [selectedDate, user.id]);

    const disabledDays = useMemo(() => {
        const dates = monthAvailability
            .filter((monthDay) => monthDay.available === false)
            .map((monthDay) => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();
                return new Date(year, month, monthDay.day);
            });
        return dates;
    }, [currentMonth, monthAvailability]);

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMM", {
            locale: ptBR,
        });
    }, [selectedDate]);

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', {
            locale: ptBR,
        });
    }, [selectedDate]);

    const morningAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            return parseISO(appointment.dateRelease).getHours() < 12;
        });
    }, [appointments]);

    const afternoonAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            return parseISO(appointment.dateRelease).getHours() >= 12;
        });
    }, [appointments]);

    const nextAppointment = useMemo(() => {
        return appointments.find((appointment) => isAfter(parseISO(appointment.dateRelease), new Date()));
    }, [appointments]);

    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            <InfoHeader>
                <Row>
                    <Col lg={3} sm={6} xs={12} className={mb30}>
                        <StickerCard
                            title="Total Serviços"
                            subtitle="( Cadastrados )"
                            icon={<CoinIcon />}
                            price={dashboardInfo.services}
                            note=""
                            link="#"
                            linkText="Mais Detalhes"
                        />
                    </Col>
                    <Col lg={3} sm={6} xs={12} className={mb30}>
                        <StickerCard
                            title="Total Produtos"
                            subtitle="( Cadastrados )"
                            icon={<DeliveryIcon />}
                            price={dashboardInfo.products}
                            note=""
                            link="#"
                            linkText="Mais Detalhes"
                        />
                    </Col>
                    <Col lg={3} sm={6} xs={12}>
                        <StickerCard
                            title="Agendamentos"
                            subtitle="( Últimos 30 dias )"
                            icon={<CartIconBig />}
                            price={dashboardInfo.appointments}
                            note=""
                            link="#"
                            linkText="Mais Detalhes"
                        />
                    </Col>
                    <Col lg={3} sm={6} xs={12}>
                        <StickerCard
                            title="Recomendações"
                            subtitle="( Total )"
                            icon={<UserIcon />}
                            price={dashboardInfo.providerRecommendations}
                            note=""
                            link="#"
                            linkText="Mais Detalhes"
                        />
                    </Col>
                </Row>
            </InfoHeader>

            <Content>
                <Schedule>
                    <h1>Horários Agendados</h1>
                    <p>
                        {isToday(selectedDate) && <span>Hoje</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
                    </p>

                    {isToday(selectedDate) && nextAppointment && (
                        <NextAppointment nextAppointmentInfo={nextAppointment} />
                    )}

                    <Section>
                        <strong>Manhã</strong>

                        {morningAppointments.length === 0 && <p>Nenhum agendamento neste período</p>}

                        {morningAppointments.map((morningAppointment) => (
                            <Appointment appointmentInfo={morningAppointment} />
                        ))}
                    </Section>

                    <Section>
                        <strong>Tarde</strong>

                        {afternoonAppointments.length === 0 && <p>Nenhum agendamento neste período</p>}

                        {afternoonAppointments.map((afternoonAppointment) => (
                            <Appointment appointmentInfo={afternoonAppointment} />
                        ))}
                    </Section>
                </Schedule>
                <Calendar>
                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        months={[
                            'Janeiro',
                            'Feveiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',
                        ]}
                        onDayClick={handleDateChange}
                        onMonthChange={handleMonthChange}
                        fromMonth={new Date()}
                        selectedDays={selectedDate}
                        disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] },
                        }}
                    />
                </Calendar>
            </Content>
        </Container>
    );
};

export default HomePageProvider;
