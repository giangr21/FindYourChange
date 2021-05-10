import styled from 'styled-components';

export const Container = styled.div`
    background: transparent;
    border-radius: 10px;
    padding: 12px;
    width: 80%;
    margin: 0 auto 25px;

    border: 1px solid hsla(0, 0%, 100%, 0.2);
    color: #fff;

    display: flex;
    align-items: center;

    input {
        background: transparent;
        border: 0;
        flex: 1;
        font-size: 14px;
        margin-left: 7px;

        &::placeholder {
            color: #fff;
        }
    }

    svg {
        margin-right: 16px;
    }
`;
