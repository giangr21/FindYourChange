import React, { useCallback, useRef, useState, useEffect, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Tabs, Tab, ORIENTATION, FILL } from 'baseui/tabs-motion';
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { Button as ButtonBaseUi } from 'baseui/button';
import ReactStars from 'react-rating-stars-component';

import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import moment from 'moment';
import api from '../../services/api';
import Button from '../../components/FormComponents/Button';
import Input from '../../components/FormComponents/Input';
import getValidationErrors from '../../util/getValidationErrors';
import { Container, AvatarInput, Content, Row, Col } from './styles';
import { useAuth } from '../../hooks/Auth';
import InputMask from '../../components/FormComponents/Input/InputMask';
import Loading from '../../components/Loading';

const UserProfile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { user } = useAuth();
    const [isEdit, setIsEdit] = useState(true);
    const [loading, setLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState<any>({});
    const [appointments, setAppointments] = useState<any>([]);
    const [reviews, setReviews] = useState<any>([]);
    const [profileAvatar, setProfileAvatar] = useState(null);
    const [tabNumber, setTabNumber] = useState<any>('0');

    const getProfileInfo = useCallback(async () => {
        await api.get(`/user/${user.id}`).then(async (response) => {
            const { data } = await api.get(`storage/base64/min/${response.data.avatar}`);
            response.data.avatar = data;
            setProfileInfo(response.data);
            setLoading(false);
        });
    }, [user.id]);

    const getAppointmentsFromUser = useCallback(async () => {
        await api.get(`/user/appointments/${user.id}`).then(async (response) => {
            response.data.forEach((r: any) => {
                r.dateRelease = moment(r.dateRelease).format('DD/MM/YYYY - HH:mm');
            });
            setAppointments(response.data);
        });
    }, [user.id]);

    const getReviewsFromUser = useCallback(async () => {
        await api.get(`providerRecommendation/user/${user.id}`).then(async (response) => {
            setReviews(response.data);
        });
    }, [user.id]);

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    oldPassword: Yup.string(),
                    password: Yup.string().when('oldPassword', {
                        is: (val) => !!val.length,
                        then: Yup.string().required('Campo obrigatório!!'),
                        otherwise: Yup.string(),
                    }),
                    passwordConfirmation: Yup.string()
                        .when('oldPassword', {
                            is: (val) => !!val.length,
                            then: Yup.string().required('Campo obrigatório!!'),
                            otherwise: Yup.string(),
                        })
                        .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
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
                setProfileInfo(data);
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
        getAppointmentsFromUser();
        getReviewsFromUser();
        getProfileInfo();
    }, []);

    const handleDeleteReview = useCallback(
        async (id: string) => {
            await api.delete(`/providerRecommendation/${id}`).then(() => {
                setReviews(reviews.filter((review: any) => review.id !== id));
                return toast.success('Recomendação excluída com sucesso!')!;
            });
        },
        [reviews],
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

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
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
                            <Content>
                                <Form initialData={profileInfo} ref={formRef} onSubmit={handleSubmit}>
                                    <h1>Meu Perfil</h1>
                                    <AvatarInput>
                                        <img src={`data:image/png;base64,${profileInfo.avatar}`} alt={user.name} />
                                        <label htmlFor="avatar">
                                            <FiCamera />
                                            <input type="file" id="avatar" onChange={handleAvatarChange} />
                                        </label>
                                    </AvatarInput>
                                    <Row>
                                        <Col xs={12} sm={3} md={3} lg={3}>
                                            <Input name="name" icon={FiUser} placeholder="Nome" />
                                        </Col>
                                        <Col xs={12} sm={3} md={3} lg={3}>
                                            <Input name="lastName" icon={FiUser} placeholder="Sobrenome" />
                                        </Col>
                                        <Col xs={12} sm={3} md={3} lg={3}>
                                            <Input name="email" icon={FiMail} placeholder="E-mail" />
                                        </Col>
                                        <Col xs={12} sm={3} md={3} lg={3}>
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
                            </Content>
                        </Tab>
                        <Tab title="Agendamentos">
                            <div>
                                <h1>Meus Agendamentos</h1>
                                {appointments.map((appointment: any) => (
                                    <div key={appointment.id}>
                                        <h2>Notas: {appointment.notes}</h2>
                                        <h2>Avaliação: {appointment.rating}</h2>
                                        <h2>Tipo de Serviço: {appointment.serviceType}</h2>
                                        <h2>Valor do Serviço: {appointment.value}</h2> <br />
                                        <h2>Data: {appointment.dateRelease}</h2> <br />
                                    </div>
                                ))}
                            </div>
                        </Tab>
                        <Tab title="Reviews">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <h1
                                    style={{
                                        margin: '0 auto 20px',
                                    }}
                                >
                                    Meus Reviews
                                </h1>
                                <Row>
                                    {reviews.map((review: any) => (
                                        <Col key={review.id} xs={12} sm={6} md={4} lg={4}>
                                            <Card
                                                overrides={{ Root: { style: { width: '328px' } } }}
                                                title={review.providerLegalName}
                                            >
                                                <StyledBody
                                                    style={{
                                                        color: '#fff',
                                                    }}
                                                >
                                                    Descrição: {review.notes}
                                                </StyledBody>
                                                <StyledBody
                                                    style={{
                                                        display: 'flex',
                                                        color: '#fff',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            marginRight: '7px',
                                                        }}
                                                    >
                                                        Avaliação:{' '}
                                                    </span>
                                                    <ReactStars
                                                        value={review.rating}
                                                        count={5}
                                                        size={30}
                                                        edit={false}
                                                        activeColor="#ffd700"
                                                    />
                                                </StyledBody>
                                                <StyledAction>
                                                    <ButtonBaseUi
                                                        overrides={{
                                                            BaseButton: {
                                                                style: {
                                                                    width: '100%',
                                                                    background: '#ff9000',
                                                                },
                                                            },
                                                        }}
                                                        onClick={() => handleDeleteReview(review.id)}
                                                    >
                                                        Excluir Registro
                                                    </ButtonBaseUi>
                                                </StyledAction>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </Tab>
                    </Tabs>
                </ThemeProvider>
            )}
        </Container>
    );
};

export default UserProfile;
