/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import moment from 'moment';
import React, { useCallback } from 'react';
import { StyledBodyCell } from '../../../components/Table/styles';

interface AppointmentsProviderRow {
    data: any;
}

const AppointmentsProviderRow: React.FC<AppointmentsProviderRow> = ({ data }) => {
    return (
        <React.Fragment key={data.id}>
            <StyledBodyCell>{data.service.title}</StyledBodyCell>
            <StyledBodyCell>{data.clerk.name}</StyledBodyCell>
            <StyledBodyCell>{data.dateAppointment}</StyledBodyCell>
            <StyledBodyCell>{data.service.value}</StyledBodyCell>
            {data.dateAppointment >= moment(Date.now()) ? (
                <StyledBodyCell>Aberto</StyledBodyCell>
            ) : (
                <StyledBodyCell>Concluído</StyledBodyCell>
            )}
        </React.Fragment>
    );
};

export default AppointmentsProviderRow;
