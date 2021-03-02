/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { StyledBodyCell } from '../styles';

import { MoreContainer } from './styles';

interface ProductRow {
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
    data: any;
}

const ProductRow: React.FC<ProductRow> = ({ data, handleDelete, handleEdit }) => {
    const deleteRow = useCallback(() => {
        handleDelete(data.id);
    }, [data.id, handleDelete]);

    const editRow = useCallback(() => {
        handleEdit(data.id);
    }, [data.id, handleEdit]);

    return (
        <React.Fragment key={data.id}>
            <StyledBodyCell>{data.name}</StyledBodyCell>
            <StyledBodyCell>{data.value}</StyledBodyCell>
            <StyledBodyCell>{data.quantity}</StyledBodyCell>
            <StyledBodyCell>{data.category}</StyledBodyCell>
            <StyledBodyCell>
                <MoreContainer>
                    <button onClick={editRow} type="button">
                        <MdEdit color="#ffa048" size={20} />
                    </button>
                    <button onClick={deleteRow} type="button">
                        <MdDeleteForever color="#DE3B3B" size={20} />
                    </button>
                </MoreContainer>
            </StyledBodyCell>
        </React.Fragment>
    );
};

export default ProductRow;
