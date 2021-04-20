/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { FiCamera, FiCheckSquare } from 'react-icons/fi';
import { FaWindowClose } from 'react-icons/fa';
import 'rc-time-picker/assets/index.css';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { BsCheckAll } from 'react-icons/bs';
import { Form, Container, Header, Footer, Content } from './styles';
import Input from '../../../components/FormComponents/Input/InputModal';
import Modal from '../../../components/Modal';
import IconButton from '../../../components/FormComponents/Button/IconButton';
import api from '../../../services/api';
import getValidationErrors from '../../../util/getValidationErrors';
import Loading from '../../../components/Loading';
import Select from '../../../components/FormComponents/Select';
import { useAuth } from '../../../hooks/Auth';
import { useMedia } from '../../../util/use-media';

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
    provider: string;
}

const ModalProductProvider: React.FC<ModalProps> = ({ setIsOpen, reloadProduct, productId, isOpen, edit }) => {
    const mobile = useMedia('(max-width: 760px)');
    const { user } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState<any>(null);
    const [statusImgLogo, setStatusImgLogo] = useState<any>(null);
    const [productImage, setProductImage] = useState<string | null>(null);
    const [changeImg, setChangeImg] = useState(false);
    const [imgPhotoMin, setImgPhotoMin] = useState<any>(null);

    const getProduct = useCallback(async (): Promise<void> => {
        await api
            .get(`/products/${productId}`)
            .then(async (response) => {
                if (response.data.category === 'Barbearia') {
                    response.data.category = { value: 'Barbearia', label: 'Barbearia' };
                }
                if (response.data.category === 'Tatuagem') {
                    response.data.category = { value: 'Tatuagem', label: 'Tatuagem' };
                }
                if (response.data.category === 'BodyPiercing') {
                    response.data.category = { value: 'BodyPiercing', label: 'Body Piercing' };
                }
                if (response.data.productStatus === 'Novo') {
                    response.data.productStatus = { value: 'Novo', label: 'Novo' };
                }
                if (response.data.productStatus === 'Usado') {
                    response.data.productStatus = { value: 'Usado', label: 'Usado' };
                }
                if (response.data.productImage) {
                    const imgNamePhotoData = await api.get(`storage/base64/min/${response.data.productImage}`);
                    setImgPhotoMin(imgNamePhotoData.data);
                }
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
            console.log(e.target.files[0]);
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
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório').max(60, 'Digite um nome válido'),
                    value: Yup.string().required('Valor obrigatório'),
                    category: Yup.string()
                        .required('Categoria obrigatória')
                        .max(40, 'Digite uma categoria válida'),
                    productStatus: Yup.string()
                        .required('Categoria obrigatória')
                        .max(40, 'Digite uma categoria válida'),
                    quantity: Yup.string().required('Quantidade obrigatória'),
                    description: Yup.string()
                        .required('Descrição obrigatória')
                        .max(240, 'Digite uma descrição válida'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                if (productImage) {
                    data.productImage = productImage;
                }

                if (edit) {
                    data.id = productId;
                    await api.put('products', data);
                } else {
                    data.provider = user.id;
                    await api.post('products', data);
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
        [productImage, edit, setIsOpen, reloadProduct, productId, user.id],
    );

    const clickImg = useCallback(async (imgName: string) => {
        await api.get(`storage/base64/${imgName}`).then((response) => {
            const w = window.open('about:blank');
            const image = new Image();
            image.src = `data:image/png;base64,${response.data}`;
            setTimeout(function () {
                if (w) {
                    w.document.write(image.outerHTML);
                }
            }, 0);
        });
    }, []);

    return (
        <Modal width={mobile ? '100%' : '420px'} height="630px" isOpen={isOpen} setIsOpen={setIsOpen}>
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
                                    <Select
                                        name="category"
                                        fieldValue="value"
                                        fieldLabel="label"
                                        label="Categoria"
                                        placeholder=""
                                        className="react-select-container"
                                        options={[
                                            { value: 'Barbearia', label: 'Barbearia' },
                                            { value: 'Tatuagem', label: 'Tatuagem' },
                                            { value: 'BodyPiercing', label: 'Body Piercing' },
                                        ]}
                                    />
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
                                    <Select
                                        name="productStatus"
                                        fieldValue="value"
                                        fieldLabel="label"
                                        label="Estado do produto"
                                        placeholder=""
                                        className="react-select-container"
                                        options={[
                                            { value: 'Novo', label: 'Novo' },
                                            { value: 'Usado', label: 'Usado' },
                                        ]}
                                    />
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
                                    <Input name="description" placeholder="Descricao" />
                                </div>
                            </Container>
                            {(!edit || changeImg || !productData.productImage) && (
                                <Container>
                                    <div
                                        className="img"
                                        style={{
                                            padding: '2px',
                                            marginTop: '15px',
                                            width: '100%',
                                        }}
                                    >
                                        Foto Produto:
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
                                            <BsCheckAll
                                                style={{
                                                    marginLeft: '15px',
                                                }}
                                                className="check"
                                                size={25}
                                                color="#2e656a"
                                            />
                                        )}
                                    </div>
                                </Container>
                            )}
                            {edit && productData.productImage && !changeImg && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '15px 0px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => clickImg(productData.productImage)}
                                >
                                    Preview Imagem:{' '}
                                    <img
                                        style={{
                                            marginLeft: '10px',
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '50%',
                                            borderColor: '#ff9000',
                                        }}
                                        src={`data:image/png;base64,${imgPhotoMin}`}
                                        onClick={() => clickImg(productData.productImage)}
                                        alt=""
                                    />
                                </div>
                            )}
                            {edit && !changeImg && productData.productImage && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <IconButton
                                        type="button"
                                        icon={FiCamera}
                                        title="Alterar Imagem"
                                        background="#2e656a"
                                        action={() => setChangeImg(true)}
                                    />
                                </div>
                            )}
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
                            type="button"
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
