import styled from 'styled-components';

export const Container = styled.div`
    padding: 5px 5px;
    width: 100%;
    overflow-y: auto;
`;

export const Header = styled.div`
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-weight: 600;
        font-size: 20px;
        color: var(--color-primary);
    }

    svg {
        cursor: pointer;
    }
`;

export const Content = styled.div`
    width: 100%;
    padding: 0px 20px;
`;

export const Clerks = styled.div`
    width: 100%;
    margin: 20px 0px;
`;

export const AppointmentInfo = styled.div`
    width: 100%;
    margin: 20px 0px;
`;

export const AppointmentResume = styled.div`
    width: 100%;
    margin: 10px 0px;
    padding: 0px 5px;
    color: #ff9000;

    .content {
        span {
            color: #ff9000;
            font-size: 16px;
        }
    }

    .buttons {
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        margin: 0 auto;
        margin-top: 20px;
        div + div {
            margin-left: 10px;
        }
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;

    .buttons {
        display: flex;
    }
`;
