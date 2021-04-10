/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FiClock } from 'react-icons/fi';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Container, Content, Schedule, NextAppointment, Section, Appointment, Calendar } from './styles';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

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

const HomePageProvider: React.FC = () => {
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available && !modifiers.disabled) {
            setSelectedDate(day);
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    // useEffect(() => {
    //     api.get(`/provider/${user.id}/month-availability`, {
    //         params: {
    //             year: currentMonth.getFullYear(),
    //             month: currentMonth.getMonth() + 1,
    //         },
    //     }).then((response) => {
    //         // setMonthAvailability(response.data);
    //     });
    // }, [currentMonth, user.id]);

    useEffect(() => {
        api.get('provider/appointments/me', {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
                providerId: user.id,
            },
        }).then(async (response) => {
            console.log(response.data);
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
        });
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

    return (
        <Container>
            <Content>
                <Schedule>
                    <h1>Horários Agendados</h1>
                    <p>
                        {isToday(selectedDate) && <span>Hoje</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
                    </p>
                    {isToday(selectedDate) && nextAppointment && (
                        <NextAppointment>
                            <strong>Agendamento a seguir</strong>
                            <div>
                                <img
                                    src={`data:image/png;base64,${nextAppointment.user.avatar}`}
                                    alt={nextAppointment.user.name}
                                />
                                <strong>
                                    {nextAppointment.user.name} {nextAppointment.user.lastName}
                                </strong>
                                <span>
                                    <FiClock />
                                    {nextAppointment.hourFormatted}
                                </span>
                            </div>
                        </NextAppointment>
                    )}

                    <Section>
                        <strong>Manha</strong>

                        {morningAppointments.length === 0 && <p>Nenhum agendamento neste período</p>}

                        {morningAppointments.map((appointment) => (
                            <Appointment key={appointment.id}>
                                <span>
                                    <FiClock />
                                    {appointment.hourFormatted}
                                </span>

                                <div>
                                    <img
                                        src={`data:image/png;base64,${appointment.user.avatar}`}
                                        alt={appointment.user.name}
                                    />
                                    <aside
                                        style={{
                                            flexDirection: 'column',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        <section>
                                            <h4 style={{ color: '#ff9000', marginRight: '7px' }}>Nome:</h4>
                                            <h4>
                                                {appointment.user.name} {appointment.user.lastName}
                                            </h4>
                                        </section>
                                        <section>
                                            <h4 style={{ color: '#ff9000', marginRight: '7px' }}>Tipo Serviço:</h4>
                                            <h4>{appointment.serviceType}</h4>
                                        </section>
                                        {appointment.notes && appointment.notes !== '' && (
                                            <section>
                                                <h4 style={{ color: '#ff9000', marginRight: '7px' }}>
                                                    Comentarios:
                                                </h4>
                                                <h4>{appointment.notes}</h4>
                                            </section>
                                        )}
                                    </aside>
                                </div>
                            </Appointment>
                        ))}
                    </Section>

                    <Section>
                        <strong>Tarde</strong>

                        {afternoonAppointments.length === 0 && <p>Nenhum agendamento neste período</p>}

                        {afternoonAppointments.map((appointment) => (
                            <Appointment key={appointment.id}>
                                <span>
                                    <FiClock />
                                    {appointment.hourFormatted}
                                </span>

                                <div>
                                    <img
                                        src={`data:image/png;base64,${appointment.user.avatar}`}
                                        alt={appointment.user.name}
                                    />
                                    <aside
                                        style={{
                                            flexDirection: 'column',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        <section>
                                            <h4 style={{ color: '#ff9000', marginRight: '7px' }}>Nome:</h4>
                                            <h4>
                                                {appointment.user.name} {appointment.user.lastName}
                                            </h4>
                                        </section>
                                        <section>
                                            <h4 style={{ color: '#ff9000', marginRight: '7px' }}>Tipo Serviço:</h4>
                                            <h4>{appointment.serviceType}</h4>
                                        </section>
                                        {appointment.notes && appointment.notes !== '' && (
                                            <section>
                                                <h4 style={{ color: '#ff9000', marginRight: '7px' }}>
                                                    Comentarios:
                                                </h4>
                                                <h4>{appointment.notes}</h4>
                                            </section>
                                        )}
                                    </aside>
                                </div>
                            </Appointment>
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
