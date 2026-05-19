import { apiGet, apiPost } from './client';
import type { Project } from '@/types';

export async function getProjects(): Promise<Project[]> {
  return apiGet<Project[]>('/api/projects');
}

export async function getProject(id: number): Promise<Project> {
  return apiGet<Project>(`/api/projects/${id}`);
}

export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'currentFunding' | 'currentParticipants' | 'currentApprovalRate' | 'status'>): Promise<Project> {
  return apiPost<Project>('/api/projects', data);
}
