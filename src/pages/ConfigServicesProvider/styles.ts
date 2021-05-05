import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    max-width: 1120px;
    margin: 0px auto;
    padding: 10px 0px;
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
`;

export const Content = styled.div`
    display: flex;
    width: 100%;
    transition: all ease 0.5s;
    flex-direction: column;
`;

export const HeaderContainer = styled.div`
    display: flex;
    height: 60px;
    margin: 0px 10px 5px 10px;
    justify-content: space-between;
    border-radius: 8px;
`;

export const SubHeader = styled.div`
    display: flex;
    height: 20px;
    margin: 0px 5px 5px 5px;
    border-radius: 8px;

    p {
        color: #999591;
        display: flex;
        align-items: center;
        font-weight: 500;
    }
`;
