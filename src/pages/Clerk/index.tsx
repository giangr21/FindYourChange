import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';

import Header from '../../components/Header/ProviderAuthenticate';
import { Container, HeaderContainer, HeaderGrid, Grid } from './styles';
import IconButton from '../../components/Button/IconButton';
import ClerkRow from './ClerkRow/index';
import ModalProvider from './ModalClerkProvider';
import api from '../../services/api';

const Index: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [clerks, setClerks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalViewOpen, setModalViewOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [idProvider, setIdProvider] = useState('');

    const getClerks = useCallback(async () => {
        await api.get('/clerk').then((response) => {
            const data = response.data;
            setClerks(data);
        })
    }, [])

    useEffect(() => {
        getClerks();
    }, [])

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
            <Header />
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
                    <strong>Atendente</strong>
                    <strong>E-mail</strong>
                    <strong>Telefone</strong>
                    <strong>Ações</strong>

                </HeaderGrid>
                <Grid>
                    {clerks.map((clerk: any) => (
                        <ClerkRow
                            key={clerk.id}
                            data={clerk}
                            handleDelete={toggleModalDelete}
                            handleEdit={handleEdit}
                            handleView={handleView}
                        />
                    ))}
                </Grid>

                {modalOpen && <ModalProvider isOpen={modalOpen} setIsOpen={toggleModal} edit={isEdit} />}
            </Container>
        </>
    );
};

export default Index;
