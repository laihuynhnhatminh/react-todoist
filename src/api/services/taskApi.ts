import { Task } from '@/entities';

import apiClient from '../apiClient';

const TASK_PATH = '/tasks';

const getTasks = () => apiClient.get<Task[]>({ url: TASK_PATH });
const getTaskById = (id: string) => apiClient.get<Task>({ url: `${TASK_PATH}/${id}` });

export { getTasks, getTaskById };
