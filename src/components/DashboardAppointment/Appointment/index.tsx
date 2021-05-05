import React from 'react';
import { FiClock } from 'react-icons/fi';

import { Container } from './styles';

interface AppointmentProps {
    appointmentInfo: any;
}

const Appointment: React.FC<AppointmentProps> = ({ appointmentInfo }): any => (
    <Container key={appointmentInfo.id}>
        <span>
            <FiClock />
            {appointmentInfo.hourFormatted}
        </span>

        <div>
            <img src={`data:image/png;base64,${appointmentInfo.user.avatar}`} alt={appointmentInfo.user.name} />
            <aside
                style={{
                    flexDirection: 'column',
                    marginLeft: '10px',
                }}
            >
                <section>
                    <h4 style={{ color: '#ff9000', marginRight: '7px' }}>Nome:</h4>
                    <h4>
                        {appointmentInfo.user.name} {appointmentInfo.user.lastName}
                    </h4>
                </section>
                <section>
                    <h4 style={{ color: '#ff9000', marginRight: '7px' }}>Tipo Serviço:</h4>
                    <h4>{appointmentInfo.serviceType}</h4>
                </section>
                {appointmentInfo.notes && appointmentInfo.notes !== '' && (
                    <section>
                        <h4 style={{ color: '#ff9000', marginRight: '7px' }}>Comentários:</h4>
                        <h4>{appointmentInfo.notes}</h4>
                    </section>
                )}
            </aside>
        </div>
    </Container>
);

export default Appointment;
