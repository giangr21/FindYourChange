import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../components/Loading';

test('renders learn react link', () => {
    render(<Loading />);
    // screen.debug();
    const linkElement = screen.getByTitle(/FYC/i);
    expect(linkElement).toBeInTheDocument();
});
