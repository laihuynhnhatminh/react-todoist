import { useQuery } from '@tanstack/react-query';

import { Task } from '@/entities';
import { TaskParameters } from '@/entities/task';

import apiClient from '../apiClient';

import { TASK_KEYS } from './queryKeys';

const TASK_PATH = '/tasks';

/* Api Request using Axios */

export const getTasks = () => apiClient.get<Task[]>({ url: TASK_PATH });
export const getTaskById = (id: string) => apiClient.get<Task>({ url: `${TASK_PATH}/${id}` });
export const getTaskByParams = (params: TaskParameters) =>
  apiClient.get<Task[]>({ url: `${TASK_PATH}`, params });

/* React Query hook */

export const useTasks = () =>
  useQuery({
    queryKey: TASK_KEYS.allTasks,
    queryFn: getTasks,
  });

export const useTaskDetail = (id: string) =>
  useQuery({
    queryKey: TASK_KEYS.task(id),
    queryFn: () => getTaskById(id),
  });

export const useTaskByParams = (params: TaskParameters) =>
  useQuery({
    queryKey: TASK_KEYS.tasksByParams(params),
    queryFn: () => getTaskByParams(params),
  });
