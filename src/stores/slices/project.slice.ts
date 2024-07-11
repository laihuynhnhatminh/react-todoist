import type { StateCreator } from "zustand";
import { Project } from "../../types";

export interface ProjectSlice {
  projects: Project[];
  setProjects: () => void;
}

export const createProjectSlice: StateCreator<ProjectSlice> = (set) => ({
  projects: [],
  setProjects: () => set((state) => ({ projects: [...state.projects] })),
});
