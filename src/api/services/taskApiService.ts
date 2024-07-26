import { Task, TaskParameters } from '@/entities';
import { CreateTaskDto } from '@/entities/task';

import apiClient from '../apiClient';

const TASK_PATH = '/tasks';

/* Api Request using Axios */

export const getTasks = () => apiClient.get<Task[]>({ url: TASK_PATH });

export const getTaskById = (id: string) => apiClient.get<Task>({ url: `${TASK_PATH}/${id}` });

export const getTaskByParams = (params: TaskParameters) =>
  apiClient.get<Task[]>({ url: `${TASK_PATH}`, params });

export const createTask = (data: CreateTaskDto) => apiClient.post<Task>({ url: TASK_PATH, data });

export const updateTask = (taskId: string, data: Partial<Task>) =>
  apiClient.post<Task>({ url: `${TASK_PATH}/${taskId}`, data });

export const removeTask = (taskId: string) =>
  apiClient.post<void>({ url: `${TASK_PATH}/${taskId}` });
