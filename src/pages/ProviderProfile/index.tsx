/* eslint-disable react/jsx-wrap-multilines */

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, ChangeEvent, useState, useEffect } from 'react';
import { FiLock, FiMail, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { FaMapSigns, FaUser } from 'react-icons/fa';
import { MdCheck, MdClose } from 'react-icons/md';
import Switch from 'react-switch';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../util/getValidationErrors';
import { Container, Content, AvatarInput, Row, Col } from './styles';
import { useAuth } from '../../hooks/Auth';
import InputMask from '../../components/Input/InputMask';

interface ProfileFormData {
    name: string;
    email: string;
    old_password: string;
    password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { user } = useAuth();
    const [isBarber, setIsBarber] = useState(false);
    const [isTattoo, setIsTattoo] = useState(false);
    const [isPiercing, setIsPiercing] = useState(false);
    const [profileInfo, setProfileInfo] = useState(undefined);

    const getProfileInfo = useCallback(async () => {
        await api.get(`/provider/${user.id}`).then((response) => {
            console.log(response.data);
            setProfileInfo(response.data);
        });
    }, [user.id]);

    useEffect(() => {
        getProfileInfo();
    }, []);

    const handleSubmit = useCallback(
        async (data: ProfileFormData) => {
            try {
                formRef.current?.setErrors({});
                // const schema = Yup.object().shape({
                //   name: Yup.string().required('Nome obrigatório'),
                //   email: Yup.string()
                //     .required('E-mail obrigatório')
                //     .email('Digite um e-mail válido'),
                //   old_password: Yup.string(),
                //   password: Yup.string().when('old_password', {
                //     is: (val) => !!val.length,
                //     then: Yup.string().required('Campo obrigatorio!!'),
                //     otherwise: Yup.string(),
                //   }),
                //   password_confirmation: Yup.string()
                //     .when('old_password', {
                //       is: (val) => !!val.length,
                //       then: Yup.string().required('Campo obrigatorio!!'),
                //       otherwise: Yup.string(),
                //     })
                //     .oneOf([Yup.ref('password'), null], 'Confirmaçao incorreta'),
                // });

                // await schema.validate(data, {
                //     abortEarly: false,
                // });

                const { name, email, old_password, password, password_confirmation } = data;

                const formData = {
                    name,
                    email,
                    ...(data.old_password
                        ? {
                              old_password,
                              password,
                              password_confirmation,
                          }
                        : {}),
                };

                const response = await api.put('/profile', formData);

                // updateUser(response.data);

                history.push('/dashboard');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
            }
        },
        [history],
    );

    const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const data = new FormData();
            data.append('avatar', e.target.files[0]);
            api.patch('/users/avatar', data).then((response) => {
                // updateUser(response.data);
            });
        }
    }, []);

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

    return (
        <Container>
            <header>
                <div>
                    <Link to="/home">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>

            <Content>
                <Form initialData={profileInfo} ref={formRef} onSubmit={handleSubmit}>
                    <AvatarInput>
                        <img
                            src={
                                user.avatar
                                    ? user.avatar
                                    : 'https://pickaface.net/gallery/avatar/20140501_004912_2217_comm.png'
                            }
                            alt={user.name}
                        />
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
                        <Col xs={12} sm={4} md={4} lg={4}>
                            <Input name="old_password" icon={FiLock} type="password" placeholder="Senha atual" />
                        </Col>
                        <Col xs={12} sm={4} md={4} lg={4}>
                            <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />
                        </Col>
                        <Col xs={12} sm={4} md={4} lg={4}>
                            <Input
                                name="password_confirmation"
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
                            <Input name="addressComplement" placeholder="Complemento" icon={FaMapSigns} />
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
                </Form>
            </Content>
        </Container>
    );
};

export default Profile;
