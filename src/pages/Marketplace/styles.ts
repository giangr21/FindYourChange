import { Form as Unform } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    background: #fff;
`;

export const Content = styled.div`
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 0px;
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 5px;
    height: 100%;
    width: 300px;
    max-width: 300px;
    background: #f3f4f4;
    color: #3a3a3a;
    border: 1px solid #3a3a3a;
    border-radius: 10px;

    padding: 40px 30px;
    /* flex-direction: column; */
    align-items: center;
    /* justify-content: center; */

    p {
        color: #312e38;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 20px;
    }

    span {
        font-size: 15px;
        /* padding-bottom: 10px; */
    }
`;

export const ContentSearch = styled(Unform)`
    .separator {
        height: 2px;
        background-color: #3a3a3a;
        margin: 15px 0px;
    }

    input[type='radio'] {
        cursor: pointer;
    }

    .radioButton span {
        color: #3a3a3a !important;
        cursor: pointer !important;
        margin-left: 10px !important;
        margin-right: 20px !important;
        font-weight: 400;
    }

    input[type='radio']:after {
        width: 10px;
        height: 10px;
        border-radius: 10px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #d1d3d1;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }

    input[type='radio']:checked:after {
        width: 10px;
        height: 10px;
        border-radius: 10px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #ff9000;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }
`;

export const Results = styled(Unform)`
    background: #f3f4f4;
    color: #3a3a3a;
    width: 100%;
    padding: 15px;
    border-radius: 10px;
`;

export const ContentResults = styled.div`
    margin-top: 15px;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
`;

export const HeaderResults = styled.div`
    display: flex;
    align-items: center;
    span {
        width: 280%;
    }
`;

export const Product = styled.div`
    width: 200px;
    height: 310px;
    border: 1px solid black;
    border-radius: 10px;
    margin: 0px 20px;

    img {
        padding: 2px;
        width: 100%;
        height: 200px;
    }

    span {
        font-weight: 500;
        margin: 5px 0px;
    }

    p {
        color: #ff9000;
        margin-bottom: 5px;
    }

    .content {
        height: 110px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
`;
