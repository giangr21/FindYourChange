import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px 20px;
    height: 90px;
    max-height: 90px;
    background-color: #ff9000;
`;

export const Content = styled.div`
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    background-color: #ff9000;
`;

export const Right = styled.div`
    display: flex;
    align-items: center;

    a {
        text-decoration: none;
        margin: 0px 20px 0px 0px;
        color: #fff;
    }
`;

export const Left = styled.div`
    cursor: pointer;

    img {
        width: 100%;
        max-width: 135px;
    }
`;
