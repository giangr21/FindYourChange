import styled, { css } from 'styled-components';

interface ButtonProps {
    background: string;
    justIcon: boolean;
}

export const Container = styled.div`
    .badge {
        position: relative;
        top: 9px;
        right: -28px;
        padding: 2px 8px;
        border-radius: 50%;
        background: #de3b3b;
        color: white;
        font-weight: bold;
        font-size: 13px;
    }
`;

export const Button = styled.button<ButtonProps>`
    padding: 0 16px;
    height: 36px;

    font-size: 14px;
    /* font-weight: bold; */

    color: #fff;
    border: 0;
    border-radius: 7px;

    background: ${(props) => props.background || ''} !important;

    display: flex;
    text-align: center;
    align-items: center;

    svg {
        margin-right: 7px;
    }

    ${(props) =>
        props.justIcon &&
        css`
            svg {
                margin-right: 0px;
            }
        `}

    &:disabled {
        color: #fff;
        cursor: not-allowed;
    }
`;
