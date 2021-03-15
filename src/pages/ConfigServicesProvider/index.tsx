import React, { useCallback, useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { withStyle } from 'baseui';
import { Row as Rows, Col as Column } from '../../components/FlexBox/FlexBox';

import { Container, HeaderContainer, HeaderGrid, Grid } from './styles';
import IconButton from '../../components/Button/IconButton';
import ProviderRow from './ProviderRow/index';
import ModalServiceProvider from './ModalServiceProvider';
import ModalDeleteService from '../../components/Modal/DeleteModal';
import ProductCard from '../../components/ServiceCard';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';
import Loading from '../../components/Loading';

export interface ServiceData {
    id?: string;
    title: string;
    description: string;
    value: number;
    disccount: number;
    category: string;
    time: string;
}

// export const Col = withStyle(Column, () => ({
//     '@media only screen and (max-width: 767px)': {
//         marginBottom: '20px',

//         ':last-child': {
//             marginBottom: 0,
//         },
//     },
// }));

// const Row = withStyle(Rows, () => ({
//     '@media only screen and (min-width: 768px) and (max-width: 991px)': {
//         alignItems: 'center',
//     },
// }));

const Index: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [idService, setIdService] = useState('');

    const getServices = useCallback(async () => {
        await api
            .get(`/services`)
            .then((response) => {
                const { data } = response;
                setServices(data);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, [user.id]);

    useEffect(() => {
        getServices();
    }, []);

    const toggleModal = useCallback((): void => {
        setModalOpen((prevState) => !prevState);
        if (isEdit) {
            setIsEdit(false);
            setIdService('');
        }
    }, [isEdit]);

    const toggleModalDelete = useCallback((id?: string): void => {
        if (id) {
            setIdService(id);
        }
        setModalDeleteOpen((prevState) => !prevState);
    }, []);

    const handleDelete = useCallback(async (): Promise<void> => {
        try {
            await api.delete(`/services/${idService}`);
            const filterServices = services.filter((service) => service.id !== idService);
            setServices(filterServices);
            toast.success('Serviço apagado com sucesso!');
            setModalDeleteOpen(false);
        } catch (err) {
            toast.error('Houve um erro ao apagar o serviço!');
        }
    }, [idService, services]);

    const handleEdit = useCallback((id: string) => {
        setModalOpen((prevState) => !prevState);
        setIdService(id);
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

                    {/* <Row>
                        {services.map((item: any, index: number) => (
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
                    </Row> */}

                    <HeaderGrid>
                        <strong>Titulo</strong>
                        <strong>Valor</strong>
                        <strong>Descrição</strong>
                        <strong>Ações</strong>
                    </HeaderGrid>
                    <Grid>
                        {services.map((service: any) => (
                            <ProviderRow
                                key={service.id}
                                data={service}
                                handleDelete={toggleModalDelete}
                                handleEdit={handleEdit}
                            />
                        ))}
                    </Grid>

                    {modalOpen && (
                        <ModalServiceProvider
                            reloadService={getServices}
                            serviceId={idService}
                            isOpen={modalOpen}
                            setIsOpen={toggleModal}
                            edit={isEdit}
                        />
                    )}

                    {modalDeleteOpen && (
                        <ModalDeleteService
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
