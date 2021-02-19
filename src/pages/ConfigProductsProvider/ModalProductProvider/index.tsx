import React, { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { FiCamera, FiCheckSquare } from 'react-icons/fi';
import { FaWindowClose } from 'react-icons/fa';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { BsCheckAll } from 'react-icons/bs';
import { Form, Container, Header, Footer, Content } from './styles';
import Input from '../../../components/Input/InputModal';
import Modal from '../../../components/Modal';
import IconButton from '../../../components/Button/IconButton';
import api from '../../../services/api';
import getValidationErrors from '../../../util/getValidationErrors';
import Loading from '../../../components/Loading';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    edit: boolean;
    reloadProduct: () => void;
    productId: string;
}

interface ProductData {
    id?: string;
    name: string;
    value: string;
    quantity: string;
    category: string;
    description: string;
    productImage: string;
}

const ModalProductProvider: React.FC<ModalProps> = ({ setIsOpen, reloadProduct, productId, isOpen, edit }) => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState<any>(null);
    const [statusImgLogo, setStatusImgLogo] = useState<any>(null);
    const [productImage, setProductImage] = useState<string | null>(null);

    const getProduct = useCallback(async (): Promise<void> => {
        await api
            .get(`/products/${productId}`)
            .then((response) => {
                setProductData(response.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error('Houve um erro ao buscar dados!');
            });
    }, [productId]);

    useEffect(() => {
        if (!edit) {
            setLoading(false);
            setTimeout(() => {
                const nameInput = formRef.current?.getFieldRef('name');
                if (nameInput) {
                    nameInput.focus();
                }
            }, 500);
        } else {
            getProduct();
        }
    }, []);

    const handleLogoChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setStatusImgLogo(true);

            const data = new FormData();
            data.append('image', e.target.files[0]);

            const maxAllowedSize = 30 * 1024 * 1024;
            if (e.target.files[0].size > maxAllowedSize) {
                toast.error('Falha ao inserir imagem, limite de tamanho excedido');
                setStatusImgLogo(null);
            } else {
                await api
                    .post('/storage/img', data)
                    .then((response) => {
                        setStatusImgLogo(false);
                        setProductImage(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error('Falha ao inserir imagem');
                        setStatusImgLogo(null);
                    });
            }
        }
    }, []);

    const submitProduct = useCallback(
        async (data: ProductData) => {
            try {
                formRef.current?.setErrors({});

                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                    phone: Yup.string().required('Telefone obrigatório').max(14, 'Digite um telefone valido'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                if (productImage) {
                    data.productImage = productImage;
                }

                if (edit) {
                    data.id = productId;
                    await api.put('product', data);
                } else {
                    await api.post('product', data);
                }

                toast.success(`Produto ${edit ? 'editado' : 'inserido'} com sucesso!`);
                setIsOpen();
                reloadProduct();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                toast.error(`Houve uma falha ao ${edit ? 'editar' : 'inserir'} os dados`);
            }
        },
        [productImage, productId, edit, reloadProduct, setIsOpen],
    );

    return (
        <Modal width="420px" height="530px" isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} initialData={productData} onSubmit={submitProduct}>
                <Header>
                    {edit ? <h1>Editar Produto</h1> : <h1>Novo Produto</h1>}
                    <FaWindowClose size={20} onClick={setIsOpen} />
                </Header>
                <Content>
                    {loading ? (
                        <Loading heightLoading="25vh" />
                    ) : (
                        <>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        width: '100%',
                                        marginBottom: '15px',
                                    }}
                                >
                                    <Input name="name" placeholder="Nome" />
                                </div>
                            </Container>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        width: '100%',
                                        marginBottom: '15px',
                                    }}
                                >
                                    <Input name="value" placeholder="Valor $" />
                                </div>
                            </Container>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        width: '100%',
                                        marginBottom: '15px',
                                    }}
                                >
                                    <Input name="quantity" placeholder="Quantidade" />
                                </div>
                            </Container>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        width: '100%',
                                        marginBottom: '15px',
                                    }}
                                >
                                    <Input name="category" placeholder="Categoria" />
                                </div>
                            </Container>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        width: '100%',
                                        marginBottom: '5px',
                                    }}
                                >
                                    <Input name="name" placeholder="Descricao" />
                                </div>
                            </Container>
                            <Container>
                                <div className="img">
                                    Selecione uma imagem
                                    {statusImgLogo === null && (
                                        <label htmlFor="avatar">
                                            <FiCamera />
                                            <input
                                                accept=".jpg, .jpeg, .png"
                                                onChange={handleLogoChange}
                                                type="file"
                                                id="avatar"
                                            />
                                        </label>
                                    )}
                                    {statusImgLogo === true && <span>Carregando...</span>}
                                    {statusImgLogo === false && (
                                        <BsCheckAll className="check" size={25} color="#2e656a" />
                                    )}
                                </div>
                            </Container>
                        </>
                    )}
                </Content>
                <Footer>
                    <div />
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <IconButton
                            icon={FiCheckSquare}
                            title={edit ? 'Editar Produto' : 'Adicionar Produto'}
                            background="#2e656a"
                            action={() => formRef.current?.submitForm()}
                        />
                    </div>
                </Footer>
            </Form>
        </Modal>
    );
};

export default ModalProductProvider;
