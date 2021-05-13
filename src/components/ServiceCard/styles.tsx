import { styled } from 'baseui';
import Images from '../Image';

export const ProductCardWrapper = styled('div', ({ $theme }) => ({
    height: '100%',
    width: '100%',
    backgroundColor: '#f4ede8',
    position: 'relative',
    // fontFamily: $theme.typography.primaryFontFamily,
    cursor: 'pointer',
    borderRadius: '11px',
}));

export const ProductImageWrapper = styled('div', ({ $theme }) => ({
    height: '180px',
    padding: '5px',
    position: 'relative',
    borderBottom: `1px solid #777777`,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '@media only screen and (max-width: 767px)': {
        height: '165px',
    },
}));

export const Image = styled(Images, () => ({
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'inline-block',
}));

export const ProductInfo = styled('div', ({ $theme }) => ({
    padding: '20px 25px 30px',
    '@media only screen and (max-width: 767px)': {
        padding: '15px 20px',
        // minHeight: '123px',
    },
}));

export const ProductTitle = styled('h3', ({ $theme }): any => ({
    fontSize: '16px',
    fontWeight: '700',
    color: '#28262e',
    margin: '0 0 7px 0',
    minHeight: '30px',
    wordBreak: 'break-word',

    '@media only screen and (max-width: 767px)': {
        fontSize: '14px',
        fontWeight: '700',
        margin: '0 0 5px 0',
    },
}));

export const ProductWeight = styled('span', ({ $theme }): any => ({
    fontSize: '14px',
    fontWeight: '700',
    color: '#3A3A3A',
    wordBreak: 'break-word',

    '@media only screen and (max-width: 767px)': {
        fontSize: '12px',
        fontWeight: '700',
    },
}));

export const ProductMeta = styled('div', ({ $theme }) => ({
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '@media only screen and (max-width: 767px)': {
        // minHeight: '32px',
    },
}));

export const ProductPriceWrapper = styled('div', ({ $theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
}));

export const ProductPrice = styled('span', ({ $theme }): any => ({
    fontSize: '14px',
    fontWeight: '700',
    color: $theme.colors.primary,

    '@media only screen and (max-width: 767px)': {
        fontSize: '12px',
        fontWeight: '700',
    },
}));

export const DiscountedPrice = styled('span', ({ $theme }) => ({
    fontSize: '11px',
    color: '#3A3A3A',
    padding: '0 5px',
    position: 'relative',
    overflow: 'hidden',
    margin: '0 10px',

    ':before': {
        content: '""',
        width: '100%',
        height: '1px',
        display: 'inline-block',
        backgroundColor: '#3A3A3A',
        position: 'absolute',
        top: '50%',
        left: '0',
    },
}));

export const SaleTag = styled('span', ({ $theme }): any => ({
    fontSize: '12px',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#ff9000',
    padding: '0 10px',
    lineHeight: '2',
    borderRadius: '12px',
    display: 'inline-block',
    position: 'absolute',
    top: '15px',
    right: '15px',
}));

export const DiscountPercent = styled('span', ({ $theme }): any => ({
    fontSize: '12px',
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: '2',
    backgroundColor: '#ff9000',
    paddingLeft: '20px',
    paddingRight: '15px',
    display: 'inline-block',
    position: 'absolute',
    bottom: '10px',
    right: '0',

    ':before': {
        content: '""',
        position: 'absolute',
        left: '-8px',
        top: '0',
        width: '0',
        height: '0',
        borderStyle: 'solid',
        borderWidth: '0 8px 12px 0',
        borderColor: `transparent #ff9000 transparent transparent`,
    },

    ':after': {
        content: '""',
        position: 'absolute',
        left: '-8px',
        bottom: ' 0',
        width: ' 0',
        height: '0',
        borderStyle: 'solid',
        borderWidth: '0 0 12px 8px',
        borderColor: `transparent transparent #ff9000 transparent`,
    },
}));
