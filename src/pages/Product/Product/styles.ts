import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    color: black;
`;

export const Row = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 16px 0;

    > a {
        font-size: 14px;
        text-decoration: none;
        color: var(--color-blue);
        padding: 2.5px 0;

        & + a {
            padding-left: 10px;
            margin-left: 10px;
            border-left: 1px solid #28262e;
        }
    }
`;

export const Panel = styled.div`
    background: #f4ede8;
    box-shadow: var(--panel-shadow);
    border-radius: 2%;

    display: grid;
    grid-template-columns: 65fr 35fr;
`;

export const Column = styled.div`
    &:first-child {
        border-right: 1px solid #28262e;
    }
`;

export const Gallery = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500px;

    > img {
        height: 99%;
        border-radius: 2%;
    }
`;

export const Section = styled.div`
    border-top: 1px solid #28262e;
    padding: 48px 32px;

    display: flex;
    flex-direction: column;

    > h4 {
        font-size: 18px;
        margin-bottom: 40px;
    }
    > div {
        display: flex;
        flex-direction: column;

        > span + span {
            margin-top: 16px;
        }
        .title {
            font-size: 16px;
            color: var(--color-black);
        }
        .description {
            margin-top: 5px;
            font-size: 14px;
            color: var(--color-gray);
            line-height: 19px;
        }
    }
    > a {
        margin-top: 20px;
        font-size: 14px;
        font-weight: 600;
        color: var(--color-blue);
        text-decoration: none;
    }
`;

export const Description = styled.div`
    border-top: 1px solid #28262e;
    padding: 44px 32px;

    > h2 {
        font-size: 24px;
        margin-bottom: 32px;
    }
    > p {
        font-size: 20px;
        color: var(--color-gray);
        line-height: 27px;
    }
`;
