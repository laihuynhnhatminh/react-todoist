// Projects Query Keys
export const PROJECT_KEYS = {
  all: ['projects'] as const,
  byId: (id: string) => [...PROJECT_KEYS.all, id] as const,
};

// Tasks Query Keys
export const TASK_KEYS = {
  all: ['tasks'] as const,
  byId: (id: string) => [...TASK_KEYS.all, id] as const,
};

// Section Query Keys
