import styled, { keyframes } from 'styled-components';

interface ContainerProps {
    heightLoading: string | undefined;
}

const bounce = keyframes`
  from {
    transform: translateY(-12px);
  }

  to {
    transform: translateY(12px);
  }
`;

export const Container = styled.div<ContainerProps>`
    height: ${(props) => (!props.heightLoading ? '90vh' : `${props.heightLoading}`)};
    display: flex;
    align-items: center;
    justify-content: center;

    animation-name: ${bounce};
    animation-duration: 1s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;

    img {
        height: 34px;
    }
`;
