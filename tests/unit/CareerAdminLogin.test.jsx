import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CareerAdminLogin from '../../src/pages/CareerAdminLogin.jsx';
import { createAdminSession } from '../../src/lib/api/careerAdmin.js';

vi.mock('../../src/lib/api/careerAdmin.js', () => ({
  createAdminSession: vi.fn()
}));

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/admin/login']}>
      <Routes>
        <Route path="/admin/login" element={<CareerAdminLogin />} />
        <Route path="/admin/desk" element={<div>Desk opened</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('CareerAdminLogin page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    createAdminSession.mockReset();
  });

  it('stores a valid admin key and opens the desk', async () => {
    createAdminSession.mockResolvedValue({ authenticated: true });
    renderPage();

    fireEvent.change(screen.getByLabelText(/admin key/i), {
      target: { value: 'admin-test-token' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(createAdminSession).toHaveBeenCalledWith('admin-test-token');
    });
    expect(await screen.findByText('Desk opened')).toBeInTheDocument();
    expect(window.localStorage.getItem('neolabs_admin_token')).toBe('admin-test-token');
  });

  it('shows an error when the admin key is rejected', async () => {
    createAdminSession.mockRejectedValue(new Error('Admin authorization failed.'));
    renderPage();

    fireEvent.change(screen.getByLabelText(/admin key/i), {
      target: { value: 'wrong-token' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('Admin authorization failed.')).toBeInTheDocument();
    expect(window.localStorage.getItem('neolabs_admin_token')).toBeNull();
  });
});
