import { Task, TaskParameters } from '@/entities';
import { CreateTaskDto } from '@/entities/task';

import apiClient from '../apiClient';

const TASK_PATH = '/tasks';

/* Api Request using Axios */

export const getTasks = () => apiClient.get<Task[]>({ url: TASK_PATH });
