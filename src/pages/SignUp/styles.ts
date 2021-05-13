import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';
import signUpBackground from '../../assets/sign-up-background.png';

export const Container = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;

    @media (min-width: 767px) {
        height: 100vh;
    }

    max-width: 700px;
    font-weight: 500;
`;

const apperFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${apperFromRight} 1s;

    .img {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        label {
            width: 38px;
            height: 38px;
            background: #fff;
            border-radius: 50%;
            margin-left: 10px;
            cursor: pointer;
            transition: background-color 0.2s;

            display: flex;
            align-items: center;
            justify-content: center;

            input {
                display: none;
            }

            svg {
                width: 20px;
                height: 20px;
                color: #312e38;
            }
        }
    }

    input[type='radio'] {
        cursor: pointer;
    }

    .radioButton span {
        color: white !important;
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
        background-color: #ff9000;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }

    form {
        margin: 40px 0 40px 0;
        padding: 0px 20px;
        /* width: 340px; */
        /* max-width: 520px; */

        text-align: center;

        h1 {
            margin-bottom: 24px;
        }

        button {
            background: #ff9000;
            height: 56px;
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
            margin-top: 24px;
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
        /* margin-top: 24px; */
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

export const Background = styled.div`
    flex: 1;
    background: url(${signUpBackground}) no-repeat center;
    background-size: cover;
`;

export const Row = styled.div`
    flex-wrap: nowrap;
    width: 100%;
    margin-bottom: 7px;
`;

export const Column = styled.div`
    display: flex;

    div + div {
        margin-left: 7px;
    }

    flex: 1 1 0;

    span {
        margin: 0px 7px;
    }

    @media (max-width: 620px) {
        flex-direction: column;

        div + div {
            margin-left: 0px;
        }

        div {
            margin-bottom: 7px;
        }
    }
`;
