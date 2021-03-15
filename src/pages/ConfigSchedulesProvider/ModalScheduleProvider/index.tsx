import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';
import { FaWindowClose } from 'react-icons/fa';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Form, Container, Header, Footer, Content } from './styles';
import Modal from '../../../components/Modal';
import IconButton from '../../../components/Button/IconButton';
import Radio from '../../../components/Radio';
import api from '../../../services/api';
import getValidationErrors from '../../../util/getValidationErrors';
import Select from '../../../components/Select';
import { useAuth } from '../../../hooks/Auth';
import Loading from '../../../components/Loading';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    reloadSchedule: () => void;
    edit: boolean;
    scheduleId: string;
}

const ModalServicesProvider: React.FC<ModalProps> = ({ setIsOpen, reloadSchedule, isOpen, edit, scheduleId }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [initialScheduleData, setInitialScheduleData] = useState<any>(null);
    const formRef = useRef<FormHandles>(null);
    const [hourStart, setHourStart] = useState<any>(undefined);
    const [hourEnd, setHourEnd] = useState<any>(undefined);
    const [hourLunchStart, setHourStartLunch] = useState<any>(undefined);
    const [hourLunchEnd, setHourEndLunch] = useState<any>(undefined);

    const getSchedule = useCallback(async (): Promise<void> => {
        await api
            .get(`/schedule/${scheduleId}`)
            .then((response) => {
                if (response.data.dayOfWeek) {
                    response.data.dayOfWeek = { value: response.data.dayOfWeek, label: response.data.dayOfWeek };
                }

                setTimeout(() => {
                    formRef.current?.setFieldValue('active', response.data.active ? 'true' : 'false');
                    setHourStart(moment(response.data.hourStart, ['HH:mm']));
                    setHourStartLunch(moment(response.data.hourLunchStart, ['HH:mm']));
                    setHourEnd(moment(response.data.hourEnd, ['HH:mm']));
                    setHourEndLunch(moment(response.data.hourLunchEnd, ['HH:mm']));
                }, 300);
                setInitialScheduleData(response.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error('Houve um erro ao buscar dados!');
            });
    }, [scheduleId]);

    useEffect(() => {
        if (!edit) {
            setLoading(false);
        } else {
            getSchedule();
        }
    }, []);

    const onChangeHourStart = useCallback((value: any, isLunch: boolean) => {
        if (isLunch) {
            setHourStartLunch(moment(value, ['HH:mm']));
        } else {
            setHourStart(moment(value, ['HH:mm']));
        }
    }, []);

    const onChangeHourEnd = useCallback((value: any, isLunch: boolean) => {
        if (isLunch) {
            setHourEndLunch(moment(value, ['HH:mm']));
        } else {
            setHourEnd(moment(value, ['HH:mm']));
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            formRef.current?.setFieldValue('active', 'true');
        }, 500);
    }, []);

    const submitSchedule = useCallback(
        async (scheduleData: any) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    dayOfWeek: Yup.string().required('Nome obrigatório').max(60, 'Digite um nome válido'),
                });

                await schema.validate(scheduleData, {
                    abortEarly: false,
                });

                // Necessario escolher horarios
                if (hourStart) {
                    scheduleData.hourStart = moment(hourStart).format('HH:mm');
                } else {
                    return toast.error(`Necessario escolher uma hora inicial `);
                }

                // Necessario escolher horarios
                if (hourLunchStart) {
                    scheduleData.hourLunchStart = moment(hourLunchStart).format('HH:mm');
                } else {
                    return toast.error(`Necessario escolher uma hora inicial de almoco `);
                }

                // Necessario escolher horarios
                if (hourEnd) {
                    scheduleData.hourEnd = moment(hourEnd).format('HH:mm');
                } else {
                    return toast.error(`Necessario escolher uma hora final `);
                }

                // Necessario escolher horarios
                if (hourLunchEnd) {
                    scheduleData.hourLunchEnd = moment(hourLunchEnd).format('HH:mm');
                } else {
                    return toast.error(`Necessario escolher uma hora final de almoco `);
                }

                console.log(scheduleData.hourStart);
                console.log(scheduleData.hourLunchStart);

                if (
                    moment(hourStart).format('YYYY-MM-DD HH:mm:ss ZZ') >
                    moment(hourLunchStart).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Inicio Invalido!`);
                }

                if (
                    moment(hourStart).format('YYYY-MM-DD HH:mm:ss ZZ') >
                    moment(hourLunchEnd).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Inicio Invalido!`);
                }

                if (
                    moment(hourStart).format('YYYY-MM-DD HH:mm:ss ZZ') >
                    moment(hourEnd).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Inicio Invalido!`);
                }

                //

                if (
                    moment(hourLunchStart).format('YYYY-MM-DD HH:mm:ss ZZ') >
                    moment(hourLunchEnd).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Inicio Almoco Invalida!`);
                }

                if (
                    moment(hourLunchStart).format('YYYY-MM-DD HH:mm:ss ZZ') >
                    moment(hourEnd).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Inicio Almoco Invalida!`);
                }

                if (
                    moment(hourLunchStart).format('YYYY-MM-DD HH:mm:ss ZZ') <
                    moment(hourStart).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Inicio Almoco Invalida!`);
                }

                //

                if (
                    moment(hourLunchEnd).format('YYYY-MM-DD HH:mm:ss ZZ') >
                    moment(hourEnd).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Fim Almoco Invalida!`);
                }

                if (
                    moment(hourLunchEnd).format('YYYY-MM-DD HH:mm:ss ZZ') <
                    moment(hourLunchStart).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Fim Almoco Invalida!`);
                }

                if (
                    moment(hourLunchEnd).format('YYYY-MM-DD HH:mm:ss ZZ') <
                    moment(hourStart).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Fim Almoco Invalida!`);
                }

                //

                if (
                    moment(hourEnd).format('YYYY-MM-DD HH:mm:ss ZZ') <
                    moment(hourStart).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Fim Invalida!`);
                }

                if (
                    moment(hourEnd).format('YYYY-MM-DD HH:mm:ss ZZ') <
                    moment(hourLunchStart).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Fim Invalida!`);
                }

                if (
                    moment(hourEnd).format('YYYY-MM-DD HH:mm:ss ZZ') <
                    moment(hourLunchEnd).format('YYYY-MM-DD HH:mm:ss ZZ')
                ) {
                    return toast.error(`Horario Fim Invalida!`);
                }

                scheduleData.provider = user.id;

                if (edit) {
                    scheduleData.id = scheduleId;
                    await api.put('schedule', scheduleData);
                } else {
                    const isAvailable = await api.post('schedule/isDayOfWeekAvailable', {
                        dayOfWeek: scheduleData.dayOfWeek,
                        providerId: user.id,
                        isEdit: !!edit,
                    });

                    if (!isAvailable.data) {
                        return toast.error(`Já existe um horario cadastrado nesse dia`);
                    }

                    await api.post('schedule', scheduleData);
                }

                toast.success(`Turno ${edit ? 'editado' : 'inserido'} com sucesso!`);
                setIsOpen();
                reloadSchedule();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }

                if (err.response && err.response.data && err.response.data.message) {
                    return toast.error(err.response.data.message.message, {
                        autoClose: 5000,
                    });
                }

                toast.error(`Houve uma falha ao ${edit ? 'editar' : 'inserir'} os dados`);
            }
        },
        [hourStart, hourLunchStart, hourEnd, hourLunchEnd, edit, setIsOpen, reloadSchedule, scheduleId, user.id],
    );

    return (
        <Modal width="420px" height="620px" isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} initialData={initialScheduleData} onSubmit={submitSchedule}>
                <Header>
                    {edit ? <h1>Editar Turno</h1> : <h1>Novo Turno</h1>}
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
                                    }}
                                >
                                    <Select
                                        name="dayOfWeek"
                                        fieldValue="value"
                                        fieldLabel="label"
                                        label="Dia Da Semana"
                                        placeholder=""
                                        className="react-select-container"
                                        options={[
                                            { value: 'Segunda-Feira', label: 'Segunda-Feira' },
                                            { value: 'Terça-Feira', label: 'Terça-Feira' },
                                            { value: 'Quarta-Feira', label: 'Quarta-Feira' },
                                            { value: 'Quinta-Feira', label: 'Quinta-Feira' },
                                            { value: 'Sexta-Feira', label: 'Sexta-Feira' },
                                            { value: 'Sabado', label: 'Sabado' },
                                            { value: 'Domingo', label: 'Domingo' },
                                        ]}
                                    />
                                </div>
                            </Container>
                            <p>Horario Inicio</p>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        width: '100%',
                                    }}
                                >
                                    <TimePicker
                                        showSecond={false}
                                        onChange={(e) => onChangeHourStart(e, false)}
                                        className="timePicker"
                                        inputReadOnly
                                        value={hourStart}
                                    />
                                </div>
                            </Container>
                            <p>Horario Inicio Almoço</p>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        width: '100%',
                                    }}
                                >
                                    <TimePicker
                                        showSecond={false}
                                        onChange={(e) => onChangeHourStart(e, true)}
                                        className="timePicker"
                                        inputReadOnly
                                        value={hourLunchStart}
                                    />
                                </div>
                            </Container>
                            <p>Horario Fim</p>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        width: '100%',
                                    }}
                                >
                                    <TimePicker
                                        showSecond={false}
                                        onChange={(e) => onChangeHourEnd(e, false)}
                                        className="timePicker"
                                        inputReadOnly
                                        value={hourEnd}
                                    />
                                </div>
                            </Container>
                            <p>Horario Fim Almoço</p>
                            <Container>
                                <div
                                    style={{
                                        padding: '2px',
                                        width: '100%',
                                    }}
                                >
                                    <TimePicker
                                        showSecond={false}
                                        onChange={(e) => onChangeHourEnd(e, true)}
                                        className="timePicker"
                                        inputReadOnly
                                        value={hourLunchEnd}
                                    />
                                </div>
                            </Container>
                            <p>Ativo</p>
                            <Container>
                                <Radio
                                    name="active"
                                    options={[
                                        { id: 'true', label: 'Ativado' },
                                        { id: 'false', label: 'Desativado' },
                                    ]}
                                />
                            </Container>
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
                            title={edit ? 'Editar Turno' : 'Adicionar Turno'}
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
