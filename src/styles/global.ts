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
