import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { getProject } from '@/api/projects';
import { submitVote, getVoteStats } from '@/api/votes';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { LoadingSpinner } from '@/components/ui/loading';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, ThumbsUp, ThumbsDown, Users, Target, Calendar, Wallet } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function ProjectPage() {
  const { projectId } = useParams({ from: '/projects/$projectId' });
  const { isAuthenticated } = useAuth();
  const { subscribeToProject } = useWebSocket();

  const [voteIntensity, setVoteIntensity] = useState(1);
  const [voteValue, setVoteValue] = useState<boolean | null>(null);

  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['projects', Number(projectId)],
    queryFn: () => getProject(Number(projectId)),
  });

  const { data: stats } = useQuery({
    queryKey: ['votes', Number(projectId)],
    queryFn: () => getVoteStats(Number(projectId)),
    enabled: !!projectId,
  });

  const voteMutation = useMutation({
    mutationFn: submitVote,
    onSuccess: () => {
      toast({
        title: 'Vote Submitted',
        description: 'Your vote has been recorded on the blockchain.',
      });
      setVoteValue(null);
      setVoteIntensity(1);
    },
    onError: (error: Error) => {
      toast({
        title: 'Vote Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Subscribe to real-time updates when project loads
  useState(() => {
    if (projectId) {
      subscribeToProject(Number(projectId));
    }
  });

  const handleVote = () => {
    if (voteValue === null) return;

    voteMutation.mutate({
      projectId: Number(projectId),
      voteValue,
      voteIntensity,
      delegatedTo: null,
    });
  };

  const calculateVoteCost = () => {
    if (!project) return 0;
    const baseCost = project.costPerParticipant;
    return voteIntensity > 1 ? baseCost * Math.pow(voteIntensity, 2) : baseCost;
  };

  if (projectLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Project not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground mt-2">{project.description}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Funding Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={(project.currentFunding / project.fundingGoal) * 100} />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  ${project.currentFunding.toLocaleString()} raised
                </span>
                <span className="font-medium">
                  ${project.fundingGoal.toLocaleString()} goal
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{milestone.title}</p>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      <p className="text-sm font-medium">${milestone.paymentAmount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Participants</span>
                </div>
                <span className="font-medium">{project.currentParticipants}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span>Approval Rate</span>
                </div>
                <span className="font-medium">{project.currentApprovalRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline</span>
                </div>
                <span className="font-medium">
                  {new Date(project.deadline).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Wallet className="h-4 w-4" />
                  <span>Cost/Vote</span>
                </div>
                <span className="font-medium">${project.costPerParticipant}</span>
              </div>
            </CardContent>
          </Card>

          {isAuthenticated && project.status === 'active' && (
            <Card>
              <CardHeader>
                <CardTitle>Cast Your Vote</CardTitle>
                <CardDescription>
                  Vote with quadratic intensity. Higher intensity = more influence, but higher cost.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Button
                    variant={voteValue === true ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setVoteValue(true)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Yes
                  </Button>
                  <Button
                    variant={voteValue === false ? 'destructive' : 'outline'}
                    className="flex-1"
                    onClick={() => setVoteValue(false)}
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    No
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Vote Intensity</span>
                    <span className="font-medium">{voteIntensity}x</span>
                  </div>
                  <Slider
                    value={[voteIntensity]}
                    onValueChange={(value) => setVoteIntensity(value[0])}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>

                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vote Cost</span>
                    <span className="font-medium">${calculateVoteCost().toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  disabled={voteValue === null || voteMutation.isPending}
                  onClick={handleVote}
                >
                  {voteMutation.isPending ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
