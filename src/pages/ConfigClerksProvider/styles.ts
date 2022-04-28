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

export const SubHeader = styled.div`
    display: flex;
    height: 20px;
    margin: 0px 5px 5px 5px;
    border-radius: 8px;
    margin-bottom: 20px;

    p {
        color: #999591;
        display: flex;
        align-items: center;
        font-weight: 500;
    }
`;

export const Recommendation = styled.div`
    height: 600px;
    max-height: 600px;
    background-color: black;
`;
