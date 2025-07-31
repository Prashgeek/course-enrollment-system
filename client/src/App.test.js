import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app brand text', () => {
  render(<App />);
  const brandElement = screen.getByRole('link', { name: /course hub/i });
  expect(brandElement).toBeInTheDocument();
});
