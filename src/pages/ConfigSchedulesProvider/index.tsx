import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import { Container, HeaderContainer, Content } from './styles';
import IconButton from '../../components/Button/IconButton';
import ScheduleRow from './ScheduleRow/index';
import ModalScheduleProvider from './ModalScheduleProvider';
import ModalScheduleDelete from '../../components/Modal/DeleteModal';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';
import Loading from '../../components/Loading';
import { StyledHeadCell, StyledTable } from '../../components/Table/styles';

const Index: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [schedules, setSchedule] = useState([]);
    const [modalViewOpen, setModalViewOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [idSchedule, setIdSchedule] = useState('');

    const getSchedules = useCallback(async () => {
        await api
            .get(`/schedule/provider/${user.id}`)
            .then((response) => {
                const { data } = response;
                setSchedule(data);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, [user.id]);

    useEffect(() => {
        getSchedules();
    }, []);

    const toggleModal = useCallback((): void => {
        setModalOpen((prevState) => !prevState);
        if (isEdit) {
            setIsEdit(false);
            setIdSchedule('');
        }
    }, [isEdit]);

    const toggleModalInfo = useCallback((): void => {
        setModalViewOpen((prevState) => !prevState);
    }, []);

    const toggleModalDelete = useCallback((id?: string): void => {
        if (id) {
            setIdSchedule(id);
        }
        setModalDeleteOpen((prevState) => !prevState);
    }, []);

    const handleDelete = useCallback(async (): Promise<void> => {
        try {
            await api.delete(`/schedule/${idSchedule}`);
            const filterSchedules = schedules.filter((schedule: any) => schedule.id !== idSchedule);
            setSchedule(filterSchedules);
            toast.success('Turno apagado com sucesso!');
            setModalDeleteOpen(false);
        } catch (err) {
            toast.error('Houve um erro ao apagar turno!');
        }
    }, [idSchedule, schedules]);

    const handleEdit = useCallback((id: string) => {
        setModalOpen((prevState) => !prevState);
        setIdSchedule(id);
        setIsEdit(true);
    }, []);

    const handleView = useCallback((id: string) => {
        setModalViewOpen((prevState) => !prevState);
        setIdSchedule(id);
    }, []);

    return (
        <Container>
            <Content>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <HeaderContainer>
                            <IconButton
                                // style={{ marginTop: 19 }}
                                icon={FaPlus}
                                title="Novo"
                                background="#2e656a"
                                action={toggleModal}
                            />
                        </HeaderContainer>

                        <div style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
                            <div
                                style={{
                                    width: '100%',
                                    padding: '0px 10px',
                                }}
                            >
                                <StyledTable $gridTemplateColumns="minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                                    <StyledHeadCell>Dia da semana</StyledHeadCell>
                                    <StyledHeadCell>Horário Inicio</StyledHeadCell>
                                    <StyledHeadCell>Horário Fim</StyledHeadCell>
                                    <StyledHeadCell>Ativo</StyledHeadCell>
                                    <StyledHeadCell>Ações</StyledHeadCell>

                                    {schedules.map((schedule: any) => (
                                        <ScheduleRow
                                            key={schedule.id}
                                            data={schedule}
                                            handleDelete={toggleModalDelete}
                                            handleEdit={handleEdit}
                                            handleView={handleView}
                                        />
                                    ))}
                                </StyledTable>
                            </div>
                        </div>

                        {modalOpen && (
                            <ModalScheduleProvider
                                isOpen={modalOpen}
                                setIsOpen={toggleModal}
                                edit={isEdit}
                                reloadSchedule={getSchedules}
                                scheduleId={idSchedule}
                            />
                        )}

                        {modalDeleteOpen && (
                            <ModalScheduleDelete
                                isOpen={modalDeleteOpen}
                                setIsOpen={toggleModalDelete}
                                handleConfirm={handleDelete}
                            />
                        )}
                    </>
                )}
            </Content>
        </Container>
    );
};

export default Index;
