import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApplicantNextStep from '../../src/pages/ApplicantNextStep.jsx';
import {
  submitApplicantContinuation,
  validateApplicantToken
} from '../../src/lib/api/applicantTokens.js';

vi.mock('../../src/lib/api/applicantTokens.js', () => ({
  validateApplicantToken: vi.fn(),
  submitApplicantContinuation: vi.fn()
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
    submitApplicantContinuation.mockReset();
  });

  it('validates the token, prefills applicant details, and removes the token from the URL', async () => {
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

    expect(await screen.findByDisplayValue('Alex Johnson')).toBeInTheDocument();
    expect(screen.getByDisplayValue('alex@example.com')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/next-step');
    expect(window.location.search).toBe('');
  });

  it('submits a confirmation and shows the success state', async () => {
    validateApplicantToken.mockResolvedValue({
      valid: true,
      applicant: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'Prompt Engineer'
      }
    });
    submitApplicantContinuation.mockResolvedValue({ success: true });

    renderPage();

    fireEvent.click(await screen.findByLabelText(/i confirm/i));
    fireEvent.click(screen.getByRole('button', { name: /confirm next step/i }));

    await waitFor(() => {
      expect(submitApplicantContinuation).toHaveBeenCalledWith('secure-token-1234567890');
    });
    expect(await screen.findByText(/your confirmation has been received/i)).toBeInTheDocument();
  });

  it('shows an invalid state for unusable links', async () => {
    validateApplicantToken.mockResolvedValue({ valid: false });

    renderPage('/next-step?token=expired-token-1234567890');

    expect(await screen.findByText(/invalid or has expired/i)).toBeInTheDocument();
  });
});
