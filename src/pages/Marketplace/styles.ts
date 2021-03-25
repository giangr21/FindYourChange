import { Form as Unform } from '@unform/web';
import styled from 'styled-components';
import { styled as styledBaseUi } from 'baseui';
import Images from '../../components/Image/Image';

export const Content = styled.div`
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 0px;
    height: 100%;
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 5px;
    height: 100%;
    width: 300px;
    max-width: 300px;
    background: #28262e;
    color: #f4ede8;
    border: 1px solid #f4ede8;
    border-radius: 10px;

    padding: 40px 30px;
    align-items: center;
    /* justify-content: center; */

    p {
        color: #f4ede8;
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
        color: #f4ede8 !important;
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
    background: #28262e;
    color: #f4ede8;
    width: 100%;
    height: 100%;
    padding: 15px;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
`;

export const HeaderResults = styled.div`
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

export const ProductCardWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: #f4ede8;
    position: relative;
    cursor: pointer;
    border-radius: 6px;
`;

export const ProductImageWrapper = styled.div`
    height: 180px;
    padding: 5px;
    position: relative;
    border-bottom: 1px solid #3a3a3a;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 767px) {
        height: 165px;
    }
`;

export const Image = styledBaseUi(Images, () => ({
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'inline-block',
}));

export const ProductInfo = styled.div`
    padding: 5px 20px 10px;
    @media only screen and (max-width: 767px) {
        padding: 15px 20px;
    }
`;

export const ProductTitle = styled.h3`
    font-size: 16px;
    font-weight: 700;
    color: #28262e;
    margin: 0 0 7px 0;
    min-height: 30px;
    word-break: break-word;

    @media only screen and (max-width: 767px) {
        font-size: 14px;
        font-weight: 700;
        margin: 0 0 5px 0;
    }
`;

export const ProductWeight = styled.span`
    font-size: 14px;
    font-weight: 700;
    color: #3a3a3a;
    word-break: break-word;

    @media only screen and (max-width: 767px) {
        fontsize: 12px;
        fontweight: 700;
    }
`;

export const ProductMeta = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media only screen and (max-width: 767px) {
        // minHeight: 32px;
    }
`;

export const ProductPriceWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

export const ProductPrice = styled.span`
    font-size: 14px;
    font-weight: 700;
    color: #ff9000;

    @media only screen and (max-width: 767px) {
        font-size: 12px;
        font-weight: 700;
        margin-right: 5px;
    }
`;
