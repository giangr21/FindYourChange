/* eslint-disable no-await-in-loop */
/* eslint-disable react/jsx-wrap-multilines */

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, ChangeEvent, useState, useEffect } from 'react';
import { FiLock, FiMail, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { FaMapSigns, FaPhoneAlt } from 'react-icons/fa';
import { MdCheck, MdClose } from 'react-icons/md';
import Switch from 'react-switch';
import { toast } from 'react-toastify';
import { BsCheckAll } from 'react-icons/bs';
import api from '../../services/api';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../util/getValidationErrors';
import { Container, Content, AvatarInput, Row, Col, ImgPreview } from './styles';
import { useAuth } from '../../hooks/Auth';
import InputMask from '../../components/Input/InputMask';
import Loading from '../../components/Loading';
import { CarouselWithCustomDots } from '../../components/multi-carousel/multi-carousel';

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { user, updateUser } = useAuth();
    const [isBarber, setIsBarber] = useState(false);
    const [isTattoo, setIsTattoo] = useState(false);
    const [isPiercing, setIsPiercing] = useState(false);
    const [profileInfo, setProfileInfo] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [profileAvatar, setProfileAvatar] = useState(null);
    const [statusImgLogo, setStatusImgLogo] = useState<any>(null);
    const [isUpdatedProfile, setIsUpdateProfile] = useState(true);
    const [indexImgSelectedInCarousel, setIndexImgSelectedInCarousel] = useState(0);

    const getProfileInfo = useCallback(async () => {
        await api.get(`/provider/${user.id}`).then(async (response) => {
            if (response.data.providerImages.length > 0) {
                const providerImagesBase64 = [];
                for (let index = 0; index < response.data.providerImages.length; index++) {
                    const providerImage = response.data.providerImages[index];
                    const imgBase64 = await api.get(`storage/base64/min/${providerImage.image}`);
                    providerImagesBase64.push({ id: providerImage.id, base64Img: imgBase64.data });
                }
                response.data.providerImages = providerImagesBase64;
            }
            const { data } = await api.get(`storage/base64/min/${response.data.avatar}`);
            response.data.avatar = data;

            setProfileInfo(response.data);

            setLoading(false);
            setIsBarber(response.data.isBarber);
            setIsTattoo(response.data.isTattoo);
            setIsPiercing(response.data.isPiercing);
        });
    }, [user.id]);

    useEffect(() => {
        getProfileInfo();
    }, []);

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    oldPassword: Yup.string(),
                    password: Yup.string().when('oldPassword', {
                        is: (val) => !!val.length,
                        then: Yup.string().required('Campo obrigatorio!!'),
                        otherwise: Yup.string(),
                    }),
                    passwordConfirmation: Yup.string()
                        .when('oldPassword', {
                            is: (val) => !!val.length,
                            then: Yup.string().required('Campo obrigatorio!!'),
                            otherwise: Yup.string(),
                        })
                        .oneOf([Yup.ref('password'), undefined], 'Confirmaçao incorreta'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                if (data.oldPassword === '') {
                    delete data.oldPassword;
                    delete data.password;
                    delete data.passwordConfirmation;
                }

                if (data.phone && data.phone !== '') {
                    data.phone = data.phone.replace(/[^\d]/g, '');
                }

                data.id = user.id;

                data.isBarber = isBarber;
                data.isTattoo = isTattoo;
                data.isPiercing = isPiercing;

                if (profileAvatar) {
                    data.avatar = profileAvatar;
                }

                await api.put('/provider', data);

                updateUser({
                    name: data.name,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    avatar: data.avatar,
                    id: data.id,
                    isProvider: user.isProvider,
                    isBarber,
                    isPiercing,
                    isTattoo,
                    legalName: data.legalName,
                });

                toast.success('Perfil atualizado com sucesso!');

                history.push('/homeProvider');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                toast.error('Houve um erro! Tente novamente.');
            }
        },
        [user.id, user.isProvider, isBarber, isTattoo, isPiercing, updateUser, history, profileAvatar],
    );

    const handleAvatarChange = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const data = new FormData();
                data.append('image', e.target.files[0]);

                const maxAllowedSize = 30 * 1024 * 1024;
                if (e.target.files[0].size > maxAllowedSize) {
                    toast.error('Falha ao inserir imagem, limite de tamanho excedido');
                } else {
                    await api
                        .post('/storage/img', data)
                        .then(async (response) => {
                            setProfileAvatar(response.data);
                            const { data: responseImg } = await api.get(`storage/base64/min/${response.data}`);
                            setProfileInfo({ ...profileInfo, avatar: responseImg });
                        })
                        .catch((error) => {
                            console.log(error);
                            toast.error('Falha ao inserir imagem');
                            setProfileAvatar(null);
                        });
                }
            }
        },
        [profileInfo],
    );

    const toggleBarber = useCallback(() => {
        setIsBarber((prevState) => !prevState);
    }, []);
    const toggleTattoo = useCallback(() => {
        setIsTattoo((prevState) => !prevState);
    }, []);
    const togglePiercing = useCallback(() => {
        setIsPiercing((prevState) => !prevState);
    }, []);

    const getCep = useCallback(async () => {
        let cep = formRef.current?.getFieldValue('addressZipCode');
        cep = cep.replace(/[^\d]/g, '');
        if (cep === '' || cep.length < 8) {
            toast.error('Digite um cep valido.');
        } else {
            await api
                .get(`https://olog-api.jclan.com.br/street/${cep}`)
                .then((response) => {
                    if (response.data !== '') {
                        formRef.current?.setFieldValue('addressArea', `${response.data.area.clearName}`);
                        formRef.current?.setFieldValue('addressCity', `${response.data.city.clearName}`);
                        formRef.current?.setFieldValue('addressCountry', 'Brasil');
                        formRef.current?.setFieldValue('addressStreet', `${response.data.clearPublicPlace}`);
                        formRef.current?.setFieldValue('addressState', `${response.data.stateId}`);

                        const inputNumber = formRef.current?.getFieldRef('addressNumber');
                        if (inputNumber) {
                            inputNumber.focus();
                        }
                    } else {
                        toast.error('Digite um cep valido.');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Falha ao buscar cep');
                });
        }
    }, []);

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Enter') {
            getCep();
        }
    }, []);

    const insertProviderImage = useCallback(
        async (imgId: string) => {
            try {
                await api
                    .post('providerImages', {
                        provider: user.id,
                        image: imgId,
                        defaultImage: false,
                    })
                    .then(async (response) => {
                        const { data } = await api.get(`storage/base64/min/${imgId}`);
                        profileInfo.providerImages.push({ id: response.data, base64Img: data });
                        toast.success('Imagem inserida com sucesso!!');
                        setTimeout(() => {
                            setStatusImgLogo(null);
                        }, 3000);
                    });
            } catch (e) {
                console.log(e);
            }
        },
        [profileInfo, user.id],
    );

    const updateDefaultProviderImage = useCallback(async () => {
        try {
            const providerImage = profileInfo.providerImages[indexImgSelectedInCarousel];
            await api.post(`providerImages/updateDefaultImage/${providerImage.id}`);
            toast.success('Imagem Padrão atualizada com sucesso!!');
        } catch (e) {
            console.log(e);
        }
    }, [indexImgSelectedInCarousel, profileInfo]);

    const deleteProviderImage = useCallback(async () => {
        const providerImage = profileInfo.providerImages[indexImgSelectedInCarousel];
        try {
            await api.delete(`providerImages/${providerImage.id}`).then(() => {
                const updatedProfileInfo = profileInfo.providerImages.filter(
                    (img: any) => img.id !== providerImage.id,
                );
                setProfileInfo({ ...profileInfo, providerImages: updatedProfileInfo });
                toast.success('Imagem removida com sucesso!!');
            });
        } catch (e) {
            console.log(e);
        }
    }, [indexImgSelectedInCarousel, profileInfo]);

    const handleImageChange = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
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
                        .then(async (response) => {
                            await insertProviderImage(response.data);
                            setStatusImgLogo(false);
                        })
                        .catch((error) => {
                            console.log(error);
                            toast.error('Falha ao inserir imagem');
                            setStatusImgLogo(null);
                        });
                }
            }
        },
        [insertProviderImage],
    );

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <header>
                        <div>
                            <Link to="/homeProvider">
                                <FiArrowLeft />
                            </Link>
                        </div>
                    </header>

                    <Content>
                        <Form initialData={profileInfo} ref={formRef} onSubmit={handleSubmit}>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '50%',
                                    margin: '0px auto 35px',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    style={{
                                        marginRight: '10px',
                                    }}
                                    type="button"
                                    onClick={() => setIsUpdateProfile(true)}
                                >
                                    Perfil
                                </Button>
                                <Button type="button" onClick={() => setIsUpdateProfile(false)}>
                                    Galeria Fotos
                                </Button>
                            </div>

                            {isUpdatedProfile ? (
                                <>
                                    <AvatarInput>
                                        <img src={`data:image/png;base64,${profileInfo.avatar}`} alt={user.name} />
                                        <label htmlFor="avatar">
                                            <FiCamera />
                                            <input type="file" id="avatar" onChange={handleAvatarChange} />
                                        </label>
                                    </AvatarInput>
                                    <h1>Meu Perfil</h1>

                                    <Row>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <Input name="name" icon={FiUser} placeholder="Nome" />
                                        </Col>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <Input name="lastName" icon={FiUser} placeholder="Sobrenome" />
                                        </Col>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <Input name="email" icon={FiMail} placeholder="E-mail" />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} sm={6} md={6} lg={6}>
                                            <InputMask
                                                icon={FaPhoneAlt}
                                                mask="(99)99999-9999"
                                                name="phone"
                                                placeholder="Telefone"
                                            />
                                        </Col>
                                        <Col xs={12} sm={6} md={6} lg={6}>
                                            <Input
                                                name="legalName"
                                                icon={FiUser}
                                                type="text"
                                                placeholder="Nome Fantasia"
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <Input
                                                name="oldPassword"
                                                icon={FiLock}
                                                type="password"
                                                placeholder="Senha atual"
                                            />
                                        </Col>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <Input
                                                name="password"
                                                icon={FiLock}
                                                type="password"
                                                placeholder="Nova senha"
                                            />
                                        </Col>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <Input
                                                name="passwordConfirmation"
                                                icon={FiLock}
                                                type="password"
                                                placeholder="Confirmar senha"
                                            />
                                        </Col>
                                    </Row>

                                    <h1>Endereço</h1>

                                    <Row>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <InputMask
                                                mask="99999-999"
                                                name="addressZipCode"
                                                placeholder="CEP"
                                                cepIcon
                                                getCep={getCep}
                                                onKeyPress={handleKeyPress}
                                            />
                                        </Col>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <Input name="addressStreet" placeholder="Rua" icon={FaMapSigns} />
                                        </Col>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <Input name="addressArea" placeholder="Bairro" icon={FaMapSigns} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} sm={3} md={3} lg={3}>
                                            <Input name="addressNumber" placeholder="Numero" icon={FaMapSigns} />
                                        </Col>
                                        <Col xs={12} sm={3} md={3} lg={3}>
                                            <Input name="addressCity" placeholder="Cidade" icon={FaMapSigns} />
                                        </Col>
                                        <Col xs={12} sm={3} md={3} lg={3}>
                                            <Input name="addressState" placeholder="Estado" icon={FaMapSigns} />
                                        </Col>
                                        <Col xs={12} sm={3} md={3} lg={3}>
                                            <Input
                                                name="addressComplement"
                                                placeholder="Complemento"
                                                icon={FaMapSigns}
                                            />
                                        </Col>
                                    </Row>

                                    <h1>Serviços</h1>

                                    <Row>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <span
                                                style={{
                                                    marginRight: '7px',
                                                }}
                                            >
                                                Barbearia:
                                            </span>
                                            <Switch
                                                onChange={toggleBarber}
                                                checked={isBarber}
                                                uncheckedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdClose />
                                                    </div>
                                                }
                                                checkedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdCheck />
                                                    </div>
                                                }
                                                height={23}
                                                width={55}
                                                onColor="#2e656a"
                                                offColor="#c53030"
                                            />
                                        </Col>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <span
                                                style={{
                                                    marginRight: '7px',
                                                }}
                                            >
                                                Tatuagem:
                                            </span>
                                            <Switch
                                                onChange={toggleTattoo}
                                                checked={isTattoo}
                                                uncheckedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdClose />
                                                    </div>
                                                }
                                                checkedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdCheck />
                                                    </div>
                                                }
                                                height={23}
                                                width={55}
                                                onColor="#2e656a"
                                                offColor="#c53030"
                                            />
                                        </Col>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <span
                                                style={{
                                                    marginRight: '7px',
                                                }}
                                            >
                                                Piercing:
                                            </span>
                                            <Switch
                                                onChange={togglePiercing}
                                                checked={isPiercing}
                                                uncheckedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdClose />
                                                    </div>
                                                }
                                                checkedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdCheck />
                                                    </div>
                                                }
                                                height={23}
                                                width={55}
                                                onColor="#2e656a"
                                                offColor="#c53030"
                                            />
                                        </Col>
                                    </Row>

                                    <Button type="submit">Confirmar mudanças</Button>
                                </>
                            ) : (
                                <>
                                    <ImgPreview>
                                        <CarouselWithCustomDots
                                            items={profileInfo ? profileInfo.providerImages : []}
                                            updatedImgInCarousel={(indexImg: number) =>
                                                setIndexImgSelectedInCarousel(indexImg)
                                            }
                                        />
                                    </ImgPreview>
                                    <Row>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <div className="img">
                                                Upload Imagem
                                                {statusImgLogo === null && (
                                                    <label htmlFor="avatar">
                                                        <FiCamera />
                                                        <input
                                                            accept=".jpg, .jpeg, .png"
                                                            onChange={handleImageChange}
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
                                        </Col>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <Button type="button" onClick={deleteProviderImage}>
                                                Excluir Imagem
                                            </Button>
                                        </Col>
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <Button type="button" onClick={updateDefaultProviderImage}>
                                                Tornar Imagem Principal
                                            </Button>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Form>
                    </Content>
                </>
            )}
        </Container>
    );
};

export default Profile;
