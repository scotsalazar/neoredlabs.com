import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CareerAdmin from '../../src/pages/CareerAdmin.jsx';
import {
  fetchCareerApplications,
  sendCareerNextStepEmail
} from '../../src/lib/api/careerAdmin.js';

vi.mock('../../src/lib/api/careerAdmin.js', () => ({
  fetchCareerApplications: vi.fn(),
  sendCareerNextStepEmail: vi.fn()
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
    fetchCareerApplications.mockReset();
    sendCareerNextStepEmail.mockReset();
  });

  it('loads passed applicants and shows token status', async () => {
    fetchCareerApplications.mockResolvedValue({
      applications: [
        {
          id: 11,
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'Prompt Engineer',
          score: 88,
          summary: 'Strong practical answers.',
          latestToken: { status: 'sent' }
        }
      ]
    });

    renderPage();

    expect(await screen.findByText('Alex Johnson')).toBeInTheDocument();
    expect(screen.getByText(/link status: sent/i)).toBeInTheDocument();
  });

  it('sends a next-step email and refreshes the list', async () => {
    fetchCareerApplications.mockResolvedValue({
      applications: [
        {
          id: 11,
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'Prompt Engineer',
          score: 88,
          summary: 'Strong practical answers.',
          latestToken: null
        }
      ]
    });
    sendCareerNextStepEmail.mockResolvedValue({ success: true });

    renderPage();

    fireEvent.click(await screen.findByRole('button', { name: /send next-step email/i }));

    await waitFor(() => {
      expect(sendCareerNextStepEmail).toHaveBeenCalledWith(11, '');
    });
    expect(await screen.findByText(/next-step email sent/i)).toBeInTheDocument();
  });
});
