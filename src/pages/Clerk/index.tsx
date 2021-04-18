import React, { useCallback, useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { Container, HeaderContainer } from './styles';
import IconButton from '../../components/FormComponents/Button/IconButton';
import ModalDeleteClerk from '../../components/Modal/DeleteModal';
import ClerkRow from './ClerkRow/index';
import ModalClerkProvider from './ModalClerkProvider';
import api from '../../services/api';
import Loading from '../../components/Loading';
import { StyledHeadCell, StyledTable } from '../../components/Table/styles';
import { useAuth } from '../../hooks/Auth';

export interface ClerkData {
    id: string;
    name: string;
    email: string;
    phone: string;
}

const Index: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [clerks, setClerks] = useState<ClerkData[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [idClerk, setIdClerk] = useState('');

    const getClerks = useCallback(async () => {
        await api
            .get(`/clerk/provider/${user.id}`)
            .then((response) => {
                const { data } = response;
                setClerks(data);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, []);

    useEffect(() => {
        getClerks();
    }, []);

    const toggleModal = useCallback((): void => {
        setModalOpen((prevState) => !prevState);
        if (isEdit) {
            setIsEdit(false);
            setIdClerk('');
        }
    }, [isEdit]);

    const toggleModalDelete = useCallback((id?: string): void => {
        if (id) {
            setIdClerk(id);
        }
        setModalDeleteOpen((prevState) => !prevState);
    }, []);

    const handleDelete = useCallback(async (): Promise<void> => {
        try {
            await api.delete(`/clerk/${idClerk}`);
            const filterClerks = clerks.filter((clerk) => clerk.id !== idClerk);
            setClerks(filterClerks);
            toast.success('Atendente apagado com sucesso!');
            setModalDeleteOpen(false);
        } catch (err) {
            toast.error('Houve um erro ao apagar atendente!');
        }
    }, [clerks, idClerk]);

    const handleEdit = useCallback((id: string) => {
        setModalOpen((prevState) => !prevState);
        setIdClerk(id);
        setIsEdit(true);
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
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
                    <div style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
                        <div
                            style={{
                                width: '100%',
                                padding: '0px 10px',
                            }}
                        >
                            <StyledTable $gridTemplateColumns="minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                                <StyledHeadCell>Atendente</StyledHeadCell>
                                <StyledHeadCell>E-mail</StyledHeadCell>
                                <StyledHeadCell>Telefone</StyledHeadCell>
                                <StyledHeadCell>Ações</StyledHeadCell>

                                {clerks.map((clerk: any) => (
                                    <ClerkRow
                                        key={clerk.id}
                                        data={clerk}
                                        handleDelete={toggleModalDelete}
                                        handleEdit={handleEdit}
                                    />
                                ))}
                            </StyledTable>
                        </div>
                    </div>

                    {modalOpen && (
                        <ModalClerkProvider
                            reloadClerk={getClerks}
                            clerkId={idClerk}
                            isOpen={modalOpen}
                            setIsOpen={toggleModal}
                            edit={isEdit}
                        />
                    )}

                    {modalDeleteOpen && (
                        <ModalDeleteClerk
                            isOpen={modalDeleteOpen}
                            setIsOpen={toggleModalDelete}
                            handleConfirm={handleDelete}
                        />
                    )}
                </Container>
            )}
        </>
    );
};

export default Index;
