import { fetchCareerApplications } from '../../src/lib/api/careerAdmin.js';

function mockJsonResponse(payload = {}) {
  return {
    ok: true,
    status: 200,
    headers: {
      get: (name) => (name.toLowerCase() === 'content-type' ? 'application/json' : '')
    },
    text: async () => JSON.stringify(payload)
  };
}

describe('career admin API', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue(mockJsonResponse({ applications: [] }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads all career applications when no passed filter is provided', async () => {
    await fetchCareerApplications('admin-test-token');

    expect(global.fetch).toHaveBeenCalledWith('/api/admin/career-applications?', {
      credentials: 'include',
      headers: {
        'x-admin-token': 'admin-test-token'
      }
    });
  });

  it('does not convert an explicit undefined passed filter into passed=true', async () => {
    await fetchCareerApplications('admin-test-token', { passed: undefined });

    expect(global.fetch).toHaveBeenCalledWith('/api/admin/career-applications?', {
      credentials: 'include',
      headers: {
        'x-admin-token': 'admin-test-token'
      }
    });
  });

  it('sends the passed filter when requested', async () => {
    await fetchCareerApplications('admin-test-token', { passed: true });

    expect(global.fetch).toHaveBeenCalledWith('/api/admin/career-applications?passed=true', {
      credentials: 'include',
      headers: {
        'x-admin-token': 'admin-test-token'
      }
    });
  });
});
