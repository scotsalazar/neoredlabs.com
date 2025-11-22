const normalizeJob = (job) => ({
  id: job.id || job.title,
  title: job.title,
  team: job.team,
  location: job.location,
  applyUrl: job.applyUrl || '/careers',
});

export const fetchJobOpenings = async () => {
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
      throw new Error('Job openings are temporarily unavailable. Please try again shortly.');
    }
  } else {
    // Non-JSON responses (e.g., HTML error pages) should surface a friendly error
    await response.text();
    throw new Error('Job openings are temporarily unavailable. Please try again shortly.');
  }

  if (!payload || !Array.isArray(payload.jobs)) {
    throw new Error('Job openings are temporarily unavailable. Please try again shortly.');
  }

  return payload.jobs.map(normalizeJob);
};

export default { fetchJobOpenings };
