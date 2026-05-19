import { Navbar } from './Navbar';
import { Outlet } from '@tanstack/react-router';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  );
}
