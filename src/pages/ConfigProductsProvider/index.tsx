import React, { useCallback, useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Container, HeaderContainer, Content } from './styles';
import IconButton from '../../components/Button/IconButton';
import ProductRow from './ProductRow/index';
import ModalProductProvider from './ModalProductProvider';
import api from '../../services/api';
import Loading from '../../components/Loading';
import ModalDeleteProduct from '../../components/Modal/DeleteModal';
import Filter from '../../components/Filter';
import Input from '../../components/Input/InputModal';
import Select from '../../components/Select';
import { useAuth } from '../../hooks/Auth';
import { StyledHeadCell, StyledTable } from '../../components/Table/styles';

export interface ProductData {
    id: string;
    name: string;
    value: string;
    quantity: string;
    category: string;
    description: string;
    productImage: string;
}

const Index: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [idProduct, setIdProduct] = useState('');
    const [filter, setFilter] = useState<any>({
        providerId: user.id,
    });
    const [showFilter, setShowFilter] = useState(false);

    const getProducts = useCallback(async (filterProduct: any) => {
        await api
            .post('/products/provider', filterProduct)
            .then((response) => {
                const { data } = response;
                setProducts(data);
                setLoading(false);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, []);

    useEffect(() => {
        getProducts(filter);
    }, []);

    const toggleModal = useCallback((): void => {
        setModalOpen((prevState) => !prevState);
        if (isEdit) {
            setIsEdit(false);
            setIdProduct('');
        }
    }, [isEdit]);

    const toggleModalDelete = useCallback((id?: string): void => {
        if (id) {
            setIdProduct(id);
        }
        setModalDeleteOpen((prevState) => !prevState);
    }, []);

    const handleDelete = useCallback(async (): Promise<void> => {
        try {
            await api.delete(`/products/${idProduct}`);
            const filterProducts = products.filter((product) => product.id !== idProduct);
            setProducts(filterProducts);
            toast.success('Produto apagado com sucesso!');
            setModalDeleteOpen(false);
        } catch (err) {
            toast.error('Houve um erro ao apagar o produto!');
        }
    }, [products, idProduct]);

    const handleEdit = useCallback((id: string) => {
        setModalOpen((prevState) => !prevState);
        setIdProduct(id);
        setIsEdit(true);
    }, []);

    const handleFilter = useCallback(() => {
        setShowFilter((prevState) => !prevState);
    }, []);

    const submitFilter = useCallback(
        (searchFilter: any) => {
            searchFilter.providerId = user.id;
            setFilter(searchFilter);
            getProducts(searchFilter);
        },
        [getProducts, user.id],
    );

    return (
        <Container>
            <Content>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <HeaderContainer>
                            <IconButton icon={FaPlus} title="Novo" background="#2e656a" action={toggleModal} />
                            <IconButton icon={FaSearch} background="#777777" justIcon action={handleFilter} />
                        </HeaderContainer>

                        <div style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
                            <div
                                style={{
                                    width: '100%',
                                    padding: '0px 10px',
                                }}
                            >
                                <StyledTable $gridTemplateColumns="minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                                    <StyledHeadCell>Nome</StyledHeadCell>
                                    <StyledHeadCell>Valor</StyledHeadCell>
                                    <StyledHeadCell>Quantidade</StyledHeadCell>
                                    <StyledHeadCell>Categoria</StyledHeadCell>
                                    <StyledHeadCell>Ações</StyledHeadCell>

                                    {products.map((product: any) => (
                                        <ProductRow
                                            key={product.id}
                                            data={product}
                                            handleDelete={toggleModalDelete}
                                            handleEdit={handleEdit}
                                        />
                                    ))}
                                </StyledTable>
                            </div>
                        </div>

                        {modalOpen && (
                            <ModalProductProvider
                                reloadProduct={() => getProducts(filter)}
                                productId={idProduct}
                                isOpen={modalOpen}
                                setIsOpen={toggleModal}
                                edit={isEdit}
                            />
                        )}

                        {modalDeleteOpen && (
                            <ModalDeleteProduct
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
                <div className="space">
                    <Select
                        name="category"
                        fieldValue="value"
                        fieldLabel="label"
                        label="Categoria"
                        className="react-select-container"
                        defaultValue={{ value: 'Barbearia', label: 'Barbearia' }}
                        options={[
                            { value: 'Barbearia', label: 'Barbearia' },
                            { value: 'Tatuagem', label: 'Tatuagem' },
                            { value: 'BodyPiercing', label: 'Body Piercing' },
                        ]}
                    />
                </div>
            </Filter>
        </Container>
    );
};

export default Index;
