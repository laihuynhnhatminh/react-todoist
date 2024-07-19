import { useQuery } from '@tanstack/react-query';

import { CreateProjectRequest, Project } from '@/entities';

import apiClient from '../apiClient';

import { PROJECT_KEYS } from './queryKeys';

const PROJECT_PATH = '/projects';

/* Api Request using Axios */

export const getProjects = () => apiClient.get<Project[]>({ url: PROJECT_PATH });

export const getProjectDetail = (id: string) =>
  apiClient.get<Project>({ url: `${PROJECT_PATH}/${id}` });

export const createProject = (data: CreateProjectRequest) =>
  apiClient.post<Project>({ url: `${PROJECT_PATH}`, data });

export const updateProject = (id: string, data: Partial<Project>) =>
  apiClient.post<Project>({ url: `${PROJECT_PATH}/${id}`, data });

export const deleteProject = (id: string) =>
  apiClient.delete<Project>({ url: `${PROJECT_PATH}/${id}` });

/* React Query hook */

export const useQueryProjects = () =>
  useQuery<Project[]>({
    queryKey: PROJECT_KEYS.allProjects,
    queryFn: getProjects,
  });

export const useQueryProjectDetail = (id: string) =>
  useQuery<Project>({
    queryKey: PROJECT_KEYS.project(id),
    queryFn: () => getProjectDetail(id),
  });
