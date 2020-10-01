import styled from 'styled-components';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #f9f9f9;
    border-radius: 10px;
    padding: 12px;
    width: 100%;

    border: 1px solid #c8c8c8;
    color: #666360;

    display: flex;
    align-items: center;

    & + div {
        margin-left: 7px;
    }

    input {
        background: #f9f9f9;
        border: 0;
        flex: 1;
        color: black;

        &::placeholder {
            /* color: #666360; */
            color: black;
        }
    }

    svg {
        margin-right: 16px;
    }
`;
