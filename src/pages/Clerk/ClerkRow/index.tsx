/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { MdEdit, MdDeleteForever, MdRemoveRedEye } from 'react-icons/md';

import { Container, MoreContainer } from './styles';

interface ClerkRow {
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
    handleView: (id: string) => void;
    data: any;
}

const ClerkRow: React.FC<ClerkRow> = ({ data, handleDelete, handleEdit, handleView }) => {
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
            <small onClick={viewRow}>{data.name}</small>
            <small onClick={viewRow}>{data.email}</small>
            <small onClick={viewRow}>{data.phone}</small>

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

export default ClerkRow;
