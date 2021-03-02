import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;

    .react-select__control {
        ${(props) =>
            props.isErrored &&
            css`
                border-color: #c53030;
            `}
    }

    .label {
        position: absolute;
        left: 13px;
        background: #ffffff;
        top: -11px;
        padding: 0 3px;
        font-size: 14px;
        color: black;
        font-weight: 500;
        border-radius: 8px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    svg {
        margin: 0;
    }
    span {
        background: #c53030;
        color: #fff !important;

        &::before {
            border-color: #c53030;
        }
    }
`;
