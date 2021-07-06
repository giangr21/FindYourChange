import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;

    & + div {
        margin-top: 16px;
    }

    span {
        margin-left: auto;
        display: flex;
        align-items: center;
        color: #f4ede8;
        width: 70px;
    }
    svg {
        color: #ff9000;
        margin-right: 8px;
    }

    div {
        flex: 1;
        background: #3e3b47;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-left: 24px;

        img {
            width: 66px;
            height: 66px;
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
            color: #fff;
            font-size: 20px;
        }

        section {
            display: flex;
        }

        @media (max-width: 440px) {
            flex-direction: column;
            margin-left: 10px;

            img {
                margin-bottom: 7px;
            }

            section {
                text-align: center;
                display: flex;
                flex-direction: column;
            }
        }
    }
`;
