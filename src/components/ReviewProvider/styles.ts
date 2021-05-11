import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const NewRecommendation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
`;

export const HeaderReview = styled.div``;

export const Reviews = styled.div`
    width: 100%;
`;

export const Review = styled.div`
    display: flex;
    height: 110px;
    width: 100%;
    background: #f3f4f4;
    margin: 15px 0px;
    padding: 10px 15px;
    border-radius: 10px;
    overflow-y: auto;

    span {
        color: #ff9000;
        font-size: 18px;
    }

    p {
        color: #2a2a2a;
        font-size: 14px;
    }

    img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
    }
`;
