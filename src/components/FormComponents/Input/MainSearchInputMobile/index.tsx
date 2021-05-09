import { useField } from '@unform/core';
import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {
    return (
        <Container>
            {Icon && <Icon size={20} />}

            <input autoComplete="no" {...rest} />
        </Container>
    );
};
export default Input;
