import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FirstLab title in header', () => {
  render(<App />);
  const headerTitle = screen.getByRole('heading', { name: /FirstLab/i, level: 1 });
  expect(headerTitle).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByRole('heading', { name: /Welcome to FirstLab/i, level: 2 });
  expect(welcomeElement).toBeInTheDocument();
});