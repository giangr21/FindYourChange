import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 410px;
    text-align: center;

    background: #28262e;
    border-radius: 7px;

    padding: 40px 30px 30px 30px;

    img {
        width: 100%;
        max-width: 200px;
        margin-bottom: 30px;
    }

    button {
        background: var(--color-primary);
        height: 56px;
        border-radius: 10px;
        border: 0;
        padding: 0 16px;
        color: #fff;
        width: 100%;
        /* font-weight: 600; */
        margin-top: 16px;
        transition: background-color 0.2s;
    }

    a {
        color: #fff;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
    }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
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
    animation: ${appearFromLeft} 1s;

    h1 {
        margin-bottom: 24px;
    }

    form {
        width: 100%;
    }

    > a {
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;

        svg {
            margin-right: 16px;
        }
    }
`;
