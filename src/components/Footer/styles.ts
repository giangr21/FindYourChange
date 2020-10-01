import styled from 'styled-components';

export const Container = styled.div`
    height: 140px;
    width: 100%;
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;
`;

export const Left = styled.div`
    display: flex;
    align-items: center;

    p {
        font-size: 14px;
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
