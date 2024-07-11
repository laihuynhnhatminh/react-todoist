import type { StateCreator } from "zustand";
import { Task } from "../../types";

export interface TaskSlice {
  tasks: Task[];
  setTasks: () => void;
}

export const createTaskSlice: StateCreator<TaskSlice> = (set) => ({
  tasks: [],
  setTasks: () => set((state) => ({ tasks: [...state.tasks] })),
});
