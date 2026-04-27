import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Careers from '../../src/pages/Careers.jsx';
import {
  claimApplicantToken,
  resumeApplicantToken,
  validateApplicantToken
} from '../../src/lib/api/applicantTokens.js';

vi.mock('../../src/lib/api/applicantTokens.js', () => ({
  claimApplicantToken: vi.fn(),
  resumeApplicantToken: vi.fn(),
  validateApplicantToken: vi.fn()
}));

function renderPage(path = '/careers') {
  window.history.pushState({}, '', path);
  return render(
    <BrowserRouter>
      <Careers />
    </BrowserRouter>
  );
}

describe('Careers assessment invite flow', () => {
  beforeEach(() => {
    window.localStorage.clear();
    claimApplicantToken.mockReset();
    resumeApplicantToken.mockReset();
    validateApplicantToken.mockReset();
    vi.unstubAllGlobals();
  });

  it('resumes a saved assessment when the original invite link has already been claimed', async () => {
    window.localStorage.setItem(
      'neolabs_career_assessment_session',
      JSON.stringify({
        resumeToken: 'saved-resume-token-1234567890',
        applicant: {
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'Prompt Engineer'
        },
        formState: {
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'Prompt Engineer',
          answers: {
            q1: 'Saved AI tools answer',
            q2: '',
            q3: ''
          },
          ownerAnswers: {
            projectOwnership: '',
            offsiteSalesFocus: '',
            crossFunctionalGrowth: ''
          }
        },
        wizardStep: 2
      })
    );
    validateApplicantToken.mockResolvedValue({ valid: false });
    resumeApplicantToken.mockResolvedValue({
      valid: true,
      applicant: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'Prompt Engineer'
      }
    });

    renderPage('/careers?token=already-claimed-token-1234567890');

    expect(await screen.findByText(/Assessment resumed for Alex Johnson/i)).toBeInTheDocument();
    expect(screen.getByText('Three quick questions')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Saved AI tools answer')).toBeInTheDocument();
    expect(validateApplicantToken).toHaveBeenCalledWith(
      'already-claimed-token-1234567890',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(resumeApplicantToken).toHaveBeenCalledWith(
      'saved-resume-token-1234567890',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  it('submits a resumed assessment with the saved resume token', async () => {
    window.localStorage.setItem(
      'neolabs_career_assessment_session',
      JSON.stringify({
        resumeToken: 'saved-resume-token-1234567890',
        applicant: {
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'Prompt Engineer'
        },
        formState: {
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'Prompt Engineer',
          answers: {
            q1: 'I use AI tools for workflow drafts.',
            q2: 'An API is a contract for software systems to exchange data.',
            q3: 'I have built chatbot and automation prototypes.'
          },
          ownerAnswers: {
            projectOwnership: 'Yes, I can own delivery and follow-through.',
            offsiteSalesFocus: 'Yes, I can commit to weekly outreach focus.',
            crossFunctionalGrowth: 'Yes, contract terms are workable for me.'
          }
        },
        wizardStep: 3
      })
    );
    resumeApplicantToken.mockResolvedValue({
      valid: true,
      applicant: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'Prompt Engineer'
      }
    });
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({
        assessment: {
          applicationId: 42,
          score: 88,
          passed: true,
          passingScore: 70,
          recommendation: 'pass',
          aiGeneratedRisk: 'low',
          summary: 'Strong practical answers.',
          categoryScores: {},
          strengths: [],
          concerns: []
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }))
      .mockRejectedValueOnce(new Error('Webhook unavailable'));
    vi.stubGlobal('fetch', fetchMock);

    renderPage('/careers');

    expect(await screen.findByText('Final alignment questions')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /submit application/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/career-assessment',
        expect.objectContaining({
          body: expect.stringContaining('"resumeToken":"saved-resume-token-1234567890"')
        })
      );
    });
    expect(await screen.findByText(/Application Received/i)).toBeInTheDocument();
    expect(screen.queryByText(/session is invalid/i)).not.toBeInTheDocument();
  });
});
