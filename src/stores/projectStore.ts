import { create } from 'zustand';

import { Project } from '@/entities';

type ProjectStore = {
  projects: Project[];
  actions: {
    setProjects: (projects: Project[]) => void;
  };
};

const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  actions: {
    setProjects: (projects: Project[]) => set(() => ({ projects: [...projects] })),
  },
}));

export default useProjectStore;
