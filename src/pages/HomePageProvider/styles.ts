import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const InfoHeader = styled.div`
    max-width: 1120px;
    margin: 18px;
    @media (min-width: 1200px) {
        margin: 18px auto;
    }
`;

export const Content = styled.main`
    max-width: 1120px;
    margin: 0px auto;
    padding: 20px 0px;
    display: flex;

    @media (max-width: 1200px) {
        margin: 0px 18px;
    }

    @media (max-width: 990px) {
        flex-direction: column;
    }
`;

export const Schedule = styled.div`
    flex: 1;
    margin-right: 120px;

    h1 {
        font-size: 34px;
    }

    p {
        margin-top: 8px;
        color: #ff9000;
        display: flex;
        align-items: center;
        font-weight: 500;

        span {
            display: flex;
            align-items: center;
        }

        span + span::before {
            content: '';
            width: 1px;
            height: 12px;
            background: #ff9000;
            margin: 0 8px;
        }
    }

    @media (max-width: 990px) {
        order: 2;
        margin-right: 0px;
    }
`;

export const Section = styled.section`
    margin-top: 48px;

    > strong {
        color: #999591;
        font-size: 20px;
        line-height: 26px;
        border-bottom: 1px solid #3e3b47;
        display: block;
        padding-bottom: 16px;
        margin-bottom: 16px;
    }

    > p {
        color: #999591;
    }
`;

export const Calendar = styled.aside`
    @media (max-width: 990px) {
        margin: 0px auto 20px;
    }

    width: 380px;

    @media (max-width: 410px) {
        width: 100%;
    }
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
