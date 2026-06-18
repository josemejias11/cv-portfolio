import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';

describe('Hero component', () => {
  it('renders the title and summary', () => {
    render(<Hero />);
    expect(screen.getByText(/Senior Quality Assurance Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Senior QA with 14 years of experience and a strong bias toward automation engineering./i)).toBeInTheDocument();
  });
});

describe('Experience component', () => {
  it('renders timeline elements', () => {
    render(<Experience />);
    expect(screen.getByText(/Lionbridge - Senior Creative QA Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/dotCMS - Senior QA Specialist/i)).toBeInTheDocument();
  });
});
