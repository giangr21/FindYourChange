import { styled } from 'baseui';
import { NavLink as NavLinks } from 'react-router-dom';

export const SidebarWrapper = styled('div', ({ $theme }): any => ({
    width: '270px',
    height: 'auto',
    display: 'flex',
    flexShrink: '0',
    backgroundColor: '#ffffff',
    flexDirection: 'column',

    '@media only screen and (max-width: 767px)': {
        width: 'auto',
        padding: '0',
        height: '100%',
    },
}));

export const MenuWrapper = styled('div', ({ $theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: '45px 0',
    overflowY: 'auto',

    '@media only screen and (max-width: 767px)': {
        padding: '20px 0',
    },
}));

export const NavLink = styled(NavLinks, ({ $theme }) => ({
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.5,
    width: 'calc(100% - 30px)',
    outline: '0',
    color: 'rgb(40, 38, 46)',
    display: 'flex',
    alignItems: 'center',
    padding: '20px 55px 20px 30px',
    textDecoration: 'none',
    transition: '0.15s ease-in-out',

    '@media only screen and (max-width: 767px)': {
        width: '100%',
        padding: '20px 35px',
    },

    '&.active': {
        color: $theme.colors.primary,
        backgroundColor: '#f7f7f7',
        borderRadius: '50px 0 0 50px',
    },
}));

export const Svg = styled('span', ({ $theme }) => ({
    width: '16px',
    marginRight: '15px',
    display: 'flex',
    alignItems: 'center',
}));
export const LogoutBtn = styled('button', ({ $theme }) => ({
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.5,
    width: 'calc(100% - 30px)',
    outline: '0',
    color: 'rgb(40, 38, 46)',
    backgroundColor: 'transparent',
    border: '0',
    display: 'flex',
    alignItems: 'center',
    padding: '20px 55px 20px 30px',
    textDecoration: 'none',
    transition: '0.15s ease-in-out',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: '25px',
    cursor: 'pointer',

    '@media only screen and (max-width: 767px)': {
        width: '100%',
        padding: '20px 35px',
    },
}));
