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

  const payload = await response.json();
  return (payload?.jobs || []).map(normalizeJob);
};

export default { fetchJobOpenings };
