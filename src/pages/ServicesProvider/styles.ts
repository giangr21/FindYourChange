import { Form as Unform } from '@unform/web';
import styled, { css } from 'styled-components';

interface FilterProps {
    showFilter: boolean;
}

export const Container = styled.div`
    height: calc(100vh - 230px);
    width: 100%;
    padding: 5px 0px;
    background: #fff;
`;

export const Content = styled.div`
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
`;

export const SearchContainer = styled.div<FilterProps>`
    display: flex;
    flex-direction: column;
    margin-right: 5px;
    height: 100%;
    width: ${(props) => (props.showFilter ? '24%' : '0%')};
    max-width: 300px;
    background: #f3f4f4;
    color: #3a3a3a;
    border: 1px solid #3a3a3a;
    border-radius: 10px;
    transition: all ease 0.7s;

    padding: 20px 30px;
    align-items: center;

    p {
        color: #312e38;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 20px;
    }

    span {
        font-size: 15px;
    }

    ${(props) =>
        props.showFilter &&
        css`
            transform: translateX(0);
        `}

    ${(props) =>
        !props.showFilter &&
        css`
            transform: translateX(-10000%);
        `}

    @media (max-width: 990px) {
        display: none;
    }
`;

export const ContentSearch = styled(Unform)`
    flex: auto;
    overflow-y: auto;
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

export const Results = styled.div`
    background: #f3f4f4;
    color: #3a3a3a;
    width: 100%;
    height: 100%;
    padding: 7px 15px;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    span {
        width: 280%;
    }
`;

export const ContentResults = styled.div`
    flex: auto;
    margin-top: 15px;
    overflow: hidden;
    overflow-y: auto;
    align-items: center;
    justify-content: center;

    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        background: #f4ede8;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #ff9000;
        border-radius: 20px;
        border: 3px solid #ff9000;
    }
`;

export const Provider = styled.div`
    width: 100%;
    height: 300px;
    border: 1px solid #3a3a3a;
    margin-bottom: 5px;
    border-radius: 5px;

    img {
        width: 100%;
        height: 130px;
        border-radius: 2%;
    }
`;

export const ProviderInfo = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 0px 13px;
    bottom: 27%;
    display: flex;
    flex-direction: column;

    span {
        position: absolute;
        color: #fff;
        font-size: 16px;
        font-weight: 500;
    }

    .city {
        padding-top: 25px;
        font-size: 14px;
        font-weight: 400;
    }

    .servicesAvailable {
        padding-top: 50px;
        font-size: 12px;
        font-weight: 400;
    }
`;

export const ProviderServiceContent = styled.div`
    padding: 0px 5px 5px;
    height: calc(100% - 130px);

    .service {
        display: flex;
        justify-content: space-between;
    }

    button {
        margin-top: 10px;
    }
`;

export const ProviderServices = styled.div`
    height: calc(100% - 43px);
    overflow-y: auto;
    padding: 0px 0px 5px;

    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        background: #f4ede8;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #ff9000;
        border-radius: 20px;
        border: 3px solid #ff9000;
    }
`;

export const ProductPrice = styled.span`
    font-size: 14px;
    font-weight: 700;

    @media only screen and (max-width: 767px) {
        font-size: 12px;
        font-weight: 700;
    }
`;

export const DiscountedPrice = styled.span`
    font-size: 11px;
    color: #3a3a3a;
    padding: 0 5px;
    position: relative;
    overflow: hidden;
    margin-left: 10px;

    :before {
        content: '';
        width: 100%;
        height: 1.5px;
        display: inline-block;
        background-color: #3a3a3a;
        position: absolute;
        top: 50%;
        left: 0;
    }
`;

export const FooterFilter = styled.div`
    display: flex;
    height: 60px;
    padding: 5px 10px;
    margin-top: 10px;
    margin: 0 auto;

    div + div {
        margin-left: 10px;
    }
`;

export const Pagination = styled.div`
    height: 40px;
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
`;
