import React, { useCallback, useRef, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { withStyle } from 'baseui';
import { Row as Rows, Col as Column } from '../../components/FlexBox/FlexBox';

import Header from '../../components/Header/ProviderAuthenticate';
import { Container, HeaderContainer, HeaderGrid, Grid } from './styles';
import IconButton from '../../components/Button/IconButton';
import ProviderRow from './ProviderRow/index';
import ModalProvider from './ModalServiceProvider';
import ProductCard from '../../components/ServiceCard';

export const Col = withStyle(Column, () => ({
    '@media only screen and (max-width: 767px)': {
        marginBottom: '20px',

        ':last-child': {
            marginBottom: 0,
        },
    },
}));

const Row = withStyle(Rows, () => ({
    '@media only screen and (min-width: 768px) and (max-width: 991px)': {
        alignItems: 'center',
    },
}));

const Index: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalViewOpen, setModalViewOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [idProvider, setIdProvider] = useState('');

    const providers: any = [
        { id: '1', title: 'Corte de cabelo X', value: 'R$ 40,00', description: 'Corte de cabelo padrao' },
        { id: '1', title: 'Corte de cabelo Y', value: 'R$ 50,00', description: 'Corte de cabelo moaicano' },
        { id: '1', title: 'Corte de cabelo Y', value: 'R$ 50,00', description: 'Corte de cabelo moaicano' },
        { id: '1', title: 'Corte de cabelo Y', value: 'R$ 50,00', description: 'Corte de cabelo moaicano' },
        { id: '1', title: 'Corte de cabelo Y', value: 'R$ 50,00', description: 'Corte de cabelo moaicano' },
        { id: '1', title: 'Corte de cabelo Y', value: 'R$ 50,00', description: 'Corte de cabelo moaicano' },
        { id: '1', title: 'Corte de cabelo Y', value: 'R$ 50,00', description: 'Corte de cabelo moaicano' },
        { id: '1', title: 'Corte de cabelo Y', value: 'R$ 50,00', description: 'Corte de cabelo moaicano' },
    ];

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

                <Row>
                    {providers.map((item: any, index: number) => (
                        <Col md={4} lg={3} sm={6} xs={12} key={index} style={{ margin: '15px 0' }}>
                            <ProductCard
                                title="a"
                                weight="a"
                                image="a"
                                currency="a"
                                price={5}
                                salePrice={5}
                                discountInPercent={5}
                                data="a"
                            />
                        </Col>
                    ))}
                </Row>

                {/* <HeaderGrid>
                    <strong>Titulo</strong>
                    <strong>Valor</strong>
                    <strong>Descrição</strong>
                    <strong>Ações</strong>
                </HeaderGrid>
                <Grid>
                    {providers.map((provider: any) => (
                        <ProviderRow
                            key={provider.id}
                            data={provider}
                            handleDelete={toggleModalDelete}
                            handleEdit={handleEdit}
                            handleView={handleView}
                        />
                    ))}
                </Grid> */}

                {modalOpen && <ModalProvider isOpen={modalOpen} setIsOpen={toggleModal} edit={isEdit} />}
            </Container>
        </>
    );
};

export default Index;
