import styled from 'styled-components';
import homeBackground from '../../assets/background.jpg';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    background: #fff;
`;

export const ImageContainer = styled.div`
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
    width: 400px;
    font-size: 80px;
    font-weight: 500;
`;

export const SubTitle = styled.span`
    color: #fff;
    text-align: center;
    width: 400px;
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 20px;
`;

export const AboutContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    background-color: #ffffff;
    padding: 20px;

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

export const AboutContent = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    color: #3a3a3a;
`;

export const Founders = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    color: #3a3a3a;
`;
