import React, { useCallback } from 'react';
import { MdEdit, MdDeleteForever, MdSend } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { StyledBodyCell, MoreContainer } from '../../../components/Table/styles';

interface ProductRow {
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
    data: any;
}

const ProductRow: React.FC<ProductRow> = ({ data, handleDelete, handleEdit }) => {
    const history = useHistory();

    const deleteRow = useCallback(() => {
        handleDelete(data.id);
    }, [data.id, handleDelete]);

    const editRow = useCallback(() => {
        handleEdit(data.id);
    }, [data.id, handleEdit]);

    const handleGoToProduct = useCallback(() => {
        history.push({
            pathname: `/product/${data.id}`,
        });
    }, [data.id, history]);

    return (
        <React.Fragment key={data.id}>
            <StyledBodyCell>{data.name}</StyledBodyCell>
            <StyledBodyCell>
                {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(Number(data.value))}
            </StyledBodyCell>
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
                    <button onClick={handleGoToProduct} type="button">
                        <MdSend color="rgb(142, 91, 232)" size={20} />
                    </button>
                </MoreContainer>
            </StyledBodyCell>
        </React.Fragment>
    );
};

export default ProductRow;
