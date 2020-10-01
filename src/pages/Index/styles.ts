import { Form as Unform } from '@unform/web';
import styled from 'styled-components';
import homeBackground from '../../assets/background.jpg';

export const Container = styled.div`
    height: 100%;
    width: 100%;
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 600px;
    max-height: 600px;
    background: url(${homeBackground}) no-repeat center;
    background-size: cover;
    /* background-color: #fff; */
`;

export const Title = styled.span`
    color: #fff;
    /* color: var(--color-primary); */
    font-size: 35px;
    font-weight: 500;
    margin-bottom: 30px;
`;

export const Form = styled(Unform)`
    width: 30%;
    display: flex;
    align-items: center;
`;

export const Recommendation = styled.div`
    height: 600px;
    max-height: 600px;
    background-color: black;
`;
