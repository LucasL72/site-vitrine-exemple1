import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation links', () => {
  render(<App />);
  const linkElement = screen.getByText(/Accueil/i);
  expect(linkElement).toBeInTheDocument();
});
