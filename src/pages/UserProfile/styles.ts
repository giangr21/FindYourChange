import { shade } from 'polished';
import styled from 'styled-components';
import { Row as Rows, Col as Cols } from 'react-styled-flexboxgrid';

export const Container = styled.div`
    width: 100%;
    height: calc(100vh - 230px);
    max-width: 1200px;
    margin: 0 auto;
    padding: 3px;
`;

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
    /* &:last-child {
        margin-bottom: 0;
    } */
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    form {
        margin: 80px 0 30px;
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
    margin-top: 12px;
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

// export const ImgPreview = styled.div`
//     width: 100%;
//     padding: 60px 20px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: relative;

//     img {
//         display: block;
//         max-width: 100%;
//         max-height: 550px;
//         height: auto;
//     }

//     @media (max-width: 990px) {
//         padding: 30px 40px 60px;
//     }
//     @media (max-width: 767px) {
//         flex: 0 0 100%;
//         max-width: 100%;
//         padding: 30px 25px 60px;
//         order: 0;
//     }
// `;
