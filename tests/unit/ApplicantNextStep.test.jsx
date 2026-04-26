import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApplicantNextStep from '../../src/pages/ApplicantNextStep.jsx';
import { validateApplicantToken } from '../../src/lib/api/applicantTokens.js';

vi.mock('../../src/lib/api/applicantTokens.js', () => ({
  validateApplicantToken: vi.fn()
}));

function renderPage(path = '/next-step?token=secure-token-1234567890') {
  window.history.pushState({}, '', path);
  return render(
    <BrowserRouter>
      <ApplicantNextStep />
    </BrowserRouter>
  );
}

describe('ApplicantNextStep page', () => {
  beforeEach(() => {
    validateApplicantToken.mockReset();
  });

  it('validates the token and links to the secured careers assessment', async () => {
    validateApplicantToken.mockResolvedValue({
      valid: true,
      applicant: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'Prompt Engineer'
      },
      expiresAt: '2026-05-03T00:00:00.000Z'
    });

    renderPage();

    expect(await screen.findByText('Alex Johnson')).toBeInTheDocument();
    expect(screen.getByText('alex@example.com')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open assessment/i })).toHaveAttribute(
      'href',
      '/careers?token=secure-token-1234567890'
    );
  });

  it('shows an invalid state for unusable links', async () => {
    validateApplicantToken.mockResolvedValue({ valid: false });

    renderPage('/next-step?token=expired-token-1234567890');

    expect(await screen.findByText(/invalid, expired, or already used/i)).toBeInTheDocument();
  });
});
