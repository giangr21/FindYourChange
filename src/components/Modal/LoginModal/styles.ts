import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';
import signInBackgroundImg from '../../../assets/sign-in-background.png';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #312e38;
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    float: left;
    background: url(${signInBackgroundImg}) no-repeat center;
    background-size: cover;
    flex: 1;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    float: right;
    width: 50%;
    overflow: hidden;

    @media (max-width: 760px) {
        width: 100%;
    }

    align-items: center;
    justify-content: center;

    animation: ${appearFromRight} 1s;

    form {
        text-align: center;
        width: 80%;

        h2 {
            margin-bottom: 15px;
            color: #fff;
            padding: 0px 20px;
            font-size: 1.2em;
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
