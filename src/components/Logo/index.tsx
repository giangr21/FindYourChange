import React, { useCallback } from 'react';
// import Router from 'next/router';
import { LogoBox, LogoImage } from './styles';

type LogoProps = {
    imageUrl: string;
    alt: string;
    onClick?: () => void;
};

const Logo: React.FC<LogoProps> = ({ imageUrl, alt, onClick }) => {
    const onLogoClick = useCallback(() => {
        // Router.push('/');
        if (onClick) {
            onClick();
        }
    }, []);

    return (
        <LogoBox onClick={onLogoClick}>
            <LogoImage src={imageUrl} alt={alt} />
        </LogoBox>
    );
};

export default Logo;
