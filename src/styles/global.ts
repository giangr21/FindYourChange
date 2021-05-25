import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0;
    }

	body {
		background: #312E38;
		color: #FFF;
		-webkit-font-smoothing: antialiased;

        .rc-time-picker-panel-select-option-selected {
            color: black;
        }
        .rc-time-picker-panel-select li {
            color: black;
        }

	}

	body, input, button {
        font-family: 'Roboto Slab', serif;
        font-size: 16px;
	}

    h1,h2,h3,h4,h5,h6,strong {
        font-weight: 500;
    }

    button {
      cursor: pointer;
    }

    :root {
        --color-primary: #ff9000;
        --color-secondary: #3A3A3A;

        --color-black: #333;
        --color-white: #FFF;
        --color-gray: #666;
        --color-blue: #3483fa;
        --color-green: #00a650;

        --color-header: #FFF159;
        --color-search-placeholder: #AAAAAA;
        --color-border: #ddd;

        --reputation-1: #FFE7E6;
        --reputation-2: #FFF4E7;
        --reputation-3: #FFFDE5;
        --reputation-4: #F3FEE0;
        --reputation-5: #00A650;

        --panel-shadow: 0 1px 3px 0 rgba(0,0,0,.3);

        --color-success: #2e656a;
        --color-error: #c53030;
    }

    .Toastify__toast--success {
        background: #2e656a !important;
        font: 14px Roboto Slab, serif !important;
        font-weight: 600 !important;
    }

    .Toastify__toast--error {
        background: #c53030 !important;
        font: 14px Roboto Slab, serif !important;
        font-weight: 600 !important;
    }

`;
