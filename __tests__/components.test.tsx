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

import Projects from '../components/Projects';

describe('Projects component', () => {
  it('renders the JDMQADEMO project card', () => {
    render(<Projects />);
    expect(screen.getByText(/Portfolio Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/JDMQADEMO/i)).toBeInTheDocument();
    expect(screen.getByText(/Full-Stack QA Demo Application demonstrating end-to-end ownership./i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GitHub Repo/i })).toHaveAttribute('href', 'https://github.com/josemejias11/jdmqademo');
  });
});
