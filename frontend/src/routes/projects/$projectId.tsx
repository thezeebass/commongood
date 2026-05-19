import { createFileRoute } from '@tanstack/react-router'
import { useProject, useSubmitVote } from '@/api/projects'
import { useState } from 'react'

export const Route = createFileRoute('/projects/$projectId')({
  component: () => {
    const { projectId } = Route.useParams()
    const { data: project, isLoading } = useProject(projectId)
    const { mutate: submitVote } = useSubmitVote()
    const [voteIntensity, setVoteIntensity] = useState(1)

    if (isLoading) return <div>Loading project...</div>

    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{project?.title}</h1>
        <p className="text-muted-foreground mb-8">{project?.description}</p>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="text-sm font-medium">Funding Progress</label>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${(project?.currentFunding / project?.fundingGoal) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              ${project?.currentFunding} / ${project?.fundingGoal}
            </div>
          </div>
          <div>Participants: {project?.participants}</div>
          <div>Approval Rate: {project?.approvalRate}%</div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Cast Your Vote</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Vote Intensity</label>
              <input
                type="range"
                min="1"
                max="10"
                value={voteIntensity}
                onChange={(e) => setVoteIntensity(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div className="text-sm text-muted-foreground mt-1">Intensity: {voteIntensity}</div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => submitVote({ projectId: Number(projectId), voteValue: true, voteIntensity })}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Vote Yes
              </button>
              <button
                onClick={() => submitVote({ projectId: Number(projectId), voteValue: false, voteIntensity })}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Vote No
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },
})
