import { createFileRoute, redirect } from '@tanstack/react-router';
import { DashboardPage } from '@/pages/dashboard';
import { getAuthToken } from '@/api/client';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    if (!getAuthToken()) {
      throw redirect({ to: '/login' });
    }
  },
  component: DashboardPage,
});
