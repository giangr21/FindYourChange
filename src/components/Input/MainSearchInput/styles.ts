import styled from 'styled-components';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: transparent;
    border-radius: 10px;
    padding: 12px;
    width: 100%;

    border: 2px solid #232129;
    color: #666360;

    display: flex;
    align-items: center;

    & + div {
        margin-left: 7px;
    }

    input {
        background: transparent;
        border: 0;
        flex: 1;
        color: #f4ede8;

        &::placeholder {
            color: #666360;
        }
    }

    svg {
        margin-right: 16px;
    }
`;
