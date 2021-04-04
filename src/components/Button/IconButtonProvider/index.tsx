import React, { ButtonHTMLAttributes, useCallback } from 'react';

import { IconBaseProps } from 'react-icons/lib';
import { Button, Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
    icon?: React.ComponentType<IconBaseProps>;
    action: () => any;
    background: string;
};

const IconButtonProvider: React.FC<ButtonProps> = ({ title, icon: Icon, action, background, ...rest }) => {
    const onClickAction = useCallback(() => {
        action();
    }, [action]);

    return (
        <Container>
            <Button onClick={onClickAction} background={background} {...rest}>
                {Icon && <Icon color="#fff" size={16} />}
                {title}
            </Button>
        </Container>
    );
};

export default IconButtonProvider;
