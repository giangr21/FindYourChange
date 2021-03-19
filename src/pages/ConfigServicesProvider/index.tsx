/* eslint-disable no-await-in-loop */
import React, { useCallback, useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { withStyle } from 'baseui';
import { Row as Rows, Col as Column } from '../../components/FlexBox/FlexBox';

import { Container, HeaderContainer, Content } from './styles';
import IconButton from '../../components/Button/IconButton';
import ModalServiceProvider from './ModalServiceProvider';
import ModalDeleteService from '../../components/Modal/DeleteModal';
import ServiceCard from '../../components/ServiceCard';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';
import Loading from '../../components/Loading';
import Filter from '../../components/Filter';
import Input from '../../components/Input/InputModal';
import { useMedia } from '../../util/use-media';

export interface ServiceData {
    id?: string;
    title: string;
    description: string;
    value: number;
    disccount: number;
    category: string;
    time: string;
}

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
    const mobile = useMedia('(max-width: 768px)');
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [idService, setIdService] = useState('');
    const [filter, setFilter] = useState<any>({
        providerId: user.id,
    });
    const [showFilter, setShowFilter] = useState(false);

    const getServices = useCallback(async (filterProduct: any) => {
        await api
            .post('services', filterProduct)
            .then(async (response) => {
                const { data } = response;

                const auxServices: any = [];

                for (let index = 0; index < data.length; index++) {
                    const service = data[index];

                    const valueToDiscount = service.value * (service.disccount / 100);
                    service.totalValueWithDisccount = (service.value - valueToDiscount).toFixed(2);

                    if (service.image) {
                        const { data: imgBase64 } = await api.get(`storage/base64/min/${service.image}`);
                        auxServices.push({ ...service, image: imgBase64 });
                    } else {
                        auxServices.push({ ...service });
                    }
                }

                setServices(auxServices);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, []);

    useEffect(() => {
        getServices(filter);
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
            setModalOpen(false);
        } catch (err) {
            toast.error('Houve um erro ao apagar o serviço!');
        }
    }, [idService, services]);

    const handleEdit = useCallback((id: string) => {
        setModalOpen((prevState) => !prevState);
        setIdService(id);
        setIsEdit(true);
    }, []);

    const handleFilter = useCallback(() => {
        setShowFilter((prevState) => !prevState);
    }, []);

    const submitFilter = useCallback(
        (searchFilter: any) => {
            searchFilter.providerId = user.id;
            setFilter(searchFilter);
            getServices(searchFilter);
        },
        [getServices, user.id],
    );

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
                            <IconButton icon={FaSearch} background="#777777" justIcon action={handleFilter} />
                        </HeaderContainer>

                        <Row>
                            {services.map((service: any) => (
                                <Col
                                    md={4}
                                    lg={3}
                                    sm={6}
                                    xs={12}
                                    key={service.id}
                                    style={{ margin: '15px 0', padding: mobile ? '0px 20px' : null }}
                                >
                                    <ServiceCard handleEdit={handleEdit} serviceData={service} />
                                </Col>
                            ))}
                        </Row>

                        {modalOpen && (
                            <ModalServiceProvider
                                reloadService={() => getServices(filter)}
                                serviceId={idService}
                                isOpen={modalOpen}
                                setIsOpen={toggleModal}
                                edit={isEdit}
                                handleDelete={toggleModalDelete}
                            />
                        )}

                        {modalDeleteOpen && (
                            <ModalDeleteService
                                isOpen={modalDeleteOpen}
                                setIsOpen={toggleModalDelete}
                                handleConfirm={handleDelete}
                            />
                        )}
                    </>
                )}
            </Content>
            <Filter showFilter={showFilter} submitFilter={submitFilter}>
                <div className="space">
                    <Input name="name" placeholder="Nome" />
                </div>
                <div className="space">
                    <Input name="value" placeholder="Preco" />
                </div>
            </Filter>
        </Container>
    );
};

export default Index;
