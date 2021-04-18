import React from 'react';
import { FiClock } from 'react-icons/fi';

import { Container } from './styles';

interface NextAppointmentProps {
    nextAppointmentInfo: any;
}

const NextAppointment: React.FC<NextAppointmentProps> = ({ nextAppointmentInfo }): any => (
    <Container>
        <strong>Agendamento a seguir</strong>
        <div>
            <img
                src={`data:image/png;base64,${nextAppointmentInfo.user.avatar}`}
                alt={nextAppointmentInfo.user.name}
            />
            <strong>
                {nextAppointmentInfo.user.name} {nextAppointmentInfo.user.lastName}
            </strong>
            <span>
                <FiClock />
                {nextAppointmentInfo.hourFormatted}
            </span>
        </div>
    </Container>
);

export default NextAppointment;
