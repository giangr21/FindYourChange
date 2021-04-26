/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { FiCamera, FiCheckSquare, FiDelete } from 'react-icons/fi';
import { FaWindowClose } from 'react-icons/fa';
import { BsCheckAll } from 'react-icons/bs';
import * as Yup from 'yup';
import { withStyle } from 'baseui';
import { toast } from 'react-toastify';

import { Row as Rows, Col as Column } from '../../../components/FlexBox/FlexBox';
import { Form, Container, Header, Footer, Content } from './styles';
import Input from '../../../components/FormComponents/Input/InputModal';
import Modal from '../../../components/Modal';
import Select from '../../../components/FormComponents/Select';
import IconButton from '../../../components/FormComponents/Button/IconButton';
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
    isPopularService: boolean;
}

export const Col = withStyle(Column, () => ({
    '@media only screen and (max-width: 767px)': {
        marginBottom: '15px',
    },
}));

const Row = withStyle(Rows, () => ({
    paddingRight: '5px',
    margin: '0px 0px 15px',
    '@media only screen and (max-width: 767px)': {
        margin: '0px 0px 7.5px',
    },
    '@media only screen and (min-width: 768px) and (max-width: 991px)': {
        alignItems: 'center',
    },
}));

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
    const [clerks, setClerks] = useState([]);

    const getService = useCallback(async (): Promise<void> => {
        await api
            .get(`/services/${serviceId}`)
            .then(async (response) => {
                if (response.data.category === 'Barbearia')
                    response.data.category = { value: 'Barbearia', label: 'Barbearia' };

                if (response.data.category === 'Tatuagem')
                    response.data.category = { value: 'Tatuagem', label: 'Tatuagem' };

                if (response.data.category === 'BodyPiercing')
                    response.data.category = { value: 'BodyPiercing', label: 'Body Piercing' };

                if (response.data.isPopularService === true)
                    response.data.isPopularService = { value: true, label: 'Sim' };
                else response.data.isPopularService = { value: false, label: 'Não' };

                if (response.data.image) {
                    const imgNamePhotoData = await api.get(`storage/base64/min/${response.data.image}`);
                    setImgPhotoMin(imgNamePhotoData.data);
                }

                response.data.time = { value: response.data.time, label: response.data.time };

                if (response.data.clerks.length > 0)
                    response.data.clerks = response.data.clerks.map((clerk: any) => {
                        return {
                            value: clerk.id,
                            label: clerk.name,
                        };
                    });

                setServiceData(response.data);
                setLoading(false);
            })
            .catch((e) => {
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

        async function getClerks(): Promise<void> {
            await api.get(`/clerk/provider/${user.id}`).then((response) => {
                setClerks(
                    response.data.map((clerk: any) => {
                        return {
                            value: clerk.id,
                            label: clerk.name,
                        };
                    }),
                );
            });
        }
        getClerks();
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
                    isPopularService: Yup.boolean().required('Preenchimento obrigatório'),
                    clerks: Yup.array().required('Atendentes Obrigatorio'),
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
        <Modal width={mobile ? '100%' : '520px'} height="620px" isOpen={isOpen} setIsOpen={setIsOpen}>
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
                            <Row>
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <Input name="title" placeholder="Título" />
                                </Col>
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <Input name="description" placeholder="Descrição" />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Select
                                        name="clerks"
                                        fieldValue="value"
                                        fieldLabel="label"
                                        label="Atendentes"
                                        placeholder=""
                                        isMulti
                                        className="react-select-container"
                                        options={clerks}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
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
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Select
                                        name="time"
                                        fieldValue="value"
                                        fieldLabel="label"
                                        label="Tempo de Serviço"
                                        placeholder=""
                                        className="react-select-container"
                                        options={[
                                            { value: '30', label: '30 minutos' },
                                            { value: '60', label: '1 hora' },
                                            { value: '90', label: '1 hora e 30 minutos' },
                                            { value: '120', label: '2 horas' },
                                            { value: '150', label: '2 horas e 30 minutos' },
                                            { value: '180', label: '3 horas' },
                                            { value: '210', label: '3 horas e 30 minutos' },
                                            { value: '240', label: '4 horas' },
                                            { value: '270', label: '4 horas e 30 minutos' },
                                            { value: '300', label: '5 horas' },
                                        ]}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <Input name="value" placeholder="Valor $" />
                                </Col>
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <Input name="disccount" placeholder="Desconto %" />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Select
                                        name="isPopularService"
                                        fieldValue="value"
                                        fieldLabel="label"
                                        label="Serviço Popular"
                                        placeholder=""
                                        className="react-select-container"
                                        options={[
                                            { value: 'true', label: 'Sim' },
                                            { value: 'false', label: 'Não' },
                                        ]}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    {(!edit || changeImg || !serviceData.image) && (
                                        <Container
                                            style={{
                                                justifyContent: 'center',
                                            }}
                                        >
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
                                </Col>
                            </Row>
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
