import { Task } from '@/entities';
import { TaskParameters } from '@/entities/task';

import apiClient from '../apiClient';

const TASK_PATH = '/tasks';

/* Api Request using Axios */

export const getTasks = () => apiClient.get<Task[]>({ url: TASK_PATH });
export const getTaskById = (id: string) => apiClient.get<Task>({ url: `${TASK_PATH}/${id}` });
export const getTaskByParams = (params: TaskParameters) =>
  apiClient.get<Task[]>({ url: `${TASK_PATH}`, params });
