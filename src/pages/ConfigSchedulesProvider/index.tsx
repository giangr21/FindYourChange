import React, { useCallback, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Container, HeaderContainer, Content, SubHeader } from './styles';
import IconButton from '../../components/FormComponents/Button/IconButton';
import ScheduleRow from './ScheduleRow/index';
import ModalScheduleProvider from './ModalScheduleProvider';
import ModalScheduleDelete from '../../components/Modal/DeleteModal';
import api from '../../services/api';
import { useAuth } from '../../hooks/authentication';
import Loading from '../../components/Loading';
import { StyledHeadCell, StyledTable } from '../../components/Table/styles';

const Index: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [schedules, setSchedule] = useState([]);
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

    return (
        <Container>
            <Content>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <HeaderContainer>
                            <IconButton
                                icon={FaPlus}
                                title="Novo"
                                background="#2e656a"
                                action={toggleModal}
                            />
                        </HeaderContainer>

                        {schedules.length > 0 ? (
                            <SubHeader>
                                <p> Confira seus horários cadastrados</p>
                            </SubHeader>
                        ) : (
                            <SubHeader>
                                <p> Nenhum horário cadastrado para o seu estabelecimento</p>
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
                                    <StyledHeadCell>Dia da semana</StyledHeadCell>
                                    <StyledHeadCell>Horário Início</StyledHeadCell>
                                    <StyledHeadCell>Horário Fim</StyledHeadCell>
                                    <StyledHeadCell>Ativo</StyledHeadCell>
                                    <StyledHeadCell>Ações</StyledHeadCell>

                                    {schedules.map((schedule: any) => (
                                        <ScheduleRow
                                            key={schedule.id}
                                            data={schedule}
                                            handleDelete={toggleModalDelete}
                                            handleEdit={handleEdit}
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
