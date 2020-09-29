import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
    padding: 5px 5px;
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-weight: 600;
        font-size: 20px;
        color: var(--color-primary);
    }

    svg {
        cursor: pointer;
    }
`;

export const Content = styled.div`
    height: calc(100% - 100px);
    padding: 10px 0px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;

    p {
        padding: 10px 0px;
        color: #e82b43;
        font-weight: 600;
        padding-bottom: 15px;
    }

    span {
        color: #e82b43;
        font-weight: 600;
        margin-left: 10px;
    }
`;

export const Footer = styled.div`
    display: flex;
    height: 60px;
    justify-content: space-between;

    button {
        margin-top: 20px;
        align-self: flex-end;
        margin-left: 7px;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
`;

export const Column = styled.div`
    display: flex;
    flex: 1 1 0;
    margin-bottom: 15px;

    div {
        margin-right: 10px;
    }
`;
