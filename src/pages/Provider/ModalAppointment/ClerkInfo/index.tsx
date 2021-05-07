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
            <div className="row">
                <span>
                    <RiMapPinUserLine size={25} />
                </span>
                <span>{clerk.name}</span>
            </div>
            <div className="row">
                <small>
                    <HiOutlinePhone size={25} />
                </small>
                <small>{clerk.phone}</small>
            </div>
        </div>
    </Container>
);

export default ClerkInfo;
