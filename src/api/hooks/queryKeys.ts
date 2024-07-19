import { TaskParameters } from '@/entities/task';

// Projects Query Keys
export const PROJECT_KEYS = {
  allProjects: ['projects'] as const,
  project: (id: string) => [...PROJECT_KEYS.allProjects, id] as const,
};

// Tasks Query Keys
export const TASK_KEYS = {
  allTasks: ['tasks'] as const,
  task: (id: string) => [...TASK_KEYS.allTasks, id] as const,
  tasksByParams: (params: TaskParameters) => [...TASK_KEYS.allTasks, { params }],
};

// Section Query Keys
