import styled from 'styled-components';

interface ButtonProps {
    background: string;
}

export const Button = styled.button<ButtonProps>`
    padding: 0 8px;
    height: 30px;
    margin-left: 10px;

    color: #fff;
    border: 0;
    border-radius: 4px;

    background: ${(props) => props.background || ''};

    display: flex;
    text-align: center;
    align-items: center;

    svg {
        margin-right: 0px;
    }

    &:disabled {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
    }
`;
