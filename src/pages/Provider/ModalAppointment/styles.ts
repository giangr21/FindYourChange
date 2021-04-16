import { Form as Unform } from '@unform/web';
import { shade } from 'polished';
import styled from 'styled-components';

export const Form = styled(Unform)`
    padding: 5px 5px;
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-weight: 600;
        font-size: 20px;
        color: var(--color-primary);
    }

    svg {
        cursor: pointer;
    }
`;

export const Calendar = styled.aside`
    width: 380px;
    .DayPicker {
        background: #28262e;
        border-radius: 10px;
    }

    .DayPicker-wrapper {
        padding-bottom: 0;
    }

    .DayPicker,
    .DayPicker-Month {
        width: 100%;
    }

    .DayPicker-Month {
        border-collapse: separate;
        border-spacing: 8px;
        margin: 16px;
    }

    .DayPicker-Day {
        width: 40px;
        height: 40px;
    }

    .DayPicker-Day--available:not(.DayPicker-Day--outside) {
        background: #3e3b47;
        border-radius: 10px;
        color: #fff;
    }

    .DayPicker:not(.DayPicker--interactionDisabled)
        .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
        background: ${shade(0.2, '#3e3b47')};
    }

    .DayPicker-Day--today {
        font-weight: normal;
    }

    .DayPicker-Day--disabled {
        color: #666360 !important;
        background: transparent !important;
    }

    .DayPicker-Day--selected {
        background: #ff9000 !important;
        border-radius: 10px;
        color: #232129 !important;
    }
`;

export const Content = styled.div`
    height: calc(100% - 100px);
    padding: 10px 0px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;

    p {
        padding: 10px 0px;
        color: black;
        font-weight: 600;
    }

    .radioButton {
        span {
            color: #232129;
            cursor: pointer;
            margin-left: 10px;
            margin-right: 15px;
        }
    }

    input[type='radio'] {
        cursor: pointer;
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
        background-color: #2e656a;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }

    button {
        background: #ff9000;
        height: 40px;
        border-radius: 10px;
        border: 0;
        padding: 0 16px;
        color: #312e38;
        width: 100%;
        font-weight: 500;
        margin-top: 16px;
        transition: background-color 0.2s;

        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }
    }
`;

export const Footer = styled.div`
    display: flex;
    height: 60px;
    justify-content: space-between;

    button {
        margin-top: 20px;
        align-self: flex-end;
        margin-left: 7px;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    width: 100%;

    .timePicker {
        input {
            background: #f9f9f9;
            border-radius: 10px;
            padding: 12px;
            width: 100%;
            border: 1px solid #c8c8c8;
            color: #232129;
            font-size: 16px;
        }
    }

    span {
        width: 100%;
    }
`;

export const Column = styled.div`
    display: flex;
    flex: 1 1 0;
    margin-bottom: 15px;

    div {
        margin-right: 10px;
    }
`;
