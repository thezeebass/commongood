import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Vote, Shield, Zap, Users } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Direct Democracy,
          <br />
          <span className="text-primary">Powered by Blockchain</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Common Good replaces bureaucratic inefficiency with transparent, 
          citizen-controlled resource allocation. Vote on projects, track funding, 
          and see real results.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/login">Start Participating</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/projects">View Projects</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Vote className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Quadratic Voting</CardTitle>
            <CardDescription>
              Express the intensity of your preferences. More stake = more say, 
              but with diminishing returns to prevent plutocracy.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Transparent Governance</CardTitle>
            <CardDescription>
              Every vote is recorded on the Stellar blockchain. Immutable, 
              auditable, and fully transparent.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-primary mb-2" />
            <CardTitle>AI-Powered Analysis</CardTitle>
            <CardDescription>
              Real-time fraud detection and consensus optimization to ensure 
              fair and efficient decision-making.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Stats */}
      <section className="bg-muted rounded-lg p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">$2.4M</div>
            <div className="text-sm text-muted-foreground">Total Allocated</div>
          </div>
          <div>
            <div className="text-3xl font-bold">1,234</div>
            <div className="text-sm text-muted-foreground">Active Citizens</div>
          </div>
          <div>
            <div className="text-3xl font-bold">89</div>
            <div className="text-sm text-muted-foreground">Projects Funded</div>
          </div>
          <div>
            <div className="text-3xl font-bold">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </div>
      </section>
    </div>
  );
}
