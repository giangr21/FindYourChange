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
        fontSize: [17, 30, 60],
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
        color: '#fff',
        marginBottom: [null, null, 20],
        // display: ['block'],
        fontWeight: '500',
        lineHeight: 'body',
        // textAlign: ['left', 'left', 'center'],

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

export const ServiceCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 40px;

    .services {
        padding: 0px 20px;
        display: flex;
        justify-content: center;
        cursor: pointer;

        .service {
            small {
                text-align: center;
                overflow: hidden;
                display: block;
                color: #ff9000;
                margin: 0 auto;
                font-weight: 500;
                letter-spacing: 0.5px;
                font-size: 18px;
                padding: 4px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 12px;
                width: 60%;
            }
        }
    }
`;

export const BoxMobile = styled.div`
    @media only screen and (min-width: 850px) {
        display: none;
    }
    width: 100%;

    .underHeader {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 370px;

        span {
            margin-bottom: 20px;
            letter-spacing: 0.1px;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 0px 20px;
            font-size: 18px;
        }

        .services {
            padding: 0px 20px;
            display: flex;
            justify-content: center;

            .service {
                small {
                    line-height: 16px;
                    text-align: center;
                    overflow: hidden;
                    width: 89px;
                    display: block;
                    color: #fff;
                    margin: 0 auto;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }
            }
        }
    }

    background: rgb(49, 46, 56);
    background: linear-gradient(100deg, rgba(49, 46, 56, 1) 0%, rgba(255, 144, 0, 1) 90%);
`;

export const IconServiceDesktop = styled.div`
    width: 142px;
    height: 142px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    text-align: center;
    margin: 0px 30px 7px;
`;

export const IconService = styled.div`
    width: 102px;
    height: 102px;
    border-radius: 50%;
    background: hsla(0, 0%, 100%, 0.08);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    text-align: center;
    margin: 0px 10px 5px;
`;

export const Container = styled.div`
    height: 100%;
    width: 100%;
    background: #fff;
`;

export const Recommendation = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #ffffff;

    .title {
        color: #3a3a3a;
        font-weight: 500;
        font-size: 28px;
        padding-left: 10px;
        width: 100%;
        margin-bottom: 5px;

        @media only screen and (max-width: 850px) {
            padding-left: 0px;
            display: flex;
            justify-content: center;
        }
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

    @media only screen and (max-width: 850px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export const RecommendationCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 250px;
    cursor: pointer;
    align-items: center;
    padding: 0px 5px;
    margin-bottom: 15px;

    @media only screen and (max-width: 850px) {
        margin-bottom: 10px;
    }

    img {
        width: 275px;
        max-height: 200px;
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
