import styled from 'styled-components';

export const Container = styled.div`
    height: 140px;
    width: 100%;
    padding: 10px 10px;
`;

export const Up = styled.div`
    margin: auto 0;

    a {
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
        color: black;
        margin: 0px 20px;
    }
`;

export const Down = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto 0;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1200px;
    height: 100%;
`;

export const Left = styled.div`
    display: flex;
    align-items: center;

    p {
        font-size: 12px;
        font-weight: 500;
        color: black;
    }

    img {
        height: 70px;
        margin-right: 20px;
        margin-left: 10px;
    }
`;

export const Right = styled.div`
    display: flex;

    .img {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        label {
            width: 38px;
            height: 38px;
            background: #ff9000;
            border-radius: 50%;
            margin-left: 10px;
            cursor: pointer;
            transition: background-color 0.2s;

            display: flex;
            align-items: center;
            justify-content: center;

            svg {
                width: 20px;
                height: 20px;
                color: #312e38;
            }
        }
    }
`;
