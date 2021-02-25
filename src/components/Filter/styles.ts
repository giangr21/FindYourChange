import styled, { css } from 'styled-components';
import { Form as Unform } from '@unform/web';

interface FilterProps {
    showFilter: boolean;
}

export const Container = styled.div<FilterProps>`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.showFilter ? '20%' : '0%')};
    margin: ${(props) => (props.showFilter ? '5px 0px' : '0')};
    border-radius: 8px;
    border: 1px solid #777777;
    transition: all ease 0.5s;

    ${(props) =>
        props.showFilter &&
        css`
            transform: translateX(0);
        `}

    ${(props) =>
        !props.showFilter &&
        css`
            transform: translateX(105%);
        `}
`;

export const HeaderFilter = styled.div`
    display: flex;
    height: 60px;
    align-items: center;
    padding: 5px 10px;

    strong {
        color: #666;
        font-weight: bold;
    }
`;

export const Form = styled(Unform)`
    width: 100%;
    padding: 10px 10px;
    flex: auto;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 10px;
    p {
        font-size: 14px;
        color: #e82b43;
    }
    .space {
        margin-bottom: 20px;
    }

    input[type='radio'] {
        cursor: pointer;
    }

    .radioButton span {
        color: #232129 !important;
        cursor: pointer !important;
        margin-left: 10px !important;
        margin-right: 20px !important;
        font-weight: 400;
    }

    input[type='radio']:after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #d1d3d1;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }

    input[type='radio']:checked:after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #e82b43;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }
`;

export const FooterFilter = styled.div`
    display: flex;
    height: 60px;
    padding: 5px 10px;
    margin-top: 10px;
    margin: 0 auto;

    div + div {
        margin-left: 10px;
    }
`;
