import { shade } from 'polished';
import styled from 'styled-components';
import { Row as Rows, Col as Cols } from 'react-styled-flexboxgrid';

interface ContentProps {
    center: boolean;
}

export const Container = styled.div`
    width: 100%;
    height: calc(100vh - 230px);
    max-width: 1200px;
    margin: 0 auto;
    padding: 5px;
`;

export const Row = styled(Rows)`
    @media only screen and (min-width: 0em) and (max-width: 47.99em) {
        margin-bottom: 15px;
        &:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
        }
    }
`;

export const Col = styled(Cols)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    @media only screen and (min-width: 0em) and (max-width: 47.99em) {
        margin-bottom: 10px;
    }
`;

export const ContentAppointments = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 0px 20px;

    h1 {
        text-align: center;
    }

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

export const UserReviews = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

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

export const Appointments = styled.div`
    display: flex;
    flex-direction: row;
    height: 180px;

    .left {
        width: 77%;
        overflow-y: auto;

        ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
    }

    .right {
        width: 23%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        border-left: 1px solid #f3f4f4;

        .hour {
            font-size: 16px;
            color: #f3f4f4;
        }
        .day {
            font-size: 34px;
            font-weight: bold;
            margin: 5px 0px;
        }
        .month {
            font-size: 16px;
            color: #f3f4f4;
            text-transform: capitalize;
        }
    }
`;

export const Content = styled.div<ContentProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    form {
        height: 100%;
        width: 90%;
        display: flex;
        flex-direction: column;
        padding: 0px 10px;
        text-align: center;
        justify-content: ${(props) => (props.center ? 'center' : undefined)};

        h1 {
            font-size: 20px;
            text-align: left;
            margin-bottom: 24px;
        }

        button {
            background: #ff9000;
            height: 56px;
            border-radius: 10px;
            border: 0;
            padding: 0 16px;
            color: #312e38;
            width: 100%;
            font-weight: 500;
            margin-top: 16px;
            transition: background-color 0.2s;
            &:hover {
                background: ${shade(0.2, '#ff9000')};
            }
        }

        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }
    }
`;

export const AvatarInput = styled.div`
    margin-top: 12px;
    margin-bottom: 32px;
    position: relative;
    align-self: center;
    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }
    label {
        position: absolute;
        width: 48px;
        height: 48px;
        background: #ff9000;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        border: 0;
        cursor: pointer;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
            display: none;
        }
        svg {
            width: 20px;
            height: 20px;
            color: #312e38;
        }
        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }
    }
`;

// export const ImgPreview = styled.div`
//     width: 100%;
//     padding: 60px 20px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: relative;

//     img {
//         display: block;
//         max-width: 100%;
//         max-height: 550px;
//         height: auto;
//     }

//     @media (max-width: 990px) {
//         padding: 30px 40px 60px;
//     }
//     @media (max-width: 767px) {
//         flex: 0 0 100%;
//         max-width: 100%;
//         padding: 30px 25px 60px;
//         order: 0;
//     }
// `;
