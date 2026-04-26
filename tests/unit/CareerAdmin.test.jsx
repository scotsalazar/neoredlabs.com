import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CareerAdmin from '../../src/pages/CareerAdmin.jsx';
import {
  createApplicantToken,
  fetchApplicantTokens
} from '../../src/lib/api/careerAdmin.js';

vi.mock('../../src/lib/api/careerAdmin.js', () => ({
  createApplicantToken: vi.fn(),
  fetchApplicantTokens: vi.fn()
}));

function renderPage() {
  return render(
    <BrowserRouter>
      <CareerAdmin />
    </BrowserRouter>
  );
}

describe('CareerAdmin page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    createApplicantToken.mockReset();
    fetchApplicantTokens.mockReset();
  });

  it('loads recent assessment invites and shows token status', async () => {
    fetchApplicantTokens.mockResolvedValue({
      tokens: [
        {
          id: 11,
          name: 'Alex Johnson',
          email: 'alex@example.com',
          status: 'created',
          expiresAt: '2026-05-03T00:00:00.000Z',
          careerApplicationId: 42,
          applicationPassed: true
        }
      ]
    });

    renderPage();

    expect(await screen.findByText('Alex Johnson')).toBeInTheDocument();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
    expect(screen.getByText('Passed')).toBeInTheDocument();
  });

  it('creates an assessment invite and displays the manual link', async () => {
    fetchApplicantTokens.mockResolvedValue({ tokens: [] });
    createApplicantToken.mockResolvedValue({
      inviteUrl: 'https://careers.neoredlabs.com/careers?token=secure-token',
      token: {
        id: 12,
        name: 'Alex Johnson',
        email: 'alex@example.com',
        status: 'created'
      }
    });

    renderPage();

    fireEvent.change(await screen.findByLabelText(/applicant name/i), {
      target: { value: 'Alex Johnson' }
    });
    fireEvent.change(screen.getByLabelText(/applicant email/i), {
      target: { value: 'alex@example.com' }
    });
    fireEvent.click(screen.getByRole('button', { name: /create secure link/i }));

    await waitFor(() => {
      expect(createApplicantToken).toHaveBeenCalledWith(
        { name: 'Alex Johnson', email: 'alex@example.com' },
        ''
      );
    });
    expect(await screen.findByDisplayValue('https://careers.neoredlabs.com/careers?token=secure-token')).toBeInTheDocument();
  });
});
