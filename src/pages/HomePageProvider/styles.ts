import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const InfoHeader = styled.div`
    max-width: 1120px;
    margin: 18px auto;
`;

export const Content = styled.main`
    @media (max-width: 990px) {
        display: none;
    }
    max-width: 1120px;
    margin: 0px auto;
    padding: 30px 0px;
    display: flex;
`;

export const Schedule = styled.div`
    flex: 1;
    margin-right: 120px;
    h1 {
        font-size: 36px;
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
