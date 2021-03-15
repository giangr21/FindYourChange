/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { FiCamera, FiCheckSquare } from 'react-icons/fi';
import { FaWindowClose } from 'react-icons/fa';

import { BsCheckAll } from 'react-icons/bs';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Container, Header, Footer, Content } from './styles';
import Input from '../../../components/Input/InputModal';
import Modal from '../../../components/Modal';
import IconButton from '../../../components/Button/IconButton';
import api from '../../../services/api';
import getValidationErrors from '../../../util/getValidationErrors';
import InputMask from '../../../components/Input/InputModalMask';
import Loading from '../../../components/Loading';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    edit: boolean;
    reloadClerk: () => void;
    clerkId: string;
}

interface ClerkData {
    id?: string;
    name: string;
    email: string;
    phone: string;
    image: string;
}

const ModalClerkProvider: React.FC<ModalProps> = ({ setIsOpen, reloadClerk, clerkId, isOpen, edit }) => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(true);
    const [clerkData, setClerkData] = useState<any>(null);
    const [statusImgLogo, setStatusImgLogo] = useState<any>(null);
    const [imgPhotoMin, setImgPhotoMin] = useState<any>(null);
    const [changeImg, setChangeImg] = useState(false);
    const [clerkAvatar, setClerkAvatar] = useState<string | null>(null);

    const getClerk = useCallback(async (): Promise<void> => {
        await api
            .get(`/clerk/${clerkId}`)
            .then(async (response) => {
                if (response.data.image) {
                    const imgNamePhotoData = await api.get(`storage/base64/min/${response.data.image}`);
                    setImgPhotoMin(imgNamePhotoData.data);
                }
                setClerkData(response.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error('Houve um erro ao buscar dados!');
            });
    }, [clerkId]);

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
            getClerk();
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
                        setClerkAvatar(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error('Falha ao inserir imagem');
                        setStatusImgLogo(null);
                    });
            }
        }
    }, []);

    const submitClerk = useCallback(
        async (data: ClerkData) => {
            try {
                formRef.current?.setErrors({});
                if (data.phone && data.phone !== '') {
                    data.phone = data.phone.replace(/[^\d]/g, '');
                }

                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                    phone: Yup.string().required('Telefone obrigatório').max(14, 'Digite um telefone valido'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                if (clerkAvatar) {
                    data.image = clerkAvatar;
                }

                if (edit) {
                    data.id = clerkId;
                    await api.put('clerk', data);
                } else {
                    await api.post('clerk', data);
                }

                toast.success(`Atendente ${edit ? 'editado' : 'inserido'} com sucesso!`);
                setIsOpen();
                reloadClerk();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                toast.error(`Houve uma falha ao ${edit ? 'editar' : 'inserir'} os dados`);
            }
        },
        [clerkAvatar, clerkId, edit, reloadClerk, setIsOpen],
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
        <Modal width="420px" height="460px" isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} initialData={clerkData} onSubmit={submitClerk}>
                <Header>
                    {edit ? <h1>Editar Atendente</h1> : <h1>Novo Atendente</h1>}
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
                                        marginBottom: '15px',
                                        width: '100%',
                                    }}
                                >
                                    <Input name="name" placeholder="Nome" />
                                </div>
                            </Container>
                            <Container>
                                <Input name="email" placeholder="Email" />
                            </Container>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        marginTop: '15px',
                                        width: '100%',
                                    }}
                                >
                                    <InputMask mask="(99)99999-9999" name="phone" placeholder="Telefone" />
                                </div>
                            </Container>
                            {(!edit || changeImg || !clerkData.image) && (
                                <Container>
                                    <div
                                        className="img"
                                        style={{
                                            padding: '2px',
                                            marginTop: '15px',
                                            width: '100%',
                                        }}
                                    >
                                        Foto Atendente:
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
                            {edit && clerkData.image && !changeImg && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '15px 0px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => clickImg(clerkData.image)}
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
                                        onClick={() => clickImg(clerkData.image)}
                                        alt=""
                                    />
                                </div>
                            )}
                            {edit && !changeImg && clerkData.image && (
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
                            title={edit ? 'Editar Atendente' : 'Adicionar Atendente'}
                            background="#2e656a"
                            action={() => formRef.current?.submitForm()}
                        />
                    </div>
                </Footer>
            </Form>
        </Modal>
    );
};

export default ModalClerkProvider;
