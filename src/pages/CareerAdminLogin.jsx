import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { fetchApplicantTokens } from '../lib/api/careerAdmin.js';

const adminTokenStorageKey = 'neolabs_admin_token';

const CareerAdminLogin = () => {
  const navigate = useNavigate();
  const [adminToken, setAdminToken] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(adminTokenStorageKey) : '';
    if (stored) {
      setAdminToken(stored);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedToken = adminToken.trim();

    if (!trimmedToken) {
      setError('Enter the admin key.');
      return;
    }

    setChecking(true);
    setError('');

    try {
      await fetchApplicantTokens(trimmedToken);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(adminTokenStorageKey, trimmedToken);
      }
      navigate('/admin/desk');
    } catch (err) {
      setError(err.message || 'Admin login failed.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <Layout
      title="Admin Login | NeoLabs"
      description="Internal admin login for NeoLabs career assessment desk."
    >
      <section className="bg-page-muted">
        <div className="section-container flex min-h-[70vh] items-center py-16">
          <div className="surface-panel mx-auto w-full max-w-xl p-8">
            <p className="eyebrow">Internal admin</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-strong">
              Admin login
            </h1>
            <p className="mt-3 text-sm leading-7 text-copy">
              Enter the admin key to open the career assessment desk.
            </p>

            <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-ink-strong">Admin key</span>
                <input
                  type="password"
                  value={adminToken}
                  onChange={(event) => setAdminToken(event.target.value)}
                  className="w-full rounded-2xl border border-line bg-page px-4 py-3 text-ink outline-none transition focus:border-primary"
                  placeholder="nrla_..."
                  autoComplete="current-password"
                  required
                />
              </label>

              <button type="submit" className="btn-primary justify-self-start" disabled={checking}>
                {checking ? 'Checking...' : 'Login'}
              </button>
            </form>

            {error && <p className="mt-5 text-sm font-medium text-red-500">{error}</p>}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export { adminTokenStorageKey };
export default CareerAdminLogin;
