import React from 'react';

import { RiMapPinUserLine } from 'react-icons/ri';
import { HiOutlinePhone } from 'react-icons/hi';
import { Container } from './styles';

interface ClerkProps {
    clerk: any;
    isSelectedClerk: boolean;
}

const ClerkInfo: React.FC<ClerkProps> = ({ clerk, isSelectedClerk }): any => (
    <Container isSelectedClerk={isSelectedClerk}>
        <img src={`data:image/png;base64,${clerk.avatar}`} alt="" />
        <div className="name">
            <span>
                <RiMapPinUserLine /> {clerk.name}
            </span>
            <small>
                <HiOutlinePhone />
                {clerk.phone}
            </small>
        </div>
    </Container>
);

export default ClerkInfo;
