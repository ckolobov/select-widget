import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders selected items amount', () => {
  render(<App />);
  const linkElement = screen.getByText(/selected items/i);
  expect(linkElement).toBeInTheDocument();
});
