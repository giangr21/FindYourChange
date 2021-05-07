import styled from 'styled-components';

interface ContainerProps {
    isSelectedClerk: boolean;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #f3f4f4;
    border-radius: 11px;
    border: ${(props) => (props.isSelectedClerk ? '2px solid #ff9000' : '')};
    padding: 15px 10px;
    margin-bottom: 10px;

    svg {
        margin: 0px 5px;
        color: #ff9000;
        font-size: 20px;
    }

    img {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        border-color: #ff9000;
    }

    .name {
        margin-left: 4px;
        display: flex;
        flex-direction: column;
        color: #2a2a2a;
        height: 100%;
        width: 100%;
        font-weight: 500;

        span {
            align-items: center;
            margin: auto 0;
        }

        .row {
            display: flex;
            align-items: center;
        }
    }
`;
