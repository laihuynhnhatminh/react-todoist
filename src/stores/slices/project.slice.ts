import { Project } from '@/types';

import type { StateCreator } from 'zustand';

export interface ProjectSlice {
  projects: Project[];
  setProjects: () => void;
}

export const createProjectSlice: StateCreator<ProjectSlice> = (set) => ({
  projects: [],
  setProjects: () => set((state) => ({ projects: [...state.projects] })),
});
