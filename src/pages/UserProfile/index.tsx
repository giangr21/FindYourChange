import React, { useCallback, useRef, useState, useEffect, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Tabs, Tab, ORIENTATION, FILL } from 'baseui/tabs-motion';
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import ReactStars from 'react-rating-stars-component';
import { ListItem, ListItemLabel, ARTWORK_SIZES } from 'baseui/list';
import { ArrowRight } from 'baseui/icon';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/pt-br';

import { useHistory } from 'react-router-dom';
import { FaAngleDoubleRight, FaPhoneAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import api from '../../services/api';
import Button from '../../components/FormComponents/Button';
import Input from '../../components/FormComponents/Input';
import getValidationErrors from '../../util/getValidationErrors';
import {
    Container,
    AvatarInput,
    Content,
    ContentAppointments,
    Appointments,
    Row,
    Col,
    UserReviews,
} from './styles';
import { useAuth } from '../../hooks/authentication';
import InputMask from '../../components/FormComponents/Input/InputMask';
import Loading from '../../components/Loading';
import IconButtonProvider from '../../components/FormComponents/Button/IconButtonProvider';
import { useMedia } from '../../util/use-media';

const UserProfile: React.FC = () => {
    const mobile = useMedia('(max-width: 760px)');
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { user, updateSimpleUser } = useAuth();
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
                if (r.service.disccount !== '' && r.service.disccount !== '0') {
                    const valueToDiscount = r.service.value * (r.service.disccount / 100);
                    r.service.value = (r.service.value - valueToDiscount).toFixed(2);
                }

                r.dayAppointment = moment(r.dateAppointment).format('DD');
                r.hourAppointment = moment(r.dateAppointment).format('HH:mm');
                r.monthAppointment = moment(r.dateAppointment).locale('pt-br').format('MMMM');
            });
            console.log(response.data);
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
                    password: Yup.string().required('Campo obrigatorio').max(60, 'Maximo 60 caracters'),
                    passwordConfirmation: Yup.string()
                        .max(60, 'Maximo 60 caracters')
                        .when('password', {
                            is: (val) => !!val.length,
                            then: Yup.string().required('Campo obrigatorio!!'),
                            otherwise: Yup.string(),
                        })
                        .oneOf([Yup.ref('password'), undefined], 'Confirmaçao incorreta'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                if (data.password === '') {
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

                updateSimpleUser(data);

                toast.success('Perfil atualizado com sucesso!');

                if (profileAvatar) {
                    delete data.avatar;
                }
                setProfileInfo({ ...profileInfo, ...data });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                toast.error('Houve um erro! Tente novamente.');
            }
        },
        [user.id, profileAvatar, updateSimpleUser, profileInfo],
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

    const handleClickProvider = useCallback(
        (id: string) => {
            history.push({
                pathname: `/provider/${id}`,
            });
        },
        [history],
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
                        orientation={mobile ? ORIENTATION.horizontal : ORIENTATION.vertical}
                        fill={FILL.fixed}
                        activateOnFocus
                        overrides={{
                            Root: {
                                style: () => ({
                                    height: '100%',
                                }),
                            },
                            TabHighlight: {
                                style: () => ({
                                    outline: `#ff9000 solid`,
                                    backgroundColor: '#ff9000',
                                }),
                            },
                        }}
                    >
                        <Tab
                            overrides={{
                                TabPanel: {
                                    style: () => ({
                                        height: mobile ? '91.5%' : '100%',
                                        padding: '5px',
                                    }),
                                },
                            }}
                            title="Editar Cadastro"
                        >
                            <Content center={!mobile}>
                                <Form initialData={profileInfo} ref={formRef} onSubmit={handleSubmit}>
                                    <h1>Minha Conta</h1>
                                    <AvatarInput>
                                        <img src={`data:image/png;base64,${profileInfo.avatar}`} alt={user.name} />
                                        <label htmlFor="avatar">
                                            <FiCamera />
                                            <input type="file" id="avatar" onChange={handleAvatarChange} />
                                        </label>
                                    </AvatarInput>
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
                                        <Col xs={12} sm={4} md={4} lg={4}>
                                            <InputMask
                                                icon={FaPhoneAlt}
                                                mask="(99)99999-9999"
                                                name="phone"
                                                placeholder="Telefone"
                                            />
                                        </Col>
                                    </Row>
                                    <div
                                        style={{
                                            marginBottom: '35px',
                                        }}
                                    >
                                        <Button type="submit">Confirmar mudanças</Button>
                                    </div>
                                </Form>
                            </Content>
                        </Tab>
                        <Tab
                            overrides={{
                                TabPanel: {
                                    style: () => ({
                                        height: mobile ? '90%' : '100%',
                                        padding: '5px',
                                    }),
                                },
                            }}
                            title="Agendamentos"
                        >
                            <ContentAppointments>
                                <h1
                                    style={{
                                        margin: '0 auto 20px',
                                    }}
                                >
                                    Meus Agendamentos
                                </h1>
                                <Row>
                                    {appointments.map((appointment: any) => (
                                        <Col key={appointment.id} xs={12} sm={6} md={6} lg={6}>
                                            <Card
                                                overrides={{
                                                    Root: { style: { width: '100%', borderRadius: '10px' } },
                                                    Contents: { style: { margin: '10px' } },
                                                }}
                                                title={appointment.service.title}
                                            >
                                                <Appointments>
                                                    <div className="left">
                                                        <ul>
                                                            <ListItem
                                                                artwork={(props: any) => <ArrowRight {...props} />}
                                                                artworkSize={ARTWORK_SIZES.MEDIUM}
                                                                overrides={{
                                                                    Content: {
                                                                        style: () => ({
                                                                            minHeight: '40px',
                                                                        }),
                                                                    },
                                                                    ArtworkContainer: {
                                                                        style: () => ({
                                                                            width: '40px',
                                                                            color: '#00A57C ',
                                                                        }),
                                                                    },
                                                                }}
                                                            >
                                                                <ListItemLabel>
                                                                    Atendente:
                                                                    <span
                                                                        style={{
                                                                            color: '#f3f4f4',
                                                                            fontSize: '14px',
                                                                            marginLeft: '4px',
                                                                        }}
                                                                    >
                                                                        {appointment.clerk.name}
                                                                    </span>
                                                                </ListItemLabel>
                                                            </ListItem>
                                                            <ListItem
                                                                artwork={(props: any) => <ArrowRight {...props} />}
                                                                artworkSize={ARTWORK_SIZES.MEDIUM}
                                                                overrides={{
                                                                    Content: {
                                                                        style: () => ({
                                                                            minHeight: '40px',
                                                                        }),
                                                                    },
                                                                    ArtworkContainer: {
                                                                        style: () => ({
                                                                            width: '40px',
                                                                            color: '#00A57C ',
                                                                        }),
                                                                    },
                                                                }}
                                                            >
                                                                <ListItemLabel>
                                                                    Categoria:
                                                                    <span
                                                                        style={{
                                                                            color: '#f3f4f4',
                                                                            fontSize: '14px',
                                                                            marginLeft: '4px',
                                                                        }}
                                                                    >
                                                                        {appointment.service.category}
                                                                    </span>
                                                                </ListItemLabel>
                                                            </ListItem>
                                                            <ListItem
                                                                artwork={(props: any) => <ArrowRight {...props} />}
                                                                artworkSize={ARTWORK_SIZES.MEDIUM}
                                                                overrides={{
                                                                    Content: {
                                                                        style: () => ({
                                                                            minHeight: '40px',
                                                                        }),
                                                                    },
                                                                    ArtworkContainer: {
                                                                        style: () => ({
                                                                            width: '40px',
                                                                            color: '#00A57C ',
                                                                        }),
                                                                    },
                                                                }}
                                                            >
                                                                <ListItemLabel>
                                                                    Valor:{' '}
                                                                    <span
                                                                        style={{
                                                                            color: '#f3f4f4',
                                                                            fontSize: '14px',
                                                                            marginLeft: '4px',
                                                                        }}
                                                                    >
                                                                        {Intl.NumberFormat('pt-BR', {
                                                                            style: 'currency',
                                                                            currency: 'BRL',
                                                                        }).format(
                                                                            Number(appointment.service.value),
                                                                        )}
                                                                    </span>
                                                                </ListItemLabel>
                                                            </ListItem>
                                                            <ListItem
                                                                artwork={(props: any) => <ArrowRight {...props} />}
                                                                artworkSize={ARTWORK_SIZES.MEDIUM}
                                                                overrides={{
                                                                    Content: {
                                                                        style: () => ({
                                                                            minHeight: '40px',
                                                                        }),
                                                                    },
                                                                    ArtworkContainer: {
                                                                        style: () => ({
                                                                            width: '40px',
                                                                            color: '#00A57C ',
                                                                        }),
                                                                    },
                                                                }}
                                                            >
                                                                <ListItemLabel>
                                                                    Comentarios:
                                                                    <span
                                                                        style={{
                                                                            color: '#f3f4f4',
                                                                            fontSize: '14px',
                                                                            marginLeft: '4px',
                                                                        }}
                                                                    >
                                                                        {appointment.notes}
                                                                    </span>
                                                                </ListItemLabel>
                                                            </ListItem>
                                                        </ul>
                                                    </div>
                                                    <div className="right">
                                                        <span className="month">
                                                            {appointment.monthAppointment}
                                                        </span>
                                                        <span className="day">{appointment.dayAppointment}</span>
                                                        <span className="hour">{appointment.hourAppointment}</span>
                                                    </div>
                                                </Appointments>
                                                <div
                                                    style={{
                                                        margin: '15px 0px 10px 0px',
                                                    }}
                                                >
                                                    <IconButtonProvider
                                                        icon={FaAngleDoubleRight}
                                                        title="Mais Informações"
                                                        background="#ff9000"
                                                        action={() => handleClickProvider(appointment.provider.id)}
                                                    />
                                                </div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </ContentAppointments>
                        </Tab>
                        <Tab
                            overrides={{
                                TabPanel: {
                                    style: () => ({
                                        height: mobile ? '90%' : '100%',
                                        padding: '5px',
                                    }),
                                },
                            }}
                            title="Reviews"
                        >
                            <UserReviews>
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
                                                overrides={{
                                                    Root: { style: { width: '328px', borderRadius: '10px' } },
                                                }}
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
                                                    <IconButtonProvider
                                                        icon={MdDeleteForever}
                                                        title="Excluir Registro"
                                                        background="#ff9000"
                                                        action={() => handleDeleteReview(review.id)}
                                                    />
                                                </StyledAction>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </UserReviews>
                        </Tab>
                    </Tabs>
                </ThemeProvider>
            )}
        </Container>
    );
};

export default UserProfile;
