import styled from 'styled-components';

interface WrapperProps {
    mobile: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
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

    /* .content {
        height: ${(props) => (props.mobile ? 'calc(100% - 80px)' : 'calc(100% - 104px)')};
    } */
`;
