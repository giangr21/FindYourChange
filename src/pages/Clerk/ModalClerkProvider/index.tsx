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
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { Col, Row } from 'react-styled-flexboxgrid';
import TimePicker from 'rc-time-picker';
import { Form, Container, Header, Footer, Content } from './styles';
import Input from '../../../components/FormComponents/Input/InputModal';
import Modal from '../../../components/Modal';
import IconButton from '../../../components/FormComponents/Button/IconButton';
import api from '../../../services/api';
import getValidationErrors from '../../../util/getValidationErrors';
import InputMask from '../../../components/FormComponents/Input/InputModalMask';
import Loading from '../../../components/Loading';
import { useAuth } from '../../../hooks/authentication';
import { useMedia } from '../../../util/use-media';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    edit: boolean;
    reloadClerk: () => void;
    clerkId: string;
    scheduleHours: any;
    workOnSaturday: boolean;
}

interface ClerkData {
    id?: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    provider: string;
    openingHours: any;
}

const DAY_OF_WEEK = {
    SegundaInicio: 'SegIni',
    SegundaFim: 'SegFim',
    TercaInicio: 'TerIni',
    TercaFim: 'TerFim',
    QuartaInicio: 'QuaIni',
    QuartaFim: 'QuaFim',
    QuintaInicio: 'QuiIni',
    QuintaFim: 'QuiFim',
    SextaInicio: 'SexIni',
    SextaFim: 'SexFim',
    SabadoInicio: 'SabIni',
    SabadoFim: 'SabFim',
};

const FORMATTED_WEEK_DAY: any = {
    seg: {
        inicio: undefined,
        fim: undefined,
        dia: undefined,
    },
    ter: {
        inicio: undefined,
        fim: undefined,
        dia: undefined,
    },
    qua: {
        inicio: undefined,
        fim: undefined,
        dia: undefined,
    },
    qui: {
        inicio: undefined,
        fim: undefined,
        dia: undefined,
    },
    sex: {
        inicio: undefined,
        fim: undefined,
        dia: undefined,
    },
    sab: {
        inicio: undefined,
        fim: undefined,
        dia: undefined,
    },
};

