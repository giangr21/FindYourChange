import styled from 'styled-components';

export const Container = styled.div`
    height: 40px;
    background: #fff;
    border-radius: 4px;

    padding: 0px 10px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);

    > small:last-child {
        text-align: right;
    }

    > small {
        font-size: 16px;
        color: #666;
        text-align: left;
        cursor: pointer;
        margin: auto 0px auto 5px;
    }

    > section {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .mr5 {
        margin-right: 5px;
    }
`;

export const MoreContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: auto 0;

    button {
        background: none;
        border: none;
        margin-left: 7px;
    }
`;
