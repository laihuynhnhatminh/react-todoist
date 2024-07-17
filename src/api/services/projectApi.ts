import { CreateProjectRequest, Project } from '@/entities';

import apiClient from '../apiClient';

const PROJECT_PATH = '/projects';

const getProjects = () => apiClient.get<Project[]>({ url: PROJECT_PATH });
const getProjectById = (id: string) => apiClient.get<Project>({ url: `${PROJECT_PATH}/${id}` });
const createProject = (data: CreateProjectRequest) =>
  apiClient.post<Project>({ url: `${PROJECT_PATH}`, data });
const updateProject = (id: string, data: Partial<Project>) =>
  apiClient.post<Project>({ url: `${PROJECT_PATH}/${id}`, data });
const deleteProject = (id: string) => apiClient.delete<Project>({ url: `${PROJECT_PATH}/${id}` });

export { getProjects, getProjectById, createProject, updateProject, deleteProject };
