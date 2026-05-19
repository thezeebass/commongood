import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth'

export const Route = createFileRoute('/account')({
  component: () => {
    const { user, logout } = useAuthStore()

    if (!user) {
      return (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Not logged in</h1>
          <a href="/auth/login" className="text-primary hover:underline">
            Login
          </a>
        </div>
      )
    }

    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account</h1>
        <div className="border rounded-lg p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Name</label>
            <div className="text-lg">{user.name}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <div className="text-lg">{user.email}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Verification Tier</label>
            <div className="text-lg">{user.verificationTier}</div>
          </div>
          <button
            onClick={() => logout()}
            className="w-full bg-destructive text-destructive-foreground px-4 py-2 rounded hover:bg-destructive/90 mt-6"
          >
            Logout
          </button>
        </div>
      </div>
    )
  },
})
