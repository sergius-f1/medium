import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLoginForm } from './useLoginForm';
import { AuthProvider } from '../../../app/providers/AuthProvider';
import { ApiError } from '../../../shared/api';
import * as authApi from '../api';

jest.mock('../api');

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({ push: mockPush }),
}));

function TestLoginForm() {
  const { email, setEmail, password, setPassword, errors, isLoading, handleSubmit } = useLoginForm();
  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        data-testid="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.map((err) => (
        <p key={err} data-testid="error">{err}</p>
      ))}
      <button type="submit" disabled={isLoading}>Submit</button>
    </form>
  );
}

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {ui}
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
}

describe('useLoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('redirects to home on successful login', async () => {
    (authApi.login as jest.Mock).mockResolvedValue({
      user: { email: 'alice@example.com', token: 'token', username: 'alice', bio: '', image: '' },
    });

    renderWithProviders(<TestLoginForm />);

    fireEvent.change(screen.getByTestId('email'), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('shows error on invalid credentials', async () => {
    (authApi.login as jest.Mock).mockRejectedValue(
      new ApiError(401, { body: ['is invalid'] })
    );

    renderWithProviders(<TestLoginForm />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Invalid email or password.');
    });
  });
});
