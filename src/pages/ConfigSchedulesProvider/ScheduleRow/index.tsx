/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { BsCheckAll, BsX } from 'react-icons/bs';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { StyledBodyCell, MoreContainer } from '../../../components/Table/styles';

interface ProviderRow {
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
    handleView: (id: string) => void;
    data: any;
}

const ProviderRow: React.FC<ProviderRow> = ({ data, handleDelete, handleEdit, handleView }) => {
    const deleteRow = useCallback(() => {
        handleDelete(data.id);
    }, [data.id, handleDelete]);

    const editRow = useCallback(() => {
        handleEdit(data.id);
    }, [data.id, handleEdit]);

    return (
        <React.Fragment key={data.id}>
            <StyledBodyCell>{data.dayOfWeek}</StyledBodyCell>
            <StyledBodyCell>{data.hourStart}</StyledBodyCell>
            <StyledBodyCell>{data.hourEnd}</StyledBodyCell>
            <StyledBodyCell>
                {data.active ? <BsCheckAll size={26} color="#00a57c" /> : <BsX size={26} color="#DE3B3B" />}
            </StyledBodyCell>

            <MoreContainer>
                <button onClick={editRow} type="button">
                    <MdEdit color="#ffa048" size={20} />
                </button>
                <button onClick={deleteRow} type="button">
                    <MdDeleteForever color="#DE3B3B" size={20} />
                </button>
            </MoreContainer>
        </React.Fragment>
    );
};

export default ProviderRow;
