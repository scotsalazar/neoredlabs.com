import app from '../../server/index.js';

describe('applicant token helpers', () => {
  it('generates high-entropy URL-safe tokens', () => {
    const token = app.generateApplicantToken();

    expect(token).toMatch(/^[A-Za-z0-9_-]{32,}$/);
    expect(token.length).toBeGreaterThanOrEqual(40);
  });

  it('hashes tokens deterministically without storing the raw token', () => {
    const token = app.generateApplicantToken();
    const firstHash = app.hashApplicantToken(token, 'unit-test-secret');
    const secondHash = app.hashApplicantToken(token, 'unit-test-secret');

    expect(firstHash).toBe(secondHash);
    expect(firstHash).not.toBe(token);
    expect(firstHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('detects usable, used, revoked, and expired tokens', () => {
    const future = new Date(Date.now() + 60_000);
    const past = new Date(Date.now() - 60_000);

    expect(app.isApplicantTokenUsable({ expiresAt: future, usedAt: null, revokedAt: null })).toBe(true);
    expect(app.isApplicantTokenUsable({ expiresAt: future, usedAt: new Date(), revokedAt: null })).toBe(false);
    expect(app.isApplicantTokenUsable({ expiresAt: future, usedAt: null, revokedAt: new Date() })).toBe(false);
    expect(app.isApplicantTokenUsable({ expiresAt: past, usedAt: null, revokedAt: null })).toBe(false);
  });
});
