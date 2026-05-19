import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wallet, Vote, TrendingUp, Award } from 'lucide-react';

export function DashboardPage() {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const stats = {
    totalVotes: 12,
    totalAllocated: 2400,
    votingPower: user?.votingWeight || 1,
    projectsParticipated: 8,
  };

  const recentVotes = [
    { project: 'Community Garden', vote: 'Yes', amount: 200, date: '2026-05-15' },
    { project: 'Solar Panels', vote: 'Yes', amount: 500, date: '2026-05-10' },
    { project: 'Road Repair', vote: 'No', amount: 100, date: '2026-05-05' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
            <Vote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVotes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Allocated</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalAllocated.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voting Power</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.votingPower}x</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projectsParticipated}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Votes</CardTitle>
          <CardDescription>Your voting history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentVotes.map((vote, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{vote.project}</p>
                  <p className="text-sm text-muted-foreground">{vote.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={vote.vote === 'Yes' ? 'default' : 'destructive'}>
                    {vote.vote}
                  </Badge>
                  <span className="font-medium">${vote.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
