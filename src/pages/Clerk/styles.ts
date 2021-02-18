import { Form as Unform } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    max-width: 1120px;
    margin: 10px auto;
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

export const HeaderGrid = styled.section`
    display: grid;
    padding: 0px 6px 0px 5px;
    margin: 5px 10px;

    grid-template-columns: repeat(4, 1fr);

    strong:last-child {
        text-align: right;
    }

    strong {
        font-size: 16px;
        font-weight: 500;
        color: #fff;
    }

    .pl5 {
        padding-left: 10px;
    }

    .pl20 {
        padding-left: 20px;
    }
`;

export const Grid = styled.div`
    border-radius: 8px;
    margin: 5px 10px;
    flex: auto;
    overflow: auto;

    > div + div {
        margin-top: 2px;
    }
`;