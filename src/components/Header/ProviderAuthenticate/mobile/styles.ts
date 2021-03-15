import { styled } from 'baseui';

export const TopbarWrapper = styled('div', () => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#28262e',
    padding: '30px 60px',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06)',
    position: 'relative',

    '@media only screen and (max-width: 767px)': {
        padding: '20px',
        height: '80px',
    },

    '@media only screen and (max-width: 1440px)': {
        padding: '20px 45px',
    },
}));

export const DrawerWrapper = styled('div', ({ $theme }): any => ({
    '@media only screen and (min-width: 1200px)': {
        display: 'none',
    },
}));

export const DrawerIcon = styled('div', ({ $theme }) => ({
    color: '#ff9000',
    cursor: 'pointer',
}));

export const CloseButton = styled('button', ({ $theme }) => ({
    color: '#ff9000',
    backgroundColor: 'transparent',
    outline: '0',
    border: 'none',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '20px',
    right: '30px',
    cursor: 'pointer',
}));
