import { render, screen } from '@testing-library/react';
import Hero from '../../src/components/Hero.jsx';

describe('Hero component', () => {
  it('renders hero title and join button', () => {
    render(<Hero />);
    // The hero headline should be present
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/neo\s*redlabs/i);
    // The call-to-action button should exist and link to /careers
    const joinLink = screen.getByRole('link', { name: /join our team/i });
    expect(joinLink).toHaveAttribute('href', '/careers');
  });
});