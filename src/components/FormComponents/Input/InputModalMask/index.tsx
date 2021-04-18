/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';
import '../InputModal/style.css';

interface Props extends InputProps {
    name: string;
    placeholder: string;
}

const InputMask: React.FC<Props> = ({ name, placeholder, ...rest }) => {
    const inputRef = useRef<any>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            setValue(ref: any, value: string) {
                ref.setInputValue(value);
            },
            clearValue(ref: any) {
                ref.setInputValue('');
            },
        });
    }, [fieldName, registerField]);

    return (
        <Container className="input-group" isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
            <ReactInputMask
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={inputRef}
                className="input-area"
                defaultValue={defaultValue}
                autoComplete="no"
                {...rest}
            />
            <label className="label">{placeholder}</label>

            {error && (
                <Error title={error}>
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            )}
        </Container>
    );
};
export default InputMask;
