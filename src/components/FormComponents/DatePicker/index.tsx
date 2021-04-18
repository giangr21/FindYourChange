/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import { useField } from '@unform/core';
import 'react-datepicker/dist/react-datepicker.css';
import { Container } from '../Input/InputModal/styles';
import '../Input/InputModal/style.css';
import './style.css';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
    name: string;
}
const DatePicker: React.FC<Props> = ({ name, ...rest }) => {
    const datepickerRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);
    const [date, setDate] = useState(defaultValue || null);

    const months = [
        'Janeiro',
        'Fevereiro',
        'Marco',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];
    const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

    registerLocale('pt', {
        localize: {
            month: (n: any) => months[n],
            day: (n: any) => days[n],
        },
        formatLong: {},
    });

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: datepickerRef.current,
            path: 'props.selected',
            clearValue: (ref: any) => {
                ref.clear();
            },
        });
    }, [fieldName, registerField]);

    // const CustomInput = ({ value, onClick }: any) => (
    //     <Container className="input-group" isErrored={!!error}>
    //         <input onClick={onClick} className="input-area" defaultValue={value} />
    //     </Container>
    // );

    return (
        <ReactDatePicker
            dateFormat="dd/MM/yyyy"
            locale="pt"
            showMonthDropdown
            useShortMonthInDropdown
            showTimeInput
            ref={datepickerRef}
            selected={date}
            onChange={setDate}
            className="input-area"
            // customInput={<CustomInput />}
            placeholderText="Qualquer Data"
            {...rest}
        />
    );
};
export default DatePicker;
