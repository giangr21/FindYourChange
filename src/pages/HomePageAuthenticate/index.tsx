/* eslint-disable import/no-duplicates */
// import React, { useRef } from 'react';
// import { FormHandles } from '@unform/core';

// import { Container } from './styles';
// import { useAuth } from '../../hooks/Auth';

// const Index: React.FC = () => {
//     const formRef = useRef<FormHandles>(null);
//     const { signOut } = useAuth();

//     return (
//         <Container>
//             <h1>Logged</h1>
//             <button type="button" onClick={signOut}>
//                 Sair
//             </button>
//         </Container>
//     );
// };

// export default Index;

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FiClock } from 'react-icons/fi';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router-dom';
import { Container, Content, Schedule, NextAppointment, Section, Appointment, Calendar } from './styles';
import Header from '../../components/Header/ProviderAuthenticate';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

interface MonthAvailability {
    day: number;
    available: boolean;
}

interface Appointment {
    id: string;
    date: string;
    hourFormatted: string;
    user: {
        name: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const { signOut, user } = useAuth();

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available && !modifiers.disabled) {
            setSelectedDate(day);
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    // useEffect(() => {
    //     api.get(`/providers/${user.id}/month-availability`, {
    //         params: {
    //             year: currentMonth.getFullYear(),
    //             month: currentMonth.getMonth() + 1,
    //         },
    //     }).then((response) => {
    //         setMonthAvailability(response.data);
    //     });
    // }, [currentMonth, user.id]);

    // useEffect(() => {
    //     api.get<Appointment[]>('appointments/me', {
    //         params: {
    //             year: selectedDate.getFullYear(),
    //             month: selectedDate.getMonth() + 1,
    //             day: selectedDate.getDate(),
    //         },
    //     }).then((response) => {
    //         const appointmentsFormatted = response.data.map((appointment) => {
    //             return {
    //                 ...appointment,
    //                 hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
    //             };
    //         });
    //         setAppointments(appointmentsFormatted);
    //     });
    // }, [selectedDate]);

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
            return parseISO(appointment.date).getHours() < 12;
        });
    }, [appointments]);

    const afternoonAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            return parseISO(appointment.date).getHours() >= 12;
        });
    }, [appointments]);

    const nextAppointment = useMemo(() => {
        return appointments.find((appointment) => isAfter(parseISO(appointment.date), new Date()));
    }, [appointments]);

    return (
        <Container>
            <Header />

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
                                <img src={nextAppointment.user.avatar_url} alt={nextAppointment.user.name} />
                                <strong>{nextAppointment.user.name}</strong>
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
                                    <img src={appointment.user.avatar_url} alt={appointment.user.name} />
                                    <strong>{appointment.user.name}</strong>
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
                                    <img src={appointment.user.avatar_url} alt={appointment.user.name} />
                                    <strong>{appointment.user.name}</strong>
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

export default Dashboard;
