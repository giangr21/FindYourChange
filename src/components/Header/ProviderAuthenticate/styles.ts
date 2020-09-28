import { Form as Unform } from '@unform/web';
import { shade } from 'polished';
import styled from 'styled-components';

export const Header = styled.header`
    padding: 24px 0;
    background: #28262e;
`;

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    > img {
        height: 80px;
    }

    button {
        /* margin-left: auto; */
        background: transparent;
        border: 0;

        svg {
            color: #999591;
            width: 20px;
            height: 20px;
        }
    }

    .links {
        /* margin-left: auto; */
        /* margin-right: 20px; */
    }

    a {
        margin-right: 30px;
        color: #ff9000;
        text-decoration: none;
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 20px;

    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;

        span {
            color: #f4ede8;
        }

        a {
            text-decoration: none;
            color: #ff9000;
            &:hover {
                opacity: 0.8;
            }
        }
    }
`;
