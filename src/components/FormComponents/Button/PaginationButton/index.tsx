import React, { ButtonHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons/lib';
import { Button } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: any;
    action?: () => void;
};

const PaginationButton: React.FC<ButtonProps> = ({ icon: Icon, action, ...rest }) => {
    return (
        <Button onClick={action} background="#777777" {...rest}>
            <Icon color="#fff" size={16} />
        </Button>
    );
};

export default PaginationButton;
