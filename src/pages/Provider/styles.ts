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

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 5px;
    height: 100%;
    width: 350px;
    max-width: 300px;
    background: #f3f4f4;
    color: #3a3a3a;
    border: 1px solid #3a3a3a;
    border-radius: 10px;

    padding: 5px 10px;

    img {
        width: 100%;
        height: 200px;
        margin-bottom: 15px;
    }
    /* flex-direction: column; */
    text-align: center;
    /* justify-content: center; */

    p {
        color: #312e38;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    span {
        font-size: 15px;
        /* padding-bottom: 10px; */
    }

    .separator {
        height: 2px;
        background-color: #3a3a3a;
        margin: 5px 0px;
        width: 100%;
    }
`;

export const ScheduleInfo = styled.div`
    .schedule {
        display: flex;
        justify-content: space-between;
        margin: 10px 0px;
    }

    .day {
        font-weight: 500;
    }
`;

export const ProviderInfo = styled.div`
    width: 100%;
    color: #ff9000;
    padding: 0px 5px;

    .service {
        span {
            color: #3a3a3a;
            font-size: 18px;
        }

        p {
            color: #ff9000;
            font-size: 14px;
        }

        margin-bottom: 10px;
    }

    .separator {
        height: 2px;
        background-color: #3a3a3a;
        margin: 10px 0px;
        width: 100%;
    }
`;

export const ProviderService = styled.div`
    width: 100%;
    height: 55px;
    background: #f3f4f4;
    border-radius: 10px;
    margin: 10px 0px;
    padding: 5px 20px;
    display: flex;
    align-items: center;

    span {
        color: #2a2a2a;
        font-size: 18px;
    }

    p {
        color: #5a5a5a;
        font-size: 12px;
    }
`;

export const ProviderContent = styled.div`
    padding: 5px 10px;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    img {
        width: 100%;
        height: 300px;
    }
`;

export const ProviderInfoHeader = styled.div`
    position: relative;
    width: 100%;
    padding: 0px 34px;
    top: -120px;
    display: flex;
    flex-direction: column;

    span {
        position: absolute;
        color: #fff;
        font-size: 16px;
        font-weight: 500;
    }

    .legalName {
        color: #ff9000;
        font-size: 40px;
    }

    .city {
        padding-top: 57px;
        font-size: 16px;
        font-weight: 400;
    }

    .servicesAvailable {
        padding-top: 85px;
        font-size: 18px;
        font-weight: 400;
    }
`;
