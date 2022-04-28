import React, { ButtonHTMLAttributes, useCallback } from 'react';
import { Button, Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
    icon?: any;
    action: () => any;
    background: string;
    justIcon?: boolean;
    badge?: number;
    styleBadge?: {};
    colorIcon?: any;
};

const IconButton: React.FC<ButtonProps> = ({
    title,
    icon: Icon,
    action,
    background,
    justIcon = false,
    badge = 0,
    styleBadge,
    colorIcon,
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
                {Icon && <Icon color={colorIcon || '#fff'} size={16} />}
                {title}
            </Button>
        </Container>
    );
};

export default IconButton;
