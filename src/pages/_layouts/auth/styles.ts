import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100vh;

    .header {
        @media (max-width: 990px) {
            display: none;
            height: 104px;
        }
    }
    .headerMobile {
        @media (min-width: 990px) {
            display: none;
        }
    }

    .content {
        height: calc(100% - 104px);
    }
`;
