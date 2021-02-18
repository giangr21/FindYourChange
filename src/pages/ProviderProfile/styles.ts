import { shade } from 'polished';
import styled from 'styled-components';
import { Row as Rows, Col as Cols } from 'react-styled-flexboxgrid';

export const Row = styled(Rows)`
    @media only screen and (min-width: 0em) and (max-width: 47.99em) {
        margin-bottom: 30px;
        &:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
        }
    }
`;

export const Col = styled(Cols)`
    margin-bottom: 30px;
    @media only screen and (min-width: 0em) and (max-width: 47.99em) {
        margin-bottom: 20px;
    }
    &:last-child {
        margin-bottom: 0;
    }
`;

export const Container = styled.div`
    > header {
        height: 144px;
        background: #28262e;
        display: flex;
        align-items: center;
        div {
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;
            svg {
                color: #999591;
                width: 24px;
                height: 24px;
            }
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: -176px auto 0;
    width: 100%;
    form {
        margin: 80px 0;
        padding: 0px 10px;
        width: 70%;
        text-align: center;
        display: flex;
        flex-direction: column;
        h1 {
            font-size: 20px;
            text-align: left;
            margin-bottom: 24px;
        }
        button {
            background: #ff9000;
            height: 56px;
            border-radius: 10px;
            border: 0;
            padding: 0 16px;
            color: #312e38;
            width: 100%;
            font-weight: 500;
            margin-top: 16px;
            transition: background-color 0.2s;
            &:hover {
                background: ${shade(0.2, '#ff9000')};
            }
        }
        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }
    }
`;

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    align-self: center;
    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }
    label {
        position: absolute;
        width: 48px;
        height: 48px;
        background: #ff9000;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        border: 0;
        cursor: pointer;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
            display: none;
        }
        svg {
            width: 20px;
            height: 20px;
            color: #312e38;
        }
        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }
    }
`;