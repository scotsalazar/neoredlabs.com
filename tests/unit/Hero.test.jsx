import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../../src/components/Hero.jsx';

describe('Hero component', () => {
  it('renders hero title and primary action', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
    // The hero headline should be present
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/modern apps shaped around your operations/i);
    // The call-to-action button should exist and link to /contact
    const consultationLink = screen.getByRole('link', { name: /schedule a consultation/i });
    expect(consultationLink).toHaveAttribute('href', '/contact');
  });
});
