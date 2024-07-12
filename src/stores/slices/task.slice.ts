import { Task } from '@/types';

import type { StateCreator } from 'zustand';

export interface TaskSlice {
  tasks: Task[];
  setTasks: () => void;
}

export const createTaskSlice: StateCreator<TaskSlice> = (set) => ({
  tasks: [],
  setTasks: () => set((state) => ({ tasks: [...state.tasks] })),
});
