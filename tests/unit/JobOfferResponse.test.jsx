import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import JobOfferResponse from '../../src/pages/JobOfferResponse.jsx';
import {
  submitJobOfferResponse,
  validateJobOfferToken
} from '../../src/lib/api/jobOfferTokens.js';

vi.mock('../../src/lib/api/jobOfferTokens.js', () => ({
  submitJobOfferResponse: vi.fn(),
  validateJobOfferToken: vi.fn()
}));

function renderPage(initialPath = '/offer-response?token=secure-offer-token') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/offer-response" element={<JobOfferResponse />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('JobOfferResponse page', () => {
  beforeEach(() => {
    submitJobOfferResponse.mockReset();
    validateJobOfferToken.mockReset();
  });

  it('loads applicant details and submits an accepted job offer response', async () => {
    validateJobOfferToken.mockResolvedValue({
      valid: true,
      applicant: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'Prompt Engineer',
        status: 'follow_up_sent'
      }
    });
    submitJobOfferResponse.mockResolvedValue({
      success: true,
      decision: 'accepted',
      status: 'job_offer_accepted'
    });

    renderPage();

    expect(await screen.findByText('Alex Johnson')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/earliest start date/i), {
      target: { value: '2026-05-15' }
    });
    fireEvent.change(screen.getByLabelText(/mobile number \/ gcash/i), {
      target: { value: '09171234567' }
    });
    fireEvent.click(screen.getByRole('radio', { name: 'Yes' }));
    expect(screen.queryByRole('button', { name: /review and submit/i })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /accept job offer/i }));
    expect(await screen.findByText(/Accept this job offer/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /confirm accept/i }));

    await waitFor(() => {
      expect(submitJobOfferResponse).toHaveBeenCalledWith(expect.objectContaining({
        token: 'secure-offer-token',
        earliestStartDate: '2026-05-15',
        mobileNumberGcash: '09171234567',
        hasWorkingComputer: true,
        decision: 'accepted'
      }));
    });
    expect(await screen.findByText(/Job offer accepted/i)).toBeInTheDocument();
  });

  it('uses decline as a direct proceed action with confirmation', async () => {
    validateJobOfferToken.mockResolvedValue({
      valid: true,
      applicant: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'Prompt Engineer',
        status: 'follow_up_sent'
      }
    });
    submitJobOfferResponse.mockResolvedValue({
      success: true,
      decision: 'declined',
      status: 'job_offer_declined'
    });

    renderPage();

    expect(await screen.findByText('Alex Johnson')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/earliest start date/i), {
      target: { value: '2026-05-15' }
    });
    fireEvent.change(screen.getByLabelText(/mobile number \/ gcash/i), {
      target: { value: '09171234567' }
    });
    fireEvent.click(screen.getByRole('radio', { name: 'No' }));
    fireEvent.click(screen.getByRole('button', { name: /decline/i }));
    expect(await screen.findByText(/Decline this job offer/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /confirm decline/i }));

    await waitFor(() => {
      expect(submitJobOfferResponse).toHaveBeenCalledWith(expect.objectContaining({
        hasWorkingComputer: false,
        decision: 'declined'
      }));
    });
    expect(await screen.findByText(/Job offer declined/i)).toBeInTheDocument();
  });

  it('shows an invalid link state', async () => {
    validateJobOfferToken.mockResolvedValue({ valid: false });
    renderPage();

    expect(await screen.findByText(/invalid, expired, or already used/i)).toBeInTheDocument();
  });
});
