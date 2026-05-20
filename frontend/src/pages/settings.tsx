import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { getProjects } from '@/api/projects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading';
import { Calendar, Users, Target } from 'lucide-react';

export function ProjectsPage() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load projects</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'funded': return 'secondary';
      case 'completed': return 'default';
      case 'failed': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Browse and vote on community proposals</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">
                    ${project.currentFunding.toLocaleString()} / ${project.fundingGoal.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={(project.currentFunding / project.fundingGoal) * 100} 
                />
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {project.currentParticipants}
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  {project.currentApprovalRate}%
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(project.deadline).toLocaleDateString()}
                </div>
              </div>

              <Button asChild className="w-full">
                <Link to="/projects/$projectId" params={{ projectId: project.id.toString() }}>
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
