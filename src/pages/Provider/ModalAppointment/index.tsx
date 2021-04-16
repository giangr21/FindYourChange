import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { useHistory } from 'react-router-dom';
import { FaWindowClose } from 'react-icons/fa';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { Form, Container, Content, Calendar, Header, Footer } from './styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErrors from '../../../util/getValidationErrors';
import 'react-day-picker/lib/style.css';

import { useAuth } from '../../../hooks/Auth';
import { useMedia } from '../../../util/use-media';
import Modal from '../../../components/Modal';
// import ptBR from 'date-fns/locale/pt-BR';

interface MonthAvailability {
    day: number;
    available: boolean;
}
interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    handleConfirm: () => void;
}

interface AppointmentData {
    id?: string;
    provider: string;
    user: string;
    value: number;
    serviceType: string;
}

const ModalAppointment: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
    const mobile = useMedia('(max-width: 760px)');
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([]);
    const [modalStatus, setModalStatus] = useState(isOpen);
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const [hour, setHour] = useState<any>(undefined);

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available && !modifiers.disabled) {
            setSelectedDate(day);
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    useEffect(() => {
        setModalStatus(isOpen);
    }, [isOpen]);

    const onChangeHour = useCallback((value: any) => {
        setHour(moment(value, ['HH:mm']));
    }, []);

    const disabledDays = useMemo(() => {
        const dates = monthAvailability
            .filter((monthDay) => monthDay.available === false)
            .map((monthDay) => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();
                return new Date(year, month, monthDay.day);
            });
        return dates;
    }, [currentMonth, monthAvailability]);

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMM", {
            // locale: ptBR,
        });
    }, [selectedDate]);

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', {
            // locale: ptBR,
        });
    }, [selectedDate]);

    const handleSubmit = useCallback(
        async (data: AppointmentData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    // email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                    // password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                data.user = user.id;
                // data.provider = provider.id;

                return setModalStatus(false);
            } catch (err) {
                console.log(err);
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                toast.error('Ocorreu um erro na tentativa de agendamento, cheque as informações novamente.');
            }
        },
        [history],
    );
    return (
        <Modal width={mobile ? '100%' : '430px'} height="600px" isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Header>
                    <h1>Agendar Horário</h1>
                    <FaWindowClose size={20} onClick={setIsOpen} />
                </Header>
                <Content>
                    <p>Escolha a data</p>
                    <Container>
                        <div
                            style={{
                                padding: '2px',
                                width: '100%',
                            }}
                        >
                            <Calendar>
                                <DayPicker
                                    weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                                    months={[
                                        'Janeiro',
                                        'Feveiro',
                                        'Março',
                                        'Abril',
                                        'Maio',
                                        'Junho',
                                        'Julho',
                                        'Agosto',
                                        'Setembro',
                                        'Outubro',
                                        'Novembro',
                                        'Dezembro',
                                    ]}
                                    onDayClick={handleDateChange}
                                    onMonthChange={handleMonthChange}
                                    fromMonth={new Date()}
                                    selectedDays={selectedDate}
                                    disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                                    modifiers={{
                                        available: { daysOfWeek: [1, 2, 3, 4, 5] },
                                    }}
                                />
                            </Calendar>
                        </div>
                    </Container>
                    <p>Escolha o horário</p>
                    <Container>
                        <div
                            style={{
                                padding: '2px',
                                width: '100%',
                            }}
                        />
                        <TimePicker
                            showSecond={false}
                            onChange={(e) => onChangeHour(e)}
                            className="timePicker"
                            inputReadOnly
                            value={hour}
                        />
                    </Container>
                    <p>Escolha o atendente</p>
                    <Container>
                        <div
                            style={{
                                padding: '2px',
                                width: '100%',
                            }}
                        />
                    </Container>
                    <p>Comentário adicional</p>
                    <Container>
                        <div
                            style={{
                                padding: '2px',
                                width: '100%',
                            }}
                        >
                            <Input name="notes" placeholder="Comentário" />
                        </div>
                    </Container>
                    <p>Confirme os dados do serviço</p>
                    <Container>
                        <div
                            style={{
                                padding: '2px',
                                width: '100%',
                            }}
                        >
                            <p>Serviço: ...</p>
                            <p>Valor: ...</p>
                        </div>
                    </Container>
                    <Button type="submit">Agendar</Button>
                </Content>
            </Form>
        </Modal>
    );
};

export default ModalAppointment;
