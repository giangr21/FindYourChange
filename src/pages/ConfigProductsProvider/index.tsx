import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { Container, HeaderContainer, HeaderGrid, Grid } from './styles';
import IconButton from '../../components/Button/IconButton';
import ProductRow from './ProductRow/index';
import ModalProductProvider from './ModalProductProvider';
import api from '../../services/api';
import Loading from '../../components/Loading';
import ModalDeleteProduct from '../../components/Modal/DeleteModal';

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
    const [loading, setLoading] = useState(true);
    const formRef = useRef<FormHandles>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [modalViewOpen, setModalViewOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [idProvider, setIdProvider] = useState('');
    const [idProduct, setIdProduct] = useState('');

    const getProducts = useCallback(async () => {
        await api
            .get('/products')
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
        getProducts();
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
        try {
            await api.delete(`/product/${idProduct}`);
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

    const handleView = useCallback((id: string) => {
        setModalViewOpen((prevState) => !prevState);
        setIdProvider(id);
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
                    <HeaderGrid>
                        <strong>Nome</strong>
                        <strong>Valor</strong>
                        <strong>Quantidade</strong>
                        <strong>Categoria</strong>
                        <strong>Ações</strong>
                    </HeaderGrid>
                    <Grid>
                        {products.map((product: any) => (
                            <ProductRow
                                key={product.id}
                                data={product}
                                handleDelete={toggleModalDelete}
                                handleEdit={handleEdit}
                            />
                        ))}
                    </Grid>

                    {modalOpen && (
                        <ModalProductProvider
                            reloadProduct={getProducts}
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
                </Container>
            )}
        </>
    );
};
//     return (
//         <>
//             <Container>
//                 <HeaderContainer>
//                     <IconButton
//                         // style={{ marginTop: 19 }}
//                         icon={FaPlus}
//                         title="Novo"
//                         background="#2e656a"
//                         action={toggleModal}
//                     />
//                 </HeaderContainer>
//                 <HeaderGrid>
//                     <strong>Nome</strong>
//                     <strong>Valor</strong>
//                     <strong>Quantidade</strong>
//                     <strong>Categoria</strong>
//                     <strong>Ações</strong>
//                 </HeaderGrid>
//                 <Grid>
//                     {products.map((product: any) => (
//                         <ProductRow
//                             key={product.id}
//                             data={product}
//                             handleDelete={toggleModalDelete}
//                             handleEdit={handleEdit}
//                             handleView={handleView}
//                         />
//                     ))}
//                 </Grid>

//                 {modalOpen && <ModalProductProvider isOpen={modalOpen} setIsOpen={toggleModal} edit={isEdit} />}
//             </Container>
//         </>
//     );
// };

export default Index;