const ModalClerkProvider: React.FC<ModalProps> = ({
    setIsOpen,
    reloadClerk,
    clerkId,
    isOpen,
    edit,
    scheduleHours,
    workOnSaturday,
}) => {
    const mobile = useMedia('(max-width: 760px)');
    const { user } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(true);
    const [clerkData, setClerkData] = useState<any>(null);
    const [statusImgLogo, setStatusImgLogo] = useState<any>(null);
    const [imgPhotoMin, setImgPhotoMin] = useState<any>(null);
    const [changeImg, setChangeImg] = useState(false);
    const [clerkAvatar, setClerkAvatar] = useState<string | null>(null);
    const [weekDays, setWeekDays] = useState<any>();
    const [limitWeekHours, setlimitWeekHours] = useState<any>();

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

    const initWeekDays = useCallback((scheduleProvider: any): void => {
        for (let i = 0; i < scheduleProvider.length; i++) {
            switch (scheduleProvider[i].dayOfWeek) {
                case 'Segunda-Feira':
                    FORMATTED_WEEK_DAY.seg.inicio = moment(scheduleProvider[i].hourStart, ['HH:mm']);
                    FORMATTED_WEEK_DAY.seg.fim = moment(scheduleProvider[i].hourEnd, ['HH:mm']);
                    FORMATTED_WEEK_DAY.seg.dia = scheduleProvider[i].dayOfWeek;
                    break;

                case 'Terça-Feira':
                    FORMATTED_WEEK_DAY.ter.inicio = moment(scheduleProvider[i].hourStart, ['HH:mm']);
                    FORMATTED_WEEK_DAY.ter.fim = moment(scheduleProvider[i].hourEnd, ['HH:mm']);
                    FORMATTED_WEEK_DAY.ter.dia = scheduleProvider[i].dayOfWeek;
                    break;

                case 'Quarta-Feira':
                    FORMATTED_WEEK_DAY.qua.inicio = moment(scheduleProvider[i].hourStart, ['HH:mm']);
                    FORMATTED_WEEK_DAY.qua.fim = moment(scheduleProvider[i].hourEnd, ['HH:mm']);
                    FORMATTED_WEEK_DAY.qua.dia = scheduleProvider[i].dayOfWeek;
                    break;

                case 'Quinta-Feira':
                    FORMATTED_WEEK_DAY.qui.inicio = moment(scheduleProvider[i].hourStart, ['HH:mm']);
                    FORMATTED_WEEK_DAY.qui.fim = moment(scheduleProvider[i].hourEnd, ['HH:mm']);
                    FORMATTED_WEEK_DAY.qui.dia = scheduleProvider[i].dayOfWeek;
                    break;

                case 'Sexta-Feira':
                    FORMATTED_WEEK_DAY.sex.inicio = moment(scheduleProvider[i].hourStart, ['HH:mm']);
                    FORMATTED_WEEK_DAY.sex.fim = moment(scheduleProvider[i].hourEnd, ['HH:mm']);
                    FORMATTED_WEEK_DAY.sex.dia = scheduleProvider[i].dayOfWeek;
                    break;

                case 'Sabado':
                    FORMATTED_WEEK_DAY.sab.inicio = moment(scheduleProvider[i].hourStart, ['HH:mm']);
                    FORMATTED_WEEK_DAY.sab.fim = moment(scheduleProvider[i].hourEnd, ['HH:mm']);
                    FORMATTED_WEEK_DAY.sab.dia = scheduleProvider[i].dayOfWeek;
                    break;

                default:
                    toast.error('Falha ao inicializar os horários!');
                    break;
            }
        }
    }, []);

    const getClerkSchedule = useCallback(async (): Promise<void> => {
        await api
            .get(`/clerkSchedule/${clerkId}`)
            .then((response) => {
                initWeekDays(response.data);
                setWeekDays(FORMATTED_WEEK_DAY);
            })
            .catch(() => {
                toast.error('Houve um erro ao buscar os horários do atendente!');
            });
    }, [clerkId, initWeekDays]);

    const updateLimitSaturday = useCallback((): any => {
        limitWeekHours.sab.inicio = FORMATTED_WEEK_DAY.sab.inicio;
        limitWeekHours.sab.fim = FORMATTED_WEEK_DAY.sab.fim;
    }, [limitWeekHours]);

    useEffect(() => {
        initWeekDays(scheduleHours);
        const formattedLimit = _.cloneDeep(FORMATTED_WEEK_DAY);
        setlimitWeekHours(formattedLimit);

        if (!edit) {
            setWeekDays(FORMATTED_WEEK_DAY);
            setLoading(false);
            setTimeout(() => {
                const nameInput = formRef.current?.getFieldRef('name');
                if (nameInput) {
                    nameInput.focus();
                }
            }, 500);
        } else {
            getClerkSchedule();
            getClerk();
        }
    }, [edit, getClerk, getClerkSchedule, initWeekDays, scheduleHours, setlimitWeekHours]);

    const handleWeekData = useCallback(
        (data, dayOfWeek) => {
            let seg;
            let ter;
            let qua;
            let qui;
            let sex;
            let sab;

            switch (dayOfWeek) {
                /* eslint-disable no-case-declarations */
                case DAY_OF_WEEK.SegundaInicio:
                    seg = { ...weekDays.seg };
                    seg.inicio = data;
                    setWeekDays({
                        ...weekDays,
                        seg,
                    });
                    break;

                case DAY_OF_WEEK.SegundaFim:
                    seg = { ...weekDays.seg };
                    seg.fim = data;
                    setWeekDays({
                        ...weekDays,
                        seg,
                    });
                    break;

                case DAY_OF_WEEK.TercaInicio:
                    ter = { ...weekDays.ter };
                    ter.inicio = data;
                    setWeekDays({
                        ...weekDays,
                        ter,
                    });
                    break;

                case DAY_OF_WEEK.TercaFim:
                    ter = { ...weekDays.ter };
                    ter.fim = data;
                    setWeekDays({
                        ...weekDays,
                        ter,
                    });
                    break;

                case DAY_OF_WEEK.QuartaInicio:
                    qua = { ...weekDays.qua };
                    qua.inicio = data;
                    setWeekDays({
                        ...weekDays,
                        qua,
                    });
                    break;

                case DAY_OF_WEEK.QuartaFim:
                    qua = { ...weekDays.qua };
                    qua.fim = data;
                    setWeekDays({
                        ...weekDays,
                        qua,
                    });
                    break;

                case DAY_OF_WEEK.QuintaInicio:
                    qui = { ...weekDays.qui };
                    qui.inicio = data;
                    setWeekDays({
                        ...weekDays,
                        qui,
                    });
                    break;

                case DAY_OF_WEEK.QuintaFim:
                    qui = { ...weekDays.qui };
                    qui.fim = data;
                    setWeekDays({
                        ...weekDays,
                        qui,
                    });
                    break;
                case DAY_OF_WEEK.SextaInicio:
                    sex = { ...weekDays.sex };
                    sex.inicio = data;
                    setWeekDays({
                        ...weekDays,
                        sex,
                    });
                    break;

                case DAY_OF_WEEK.SextaFim:
                    sex = { ...weekDays.sex };
                    sex.fim = data;
                    setWeekDays({
                        ...weekDays,
                        sex,
                    });
                    break;

                case DAY_OF_WEEK.SabadoInicio:
                    sab = { ...weekDays.sab };
                    sab.inicio = data;
                    setWeekDays({
                        ...weekDays,
                        sab,
                    });
                    break;

                case DAY_OF_WEEK.SabadoFim:
                    sab = { ...weekDays.sab };
                    sab.fim = data;
                    setWeekDays({
                        ...weekDays,
                        sab,
                    });
                    break;

                default:
                    break;
            }
            /* eslint-disable no-case-declarations */
        },
        [weekDays],
    );

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

    const validateHours = useCallback(() => {
        let hasError = false;
        if (
            weekDays.seg.inicio < limitWeekHours.seg.inicio ||
            weekDays.seg.fim > limitWeekHours.seg.fim ||
            weekDays.seg.inicio > weekDays.seg.fim
        ) {
            toast.error('Os horários da Segunda-feira devem estar dentro dos horários limites do estabelecimento');
            hasError = true;
        }
        if (
            weekDays.ter.inicio < limitWeekHours.ter.inicio ||
            weekDays.ter.fim > limitWeekHours.ter.fim ||
            weekDays.ter.inicio > weekDays.ter.fim
        ) {
            toast.error('Os horários da Terça-feira devem estar dentro dos horários limites do estabelecimento!');
            hasError = true;
        }
        if (
            weekDays.qua.inicio < limitWeekHours.qua.inicio ||
            weekDays.qua.fim > limitWeekHours.qua.fim ||
            weekDays.qua.inicio > weekDays.qua.fim
        ) {
            toast.error('Os horários da Quarta-feira devem estar dentro dos horários limites do estabelecimento!');
            hasError = true;
        }
        if (
            weekDays.qui.inicio < limitWeekHours.qui.inicio ||
            weekDays.qui.fim > limitWeekHours.qui.fim ||
            weekDays.qui.inicio > weekDays.qui.fim
        ) {
            toast.error('Os horários da Quinta-feira devem estar dentro dos horários limites do estabelecimento!');
            hasError = true;
        }
        if (
            weekDays.sex.inicio < limitWeekHours.sex.inicio ||
            weekDays.sex.fim > limitWeekHours.sex.fim ||
            weekDays.sex.inicio > weekDays.sex.fim
        ) {
            toast.error('Os horários da Sexta-feira devem estar dentro dos horários limites do estabelecimento!');
            hasError = true;
        }
        if (workOnSaturday) {
            updateLimitSaturday();
            if (
                weekDays.sab.inicio < limitWeekHours.sab.inicio ||
                weekDays.sab.fim > limitWeekHours.sab.fim ||
                weekDays.sab.inicio > weekDays.sab.fim
            ) {
                toast.error('Os horários do Sábado devem estar dentro dos horários limites do estabelecimento!');
                hasError = true;
            }
        }
        return hasError;
    }, [workOnSaturday, limitWeekHours, weekDays, updateLimitSaturday]);

    const mountScheduleToSave = useCallback(() => {
        const scheduleArr: any = [];
        let key: any;
        let value: any;
        // eslint-disable-next-line no-restricted-syntax
        for ([key, value] of Object.entries(weekDays)) {
            let scheduleObj: any;
            const { dia, inicio, fim } = value;
            switch (dia) {
                case 'Segunda-Feira':
                    scheduleObj = {
                        dayOfWeek: dia,
                        hourStart: moment(inicio).format('HH:mm'),
                        hourEnd: moment(fim).format('HH:mm'),
                    };
                    scheduleArr.push(scheduleObj);
                    break;

                case 'Terça-Feira':
                    scheduleObj = {
                        dayOfWeek: dia,
                        hourStart: moment(inicio).format('HH:mm'),
                        hourEnd: moment(fim).format('HH:mm'),
                    };
                    scheduleArr.push(scheduleObj);
                    break;

                case 'Quarta-Feira':
                    scheduleObj = {
                        dayOfWeek: dia,
                        hourStart: moment(inicio).format('HH:mm'),
                        hourEnd: moment(fim).format('HH:mm'),
                    };
                    scheduleArr.push(scheduleObj);
                    break;

                case 'Quinta-Feira':
                    scheduleObj = {
                        dayOfWeek: dia,
                        hourStart: moment(inicio).format('HH:mm'),
                        hourEnd: moment(fim).format('HH:mm'),
                    };
                    scheduleArr.push(scheduleObj);
                    break;

                case 'Sexta-Feira':
                    scheduleObj = {
                        dayOfWeek: dia,
                        hourStart: moment(inicio).format('HH:mm'),
                        hourEnd: moment(fim).format('HH:mm'),
                    };
                    scheduleArr.push(scheduleObj);
                    break;

                case 'Sabado':
                    scheduleObj = {
                        dayOfWeek: dia,
                        hourStart: moment(inicio).format('HH:mm'),
                        hourEnd: moment(fim).format('HH:mm'),
                    };
                    scheduleArr.push(scheduleObj);
                    break;

                default:
                    break;
            }
        }
        return scheduleArr;
    }, [weekDays]);

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

                data.provider = user.id;
                if (validateHours()) {
                    throw new Error('Horários inválidos!');
                }
                if (edit) {
                    data.id = clerkId;
                    await api.put('clerk', data);
                    const clerkSchedule = mountScheduleToSave();
                    clerkSchedule.unshift(clerkId);
                    await api.put('clerkSchedule', clerkSchedule);
                } else {
                    await api.post('clerk', data).then(async (response) => {
                        const clerkSchedule = mountScheduleToSave();
                        clerkSchedule.unshift(response.data);
                        await api.post('clerkSchedule', clerkSchedule);
                    });
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
        [clerkId, clerkAvatar, user.id, validateHours, edit, setIsOpen, reloadClerk, mountScheduleToSave],
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
        <Modal width={mobile ? '100%' : '420px'} height="460px" isOpen={isOpen} setIsOpen={setIsOpen}>
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
                            <Row>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <p>Segunda (Início)</p>
                                    <div
                                        style={{
                                            padding: '2px',
                                            width: '100%',
                                        }}
                                    >
                                        <TimePicker
                                            showSecond={false}
                                            onChange={(e) => handleWeekData(e, DAY_OF_WEEK.SegundaInicio)}
                                            className="timePicker"
                                            inputReadOnly
                                            value={weekDays?.seg.inicio}
                                            allowEmpty={false}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <p>Segunda (Fim)</p>
                                    <div
                                        style={{
                                            padding: '2px',
                                            width: '100%',
                                        }}
                                    >
                                        <TimePicker
                                            showSecond={false}
                                            onChange={(e) => handleWeekData(e, DAY_OF_WEEK.SegundaFim)}
                                            className="timePicker"
                                            inputReadOnly
                                            value={weekDays?.seg.fim}
                                            allowEmpty={false}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <p>Terça (Início)</p>
                                    <div
                                        style={{
                                            padding: '2px',
                                            width: '100%',
                                        }}
                                    >
                                        <TimePicker
                                            showSecond={false}
                                            onChange={(e) => handleWeekData(e, DAY_OF_WEEK.TercaInicio)}
                                            className="timePicker"
                                            inputReadOnly
                                            value={weekDays?.ter.inicio}
                                            allowEmpty={false}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <p>Terça (Fim)</p>
                                    <div
                                        style={{
                                            padding: '2px',
                                            width: '100%',
                                        }}
                                    >
                                        <TimePicker
                                            showSecond={false}
                                            onChange={(e) => handleWeekData(e, DAY_OF_WEEK.TercaFim)}
                                            className="timePicker"
                                            inputReadOnly
                                            value={weekDays?.ter.fim}
                                            allowEmpty={false}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <p>Quarta (Início)</p>
                                    <div
                                        style={{
                                            padding: '2px',
                                            width: '100%',
                                        }}
                                    >
                                        <TimePicker
                                            showSecond={false}
                                            onChange={(e) => handleWeekData(e, DAY_OF_WEEK.QuartaInicio)}
                                            className="timePicker"
                                            inputReadOnly
                                            value={weekDays?.qua.inicio}
                                            allowEmpty={false}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <p>Quarta (Fim)</p>
                                    <div
                                        style={{
                                            padding: '2px',
                                            width: '100%',
                                        }}
                                    >
                                        <TimePicker
                                            showSecond={false}
                                            onChange={(e) => handleWeekData(e, DAY_OF_WEEK.QuartaFim)}
                                            className="timePicker"
                                            inputReadOnly
                                            value={weekDays?.qua.fim}
                                            allowEmpty={false}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <p>Quinta (Início)</p>
                                    <div
                                        style={{
                                            padding: '2px',
                                            width: '100%',
                                        }}
                                    >
                                        <TimePicker
                                            showSecond={false}
                                            onChange={(e) => handleWeekData(e, DAY_OF_WEEK.QuintaInicio)}
                                            className="timePicker"
                                            inputReadOnly
                                            value={weekDays?.qui.inicio}
                                            allowEmpty={false}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <p>Quinta (Fim)</p>
                                    <div
                                        style={{
                                            padding: '2px',
                                            width: '100%',
                                        }}
                                    >
                                        <TimePicker
                                            showSecond={false}
                                            onChange={(e) => handleWeekData(e, DAY_OF_WEEK.QuintaFim)}
                                            className="timePicker"
                                            inputReadOnly
                                            value={weekDays?.qui.fim}
                                            allowEmpty={false}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <p>Sexta (Início)</p>
                                    <div
                                        style={{
                                            padding: '2px',
                                            width: '100%',
                                        }}
                                    >
                                        <TimePicker
                                            showSecond={false}
                                            onChange={(e) => handleWeekData(e, DAY_OF_WEEK.SextaInicio)}
                                            className="timePicker"
                                            inputReadOnly
                                            value={weekDays?.sex.inicio}
                                            allowEmpty={false}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <p>Sexta (Fim)</p>
                                    <div
                                        style={{
                                            padding: '2px',
                                            width: '100%',
                                        }}
                                    >
                                        <TimePicker
                                            showSecond={false}
                                            onChange={(e) => handleWeekData(e, DAY_OF_WEEK.SextaFim)}
                                            className="timePicker"
                                            inputReadOnly
                                            value={weekDays?.sex.fim}
                                            allowEmpty={false}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            {workOnSaturday && (
                                <Row>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <p>Sábado (Início)</p>
                                        <div
                                            style={{
                                                padding: '2px',
                                                width: '100%',
                                            }}
                                        >
                                            <TimePicker
                                                showSecond={false}
                                                onChange={(e) => handleWeekData(e, DAY_OF_WEEK.SabadoInicio)}
                                                className="timePicker"
                                                inputReadOnly
                                                value={weekDays?.sab.inicio}
                                                allowEmpty={false}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <p>Sábado (Fim)</p>
                                        <div
                                            style={{
                                                padding: '2px',
                                                width: '100%',
                                            }}
                                        >
                                            <TimePicker
                                                showSecond={false}
                                                onChange={(e) => handleWeekData(e, DAY_OF_WEEK.SabadoFim)}
                                                className="timePicker"
                                                inputReadOnly
                                                value={weekDays?.sab.fim}
                                                allowEmpty={false}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            )}
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
