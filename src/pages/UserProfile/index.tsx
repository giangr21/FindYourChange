/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/camelcase */

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Tabs, Tab, ORIENTATION, FILL } from 'baseui/tabs-motion';
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui';

import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../util/getValidationErrors';
import { Container, Content, AvatarInput, Row, Col, ImgPreview } from './styles';
import { useAuth } from '../../hooks/Auth';
import InputMask from '../../components/Input/InputMask';
import Loading from '../../components/Loading';

const UserProfile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { user } = useAuth();
    const [isEdit, setIsEdit] = useState(true);
    const [loading, setLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState<any>({});
    const [profileAvatar, setProfileAvatar] = useState(null);
    const [tabNumber, setTabNumber] = React.useState<any>('0');

    const getProfileInfo = useCallback(async () => {
        await api.get(`/user/${user.id}`).then(async (response) => {
            setProfileInfo(response.data);
            setLoading(false);
            console.log(response.data);
        });
    }, [user.id]);

    const handleSubmit = useCallback(
        async (data: any) => {
            console.log(data);
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

                if (profileAvatar) {
                    data.avatar = profileAvatar;
                }

                await api.put('/user', data);

                // updateSimpleUser({
                //     name: data.name,
                //     lastName: data.lastName,
                //     email: data.email,
                //     phone: data.phone,
                //     avatar: data.avatar,
                //     id: data.id,
                // });

                toast.success('Perfil atualizado com sucesso!');

                history.push('/userProfile');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                toast.error('Houve um erro! Tente novamente.');
            }
        },
        [user.id, history, profileAvatar],
    );

    useEffect(() => {
        getProfileInfo();
    }, []);

    return (
        <Container>
            <ThemeProvider
                theme={createTheme(lightThemePrimitives, {
                    colors: { backgroundPrimary: '#312E38', contentPrimary: '#ff9000' },
                })}
            >
                <Tabs
                    activeKey={tabNumber}
                    onChange={({ activeKey }) => {
                        setTabNumber(activeKey);
                    }}
                    orientation={ORIENTATION.vertical}
                    fill={FILL.fixed}
                    activateOnFocus
                    overrides={{
                        Root: {
                            style: ({ $theme }) => ({
                                height: '100%',
                            }),
                        },
                        TabHighlight: {
                            style: ({ $theme }) => ({
                                outline: `#ff9000 solid`,
                                backgroundColor: '#ff9000',
                            }),
                        },
                    }}
                >
                    <Tab title="Editar Cadastro">
                        {loading ? (
                            <Loading />
                        ) : (
                            <Form initialData={profileInfo} ref={formRef} onSubmit={handleSubmit}>
                                {/* {isEdit ? ( */}
                                {/* <AvatarInput>
                                    <img src={`data:image/png;base64,${profileInfo.avatar}`} alt={user.name} />
                                    <label htmlFor="avatar">
                                    <FiCamera />
                                    <input type="file" id="avatar" onChange={handleAvatarChange} />
                                    </label>
                                </AvatarInput> */}
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
                                </Row>

                                <Row>
                                    <Col xs={12} sm={4} md={4} lg={4}>
                                        <Input
                                            name="password"
                                            icon={FiLock}
                                            type="password"
                                            placeholder="Senha atual"
                                        />
                                    </Col>
                                    <Col xs={12} sm={4} md={4} lg={4}>
                                        <Input
                                            name="oldPassword"
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

                                <Button type="submit">Confirmar mudanças</Button>
                            </Form>
                        )}
                    </Tab>
                    <Tab title="Agendamentos">Content 2</Tab>
                    <Tab title="Reviews">Content 3</Tab>
                </Tabs>
            </ThemeProvider>
            {/* <Content>
                <div
                    style={{
                        marginTop: '10%',
                    }}
                >
                    <p>Editar Cadastro</p>
                    <p>Agendamentos</p>
                    <p>Reviews</p>
                </div>
            </Content> */}
        </Container>
    );
};

export default UserProfile;
