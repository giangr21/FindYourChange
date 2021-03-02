import { styled } from 'baseui';
import { Row as Rows, Col as Cols } from 'react-styled-flexboxgrid';

export const Row = styled(Rows, () => ({
    margin: '0 -15px 30px',

    ':last-child': {
        marginBottom: '0px',
    },
}));

export const Col = styled(Cols, () => ({
    padding: '0 15px',
}));
