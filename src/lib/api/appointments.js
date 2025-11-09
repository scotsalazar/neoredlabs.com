import { useCallback, useEffect, useRef, useState } from 'react';

const API_BASE = '/api';

function buildError(message, details) {
  const error = new Error(message);
  if (details) {
    error.details = details;
  }
  return error;
}

async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    // ignore json parse errors
  }

  const message = payload?.error || `Request failed with status ${response.status}`;
  throw buildError(message, payload);
}

export async function fetchAvailableSlots(date, { signal } = {}) {
  if (!date) {
    throw buildError('A date is required to load available slots.');
  }
  const search = new URLSearchParams({ date });
  const response = await fetch(`${API_BASE}/available-slots?${search.toString()}`, { signal });
  return handleResponse(response);
}

export async function createAppointment(data, { signal } = {}) {
  const response = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    signal
  });

  return handleResponse(response);
}

export function useAvailableSlots(date) {
  const [state, setState] = useState({ loading: false, error: null, slots: [] });
  const abortRef = useRef();

  const load = useCallback(async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    if (!date) {
      setState({ loading: false, error: null, slots: [] });
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const payload = await fetchAvailableSlots(date, { signal: controller.signal });
      setState({ loading: false, error: null, slots: payload.slots || [] });
    } catch (error) {
      setState({ loading: false, error, slots: [] });
    }
  }, [date]);

  useEffect(() => {
    load();
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [load]);

  return {
    slots: state.slots,
    loading: state.loading,
    error: state.error,
    refetch: load
  };
}

export function useAppointmentSubmission() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const payload = await createAppointment(data);
      setResult(payload);
      return payload;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    submit,
    reset,
    result,
    loading,
    error
  };
}

export default {
  fetchAvailableSlots,
  createAppointment,
  useAvailableSlots,
  useAppointmentSubmission
};
