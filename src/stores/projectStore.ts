import { create } from 'zustand';

import { Project } from '@/types';

interface ProjectStore {
  projects: Project[];
  actions: {
    setProjects: () => void;
  };
}

const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  actions: {
    setProjects: () => set((state) => ({ projects: [...state.projects] })),
  },
}));

export default useProjectStore;
