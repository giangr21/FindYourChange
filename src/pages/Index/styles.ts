import { Form as Unform } from '@unform/web';
import styled from 'styled-components';
import homeBackground from '../../assets/background.jpg';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    background: #fff;
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 550px;
    max-height: 550px;
    background: url(${homeBackground}) no-repeat center;
    background-size: cover;
`;

export const Title = styled.span`
    color: #fff;
    text-align: center;
    width: 550px;
    font-size: 35px;
    font-weight: 500;
    margin-bottom: 30px;
`;

export const Form = styled(Unform)`
    width: 30%;
    display: flex;
    align-items: center;

    button {
        margin-left: 7px;
    }
`;

export const Recommendation = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
    height: 500px;
    max-height: 500px;
    background-color: #ffffff;

    .title {
        color: #3a3a3a;
        font-weight: 500;
        font-size: 30px;
    }

    .separator {
        height: 2px;
        background-color: #3a3a3a;
    }
`;

export const RecommendationContent = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    color: #3a3a3a;
`;

export const RecommendationCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    /* text-align: center; */
    align-items: center;

    img {
        width: 275px;
        border-radius: 10px;
    }

    span {
        font-weight: 500;
        font-size: 18px;
    }

    p {
        font-size: 14px;
        color: #3a3a3a;
        opacity: 0.8;
    }
`;
