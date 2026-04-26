import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CareerAdmin from '../../src/pages/CareerAdmin.jsx';
import {
  createJobOfferFollowUp,
  createApplicantToken,
  fetchCareerApplications,
  fetchApplicantTokens
} from '../../src/lib/api/careerAdmin.js';

vi.mock('../../src/lib/api/careerAdmin.js', () => ({
  createJobOfferFollowUp: vi.fn(),
  createApplicantToken: vi.fn(),
  fetchCareerApplications: vi.fn(),
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
    window.localStorage.setItem('neolabs_admin_token', 'admin-test-token');
    createJobOfferFollowUp.mockReset();
    createApplicantToken.mockReset();
    fetchCareerApplications.mockReset();
    fetchApplicantTokens.mockReset();
  });

  it('loads the admin desk with invites and applicant details', async () => {
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
    fetchCareerApplications.mockResolvedValue({
      applications: [
        {
          id: 42,
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'Prompt Engineer',
          answers: {
            aiTools: 'I use OpenAI for workflow prompts.',
            api: 'An API lets systems exchange data through a contract.',
            modernWorkflows: 'I have built chatbot and automation prototypes.'
          },
          score: 88,
          passed: true,
          passingScore: 70,
          recommendation: 'pass',
          aiGeneratedRisk: 'low',
          categoryScores: {
            authenticity: 18,
            detail: 17,
            structure: 17,
            processThinking: 18,
            modernTechExperience: 18
          },
          strengths: ['Specific examples'],
          concerns: ['None'],
          summary: 'Strong practical answers.',
          applicationStatus: 'assessment_completed',
          followUpSentAt: null,
          earliestStartDate: null,
          gcashAccountNumber: null,
          mobileNumber: null,
          jobOfferDecision: null,
          jobOfferRespondedAt: null,
          createdAt: '2026-04-26T00:00:00.000Z'
        }
      ]
    });

    renderPage();

    expect(await screen.findAllByText('Alex Johnson')).toHaveLength(3);
    expect(screen.getByText(/Open - Candidate to take Exam/i)).toBeInTheDocument();
    expect(screen.getAllByText('Passed')).toHaveLength(3);
    expect(screen.getByText(/Strong practical answers/i)).toBeInTheDocument();
    expect(screen.getByText(/I use OpenAI/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Assessment Completed/i)).toHaveLength(2);
  });

  it('creates an assessment invite and displays the manual link', async () => {
    fetchApplicantTokens.mockResolvedValue({ tokens: [] });
    fetchCareerApplications.mockResolvedValue({ applications: [] });
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
        'admin-test-token'
      );
    });
    expect(await screen.findByDisplayValue('https://careers.neoredlabs.com/careers?token=secure-token')).toBeInTheDocument();
  });

  it('marks follow-up sent and displays the secured offer response link', async () => {
    fetchApplicantTokens.mockResolvedValue({ tokens: [] });
    fetchCareerApplications.mockResolvedValue({
      applications: [
        {
          id: 42,
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'Prompt Engineer',
          answers: {},
          score: 88,
          passed: true,
          passingScore: 70,
          recommendation: 'pass',
          aiGeneratedRisk: 'low',
          categoryScores: {},
          strengths: [],
          concerns: [],
          summary: 'Strong practical answers.',
          applicationStatus: 'assessment_completed',
          jobOfferDecision: null,
          createdAt: '2026-04-26T00:00:00.000Z'
        }
      ]
    });
    createJobOfferFollowUp.mockResolvedValue({
      offerUrl: 'https://careers.neoredlabs.com/offer-response?token=secure-offer-token'
    });

    renderPage();

    fireEvent.click(await screen.findByRole('button', { name: /follow-up sent/i }));

    await waitFor(() => {
      expect(createJobOfferFollowUp).toHaveBeenCalledWith(42, 'admin-test-token');
    });
    expect(await screen.findByDisplayValue('https://careers.neoredlabs.com/offer-response?token=secure-offer-token')).toBeInTheDocument();
  });
});
