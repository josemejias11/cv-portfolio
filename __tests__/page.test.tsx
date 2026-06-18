import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../app/page';

describe('Page component', () => {
  it('renders a main element', () => {
    render(<Page />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});
