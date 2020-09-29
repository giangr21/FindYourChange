/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { BsCheckAll, BsX } from 'react-icons/bs';
import { MdEdit, MdDeleteForever, MdRemoveRedEye } from 'react-icons/md';

import { Container, MoreContainer } from './styles';

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

    const viewRow = useCallback(() => {
        handleView(data.id);
    }, [data.id, handleView]);

    return (
        <Container>
            <small onClick={viewRow}>{data.dayOfWeek}</small>
            <small onClick={viewRow}>{data.hourStart}</small>
            <small onClick={viewRow}>{data.hourEnd}</small>
            <small onClick={viewRow}>
                {data.active ? <BsCheckAll size={26} color="#00a57c" /> : <BsX size={26} color="#DE3B3B" />}
            </small>

            <MoreContainer>
                <button onClick={viewRow} type="button">
                    <MdRemoveRedEye color="#8E5BE8" size={20} />
                </button>
                <button onClick={editRow} type="button">
                    <MdEdit color="#ffa048" size={20} />
                </button>
                <button onClick={deleteRow} type="button">
                    <MdDeleteForever color="#DE3B3B" size={20} />
                </button>
            </MoreContainer>
        </Container>
    );
};

export default ProviderRow;
