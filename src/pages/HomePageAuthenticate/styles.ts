import { Form as Unform } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;
`;

export const Form = styled(Unform)`
    width: 30%;
    display: flex;
    align-items: center;
`;
