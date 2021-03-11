import styled from 'styled-components';
import { styled as baseuiStyled } from 'baseui';
import { NavLink as RRNavLink } from 'react-router-dom';

export const Container = styled.div`
    padding: 10px 10px;
    height: 70px;
    max-height: 70px;
    background-color: var(--color-primary);
`;

export const Content = styled.div`
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    background-color: var(--color-primary);
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
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const UserDropdowItem = baseuiStyled('div', (): any => ({
    display: 'flex',
    flexDirection: 'column',
}));

export const NavLink = baseuiStyled(RRNavLink, ({ $theme }): any => ({
    fontSize: '16px',
    fontWeight: '700',
    color: 'rgb(102, 109, 146)',
    lineHeight: '1.2em',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    margin: '0',
    padding: '16px 20px',
    borderBottom: '1px solid rgb(247, 247, 247)',
    transition: '0.15s ease-in-out',
    cursor: 'pointer',

    ':hover': {
        color: '#ff9000',
    },
}));

export const LogoutBtn = baseuiStyled('button', ({ $theme }): any => ({
    fontSize: '16px',
    fontWeight: '700',
    color: 'rgb(102, 109, 146)',
    backgroundColor: 'transparent',
    lineHeight: '1.2em',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    margin: '0',
    padding: '16px 20px',
    border: '0',
    outline: '0',
    transition: '0.15s ease-in-out',
    cursor: 'pointer',
    ':hover': {
        color: '#ff9000',
    },
}));

export const ProfileImg = baseuiStyled('div', (): any => ({
    width: '50px',
    height: '50px',
    display: 'flex',
    borderRadius: '50%',
    border: '2px solid #ffffff',
    overflow: 'hidden',
    cursor: 'pointer',
    flexShrink: '0',
}));

export const Image = baseuiStyled('img', (): any => ({
    width: '100%',
    height: '100%',
}));
