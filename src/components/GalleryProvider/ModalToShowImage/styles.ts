import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
`;

export const Header = styled.div`
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;

    span {
        font-weight: 600;
        font-size: 20px;
        color: #ff9000;
    }

    svg {
        cursor: pointer;
    }
`;
