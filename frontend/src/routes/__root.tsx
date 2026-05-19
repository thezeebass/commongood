import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            Common Good
          </Link>
          <div className="flex gap-4">
            <Link to="/projects" className="text-foreground hover:text-primary">
              Projects
            </Link>
            <Link to="/account" className="text-foreground hover:text-primary">
              Account
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  ),
})
