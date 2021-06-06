import styled from 'styled-components';
import css from '@styled-system/css';
import { shadow } from 'styled-system';

export const StyledForm = styled.form<any>(
    (props) =>
        css({
            display: 'flex',
            alignItems: 'center',
            borderRadius: '12px',
            overflow: 'hidden',
            width: props.minimal ? '100%' : 700,
            color: '#fff',
            background: 'rgba(0,0,0,.4)',

            input: {
                pl: props.minimal ? 0 : 20,
            },
        }),
    shadow,
);

export const StyledInput = styled.input(
    css({
        flexGrow: 1,
        fontSize: 'base',
        pr: 20,
        height: 48,
        color: '#fff',
        background: 'rgba(0,0,0,.4)',
        appearance: 'none',
    }),
    {
        border: 0,
        '&:focus': {
            outline: 0,
        },

        '::placeholder': { color: '#fff', fontWeight: 500 },

        '&::-webkit-input-placeholder, &::-moz-placeholder, &::-moz-placeholder, &::-ms-input-placeholder': {
            fontSize: '15px',
            color: '#fff',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
    },
);

export const StyledCategoryName = styled.span(
    css({
        fontSize: 14,
        fontWeight: '700',
        lineHeight: '38px',
        px: 15,
        color: '#ff9000',
        backgroundColor: '#F7F7F7',
        borderRadius: '6px',
    }),
    {
        margin: '5px',
        whiteSpace: 'nowrap',
        textTransform: 'capitalize',
    },
);

export const StyledSearchButton = styled.button(
    css({
        backgroundColor: '#ff9000',
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    }),
    {
        display: 'flex',
        height: 48,
        alignItems: 'center',
        border: 0,
        outline: 0,
        paddingLeft: 30,
        paddingRight: 30,
        cursor: 'pointer',
        flexShrink: 0,
    },
);
