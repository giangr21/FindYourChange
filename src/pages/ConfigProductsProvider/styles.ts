import styled from 'styled-components';
import { withStyle } from 'baseui';
import {
    StyledTable as BaseStyledTable,
    StyledHeadCell as BaseStyledHeadCell,
    StyledBodyCell as BaseStyledCell,
} from 'baseui/table-grid';

export const Container = styled.div`
    height: 100%;
    max-width: 1120px;
    margin: 0px auto;
    padding: 10px 0px;
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
`;

export const Content = styled.div`
    display: flex;
    width: 100%;
    transition: all ease 0.5s;
    flex-direction: column;
`;

export const HeaderContainer = styled.div`
    display: flex;
    height: 60px;
    margin: 0px 10px 5px 10px;
    justify-content: space-between;
    border-radius: 8px;
`;

export const Recommendation = styled.div`
    height: 600px;
    max-height: 600px;
    background-color: black;
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
