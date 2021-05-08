import { styled } from 'baseui';

export const Card = styled('div', () => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    borderRadius: '6px',
    backgroundColor: '#28262e',
}));

export const TopInfo = styled('div', () => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '50px',
}));

export const TitleWrapper = styled('div', () => ({
    width: 'calc(100% - 60px)',
    display: 'flex',
    flexDirection: 'column',
}));

export const Title = styled('span', ({ $theme }) => ({
    fontSize: '16px',
    fontWeight: 600,
    color: '#ff9000',
    marginBottom: '10px',
}));

export const SubTitle = styled('span', ({ $theme }) => ({
    fontSize: '13px',
    fontWeight: 600,

    color: '#fff',
    marginBottom: '0px',
}));

export const IconBox = styled('div', ({ $theme }) => ({
    width: '48px',
    height: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const Price = styled('span', ({ $theme }) => ({
    fontSize: '21px',
    fontWeight: 600,

    color: '#ff9000',
    marginBottom: '10px',
}));

export const Text = styled('span', ({ $theme }) => ({
    fontSize: '14px',
    fontWeight: 600,

    marginBottom: '50px',
}));

export const Note = styled('span', ({ $theme }) => ({
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
}));

export const Link = styled('a', ({ $theme }) => ({
    fontSize: '13px',
    fontWeight: 600,
    color: '#8A6AFC',

    textDecoration: 'none',
}));
