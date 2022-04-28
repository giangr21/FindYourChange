/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { Container, Error } from './styles';

interface Props extends InputProps {
    name: string;
    icon?: any;
    cepIcon?: boolean;
    getCep?: () => void;
}
const InputMask: React.FC<Props> = ({ name, icon: Icon, cepIcon, getCep, ...rest }) => {
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
        <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon size={20} />}
            <ReactInputMask
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={inputRef}
                className="input-area"
                defaultValue={defaultValue}
                autoComplete="no"
                {...rest}
            />
            {error && (
                <Error title={error}>
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            )}
            {cepIcon && (
                <div style={{ marginRight: 0 }}>
                    <FaSearch
                        style={{ marginRight: 0, cursor: 'pointer' }}
                        onClick={getCep}
                        color="#2e656a"
                    />
                </div>
            )}
        </Container>
    );
};
export default InputMask;
