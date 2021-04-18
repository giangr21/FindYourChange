import styled from 'styled-components';

interface ContainerProps {
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
`;
