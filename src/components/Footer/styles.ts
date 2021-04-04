import styled from 'styled-components';

interface IsMobile {
    mobile: boolean;
}

export const Container = styled.div`
    height: 140px;
    width: 100%;
    padding: 10px 10px;
`;

export const Up = styled.div<IsMobile>`
    margin: auto;

    a {
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
        color: black;
        margin: ${(props) => (props.mobile ? '0px 10px' : '0px 20px')};
    }
`;

export const Down = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto 0;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1200px;
    height: 100%;
`;

export const Left = styled.div<IsMobile>`
    display: flex;
    align-items: center;

    p {
        font-size: ${(props) => (props.mobile ? '10px' : '12px')};
        font-weight: 500;
        color: black;
        text-align: center;
    }

    img {
        height: ${(props) => (props.mobile ? '50px' : '70px')};
        margin-right: 20px;
        margin-left: 10px;
    }
`;

export const Right = styled.div<IsMobile>`
    display: flex;
    margin: auto 0;

    .img {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        label {
            width: ${(props) => (props.mobile ? '28px' : '38px')};
            height: ${(props) => (props.mobile ? '28px' : '38px')};
            background: #ff9000;
            border-radius: 50%;
            margin-left: 10px;
            cursor: pointer;
            transition: background-color 0.2s;

            display: flex;
            align-items: center;
            justify-content: center;

            svg {
                width: 20px;
                height: 20px;
                color: #312e38;
            }
        }
    }
`;
