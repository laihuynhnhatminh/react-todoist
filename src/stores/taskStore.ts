import { create } from 'zustand';

import { Task } from '@/types';

interface TaskStore {
  tasks: Task[];
  actions: {
    setTasks: () => void;
  };
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  actions: {
    setTasks: () => set((state) => ({ tasks: [...state.tasks] })),
  },
}));

export default useTaskStore;
