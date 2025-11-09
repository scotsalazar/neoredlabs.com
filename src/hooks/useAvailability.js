import { useCallback, useEffect, useState } from 'react';
import { getAvailabilityForDate } from '../lib/services/availability.js';

const initialState = {
  availableSlots: [],
  bookedSlots: [],
  loading: false,
  error: null,
};

const useAvailability = (date) => {
  const [state, setState] = useState(initialState);

  const loadAvailability = useCallback(
    async (requestedDate = date) => {
      if (!requestedDate) {
        setState({ ...initialState });
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const availability = await getAvailabilityForDate(requestedDate);
        setState({
          availableSlots: availability.availableSlots,
          bookedSlots: availability.bookedSlots,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          availableSlots: [],
          bookedSlots: [],
          loading: false,
          error: error?.message || 'Unable to load availability for the selected date.',
        });
      }
    },
    [date],
  );

  useEffect(() => {
    if (date) {
      loadAvailability(date);
    } else {
      setState({ ...initialState });
    }
  }, [date, loadAvailability]);

  return {
    ...state,
    refresh: loadAvailability,
  };
};

export default useAvailability;
