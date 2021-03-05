import { withStyle } from 'baseui';
import {
    StyledTable as BaseStyledTable,
    StyledHeadCell as BaseStyledHeadCell,
    StyledBodyCell as BaseStyledCell,
} from 'baseui/table-grid';
import styled from 'styled-components';

export const MoreContainer = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: flex-end; */
    margin: auto 0;

    button {
        background: none;
        border: none;
        margin-left: 7px;
    }
`;

export const StyledTable = withStyle(BaseStyledTable, () => ({
    borderTopLeftRadius: '7px !important',
    borderTopRightRadius: '7px !important',
    borderBottomLeftRadius: '7px !important',
    borderBottomRightRadius: '7px !important',
    alignContent: 'start',
}));
export const StyledHeadCell = withStyle(BaseStyledHeadCell, () => ({
    // fontFamily: "'Lato', sans-serif",
    fontWeight: 700,
    color: '#28262e !important',
    alignItems: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    borderTopColor: 'rgba(0, 0, 0, 0.12)',
    borderRightColor: 'rgba(0, 0, 0, 0.12)',
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    borderLeftColor: 'rgba(0, 0, 0, 0.12)',
    alignSelf: 'start',
}));

export const StyledBodyCell = withStyle(BaseStyledCell, () => ({
    // fontFamily: "'Lato', sans-serif",
    fontWeight: 400,
    color: '#28262e !important',
    alignSelf: 'center',
    // cursor: 'pointer',
}));
