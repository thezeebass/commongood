import { Link } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { useFreighter } from '@/hooks/useFreighter';
import { useWalletStore } from '@/stores/walletStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vote, Wallet, LogOut, User } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isAvailable, connectWallet } = useFreighter();
  const { address, isConnected } = useWalletStore();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Vote className="h-6 w-6 text-primary" />
            <span>Common Good</span>
          </Link>

          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {isConnected ? (
                <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
                  <Wallet className="h-3 w-3" />
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </Badge>
              ) : isAvailable ? (
                <Button variant="outline" size="sm" onClick={connectWallet}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : null}

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium hidden sm:inline">{user?.name}</span>
              </div>

              <Button variant="ghost" size="sm" onClick={() => logout()}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
