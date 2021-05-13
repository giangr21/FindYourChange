import styled from 'styled-components';

interface HeaderProps {
    hideBackgroundColor: boolean;
}

export const Container = styled.div<HeaderProps>`
    background-color: ${(props) => (props.hideBackgroundColor ? '#ff9000' : null)};
`;

export const Content = styled.div<HeaderProps>`
    height: 90px;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin: auto;
    padding: 0px 20px;
    background-color: ${(props) => (props.hideBackgroundColor ? '#ff9000' : null)};
`;

export const Right = styled.div`
    display: flex;
    align-items: center;

    a {
        text-decoration: none;
        margin: 0px 20px 0px 0px;
        color: #fff;
    }
`;

export const Left = styled.div`
    cursor: pointer;

    img {
        width: 100%;
        max-width: 135px;
    }
`;
