import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
     align-items: center;
    justify-content: center;
`;


export const RightContainer = styled.div`
    display: flex;
    width: 100%;

    align-items: center;
    justify-content: center;

    form {
        text-align: center;

        h2 {
            margin-bottom: 15px;
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

        a {
            color: #f4ede8;
            display: block;
            margin-top: 15px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }
    }

    > a {
        color: #ff9000;
        display: block;
        margin-top: 15px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;

        svg {
            margin-right: 16px;
        }

        &:hover {
            color: ${shade(0.2, '#ff9000')};
        }
    }
`;

export const Row = styled.div`
    margin-bottom: 5px;
`;
