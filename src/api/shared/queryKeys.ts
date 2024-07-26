import { TaskParameters } from '@/entities';

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
export const SECTION_KEYS = {
  allSection: ['sections'] as const,
  sectionOfProject: (id: string) => [...SECTION_KEYS.allSection, id] as const,
};
