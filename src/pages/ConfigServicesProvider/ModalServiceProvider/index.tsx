/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { FiCamera, FiCheckSquare, FiDelete } from 'react-icons/fi';
import { FaWindowClose } from 'react-icons/fa';

import { BsCheckAll } from 'react-icons/bs';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Container, Header, Footer, Content } from './styles';
import Input from '../../../components/Input/InputModal';
import Modal from '../../../components/Modal';
import Select from '../../../components/Select';
import IconButton from '../../../components/Button/IconButton';
import api from '../../../services/api';
import getValidationErrors from '../../../util/getValidationErrors';
import Loading from '../../../components/Loading';
import { useAuth } from '../../../hooks/Auth';
import { useMedia } from '../../../util/use-media';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    edit: boolean;
    reloadService: () => void;
    handleDelete: () => void;
    serviceId: string;
}
interface ServiceData {
    id?: string;
    title: string;
    description: string;
    value: number;
    disccount: number;
    category: string;
    time: string;
    image: string;
    provider: string;
}

const ModalServicesProvider: React.FC<ModalProps> = ({
    setIsOpen,
    reloadService,
    handleDelete,
    serviceId,
    isOpen,
    edit,
}) => {
    const mobile = useMedia('(max-width: 760px)');
    const { user } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(true);
    const [serviceData, setServiceData] = useState<any>(null);
    const [statusImgLogo, setStatusImgLogo] = useState<any>(null);
    const [imgPhotoMin, setImgPhotoMin] = useState<any>(null);
    const [serviceImg, setServiceImg] = useState<string | null>(null);
    const [changeImg, setChangeImg] = useState(false);

    const getService = useCallback(async (): Promise<void> => {
        await api
            .get(`/services/${serviceId}`)
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

                if (response.data.image) {
                    const imgNamePhotoData = await api.get(`storage/base64/min/${response.data.image}`);
                    setImgPhotoMin(imgNamePhotoData.data);
                }

                setServiceData(response.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error('Houve um erro ao buscar dados!');
            });
    }, [serviceId]);

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
            getService();
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
                        setServiceImg(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error('Falha ao inserir imagem');
                        setStatusImgLogo(null);
                    });
            }
        }
    }, []);

    const submitService = useCallback(
        async (data: ServiceData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    title: Yup.string().required('Título obrigatório'),
                    description: Yup.string().required('Descrição obrigatória'),
                    value: Yup.string().required('Valor obrigatório'),
                    category: Yup.string().required('Categoria obrigatória'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                if (serviceImg) {
                    data.image = serviceImg;
                }

                data.provider = user.id;

                if (edit) {
                    data.id = serviceId;
                    await api.put('services', data);
                } else {
                    await api.post('services/add', data);
                }

                toast.success(`Serviço ${edit ? 'editado' : 'criado'} com sucesso!`);
                setIsOpen();
                reloadService();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                toast.error(`Houve uma falha ao ${edit ? 'editar' : 'inserir'} os dados`);
            }
        },
        [serviceImg, user.id, edit, setIsOpen, reloadService, serviceId],
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
        <Modal width={mobile ? '100%' : '420px'} height="680px" isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} initialData={serviceData} onSubmit={submitService}>
                <Header>
                    {edit ? <h1>Editar Serviço</h1> : <h1>Novo Serviço</h1>}
                    <FaWindowClose size={20} onClick={setIsOpen} />
                </Header>
                <Content>
                    {loading ? (
                        <Loading heightLoading="45vh" />
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
                                    <Input name="title" placeholder="Título" />
                                </div>
                            </Container>
                            <Container>
                                <Input name="description" placeholder="Descrição" />
                            </Container>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        marginBottom: '15px',
                                        marginTop: '15px',
                                        width: '100%',
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
                                        marginBottom: '15px',
                                        width: '100%',
                                    }}
                                >
                                    <Input name="value" placeholder="Valor $" />
                                </div>
                            </Container>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        marginBottom: '15px',
                                        width: '100%',
                                    }}
                                >
                                    <Input name="disccount" placeholder="Desconto %" />
                                </div>
                            </Container>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        marginBottom: '15px',
                                        width: '100%',
                                    }}
                                >
                                    <Input name="time" placeholder="Tempo" />
                                </div>
                            </Container>
                            {(!edit || changeImg || !serviceData.image) && (
                                <Container>
                                    <div className="img">
                                        Foto Serviço:
                                        {statusImgLogo === null && (
                                            <label htmlFor="serviceImg">
                                                <FiCamera />
                                                <input
                                                    accept=".jpg, .jpeg, .png"
                                                    onChange={handleLogoChange}
                                                    type="file"
                                                    id="serviceImg"
                                                />
                                            </label>
                                        )}
                                        {statusImgLogo === true && <span>Carregando...</span>}
                                        {statusImgLogo === false && (
                                            <BsCheckAll
                                                className="check"
                                                style={{
                                                    marginLeft: '15px',
                                                }}
                                                size={25}
                                                color="#2e656a"
                                            />
                                        )}
                                    </div>
                                </Container>
                            )}
                            {edit && serviceData.image && !changeImg && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '15px 0px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => clickImg(serviceData.image)}
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
                                        onClick={() => clickImg(serviceData.image)}
                                        alt=""
                                    />
                                </div>
                            )}
                            {edit && !changeImg && serviceData.image && (
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
                        {edit && (
                            <IconButton
                                type="button"
                                icon={FiDelete}
                                title="Excluir"
                                background="rgb(222, 59, 59)"
                                action={handleDelete}
                            />
                        )}
                        <IconButton
                            type="button"
                            icon={FiCheckSquare}
                            title={edit ? 'Editar Serviço' : 'Adicionar Serviço'}
                            background="#2e656a"
                            action={() => formRef.current?.submitForm()}
                        />
                    </div>
                </Footer>
            </Form>
        </Modal>
    );
};

export default ModalServicesProvider;
