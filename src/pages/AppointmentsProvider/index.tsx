import React, { useCallback, useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { Container, SubHeader } from './styles';
import api from '../../services/api';
import Loading from '../../components/Loading';
import { StyledHeadCell, StyledTable } from '../../components/Table/styles';
import { useAuth } from '../../hooks/authentication';
import AppointmentsProviderRow from './AppointmentsProviderRow';

export interface AppointmentData {
    id: string;
    dateAppointment: Date;
    notes: string;
    status: string;
    user: {
        id: string;
        name: string;
        lastName: string;
    };
    service: {
        id: string;
        title: string;
        value: number;
    };
    clerk: {
        id: string;
        name: string;
    };
}

const Index: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);

    const getAppointments = useCallback(async () => {
        await api
            .get(`/appointment/provider/${user.id}`)
            .then((response) => {
                const { data } = response;
                setAppointments(data);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, []);

    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Container>
                    {appointments.length > 0 ? (
                        <SubHeader>
                            <p> Confira seus agendamentos</p>
                        </SubHeader>
                    ) : (
                        <SubHeader>
                            <p> Nenhum agendamento realizado</p>
                        </SubHeader>
                    )}

                    <div style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
                        <div
                            style={{
                                width: '100%',
                                padding: '0px 10px',
                            }}
                        >
                            <StyledTable $gridTemplateColumns="minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                                <StyledHeadCell>Serviço</StyledHeadCell>
                                <StyledHeadCell>Atendente</StyledHeadCell>
                                <StyledHeadCell>Horário</StyledHeadCell>
                                <StyledHeadCell>Valor</StyledHeadCell>
                                <StyledHeadCell>Status</StyledHeadCell>
                                {appointments.map((appointment: any) => (
                                    <AppointmentsProviderRow
                                        key={appointment.id}
                                        data={appointment}
                                        dataAberta={false}
                                    />
                                ))}
                            </StyledTable>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
};

export default Index;
