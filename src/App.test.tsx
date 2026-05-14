import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './app/providers/AuthProvider';
import App from './App';

function renderApp() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  );
}

test('renders navigation with conduit brand', async () => {
  renderApp();
  const nav = await screen.findByRole('navigation');
  expect(within(nav).getByRole('link', { name: 'conduit' })).toBeInTheDocument();
});
