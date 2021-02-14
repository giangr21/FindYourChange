import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';

import { Container, HeaderContainer, HeaderGrid, Grid } from './styles';
import IconButton from '../../components/Button/IconButton';
import ScheduleRow from './ScheduleRow/index';
import ModalScheduleProvider from './ModalScheduleProvider';
import api from '../../services/api';

const Index: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [schedules, setSchedule] = useState([]);
    const [modalViewOpen, setModalViewOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [idProvider, setIdProvider] = useState('');

    const getSchedules = useCallback(async () => {
        await api.get('/schedule').then((response) => {
            const { data } = response;
            setSchedule(data);
        });
    }, []);

    useEffect(() => {
        getSchedules();
    }, []);

    const toggleModal = useCallback((): void => {
        setModalOpen((prevState) => !prevState);
        if (isEdit) {
            setIsEdit(false);
            setIdProvider('');
        }
    }, [isEdit]);

    const toggleModalInfo = useCallback((): void => {
        setModalViewOpen((prevState) => !prevState);
    }, []);

    const toggleModalDelete = useCallback((id?: string): void => {
        if (id) {
            setIdProvider(id);
        }
        setModalDeleteOpen((prevState) => !prevState);
    }, []);

    const handleDelete = useCallback(async (): Promise<void> => {
        // try {
        //     await api.delete(`/deliverer/${idDeliverer}`);
        //     const filterDeliverers = deliverers.filter((deliverer) => deliverer.id !== idDeliverer);
        //     setDeliverers(filterDeliverers);
        //     toast.success('Entregador apagado com sucesso!');
        //     setModalDeleteOpen(false);
        // } catch (err) {
        //     toast.error('Houve um erro ao apagar entregador!');
        // }
    }, []);

    const handleEdit = useCallback((id: string) => {
        setModalOpen((prevState) => !prevState);
        setIdProvider(id);
        setIsEdit(true);
    }, []);

    const handleView = useCallback((id: string) => {
        setModalViewOpen((prevState) => !prevState);
        setIdProvider(id);
    }, []);

    return (
        <>
            <Container>
                <HeaderContainer>
                    <IconButton
                        // style={{ marginTop: 19 }}
                        icon={FaPlus}
                        title="Novo"
                        background="#2e656a"
                        action={toggleModal}
                    />
                </HeaderContainer>
                <HeaderGrid>
                    <strong>Dia da semana</strong>
                    <strong>Horário Inicio</strong>
                    <strong>Horário Fim</strong>
                    <strong>Ativo</strong>
                    <strong>Ações</strong>
                </HeaderGrid>
                <Grid>
                    {schedules.map((schedule: any) => (
                        <ScheduleRow
                            key={schedule.id}
                            data={schedule}
                            handleDelete={toggleModalDelete}
                            handleEdit={handleEdit}
                            handleView={handleView}
                        />
                    ))}
                </Grid>

                {modalOpen && <ModalScheduleProvider isOpen={modalOpen} setIsOpen={toggleModal} edit={isEdit} />}
            </Container>
        </>
    );
};

export default Index;
