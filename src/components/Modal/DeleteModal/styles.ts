import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    p {
        margin-top: 20px;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        margin: 0 auto;
        margin-top: 20px;
        div + div {
            margin-left: 10px;
        }
    }
`;
