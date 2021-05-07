/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import moment from 'moment';
import React, { useCallback } from 'react';
import { StyledBodyCell } from '../../../components/Table/styles';

interface AppointmentsProviderRow {
    data: any;
    dataAberta: boolean;
}

const AppointmentsProviderRow: React.FC<AppointmentsProviderRow> = ({ data, dataAberta }) => {
    const dataAppointment = moment(data.dateAppointment);
    const dataAtual = moment(Date.now());
    if (dataAppointment >= dataAtual) {
        dataAberta = true;
    } else {
        dataAberta = false;
    }
    return (
        <React.Fragment key={data.id}>
            <StyledBodyCell>{data.service.title}</StyledBodyCell>
            <StyledBodyCell>{data.clerk.name}</StyledBodyCell>
            <StyledBodyCell>{dataAppointment.format('DD/MM/YYYY - HH:mm')}</StyledBodyCell>
            <StyledBodyCell>{data.service.value}</StyledBodyCell>
            {dataAberta ? <StyledBodyCell>Aberto</StyledBodyCell> : <StyledBodyCell>Concluído</StyledBodyCell>}
        </React.Fragment>
    );
};

export default AppointmentsProviderRow;
