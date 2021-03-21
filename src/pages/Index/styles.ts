import styled from 'styled-components';
import { background, compose, space, color, layout, position, flexbox, border } from 'styled-system';
import css from '@styled-system/css';

export const Box = styled.div<any>(
    css({
        height: ['auto', 'auto', '600px', '70vh'],
    }),
    {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        // backgroundColor: #f7f7f7;

        '@media (max-width: 990px)': {
            padding: '80px 0 25px',
        },
    },
    compose(space, color, layout, position, flexbox, border),
);
export const Image = styled.div<any>(
    css({
        backgroundSize: ['cover'],
    }),
    {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        '@media (max-width: 990px) and (min-width: 768px)': {
            backgroundPosition: 'inherit',
        },
    },
    background,
);

export const Content = styled.div(
    css({
        px: ['20px', '20px', '15px'],
        pt: [0],
    }),
    {
        position: 'relative',
        zIndex: 2,
        width: '100%',
    },
);
export const Title = styled.h2(
    css({
        fontSize: [17, 30, 45],
        color: '#ff9000',
        fontWeight: '700',
    }),
    {
        marginBottom: 15,
        textAlign: 'center',
    },
);
export const Description = styled.p(
    css({
        fontSize: [15, 19],
        color: '#3A3A3A',
        marginBottom: [null, null, 60],
        display: ['block'],
        fontWeight: '400',
        lineHeight: 'body',
        textAlign: ['left', 'left', 'center'],

        '@media (max-width: 990px)': {
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingRight: '15px',
        },
    }),
);

export const ContentRow = styled.div(
    css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,

        button: {
            padding: 0,

            ':before': {
                content: '""',
                width: 5,
                height: 5,
                display: 'block',
                borderRadius: '50%',
                backgroundColor: '#FFAD5E',
                marginRight: '7px',
            },
        },
    }),
);

export const SearchWrapper = styled.div(
    css({
        display: 'flex',
        justifyContent: 'center',
    }),
);

export const Container = styled.div`
    height: 100%;
    width: 100%;
    background: #fff;
`;

export const Recommendation = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    height: 360px;
    /* max-height: 500px; */
    background-color: #ffffff;

    .title {
        color: #3a3a3a;
        font-weight: 500;
        font-size: 30px;
    }

    .separator {
        height: 2px;
        background-color: #3a3a3a;
    }
`;

export const RecommendationContent = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    color: #3a3a3a;
`;

export const RecommendationCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    cursor: pointer;
    /* text-align: center; */
    align-items: center;

    img {
        width: 275px;
        border-radius: 10px;
    }

    span {
        font-weight: 500;
        font-size: 18px;
    }

    p {
        font-size: 14px;
        color: #3a3a3a;
        opacity: 0.8;
    }
`;
