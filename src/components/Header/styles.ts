import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    padding: 10px 10px;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    max-height: 80px;
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
`;
