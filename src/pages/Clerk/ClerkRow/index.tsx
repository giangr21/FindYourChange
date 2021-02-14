/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container, MoreContainer } from './styles';

interface ClerkRow {
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
    data: any;
}

const ClerkRow: React.FC<ClerkRow> = ({ data, handleDelete, handleEdit }) => {
    const deleteRow = useCallback(() => {
        handleDelete(data.id);
    }, [data.id, handleDelete]);

    const editRow = useCallback(() => {
        handleEdit(data.id);
    }, [data.id, handleEdit]);

    return (
        <Container>
            <small onClick={editRow}>{data.name}</small>
            <small onClick={editRow}>{data.email}</small>
            <small onClick={editRow}>{data.phone}</small>

            <MoreContainer>
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
