import React, { ButtonHTMLAttributes, useCallback } from 'react';

import { IconBaseProps } from 'react-icons/lib';
import { Button, Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
    icon?: React.ComponentType<IconBaseProps>;
    action: () => any;
    background: string;
    justIcon?: boolean;
    badge?: number;
    styleBadge?: {};
};

const IconButton: React.FC<ButtonProps> = ({
    title,
    icon: Icon,
    action,
    background,
    justIcon = false,
    badge = 0,
    styleBadge,
    ...rest
}) => {
    const onClickAction = useCallback(() => {
        action();
    }, [action]);

    return (
        <Container>
            {badge !== 0 && (
                <span style={styleBadge} className="badge">
                    {badge}
                </span>
            )}
            <Button onClick={onClickAction} justIcon={justIcon} background={background} {...rest}>
                {Icon && <Icon color="#fff" size={16} />}
                {title}
            </Button>
        </Container>
    );
};

export default IconButton;
