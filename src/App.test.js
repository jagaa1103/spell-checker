import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Spell Checker', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/spell checker/i);
  expect(linkElement).toBeInTheDocument();
});
