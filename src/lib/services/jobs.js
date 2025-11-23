const FALLBACK_JOBS = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    team: 'Engineering',
    location: 'Remote-first',
    applyUrl: '/careers#software-engineer',
  },
  {
    id: 'marketing-specialist',
    title: 'Marketing Specialist',
    team: 'Marketing',
    location: 'Hybrid - EMEA',
    applyUrl: '/careers#marketing-specialist',
  },
  {
    id: 'sales-executive',
    title: 'Sales Executive',
    team: 'Sales',
    location: 'Remote - North America',
    applyUrl: '/careers#sales-executive',
  },
];

const normalizeJob = (job) => ({
  id: job.id || job.title,
  title: job.title,
  team: job.team,
  location: job.location,
  applyUrl: job.applyUrl || '/careers',
});

export const fetchJobOpenings = async () => {
  try {
    const response = await fetch('/api/jobs');
    if (!response.ok) {
      throw new Error('Unable to load open positions right now.');
    }

    const contentType = response.headers.get('content-type') || '';
    let payload;

    if (contentType.includes('application/json')) {
      try {
        payload = await response.json();
      } catch (error) {
        // Malformed JSON or unexpected payload
        throw new Error('Unable to parse job openings.');
      }
    } else {
      // Non-JSON responses (e.g., HTML error pages) should surface a friendly error
      await response.text();
      throw new Error('Received a non-JSON response when loading jobs.');
    }

    if (!payload || !Array.isArray(payload.jobs)) {
      throw new Error('Job payload missing expected shape.');
    }

    const normalized = payload.jobs.map(normalizeJob);
    return normalized.length > 0 ? normalized : FALLBACK_JOBS.map(normalizeJob);
  } catch (error) {
    console.error('Falling back to built-in job openings after error:', error);
    return FALLBACK_JOBS.map(normalizeJob);
  }
};

export default { fetchJobOpenings };
