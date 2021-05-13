import { styled as styledBaseUi } from 'baseui';
import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const CloseButton = styledBaseUi('button', ({ $theme }) => ({
    color: '#ff9000',
    backgroundColor: 'transparent',
    outline: '0',
    border: 'none',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '20px',
    right: '30px',
    cursor: 'pointer',
}));
export const SidebarWrapper = styledBaseUi('div', ({ $theme }): any => ({
    width: '270px',
    height: 'auto',
    display: 'flex',
    flexShrink: '0',
    backgroundColor: '#ffffff',
    flexDirection: 'column',

    '@media only screen and (max-width: 767px)': {
        width: 'auto',
        padding: '0',
        height: '100%',
    },
}));

export const ContentSearch = styled(Unform)`
    color: #28262e;
    font-family: 'Roboto Slab', serif;

    p {
        /* color: #f4ede8; */
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 20px;
    }

    span {
        font-size: 15px;
        /* padding-bottom: 10px; */
    }

    flex: auto;
    .separator {
        height: 2px;
        background-color: #3a3a3a;
        margin: 15px 0px;
    }

    input[type='radio'] {
        cursor: pointer;
    }

    .radioButton span {
        color: #28262e !important;
        cursor: pointer !important;
        margin-left: 10px !important;
        margin-right: 20px !important;
        font-weight: 400;
    }

    input[type='radio']:after {
        width: 16px;
        height: 16px;
        border-radius: 11px;
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
        width: 16px;
        height: 16px;
        border-radius: 11px;
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
