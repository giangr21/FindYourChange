import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: any;
    onClick: () => any;
}

const Input: React.FC<InputProps> = ({ icon: Icon, onClick, ...rest }) => {
    return (
        <Container>
            <input autoComplete="no" {...rest} />
            {Icon && <Icon size={20} onClick={onClick} />}
        </Container>
    );
};
export default Input;
