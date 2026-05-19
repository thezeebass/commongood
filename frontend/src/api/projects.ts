import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from './index'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await apiClient.get('/projects')
      return data
    },
  })
}

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/projects/${id}`)
      return data
    },
  })
}

export const useSubmitVote = () => {
  return useMutation({
    mutationFn: async (payload: {
      projectId: number
      voteValue: boolean
      voteIntensity: number
    }) => {
      const { data } = await apiClient.post('/votes', payload)
      return data
    },
  })
}
