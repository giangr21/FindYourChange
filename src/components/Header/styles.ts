import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px 10px;
    height: 70px;
    max-height: 70px;
    background-color: var(--color-primary);
`;

export const Content = styled.div`
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    background-color: var(--color-primary);
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
    display: flex;
    align-items: center;
    cursor: pointer;
`;
