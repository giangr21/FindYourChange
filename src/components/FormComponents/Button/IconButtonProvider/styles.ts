import styled, { css } from 'styled-components';

interface ButtonProps {
    background: string;
}

export const Container = styled.div`
    width: 100%;
`;

export const Button = styled.button<ButtonProps>`
    width: 50%;
    margin: 0 auto;
    height: 36px;

    margin-top: 0px !important;
    font-size: 15px;

    color: #fff;
    border: 0;
    border-radius: 6px;

    background: ${(props) => props.background || ''} !important;

    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    svg {
        margin-right: 7px;
    }
`;
