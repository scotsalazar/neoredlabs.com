import { useEffect, useState } from 'react';
import { fetchJobOpenings } from '../lib/services/jobs.js';

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const useJobOpenings = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const jobs = await fetchJobOpenings();
        if (isMounted) {
          setState({ jobs, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ jobs: [], loading: false, error: error?.message || 'Unable to load jobs' });
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};

export default useJobOpenings;
