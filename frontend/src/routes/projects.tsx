import { createFileRoute } from '@tanstack/react-router'
import { useProjects } from '@/api/projects'

export const Route = createFileRoute('/projects')({ 
  component: () => {
    const { data: projects, isLoading } = useProjects()

    if (isLoading) return <div>Loading projects...</div>

    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Active Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project: any) => (
            <div key={project.id} className="border rounded-lg p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="space-y-2 text-sm">
                <div>Funding: ${project.currentFunding} / ${project.fundingGoal}</div>
                <div>Participants: {project.participants}</div>
                <div>Approval: {project.approvalRate}%</div>
              </div>
              <a href={`/projects/${project.id}`} className="mt-4 block bg-primary text-primary-foreground px-4 py-2 rounded text-center hover:bg-primary/90">
                Vote
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }
})
